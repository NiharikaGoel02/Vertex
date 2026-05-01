"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  Loader2,
  Send,
  Bot,
  User,
  Sparkles,
  RefreshCcw,
  BookOpen,
  Code,
  FileText,
  Lightbulb
} from "lucide-react"

const suggestedQuestions = [
  {
    category: "Career Advice",
    icon: Lightbulb,
    questions: [
      "What skills should I learn to become a software engineer?",
      "How do I transition from college to a tech job?",
      "What's the best way to prepare for FAANG interviews?",
    ],
  },
  {
    category: "Learning",
    icon: BookOpen,
    questions: [
      "What are the best resources to learn React?",
      "How many LeetCode problems should I solve?",
      "What projects should I build for my portfolio?",
    ],
  },
  {
    category: "Technical",
    icon: Code,
    questions: [
      "Explain system design interview basics",
      "What's the difference between SQL and NoSQL?",
      "How do I learn data structures and algorithms?",
    ],
  },
  {
    category: "Resume",
    icon: FileText,
    questions: [
      "How do I make my resume stand out?",
      "What should I include in my GitHub profile?",
      "How to write a compelling cover letter?",
    ],
  },
]

export default function ChatBot() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm your AI career assistant. I can help you with career advice, interview preparation, learning resources, resume tips, and more. What would you like to know?",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, loading])

  const sendMessage = async (messageText) => {
    const text = messageText || input.trim()
    if (!text) return

    const userMessage = { role: "user", content: text }
    
    // Build conversation history to allow for follow-up chat
    const conversationHistory = messages
      .filter(m => !m.error)
      .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
      .join('\n\n')
      
    const fullPrompt = `${conversationHistory}\n\nUser: ${text}\nAssistant:`

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: fullPrompt, 
          type: "chat" 
        }),
      })

      const data = await response.json()

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, I encountered an error. Please try again.",
            error: true,
          },
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.result },
        ])
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I couldn't connect to the server. Please check your connection and try again.",
          error: true,
        },
      ])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Chat cleared! How can I help you today?",
      },
    ])
  }

  const formatMessage = (content) => {
    // Simple formatting for code blocks and links
    return content
      .split("\n")
      .map((line, i) => {
        // Handle code blocks
        if (line.startsWith("```")) {
          return null
        }
        // Handle bullet points
        if (line.startsWith("- ") || line.startsWith("* ")) {
          return (
            <li key={i} className="ml-4">
              {line.substring(2)}
            </li>
          )
        }
        // Handle numbered lists
        if (/^\d+\.\s/.test(line)) {
          return (
            <li key={i} className="ml-4">
              {line}
            </li>
          )
        }
        // Handle headers
        if (line.startsWith("## ")) {
          return (
            <h3 key={i} className="font-bold text-lg mt-4 mb-2">
              {line.substring(3)}
            </h3>
          )
        }
        if (line.startsWith("# ")) {
          return (
            <h2 key={i} className="font-bold text-xl mt-4 mb-2">
              {line.substring(2)}
            </h2>
          )
        }
        // Handle bold text
        if (line.includes("**")) {
          const parts = line.split(/\*\*(.*?)\*\*/g)
          return (
            <p key={i} className="mb-1">
              {parts.map((part, j) =>
                j % 2 === 1 ? (
                  <strong key={j}>{part}</strong>
                ) : (
                  part
                )
              )}
            </p>
          )
        }
        // Regular paragraph
        return line ? (
          <p key={i} className="mb-1">
            {line}
          </p>
        ) : (
          <br key={i} />
        )
      })
      .filter(Boolean)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          AI Career Assistant
        </h1>
        <p className="text-muted-foreground">
          Ask me anything about your career, learning paths, or interview preparation
        </p>
      </div>

      <div className="grid lg:grid-cols-[300px,1fr] gap-6">
        {/* Suggested Questions Sidebar */}
        <div className="hidden lg:block space-y-4">
          <div className="sticky top-20">
            <h3 className="font-semibold mb-4 text-sm text-muted-foreground uppercase tracking-wide">
              Suggested Questions
            </h3>
            {suggestedQuestions.map((category) => {
              const Icon = category.icon
              return (
                <Card key={category.category} className="mb-4">
                  <CardHeader className="py-3 px-4">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Icon className="w-4 h-4 text-primary" />
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 px-4">
                    <div className="space-y-2">
                      {category.questions.map((question, i) => (
                        <button
                          key={i}
                          onClick={() => sendMessage(question)}
                          disabled={loading}
                          className="w-full text-left text-xs p-2 rounded-lg hover:bg-accent transition-colors disabled:opacity-50"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Chat Area */}
        <Card className="flex flex-col h-[calc(100vh-250px)] min-h-[500px]">
          <CardHeader className="border-b py-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                Career Assistant
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={clearChat} className="gap-2">
                <RefreshCcw className="w-4 h-4" />
                Clear
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 p-0 flex flex-col overflow-hidden min-h-0">
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${
                      message.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        message.role === "user"
                          ? "bg-secondary"
                          : "bg-primary"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User className="w-4 h-4 text-secondary-foreground" />
                      ) : (
                        <Bot className="w-4 h-4 text-primary-foreground" />
                      )}
                    </div>
                    <div
                      className={`flex-1 rounded-lg p-4 max-w-[85%] ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground ml-auto"
                          : message.error
                          ? "bg-destructive/10 text-destructive"
                          : "bg-muted"
                      }`}
                    >
                      {message.role === "user" ? (
                        <p>{message.content}</p>
                      ) : (
                        <div className="prose prose-sm max-w-none dark:prose-invert">
                          {formatMessage(message.content)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm text-muted-foreground">
                          Thinking...
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Questions (Mobile) */}
            <div className="lg:hidden border-t p-2">
              <ScrollArea className="w-full">
                <div className="flex gap-2 pb-2">
                  {suggestedQuestions
                    .flatMap((c) => c.questions)
                    .slice(0, 4)
                    .map((question, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="cursor-pointer hover:bg-accent whitespace-nowrap shrink-0"
                        onClick={() => sendMessage(question)}
                      >
                        {question.length > 30
                          ? question.substring(0, 30) + "..."
                          : question}
                      </Badge>
                    ))}
                </div>
              </ScrollArea>
            </div>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  placeholder="Ask me anything about your career..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                  className="flex-1"
                />
                <Button
                  onClick={() => sendMessage()}
                  disabled={loading || !input.trim()}
                  className="gap-2"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline">Send</span>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Powered by Gemini AI. Responses may not always be accurate.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
