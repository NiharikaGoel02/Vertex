"use client"

import { useState } from "react"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import PersonalizedRoadmap from "@/components/personalized-roadmap"
import JobProfileExplorer from "@/components/job-profile-explorer"
import ResumeAnalyzer from "@/components/resume-analyzer"
import ChatBot from "@/components/chat-bot"
import Footer from "@/components/footer"

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home")

  const renderSection = () => {
    switch (activeSection) {
      case "personalized":
        return <PersonalizedRoadmap />
      case "explore":
        return <JobProfileExplorer />
      case "resume":
        return <ResumeAnalyzer />
      case "chat":
        return <ChatBot />
      default:
        return <HeroSection onNavigate={setActiveSection} />
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header activeSection={activeSection} onNavigate={setActiveSection} />
      <main className="flex-1">
        {renderSection()}
      </main>
      <Footer />
    </div>
  )
}
