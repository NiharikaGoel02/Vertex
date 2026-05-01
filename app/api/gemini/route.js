import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

// Models to try in order of preference (current available models)
const MODELS = [
  "gemini-2.5-flash",
  "gemini-2.0-flash", 
  "gemini-2.0-flash-lite"
]

async function generateWithRetry(prompt, systemPrompt, maxRetries = 3) {
  let lastError = null
  
  for (const modelName of MODELS) {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName })
        const result = await model.generateContent([
          { text: systemPrompt },
          { text: prompt }
        ])
        return result.response.text()
      } catch (error) {
        lastError = error
        console.log(`[v0] Attempt ${attempt + 1} with ${modelName} failed:`, error.message)
        
        const errorMessage = (error.message || "").toLowerCase()
        
        // If quota exhausted, waiting won't help. Try next model.
        if (errorMessage.includes("quota")) {
          console.log(`[v0] Quota exhausted for ${modelName}, trying next model...`)
          break; // Break the attempt loop to try next model immediately
        }
        
        // If it's a rate limit (429) or high demand (503) error, wait with exponential backoff
        if (errorMessage.includes("503") || errorMessage.includes("high demand") || errorMessage.includes("rate limit") || errorMessage.includes("429") || errorMessage.includes("too many requests")) {
          const delay = Math.pow(2, attempt) * 1500 + Math.random() * 1000;
          console.log(`[v0] Rate limited. Waiting ${Math.round(delay)}ms before retry...`)
          await new Promise(resolve => setTimeout(resolve, delay))
        } else if (errorMessage.includes("404") || errorMessage.includes("not found")) {
          // Model not found, try next model immediately
          break
        } else {
          // For other errors, wait a short duration before retrying
          await new Promise(resolve => setTimeout(resolve, 1000))
        }
      }
    }
  }
  
  throw lastError || new Error("All models failed")
}

export async function POST(request) {
  try {
    const { prompt, type } = await request.json()

    if (!process.env.GEMINI_API_KEY) {
      return Response.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      )
    }

    let systemPrompt = ""

    switch (type) {
      case "roadmap":
        systemPrompt = `You are an expert career counselor and technical mentor. Generate a detailed, structured career roadmap based on the user's information. 
        
        Your response MUST be in valid JSON format with this exact structure:
        {
          "title": "Personalized Roadmap Title",
          "summary": "Brief overview of the roadmap",
          "timeline": "Estimated total duration",
          "phases": [
            {
              "name": "Phase Name",
              "duration": "Duration",
              "description": "Phase description",
              "skills": ["skill1", "skill2"],
              "resources": [
                {
                  "name": "Resource Name",
                  "type": "course/book/video/practice",
                  "url": "https://actual-url.com",
                  "description": "Why this resource"
                }
              ],
              "projects": ["Project idea 1", "Project idea 2"],
              "milestones": ["Milestone 1", "Milestone 2"]
            }
          ],
          "leetcode": {
            "easy": 50,
            "medium": 100,
            "hard": 30,
            "topics": ["Arrays", "Strings", "Trees"],
            "resources": [
              {"name": "NeetCode 150", "url": "https://neetcode.io/practice"}
            ]
          },
          "interviewPrep": {
            "technical": ["Topic 1", "Topic 2"],
            "behavioral": ["STAR method", "Leadership examples"],
            "resources": [
              {"name": "Resource", "url": "https://url.com"}
            ]
          }
        }
        
        Include REAL, working URLs for resources like Coursera, Udemy, YouTube channels, GitHub repos, documentation sites, etc.
        Be specific and actionable. Return ONLY valid JSON, no markdown.`
        break

      case "resume":
        systemPrompt = `You are an expert resume reviewer and career advisor. Analyze the resume against the job profile and provide detailed feedback.
        
        Your response MUST be in valid JSON format with this exact structure:
        {
          "score": 75,
          "summary": "Overall assessment",
          "strengths": ["Strength 1", "Strength 2"],
          "gaps": [
            {
              "skill": "Missing Skill",
              "importance": "high/medium/low",
              "description": "Why this matters",
              "resources": [
                {
                  "name": "Resource Name",
                  "type": "course/book/practice",
                  "url": "https://actual-url.com",
                  "duration": "2 weeks"
                }
              ]
            }
          ],
          "improvements": [
            {
              "section": "Experience/Skills/Education",
              "suggestion": "Specific improvement",
              "example": "Example of how to improve"
            }
          ],
          "keywords": {
            "missing": ["keyword1", "keyword2"],
            "present": ["keyword3", "keyword4"]
          },
          "actionPlan": {
            "immediate": ["Action 1", "Action 2"],
            "shortTerm": ["1-2 week actions"],
            "longTerm": ["1-3 month actions"]
          }
        }
        
        Include REAL, working URLs for learning resources. Return ONLY valid JSON, no markdown.`
        break

      case "chat":
        systemPrompt = `You are a helpful career guidance AI assistant. You help users with:
        - Career advice and planning
        - Technical skill development
        - Interview preparation
        - Resume tips
        - Industry insights
        
        Be conversational, helpful, and provide specific, actionable advice. When suggesting resources, include real URLs when possible.
        Format your response in a readable way with proper paragraphs. You can use simple formatting but keep it clean.`
        break

      default:
        systemPrompt = "You are a helpful assistant."
    }

    const text = await generateWithRetry(prompt, systemPrompt)

    return Response.json({ result: text })
  } catch (error) {
    console.error("Gemini API error:", error)
    
    // Provide more specific error messages
    let errorMessage = "Failed to generate response. Please try again."
    
    if (error.message?.includes("API key") || error.message?.includes("API_KEY")) {
      errorMessage = "Invalid API key. Please check your GEMINI_API_KEY."
    } else if (error.message?.includes("quota") || error.message?.includes("rate") || error.message?.includes("429")) {
      errorMessage = "API rate limit reached. Please wait a moment and try again."
    } else if (error.message?.includes("503") || error.message?.includes("high demand") || error.message?.includes("Service Unavailable")) {
      errorMessage = "AI service is experiencing high demand. Please try again in a few seconds."
    } else if (error.message?.includes("not found") || error.message?.includes("404")) {
      errorMessage = "AI model unavailable. Please try again later."
    }
    
    return Response.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
