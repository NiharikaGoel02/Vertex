"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Loader2, 
  Sparkles, 
  BookOpen, 
  Code, 
  Target, 
  Clock,
  ExternalLink,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from "lucide-react"
import { collegeYears, skillsList, goalOptions } from "@/lib/roadmaps-data"

export default function PersonalizedRoadmap() {
  const [formData, setFormData] = useState({
    collegeYear: "",
    skills: [],
    goal: "",
    customGoal: "",
  })
  const [skillInput, setSkillInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [roadmap, setRoadmap] = useState(null)
  const [error, setError] = useState("")
  const [expandedPhases, setExpandedPhases] = useState({})
  const [savedRoadmaps, setSavedRoadmaps] = useState([])

  // Placeholder userId for demonstration since no auth is active in UI yet
  const MOCK_USER_ID = "65f1a2b3c4d5e6f7a8b9c0d1"

  useEffect(() => {
    fetchSavedRoadmaps()
  }, [])

  const fetchSavedRoadmaps = async () => {
    try {
      const response = await fetch(`/api/roadmap?userId=${MOCK_USER_ID}`)
      const data = await response.json()
      if (data.success) {
        setSavedRoadmaps(data.roadmaps)
      }
    } catch (err) {
      console.error("Failed to fetch roadmaps:", err)
    }
  }

  const saveRoadmapToDB = async (roadmapData) => {
    try {
      await fetch("/api/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: MOCK_USER_ID,
          ...roadmapData
        }),
      })
      fetchSavedRoadmaps() // Refresh list
    } catch (err) {
      console.error("Failed to save roadmap:", err)
    }
  }

  const handleAddSkill = (skill) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData({ ...formData, skills: [...formData.skills, skill] })
      setSkillInput("")
    }
  }

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    })
  }

  const togglePhase = (index) => {
    setExpandedPhases(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const generateRoadmap = async () => {
    if (!formData.collegeYear || !formData.goal) {
      setError("Please fill in your college year and goal")
      return
    }

    setLoading(true)
    setError("")

    const prompt = `Generate a detailed career roadmap for a student with the following profile:
    
    College Year: ${collegeYears.find(y => y.value === formData.collegeYear)?.label || formData.collegeYear}
    Current Skills: ${formData.skills.length > 0 ? formData.skills.join(", ") : "Beginner - no specific skills yet"}
    Career Goal: ${formData.goal === "Other" ? formData.customGoal : formData.goal}
    
    Create a comprehensive, actionable roadmap that considers their current level and helps them reach their goal. Include specific resources with real URLs, timeline estimates, project ideas, and interview preparation guidance.`

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "roadmap" }),
      })

      const data = await response.json()

      if (data.error) {
        setError(data.error)
        return
      }

      // Try to parse JSON from the response
      try {
        const cleanedResponse = data.result.replace(/```json\n?|\n?```/g, "").trim()
        const parsedRoadmap = JSON.parse(cleanedResponse)
        setRoadmap(parsedRoadmap)
        // Expand first phase by default
        setExpandedPhases({ 0: true })
        // Save to database
        saveRoadmapToDB(parsedRoadmap)
      } catch (parseError) {
        // If parsing fails, show raw response
        setRoadmap({ raw: data.result })
      }
    } catch (err) {
      setError("Failed to generate roadmap. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const filteredSkills = skillsList.filter(
    (skill) =>
      skill.toLowerCase().includes(skillInput.toLowerCase()) &&
      !formData.skills.includes(skill)
  )

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Your Personalized Career Roadmap
        </h1>
        <p className="text-muted-foreground">
          Tell us about yourself and get a custom roadmap powered by AI
        </p>
      </div>

      <div className="grid lg:grid-cols-[400px,1fr] gap-8">
        {/* Left Column: Input Form and History */}
        <div className="space-y-6">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Your Profile
              </CardTitle>
              <CardDescription>
                Fill in your details to generate a personalized roadmap
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* College Year */}
              <div className="space-y-2">
                <label className="text-sm font-medium">College Year / Status</label>
                <Select
                  value={formData.collegeYear}
                  onValueChange={(value) =>
                    setFormData({ ...formData, collegeYear: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your year" />
                  </SelectTrigger>
                  <SelectContent>
                    {collegeYears.map((year) => (
                      <SelectItem key={year.value} value={year.value}>
                        {year.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Skills</label>
                <div className="relative">
                  <Input
                    placeholder="Type to add skills..."
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && skillInput) {
                        e.preventDefault()
                        handleAddSkill(skillInput)
                      }
                    }}
                  />
                  {skillInput && filteredSkills.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-popover border rounded-md shadow-md max-h-40 overflow-auto">
                      {filteredSkills.slice(0, 6).map((skill) => (
                        <button
                          key={skill}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-accent"
                          onClick={() => handleAddSkill(skill)}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {formData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => handleRemoveSkill(skill)}
                      >
                        {skill} ×
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Goal */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Career Goal</label>
                <Select
                  value={formData.goal}
                  onValueChange={(value) =>
                    setFormData({ ...formData, goal: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your goal" />
                  </SelectTrigger>
                  <SelectContent>
                    {goalOptions.map((goal) => (
                      <SelectItem key={goal} value={goal}>
                        {goal}
                      </SelectItem>
                    ))}
                    <SelectItem value="Other">Other (specify below)</SelectItem>
                  </SelectContent>
                </Select>
                {formData.goal === "Other" && (
                  <Textarea
                    placeholder="Describe your career goal..."
                    value={formData.customGoal}
                    onChange={(e) =>
                      setFormData({ ...formData, customGoal: e.target.value })
                    }
                    className="mt-2"
                  />
                )}
              </div>

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              <Button
                className="w-full gap-2"
                onClick={generateRoadmap}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate My Roadmap
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Saved Roadmaps List */}
          {savedRoadmaps.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Roadmaps</CardTitle>
                <CardDescription>Your previously generated roadmaps</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-3">
                    {savedRoadmaps.map((saved) => (
                      <button
                        key={saved._id}
                        onClick={() => {
                          setRoadmap(saved)
                          setExpandedPhases({ 0: true })
                        }}
                        className={`w-full text-left p-3 rounded-lg border transition-colors hover:bg-accent ${
                          roadmap?._id === saved._id ? "bg-accent border-primary" : ""
                        }`}
                      >
                        <div className="font-medium text-sm line-clamp-1">{saved.title}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {new Date(saved.createdAt).toLocaleDateString()}
                        </div>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column: Roadmap Display */}
        <div className="space-y-6">
          {loading && (
            <Card>
              <CardContent className="py-12">
                <div className="flex flex-col items-center justify-center gap-4">
                  <Loader2 className="w-12 h-12 animate-spin text-primary" />
                  <p className="text-muted-foreground">
                    Creating your personalized roadmap...
                  </p>
                  <Progress value={33} className="w-48" />
                </div>
              </CardContent>
            </Card>
          )}

          {roadmap && !roadmap.raw && (
            <>
              {/* Roadmap Header */}
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl">{roadmap.title}</CardTitle>
                  <CardDescription className="text-base">
                    {roadmap.summary}
                  </CardDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Estimated Timeline: {roadmap.timeline}
                    </span>
                  </div>
                </CardHeader>
              </Card>

              {/* Phases */}
              {roadmap.phases?.map((phase, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader 
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => togglePhase(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{phase.name}</CardTitle>
                          <CardDescription>{phase.duration}</CardDescription>
                        </div>
                      </div>
                      {expandedPhases[index] ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </CardHeader>
                  
                  {expandedPhases[index] && (
                    <CardContent className="space-y-6 border-t pt-6">
                      <p className="text-muted-foreground">{phase.description}</p>

                      {/* Skills */}
                      {phase.skills?.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <Code className="w-4 h-4" />
                            Skills to Learn
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {phase.skills.map((skill, i) => (
                              <Badge key={i} variant="outline">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Resources */}
                      {phase.resources?.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <BookOpen className="w-4 h-4" />
                            Learning Resources
                          </h4>
                          <div className="space-y-2">
                            {phase.resources.map((resource, i) => (
                              <a
                                key={i}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors group"
                              >
                                <ExternalLink className="w-4 h-4 mt-0.5 text-muted-foreground group-hover:text-primary" />
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-sm group-hover:text-primary">
                                    {resource.name}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {resource.description || resource.type}
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

                      {/* Projects */}
                      {phase.projects?.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <Target className="w-4 h-4" />
                            Project Ideas
                          </h4>
                          <ul className="space-y-2">
                            {phase.projects.map((project, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary" />
                                {project}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Milestones */}
                      {phase.milestones?.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2">Milestones</h4>
                          <ul className="space-y-2">
                            {phase.milestones.map((milestone, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                                {milestone}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  )}
                </Card>
              ))}

              {/* LeetCode Section */}
              {roadmap.leetcode && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="w-5 h-5" />
                      LeetCode Practice Plan
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 rounded-lg bg-green-500/10">
                        <div className="text-2xl font-bold text-green-600">
                          {roadmap.leetcode.easy}
                        </div>
                        <div className="text-sm text-muted-foreground">Easy</div>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-yellow-500/10">
                        <div className="text-2xl font-bold text-yellow-600">
                          {roadmap.leetcode.medium}
                        </div>
                        <div className="text-sm text-muted-foreground">Medium</div>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-red-500/10">
                        <div className="text-2xl font-bold text-red-600">
                          {roadmap.leetcode.hard}
                        </div>
                        <div className="text-sm text-muted-foreground">Hard</div>
                      </div>
                    </div>

                    {roadmap.leetcode.topics?.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Focus Topics</h4>
                        <div className="flex flex-wrap gap-2">
                          {roadmap.leetcode.topics.map((topic, i) => (
                            <Badge key={i} variant="outline">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {roadmap.leetcode.resources?.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Recommended Resources</h4>
                        <div className="space-y-2">
                          {roadmap.leetcode.resources.map((resource, i) => (
                            <a
                              key={i}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-primary hover:underline"
                            >
                              <ExternalLink className="w-4 h-4" />
                              {resource.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Interview Prep */}
              {roadmap.interviewPrep && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Interview Preparation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      {roadmap.interviewPrep.technical?.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2">Technical Topics</h4>
                          <ul className="space-y-1">
                            {roadmap.interviewPrep.technical.map((topic, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                                <CheckCircle2 className="w-3 h-3 text-primary" />
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {roadmap.interviewPrep.behavioral?.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2">Behavioral Topics</h4>
                          <ul className="space-y-1">
                            {roadmap.interviewPrep.behavioral.map((topic, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                                <CheckCircle2 className="w-3 h-3 text-primary" />
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {roadmap.interviewPrep.resources?.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Resources</h4>
                        <div className="flex flex-wrap gap-2">
                          {roadmap.interviewPrep.resources.map((resource, i) => (
                            <a
                              key={i}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground cursor-pointer">
                                {resource.name}
                              </Badge>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {/* Raw response fallback */}
          {roadmap?.raw && (
            <Card>
              <CardHeader>
                <CardTitle>Your Personalized Roadmap</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="prose prose-sm max-w-none whitespace-pre-wrap">
                    {roadmap.raw}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          )}

          {!loading && !roadmap && (
            <Card className="border-dashed">
              <CardContent className="py-12">
                <div className="text-center text-muted-foreground">
                  <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Fill in your profile and click &quot;Generate My Roadmap&quot; to get started</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
