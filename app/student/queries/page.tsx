"use client"

import { useState } from "react"
import { MessageSquare, Plus, Send, Clock, CheckCircle2, AlertCircle, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const queriesData = [
  {
    id: 1,
    subject: "WiFi connectivity issue in Lab 2",
    message: "We're experiencing intermittent WiFi disconnections in Lab 2. This is affecting our development work.",
    category: "Technical",
    status: "resolved",
    response: "The issue has been identified and resolved. A network switch was malfunctioning and has been replaced.",
    createdAt: "2 hours ago",
    resolvedAt: "1 hour ago"
  },
  {
    id: 2,
    subject: "Request for additional monitors",
    message: "Our team would benefit from having 2 additional monitors for parallel development. Is this possible?",
    category: "Equipment",
    status: "in-progress",
    response: "We're checking equipment availability. Will update you shortly.",
    createdAt: "3 hours ago",
    resolvedAt: null
  },
  {
    id: 3,
    subject: "Question about API usage limits",
    message: "What are the rate limits for the sponsor APIs? We want to ensure we don't exceed them during testing.",
    category: "General",
    status: "open",
    response: null,
    createdAt: "4 hours ago",
    resolvedAt: null
  }
]

export default function QueriesPage() {
  const [showNewQuery, setShowNewQuery] = useState(false)
  const [newSubject, setNewSubject] = useState("")
  const [newMessage, setNewMessage] = useState("")
  const [newCategory, setNewCategory] = useState("General")

  const openCount = queriesData.filter(q => q.status === "open").length
  const inProgressCount = queriesData.filter(q => q.status === "in-progress").length
  const resolvedCount = queriesData.filter(q => q.status === "resolved").length

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open": return <HelpCircle className="w-4 h-4 text-chart-3" />
      case "in-progress": return <Clock className="w-4 h-4 text-primary animate-pulse" />
      case "resolved": return <CheckCircle2 className="w-4 h-4 text-chart-2" />
      default: return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-chart-3/20 text-chart-3"
      case "in-progress": return "bg-primary/20 text-primary"
      case "resolved": return "bg-chart-2/20 text-chart-2"
      default: return "bg-muted text-muted-foreground"
    }
  }

  const handleSubmitQuery = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle query submission
    setNewSubject("")
    setNewMessage("")
    setShowNewQuery(false)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Queries & Feedback</h1>
          <p className="text-muted-foreground mt-1">Submit questions and get support from organizers</p>
        </div>
        <Button 
          onClick={() => setShowNewQuery(!showNewQuery)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground btn-glow"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Query
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="glass-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-chart-3/10 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{openCount}</p>
                <p className="text-xs text-muted-foreground">Open</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{inProgressCount}</p>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-chart-2/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{resolvedCount}</p>
                <p className="text-xs text-muted-foreground">Resolved</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Query Form */}
      {showNewQuery && (
        <Card className="glass-card border-primary/30 glow-border">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Plus className="w-4 h-4 text-primary" />
              </div>
              Submit New Query
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitQuery} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Subject</label>
                <Input
                  placeholder="Brief description of your query..."
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="bg-secondary/50 border-border/50 rounded-xl"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
                <div className="flex gap-2 flex-wrap">
                  {["General", "Technical", "Equipment", "Food", "Other"].map((cat) => (
                    <Button
                      key={cat}
                      type="button"
                      variant={newCategory === cat ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNewCategory(cat)}
                      className={newCategory === cat ? "bg-primary text-primary-foreground" : "border-border/50"}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Message</label>
                <textarea
                  placeholder="Describe your query or feedback in detail..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-secondary/50 border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setShowNewQuery(false)} className="border-border/50">
                  Cancel
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground btn-glow">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Query
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Queries List */}
      <div className="space-y-4">
        {queriesData.map((query) => (
          <Card key={query.id} className="glass-card border-border/50 hover:border-primary/30 transition-all duration-300">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{query.subject}</h3>
                    <span className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-medium ${getStatusColor(query.status)}`}>
                      {getStatusIcon(query.status)}
                      {query.status}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded-lg">
                    {query.category}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{query.createdAt}</span>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-secondary/30">
                  <p className="text-sm text-foreground">{query.message}</p>
                </div>
                
                {query.response && (
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                    <p className="text-xs text-primary font-medium mb-1">Response from Organizers:</p>
                    <p className="text-sm text-foreground">{query.response}</p>
                    {query.resolvedAt && (
                      <p className="text-xs text-muted-foreground mt-2">Resolved {query.resolvedAt}</p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
