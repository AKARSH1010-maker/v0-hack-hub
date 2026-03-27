"use client"

import { useState } from "react"
import { Calendar, Plus, Clock, MapPin, Users, Edit2, Trash2, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const scheduleData = [
  {
    id: 1,
    title: "Opening Ceremony",
    time: "09:00 AM",
    endTime: "10:00 AM",
    location: "Main Hall A",
    description: "Welcome address and event kickoff",
    attendees: 486,
    status: "completed"
  },
  {
    id: 2,
    title: "Team Formation & Registration",
    time: "10:00 AM",
    endTime: "11:00 AM",
    location: "Registration Desk",
    description: "Teams finalize their registration and receive materials",
    attendees: 486,
    status: "completed"
  },
  {
    id: 3,
    title: "Hacking Begins",
    time: "11:00 AM",
    endTime: "12:00 PM",
    location: "All Venues",
    description: "Official start of the hackathon coding period",
    attendees: 486,
    status: "active"
  },
  {
    id: 4,
    title: "Lunch Break",
    time: "12:30 PM",
    endTime: "01:30 PM",
    location: "Cafeteria",
    description: "Lunch service for all participants",
    attendees: 500,
    status: "upcoming"
  },
  {
    id: 5,
    title: "Mentor Office Hours - Round 1",
    time: "02:00 PM",
    endTime: "04:00 PM",
    location: "Meeting Rooms",
    description: "First round of mentor consultations",
    attendees: 200,
    status: "upcoming"
  },
  {
    id: 6,
    title: "Workshop: API Integration",
    time: "03:00 PM",
    endTime: "04:00 PM",
    location: "Room 201",
    description: "Technical workshop on integrating sponsor APIs",
    attendees: 80,
    status: "upcoming"
  },
  {
    id: 7,
    title: "Progress Check-in",
    time: "05:00 PM",
    endTime: "06:00 PM",
    location: "All Teams",
    description: "Volunteers check team progress and offer support",
    attendees: 124,
    status: "upcoming"
  },
  {
    id: 8,
    title: "Dinner Service",
    time: "07:00 PM",
    endTime: "08:00 PM",
    location: "Hall B",
    description: "Dinner for all participants and staff",
    attendees: 520,
    status: "upcoming"
  },
  {
    id: 9,
    title: "Night Owl Coding Session",
    time: "10:00 PM",
    endTime: "02:00 AM",
    location: "Labs & Halls",
    description: "Extended coding hours with snack service",
    attendees: 300,
    status: "upcoming"
  }
]

export default function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState("Day 1")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "border-l-chart-2"
      case "active": return "border-l-primary"
      case "upcoming": return "border-l-muted-foreground"
      default: return "border-l-border"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="w-5 h-5 text-chart-2" />
      case "active": return <Clock className="w-5 h-5 text-primary animate-pulse" />
      case "upcoming": return <AlertCircle className="w-5 h-5 text-muted-foreground" />
      default: return null
    }
  }

  const completedCount = scheduleData.filter(e => e.status === "completed").length
  const activeCount = scheduleData.filter(e => e.status === "active").length
  const upcomingCount = scheduleData.filter(e => e.status === "upcoming").length

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Event Schedule</h1>
          <p className="text-muted-foreground mt-1">Manage and track event timeline</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground btn-glow">
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="glass-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-chart-2/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{completedCount}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
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
                <p className="text-2xl font-bold text-foreground">{activeCount}</p>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{upcomingCount}</p>
                <p className="text-xs text-muted-foreground">Upcoming</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Day Selector */}
      <div className="flex gap-2">
        {["Day 1", "Day 2", "Day 3"].map((day) => (
          <Button
            key={day}
            variant={selectedDay === day ? "default" : "outline"}
            onClick={() => setSelectedDay(day)}
            className={selectedDay === day ? "bg-primary text-primary-foreground" : "border-border/50"}
          >
            {day}
          </Button>
        ))}
      </div>

      {/* Timeline */}
      <Card className="glass-card border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-primary" />
            </div>
            {selectedDay} Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scheduleData.map((event, index) => (
              <div
                key={event.id}
                className={`relative pl-6 border-l-4 ${getStatusColor(event.status)} rounded-r-xl bg-secondary/30 hover:bg-secondary/50 transition-all duration-200`}
              >
                <div className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(event.status)}
                        <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {event.time} - {event.endTime}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Users className="w-4 h-4" />
                          {event.attendees} expected
                        </div>
                      </div>
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
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
