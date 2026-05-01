"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Code, 
  Brain, 
  Lightbulb, 
  Cloud, 
  Sparkles,
  Clock,
  BookOpen,
  Target,
  ExternalLink,
  CheckCircle2,
  ArrowLeft,
  GraduationCap
} from "lucide-react"
import { jobRoadmaps } from "@/lib/roadmaps-data"

const iconMap = {
  Code,
  Brain,
  Lightbulb,
  Cloud,
  Sparkles,
}

export default function JobProfileExplorer() {
  const [selectedProfile, setSelectedProfile] = useState(null)

  const profiles = Object.values(jobRoadmaps)

  if (selectedProfile) {
    const profile = jobRoadmaps[selectedProfile]
    const Icon = iconMap[profile.icon] || Code

    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button
          variant="ghost"
          className="mb-6 gap-2"
          onClick={() => setSelectedProfile(null)}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Careers
        </Button>

        {/* Profile Header */}
        <Card className={`mb-8 ${profile.color}/10 border-${profile.color.replace('bg-', '')}/20`}>
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className={`w-16 h-16 rounded-2xl ${profile.color} flex items-center justify-center`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-3xl mb-2">{profile.title}</CardTitle>
                <CardDescription className="text-base">
                  {profile.description}
                </CardDescription>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    Timeline: {profile.timeline}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <GraduationCap className="w-4 h-4" />
                    {profile.phases.length} Phases
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="roadmap" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
            <TabsTrigger value="leetcode">LeetCode</TabsTrigger>
            <TabsTrigger value="interview">Interview</TabsTrigger>
          </TabsList>

          <TabsContent value="roadmap" className="space-y-6">
            {/* Timeline Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Learning Journey</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
                  <div className="space-y-8">
                    {profile.phases.map((phase, index) => (
                      <div key={index} className="relative pl-12">
                        <div className={`absolute left-0 w-8 h-8 rounded-full ${profile.color} text-white flex items-center justify-center text-sm font-bold`}>
                          {index + 1}
                        </div>
                        
                        <Card>
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">{phase.name}</CardTitle>
                              <Badge variant="outline">{phase.duration}</Badge>
                            </div>
                            <CardDescription>{phase.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            {/* Skills */}
                            <div>
                              <h4 className="font-medium mb-3 flex items-center gap-2">
                                <Code className="w-4 h-4 text-primary" />
                                Skills to Learn
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {phase.skills.map((skill, i) => (
                                  <Badge key={i} variant="secondary">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Resources */}
                            <div>
                              <h4 className="font-medium mb-3 flex items-center gap-2">
                                <BookOpen className="w-4 h-4 text-primary" />
                                Learning Resources
                              </h4>
                              <div className="grid gap-2">
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
                                        {resource.description}
                                      </div>
                                    </div>
                                    <Badge variant="outline" className="text-xs shrink-0">
                                      {resource.type}
                                    </Badge>
                                  </a>
                                ))}
                              </div>
                            </div>

                            {/* Projects */}
                            <div>
                              <h4 className="font-medium mb-3 flex items-center gap-2">
                                <Target className="w-4 h-4 text-primary" />
                                Project Ideas
                              </h4>
                              <ul className="space-y-2">
                                {phase.projects.map((project, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-500" />
                                    {project}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Milestones */}
                            <div>
                              <h4 className="font-medium mb-3">Phase Milestones</h4>
                              <ul className="space-y-2">
                                {phase.milestones.map((milestone, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <div className={`w-2 h-2 rounded-full ${profile.color} mt-1.5`} />
                                    {milestone}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leetcode" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  LeetCode Practice Plan for {profile.title}
                </CardTitle>
                <CardDescription>
                  Recommended problem counts and topics to master
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Problem Count */}
                <div className="grid grid-cols-3 gap-4">
                  <Card className="bg-green-500/10 border-green-500/20">
                    <CardContent className="pt-6 text-center">
                      <div className="text-4xl font-bold text-green-600 mb-2">
                        {profile.leetcode.easy}
                      </div>
                      <div className="text-sm text-green-600/80 font-medium">Easy Problems</div>
                      <Progress value={100} className="mt-3 bg-green-200 [&>div]:bg-green-500" />
                    </CardContent>
                  </Card>
                  <Card className="bg-yellow-500/10 border-yellow-500/20">
                    <CardContent className="pt-6 text-center">
                      <div className="text-4xl font-bold text-yellow-600 mb-2">
                        {profile.leetcode.medium}
                      </div>
                      <div className="text-sm text-yellow-600/80 font-medium">Medium Problems</div>
                      <Progress value={100} className="mt-3 bg-yellow-200 [&>div]:bg-yellow-500" />
                    </CardContent>
                  </Card>
                  <Card className="bg-red-500/10 border-red-500/20">
                    <CardContent className="pt-6 text-center">
                      <div className="text-4xl font-bold text-red-600 mb-2">
                        {profile.leetcode.hard}
                      </div>
                      <div className="text-sm text-red-600/80 font-medium">Hard Problems</div>
                      <Progress value={100} className="mt-3 bg-red-200 [&>div]:bg-red-500" />
                    </CardContent>
                  </Card>
                </div>

                {/* Total */}
                <div className="text-center p-4 rounded-lg bg-muted">
                  <span className="text-2xl font-bold text-foreground">
                    {profile.leetcode.easy + profile.leetcode.medium + profile.leetcode.hard}
                  </span>
                  <span className="text-muted-foreground ml-2">Total Problems Recommended</span>
                </div>

                {/* Topics */}
                <div>
                  <h4 className="font-medium mb-3">Focus Topics</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.leetcode.topics.map((topic, i) => (
                      <Badge key={i} className="text-sm py-1 px-3">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Resources */}
                <div>
                  <h4 className="font-medium mb-3">Curated Problem Lists</h4>
                  <div className="grid gap-3">
                    {profile.leetcode.resources.map((resource, i) => (
                      <a
                        key={i}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors group"
                      >
                        <span className="font-medium group-hover:text-primary">
                          {resource.name}
                        </span>
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                      </a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Interview Preparation Guide
                </CardTitle>
                <CardDescription>
                  Key topics and resources for acing your interviews
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Technical */}
                  <Card className="bg-primary/5">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Code className="w-4 h-4" />
                        Technical Topics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {profile.interviewPrep.technical.map((topic, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                            <span className="font-medium">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Behavioral */}
                  <Card className="bg-accent/50">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Lightbulb className="w-4 h-4" />
                        Behavioral Topics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {profile.interviewPrep.behavioral.map((topic, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-accent-foreground" />
                            <span className="font-medium">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Interview Resources */}
                <div>
                  <h4 className="font-medium mb-3">Interview Prep Resources</h4>
                  <div className="grid gap-3">
                    {profile.interviewPrep.resources.map((resource, i) => (
                      <a
                        key={i}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors group"
                      >
                        <span className="font-medium group-hover:text-primary">
                          {resource.name}
                        </span>
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Tips */}
                <Card className="bg-muted/50">
                  <CardContent className="pt-6">
                    <h4 className="font-medium mb-3">Pro Tips</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">1.</span>
                        Practice explaining your thought process out loud while solving problems
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">2.</span>
                        Use the STAR method (Situation, Task, Action, Result) for behavioral questions
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">3.</span>
                        Prepare 2-3 strong project stories that demonstrate different skills
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">4.</span>
                        Research the company&apos;s products, culture, and recent news before the interview
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Explore Career Paths
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Browse detailed roadmaps for popular tech careers. Each path includes timelines, 
          resources, LeetCode recommendations, and interview preparation guides.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => {
          const Icon = iconMap[profile.icon] || Code
          return (
            <Card
              key={profile.id}
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              onClick={() => setSelectedProfile(profile.id)}
            >
              <div className={`h-2 ${profile.color}`} />
              <CardHeader>
                <div className={`w-14 h-14 rounded-xl ${profile.color}/10 flex items-center justify-center mb-2`}>
                  <Icon className={`w-7 h-7 ${profile.color.replace('bg-', 'text-')}`} />
                </div>
                <CardTitle className="flex items-center justify-between">
                  {profile.title}
                </CardTitle>
                <CardDescription>{profile.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {profile.timeline}
                  </div>
                  <div className="flex items-center gap-1">
                    <GraduationCap className="w-4 h-4" />
                    {profile.phases.length} phases
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {profile.phases[0].skills.slice(0, 3).map((skill, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {profile.phases[0].skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{profile.phases[0].skills.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    {profile.leetcode.easy + profile.leetcode.medium + profile.leetcode.hard} LeetCode problems
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1 text-xs">
                    Explore
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
