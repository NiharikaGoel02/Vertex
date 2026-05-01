"use client"

import { Button } from "@/components/ui/button"
import { Compass, Map, FileText, MessageCircle, Home } from "lucide-react"

export default function Header({ activeSection, onNavigate }) {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "personalized", label: "My Roadmap", icon: Map },
    { id: "explore", label: "Explore Careers", icon: Compass },
    { id: "resume", label: "Resume Analyzer", icon: FileText },
    { id: "chat", label: "AI Assistant", icon: MessageCircle },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 font-bold text-xl text-foreground hover:text-primary transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Compass className="w-5 h-5 text-primary-foreground" />
          </div>
          <span>OptiTrack AI</span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onNavigate(item.id)}
                className="gap-2"
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Button>
            )
          })}
        </nav>

        <nav className="flex md:hidden items-center gap-1">
          {navItems.slice(0, 4).map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                size="icon"
                onClick={() => onNavigate(item.id)}
              >
                <Icon className="w-4 h-4" />
              </Button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
