"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Map, Compass, FileText, MessageCircle, ArrowRight, Sparkles } from "lucide-react"

export default function HeroSection({ onNavigate }) {
  const features = [
    {
      id: "personalized",
      title: "Personalized Roadmap",
      description: "Get a custom career roadmap based on your year, skills, and goals with detailed resources and timelines.",
      icon: Map,
      color: "bg-primary/10 text-primary",
    },
    {
      id: "explore",
      title: "Explore Career Paths",
      description: "Browse curated roadmaps for Software Engineer, Data Scientist, AI Engineer, DevOps, and Product Manager roles.",
      icon: Compass,
      color: "bg-accent/10 text-accent",
    },
    {
      id: "resume",
      title: "Resume Analyzer",
      description: "Upload your resume and job description to identify skill gaps and get personalized learning resources.",
      icon: FileText,
      color: "bg-chart-5/10 text-chart-5",
    },
    {
      id: "chat",
      title: "AI Career Assistant",
      description: "Chat with our AI assistant for career advice, interview tips, and answers to your career questions.",
      icon: MessageCircle,
      color: "bg-chart-3/10 text-chart-3",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center max-w-4xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          AI-Powered Career Guidance
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
          Your Personalized Path to
          <span className="text-primary"> Tech Success</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
          Get AI-generated roadmaps, analyze your resume against job requirements, 
          and explore detailed career paths with curated resources and LeetCode recommendations.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" onClick={() => onNavigate("personalized")} className="gap-2">
            Get Your Roadmap
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button size="lg" variant="outline" onClick={() => onNavigate("explore")}>
            Explore Careers
          </Button>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <Card
              key={feature.id}
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              onClick={() => onNavigate(feature.id)}
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-2`}>
                  <Icon className="w-6 h-6" />
                </div>
                <CardTitle className="flex items-center justify-between">
                  {feature.title}
                  <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          )
        })}
      </section>

      <section className="mt-20 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-8">What You Get</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { label: "Detailed Timelines", value: "Phase-by-phase" },
            { label: "Learning Resources", value: "Curated links" },
            { label: "LeetCode Plans", value: "Role-specific" },
            { label: "Interview Prep", value: "Technical & behavioral" },
          ].map((stat) => (
            <div key={stat.label} className="p-6 rounded-xl bg-card border">
              <div className="text-lg font-semibold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
