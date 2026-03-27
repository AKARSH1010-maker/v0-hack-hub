"use client"

import { useState } from "react"
import { AlertCircle, Plus, Search, CheckCircle2, Clock, AlertTriangle, XCircle, MessageSquare, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const issuesData = [
  {
    id: 1,
    title: "Power outlet not working in Room 103",
    description: "Multiple participants reported that the power outlets near the window are not functioning.",
    reporter: "Sarah Chen",
    priority: "high",
    status: "open",
    category: "Infrastructure",
    createdAt: "10 minutes ago",
    assignee: "Tech Team"
  },
  {
    id: 2,
    title: "WiFi connectivity issues in Hall B",
    description: "Intermittent WiFi disconnections affecting teams in the back section of Hall B.",
    reporter: "Mike Johnson",
    priority: "critical",
    status: "in-progress",
    category: "Network",
    createdAt: "25 minutes ago",
    assignee: "Network Admin"
  },
  {
    id: 3,
    title: "Projector not displaying in Room 201",
    description: "The projector shows no signal when connecting laptops via HDMI.",
    reporter: "Emily Davis",
    priority: "medium",
    status: "open",
    category: "Equipment",
    createdAt: "45 minutes ago",
    assignee: "Unassigned"
  },
  {
    id: 4,
    title: "Air conditioning too cold in Lab 1",
    description: "Participants are complaining about the temperature being too low in Computer Lab 1.",
    reporter: "Alex Kim",
    priority: "low",
    status: "resolved",
    category: "Facilities",
    createdAt: "1 hour ago",
    assignee: "Facilities"
  },
  {
    id: 5,
    title: "Missing chairs in Room 102",
    description: "Team needs 3 additional chairs for their workspace.",
    reporter: "David Park",
    priority: "low",
    status: "resolved",
    category: "Furniture",
    createdAt: "2 hours ago",
    assignee: "Facilities"
  },
  {
    id: 6,
    title: "Printer jam in Resource Center",
    description: "The main printer is showing a paper jam error and needs maintenance.",
    reporter: "Lisa Wong",
    priority: "medium",
    status: "in-progress",
    category: "Equipment",
    createdAt: "2 hours ago",
    assignee: "Tech Team"
  }
]

export default function IssuesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterPriority, setFilterPriority] = useState<string>("all")

  const filteredIssues = issuesData.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || issue.status === filterStatus
    const matchesPriority = filterPriority === "all" || issue.priority === filterPriority
    return matchesSearch && matchesStatus && matchesPriority
  })

  const openCount = issuesData.filter(i => i.status === "open").length
  const inProgressCount = issuesData.filter(i => i.status === "in-progress").length
  const resolvedCount = issuesData.filter(i => i.status === "resolved").length
  const criticalCount = issuesData.filter(i => i.priority === "critical").length

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open": return <AlertCircle className="w-4 h-4 text-chart-3" />
      case "in-progress": return <Clock className="w-4 h-4 text-primary" />
      case "resolved": return <CheckCircle2 className="w-4 h-4 text-chart-2" />
      default: return <AlertCircle className="w-4 h-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-destructive/20 text-destructive"
      case "high": return "bg-chart-5/20 text-chart-5"
      case "medium": return "bg-chart-3/20 text-chart-3"
      case "low": return "bg-muted text-muted-foreground"
      default: return "bg-muted text-muted-foreground"
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Issue Tracker</h1>
          <p className="text-muted-foreground mt-1">Monitor and resolve reported issues</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground btn-glow">
          <Plus className="w-4 h-4 mr-2" />
          Report Issue
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-chart-3/10 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-chart-3" />
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
        <Card className="glass-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{criticalCount}</p>
                <p className="text-xs text-muted-foreground">Critical</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search issues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary/50 border-border/50 rounded-xl"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex gap-1">
            {["all", "open", "in-progress", "resolved"].map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus(status)}
                className={filterStatus === status ? "bg-primary text-primary-foreground" : "border-border/50"}
              >
                {status === "in-progress" ? "In Progress" : status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Issues List */}
      <div className="space-y-4">
        {filteredIssues.map((issue) => (
          <Card key={issue.id} className="glass-card border-border/50 hover:border-primary/30 transition-all duration-300">
            <CardContent className="p-5">
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getPriorityColor(issue.priority)}`}>
                      {issue.priority}
                    </span>
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getStatusColor(issue.status)}`}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(issue.status)}
                        {issue.status}
                      </span>
                    </span>
                    <span className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded-lg">
                      {issue.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{issue.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{issue.description}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {issue.reporter}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {issue.createdAt}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      Assigned: {issue.assignee}
                    </div>
                  </div>
                </div>
                <div className="flex lg:flex-col gap-2">
                  <Button variant="outline" size="sm" className="border-border/50 hover:border-primary/50">
                    View Details
                  </Button>
                  {issue.status !== "resolved" && (
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      {issue.status === "open" ? "Assign" : "Resolve"}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
