"use client"

import { useState } from "react"
import { Megaphone, Plus, Search, Send, AlertTriangle, Info, Bell, Clock, Edit2, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const announcementsData = [
  {
    id: 1,
    title: "WiFi Password Update",
    message: "The WiFi password has been changed to 'HackHub2024'. Please update your devices.",
    priority: "urgent",
    target: "all",
    createdAt: "5 minutes ago",
    views: 234
  },
  {
    id: 2,
    title: "Dinner Service at 7 PM",
    message: "Dinner will be served in Hall B starting at 7 PM. Vegetarian options available at Station 3.",
    priority: "info",
    target: "all",
    createdAt: "15 minutes ago",
    views: 189
  },
  {
    id: 3,
    title: "Project Submission Deadline",
    message: "Reminder: All project ideas must be submitted by 4 PM today through the HackHub portal.",
    priority: "urgent",
    target: "participants",
    createdAt: "30 minutes ago",
    views: 312
  },
  {
    id: 4,
    title: "Server Room 3 Available",
    message: "Server Room 3 is now open for teams requiring additional computing resources. Please register at the tech desk.",
    priority: "info",
    target: "teams",
    createdAt: "1 hour ago",
    views: 145
  },
  {
    id: 5,
    title: "Mentor Sessions Starting",
    message: "Mentor office hours begin at 3 PM. Check your assigned mentor and room on the dashboard.",
    priority: "info",
    target: "participants",
    createdAt: "2 hours ago",
    views: 278
  },
  {
    id: 6,
    title: "Emergency Exit Reminder",
    message: "Please familiarize yourself with the nearest emergency exits. Safety briefing at 2 PM in Hall A.",
    priority: "urgent",
    target: "all",
    createdAt: "3 hours ago",
    views: 402
  }
]

export default function AnnouncementsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterPriority, setFilterPriority] = useState<string>("all")
  const [newTitle, setNewTitle] = useState("")
  const [newMessage, setNewMessage] = useState("")
  const [newPriority, setNewPriority] = useState<"urgent" | "info">("info")

  const filteredAnnouncements = announcementsData.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.message.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterPriority === "all" || announcement.priority === filterPriority
    return matchesSearch && matchesFilter
  })

  const urgentCount = announcementsData.filter(a => a.priority === "urgent").length
  const infoCount = announcementsData.filter(a => a.priority === "info").length
  const totalViews = announcementsData.reduce((acc, a) => acc + a.views, 0)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Announcements</h1>
          <p className="text-muted-foreground mt-1">Broadcast important updates to participants</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Megaphone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{announcementsData.length}</p>
                <p className="text-xs text-muted-foreground">Total</p>
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
                <p className="text-2xl font-bold text-foreground">{urgentCount}</p>
                <p className="text-xs text-muted-foreground">Urgent</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-chart-2/10 flex items-center justify-center">
                <Info className="w-5 h-5 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{infoCount}</p>
                <p className="text-xs text-muted-foreground">Info</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-chart-3/10 flex items-center justify-center">
                <Eye className="w-5 h-5 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalViews}</p>
                <p className="text-xs text-muted-foreground">Total Views</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* New Announcement Form */}
        <Card className="glass-card border-border/50 lg:col-span-1">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Plus className="w-4 h-4 text-primary" />
              </div>
              New Announcement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Title</label>
              <Input
                placeholder="Announcement title..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="bg-secondary/50 border-border/50 rounded-xl"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Message</label>
              <textarea
                placeholder="Write your announcement..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-secondary/50 border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Priority</label>
              <div className="flex gap-2">
                <Button
                  variant={newPriority === "info" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setNewPriority("info")}
                  className={newPriority === "info" ? "bg-primary text-primary-foreground" : "border-border/50"}
                >
                  <Info className="w-4 h-4 mr-2" />
                  Info
                </Button>
                <Button
                  variant={newPriority === "urgent" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setNewPriority("urgent")}
                  className={newPriority === "urgent" ? "bg-destructive text-destructive-foreground" : "border-border/50"}
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Urgent
                </Button>
              </div>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground btn-glow">
              <Send className="w-4 h-4 mr-2" />
              Broadcast Announcement
            </Button>
          </CardContent>
        </Card>

        {/* Announcements List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search announcements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary/50 border-border/50 rounded-xl"
              />
            </div>
            <div className="flex gap-2">
              {["all", "urgent", "info"].map((priority) => (
                <Button
                  key={priority}
                  variant={filterPriority === priority ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterPriority(priority)}
                  className={filterPriority === priority ? "bg-primary text-primary-foreground" : "border-border/50"}
                >
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Announcements */}
          <div className="space-y-4">
            {filteredAnnouncements.map((announcement) => (
              <Card key={announcement.id} className="glass-card border-border/50 hover:border-primary/30 transition-all duration-300">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                        announcement.priority === "urgent" 
                          ? "bg-destructive/20 text-destructive" 
                          : "bg-primary/20 text-primary"
                      }`}>
                        {announcement.priority}
                      </span>
                      <span className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded-lg">
                        {announcement.target}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{announcement.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{announcement.message}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {announcement.createdAt}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {announcement.views} views
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
