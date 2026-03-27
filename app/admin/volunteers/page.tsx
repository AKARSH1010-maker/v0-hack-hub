"use client"

import { useState } from "react"
import { Users, Search, MapPin, Clock, CheckCircle2, Coffee, AlertCircle, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const volunteersData = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Floor Manager",
    area: "Building A - Floor 1",
    status: "active",
    shift: "08:00 AM - 04:00 PM",
    tasksCompleted: 12,
    currentRound: 2,
    phone: "+1 (555) 123-4567",
    email: "sarah.c@hackhub.com"
  },
  {
    id: 2,
    name: "Mike Johnson",
    role: "Tech Support Lead",
    area: "Server Room & Labs",
    status: "active",
    shift: "10:00 AM - 06:00 PM",
    tasksCompleted: 18,
    currentRound: 2,
    phone: "+1 (555) 234-5678",
    email: "mike.j@hackhub.com"
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Food Coordinator",
    area: "Cafeteria & Hall B",
    status: "break",
    shift: "06:00 AM - 02:00 PM",
    tasksCompleted: 8,
    currentRound: 1,
    phone: "+1 (555) 345-6789",
    email: "emily.d@hackhub.com"
  },
  {
    id: 4,
    name: "Alex Kim",
    role: "Registration Lead",
    area: "Main Entrance",
    status: "active",
    shift: "07:00 AM - 03:00 PM",
    tasksCompleted: 45,
    currentRound: 2,
    phone: "+1 (555) 456-7890",
    email: "alex.k@hackhub.com"
  },
  {
    id: 5,
    name: "David Park",
    role: "Floor Manager",
    area: "Building A - Floor 2",
    status: "active",
    shift: "08:00 AM - 04:00 PM",
    tasksCompleted: 15,
    currentRound: 2,
    phone: "+1 (555) 567-8901",
    email: "david.p@hackhub.com"
  },
  {
    id: 6,
    name: "Lisa Wong",
    role: "Tech Support",
    area: "Main Hall A",
    status: "offline",
    shift: "02:00 PM - 10:00 PM",
    tasksCompleted: 0,
    currentRound: 0,
    phone: "+1 (555) 678-9012",
    email: "lisa.w@hackhub.com"
  },
  {
    id: 7,
    name: "James Miller",
    role: "Security",
    area: "Perimeter",
    status: "active",
    shift: "06:00 AM - 06:00 PM",
    tasksCompleted: 6,
    currentRound: 2,
    phone: "+1 (555) 789-0123",
    email: "james.m@hackhub.com"
  },
  {
    id: 8,
    name: "Anna Garcia",
    role: "Mentor Coordinator",
    area: "Meeting Rooms",
    status: "break",
    shift: "09:00 AM - 05:00 PM",
    tasksCompleted: 22,
    currentRound: 1,
    phone: "+1 (555) 890-1234",
    email: "anna.g@hackhub.com"
  }
]

export default function VolunteersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const filteredVolunteers = volunteersData.filter(volunteer => {
    const matchesSearch = volunteer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         volunteer.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         volunteer.area.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || volunteer.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const activeCount = volunteersData.filter(v => v.status === "active").length
  const onBreakCount = volunteersData.filter(v => v.status === "break").length
  const offlineCount = volunteersData.filter(v => v.status === "offline").length
  const totalTasks = volunteersData.reduce((acc, v) => acc + v.tasksCompleted, 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-primary/20 text-primary"
      case "break": return "bg-chart-3/20 text-chart-3"
      case "offline": return "bg-muted text-muted-foreground"
      default: return "bg-muted text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle2 className="w-4 h-4" />
      case "break": return <Coffee className="w-4 h-4" />
      case "offline": return <AlertCircle className="w-4 h-4" />
      default: return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Volunteer Management</h1>
        <p className="text-muted-foreground mt-1">Monitor volunteer status and assignments</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{activeCount}</p>
                <p className="text-xs text-muted-foreground">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-chart-3/10 flex items-center justify-center">
                <Coffee className="w-5 h-5 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{onBreakCount}</p>
                <p className="text-xs text-muted-foreground">On Break</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{offlineCount}</p>
                <p className="text-xs text-muted-foreground">Offline</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-chart-2/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalTasks}</p>
                <p className="text-xs text-muted-foreground">Tasks Done</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search volunteers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary/50 border-border/50 rounded-xl"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["all", "active", "break", "offline"].map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus(status)}
              className={filterStatus === status ? "bg-primary text-primary-foreground" : "border-border/50"}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Volunteers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredVolunteers.map((volunteer) => (
          <Card key={volunteer.id} className="glass-card border-border/50 hover:border-primary/30 transition-all duration-300">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                  <span className="text-lg font-bold text-primary">
                    {volunteer.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{volunteer.name}</h3>
                      <p className="text-sm text-muted-foreground">{volunteer.role}</p>
                    </div>
                    <span className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium ${getStatusColor(volunteer.status)}`}>
                      {getStatusIcon(volunteer.status)}
                      {volunteer.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {volunteer.area}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {volunteer.shift}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                    <div className="flex items-center gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Tasks: </span>
                        <span className="font-semibold text-foreground">{volunteer.tasksCompleted}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Round: </span>
                        <span className="font-semibold text-primary">{volunteer.currentRound}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <Mail className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
