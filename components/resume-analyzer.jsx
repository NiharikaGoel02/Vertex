"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Loader2,
  Upload,
  FileText,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  BookOpen,
  ExternalLink,
  TrendingUp,
  Target,
  Clock,
  Sparkles
} from "lucide-react"

export default function ResumeAnalyzer() {
  const [resumeText, setResumeText] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState(null)
  const [error, setError] = useState("")
  const [history, setHistory] = useState([])
  const fileInputRef = useRef(null)

  const MOCK_USER_ID = "65f1a2b3c4d5e6f7a8b9c0d1"

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      const response = await fetch(`/api/resume?userId=${MOCK_USER_ID}`)
      const data = await response.json()
      if (data.success) {
        setHistory(data.analyses)
      }
    } catch (err) {
      console.error("Failed to fetch history:", err)
    }
  }

  const saveAnalysisToDB = async (analysisData) => {
    try {
      await fetch("/api/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: MOCK_USER_ID,
          parsedText: resumeText,
          targetRole: jobDescription.substring(0, 50),
          ...analysisData
        }),
      })
      fetchHistory()
    } catch (err) {
      console.error("Failed to save analysis:", err)
    }
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError("")
    
    try {
      const formData = new FormData()
      formData.append("file", file)
      
      setResumeText("Extracting text from file...")

      const response = await fetch("/api/parse", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to parse file")
      }

      setResumeText(data.text)
    } catch (err) {
      setError(err.message || "Failed to extract text from the file.")
      setResumeText("")
    }
  }

  const analyzeResume = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      setError("Please provide both your resume and the job description")
      return
    }

    setLoading(true)
    setError("")

    const prompt = `Analyze this resume against the job description and provide detailed feedback with learning resources.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Provide a comprehensive analysis including skill gaps and specific resources to address them.`

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "resume" }),
      })

      const data = await response.json()

      if (data.error) {
        setError(data.error)
        return
      }

      try {
        const cleanedResponse = data.result.replace(/```json\n?|\n?```/g, "").trim()
        const parsedAnalysis = JSON.parse(cleanedResponse)
        setAnalysis(parsedAnalysis)
        saveAnalysisToDB(parsedAnalysis)
      } catch (parseError) {
        setAnalysis({ raw: data.result })
        saveAnalysisToDB({ raw: data.result })
      }
    } catch (err) {
      setError("Failed to analyze resume. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBg = (score) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getImportanceColor = (importance) => {
    switch (importance) {
      case "high": return "bg-red-500/10 text-red-600 border-red-500/20"
      case "medium": return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      default: return "bg-green-500/10 text-green-600 border-green-500/20"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Resume Analyzer
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Upload your resume and paste a job description to identify skill gaps 
          and get personalized learning resources
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr,1fr] gap-6 mb-8">
        {/* Resume Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Your Resume
            </CardTitle>
            <CardDescription>
              Paste your resume text or upload a file
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3">
              <div 
                className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary hover:bg-accent/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.doc,.docx,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm font-medium">Click to upload your resume</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Supports PDF, DOCX, and TXT files
                </p>
              </div>
            </div>
            <Textarea
              placeholder="Or paste your resume content here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="min-h-[250px] resize-none"
            />
          </CardContent>
        </Card>

        {/* Job Description Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Job Description
            </CardTitle>
            <CardDescription>
              Paste the job description you want to match
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="min-h-[300px] resize-none"
            />
          </CardContent>
        </Card>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 mb-6 rounded-lg bg-destructive/10 text-destructive">
          <AlertTriangle className="w-5 h-5" />
          {error}
        </div>
      )}

      <div className="flex justify-center mb-8">
        <Button
          size="lg"
          onClick={analyzeResume}
          disabled={loading || !resumeText.trim() || !jobDescription.trim()}
          className="gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Analyze Resume
            </>
          )}
        </Button>
      </div>

      {/* History Section */}
      {history.length > 0 && !analysis && !loading && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Recent Analyses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {history.map((item) => (
                <button
                  key={item._id}
                  onClick={() => setAnalysis(item)}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors text-left"
                >
                  <div>
                    <div className="font-medium">{item.targetRole || "Untitled Analysis"}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                  <Badge className={getScoreBg(item.score || 0)}>
                    {item.score || 0}%
                  </Badge>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {loading && (
        <Card>
          <CardContent className="py-12">
            <div className="flex flex-col items-center justify-center gap-4">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
              <p className="text-muted-foreground">
                Analyzing your resume against the job requirements...
              </p>
              <Progress value={45} className="w-48" />
            </div>
          </CardContent>
        </Card>
      )}

      {analysis && !analysis.raw && (
        <div className="space-y-6">
          {/* Score Card */}
          <Card className="overflow-hidden">
            <div className={`h-2 ${getScoreBg(analysis.score)}`} />
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Resume Analysis Score</CardTitle>
                  <CardDescription>{analysis.summary}</CardDescription>
                </div>
                <div className={`text-5xl font-bold ${getScoreColor(analysis.score)}`}>
                  {analysis.score}%
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Progress 
                value={analysis.score} 
                className={`h-3 [&>div]:${getScoreBg(analysis.score)}`}
              />
            </CardContent>
          </Card>

          {/* Strengths & Keywords */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Strengths */}
            {Array.isArray(analysis.strengths) && analysis.strengths.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="w-5 h-5" />
                    Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysis.strengths.map((strength, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-500" />
                        <span className="text-sm">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Keywords */}
            {analysis.keywords && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Keyword Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Array.isArray(analysis.keywords.present) && analysis.keywords.present.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-green-600 mb-2">Present Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis.keywords.present.map((keyword, i) => (
                          <Badge key={i} variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {Array.isArray(analysis.keywords.missing) && analysis.keywords.missing.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-red-600 mb-2">Missing Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis.keywords.missing.map((keyword, i) => (
                          <Badge key={i} variant="outline" className="bg-red-500/10 text-red-600 border-red-500/20">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Skill Gaps */}
          {Array.isArray(analysis.gaps) && analysis.gaps.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Skill Gaps & Learning Resources
                </CardTitle>
                <CardDescription>
                  Areas to improve with curated resources to help you learn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {analysis.gaps.map((gap, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{gap.skill}</h3>
                          <Badge className={getImportanceColor(gap.importance)}>
                            {gap.importance} priority
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {gap.description}
                        </p>
                      </div>
                    </div>

                    {Array.isArray(gap.resources) && gap.resources.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          Recommended Resources
                        </h4>
                        <div className="grid gap-2">
                          {gap.resources.map((resource, i) => (
                            <a
                              key={i}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors group"
                            >
                              <div className="flex items-center gap-3">
                                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                                <div>
                                  <div className="font-medium text-sm group-hover:text-primary">
                                    {resource.name}
                                  </div>
                                  {resource.duration && (
                                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {resource.duration}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                {resource.type}
                              </Badge>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Improvements */}
          {Array.isArray(analysis.improvements) && analysis.improvements.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Resume Improvements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysis.improvements.map((improvement, i) => (
                    <div key={i} className="border-l-4 border-primary pl-4 py-2">
                      <Badge variant="outline" className="mb-2">
                        {improvement.section}
                      </Badge>
                      <p className="font-medium">{improvement.suggestion}</p>
                      {improvement.example && (
                        <p className="text-sm text-muted-foreground mt-1 italic">
                          Example: {improvement.example}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Plan */}
          {analysis.actionPlan && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Action Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {Array.isArray(analysis.actionPlan.immediate) && analysis.actionPlan.immediate.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        Immediate (This Week)
                      </h4>
                      <ul className="space-y-2">
                        {analysis.actionPlan.immediate.map((action, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <XCircle className="w-4 h-4 mt-0.5 text-red-500 shrink-0" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {Array.isArray(analysis.actionPlan.shortTerm) && analysis.actionPlan.shortTerm.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        Short Term (1-2 Weeks)
                      </h4>
                      <ul className="space-y-2">
                        {analysis.actionPlan.shortTerm.map((action, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <Clock className="w-4 h-4 mt-0.5 text-yellow-500 shrink-0" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {Array.isArray(analysis.actionPlan.longTerm) && analysis.actionPlan.longTerm.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        Long Term (1-3 Months)
                      </h4>
                      <ul className="space-y-2">
                        {analysis.actionPlan.longTerm.map((action, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <Target className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Raw response fallback */}
      {analysis?.raw && (
        <Card>
          <CardHeader>
            <CardTitle>Resume Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              <div className="prose prose-sm max-w-none whitespace-pre-wrap">
                {analysis.raw}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {!loading && !analysis && (
        <Card className="border-dashed">
          <CardContent className="py-12">
            <div className="text-center text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Upload your resume and paste a job description to get started</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
