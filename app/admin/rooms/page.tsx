"use client"

import { useState } from "react"
import { DoorOpen, Users, Plus, Search, MapPin, Clock, Edit2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const roomsData = [
  { id: 1, name: "Hall A", capacity: 50, occupied: 45, type: "Main Hall", status: "active", team: "Code Wizards" },
  { id: 2, name: "Hall B", capacity: 50, occupied: 42, type: "Main Hall", status: "active", team: "Binary Beasts" },
  { id: 3, name: "Room 101", capacity: 10, occupied: 8, type: "Meeting Room", status: "active", team: "Pixel Pioneers" },
  { id: 4, name: "Room 102", capacity: 10, occupied: 10, type: "Meeting Room", status: "full", team: "Data Dragons" },
  { id: 5, name: "Room 103", capacity: 10, occupied: 0, type: "Meeting Room", status: "available", team: null },
  { id: 6, name: "Lab 1", capacity: 20, occupied: 18, type: "Computer Lab", status: "active", team: "API Avengers" },
  { id: 7, name: "Lab 2", capacity: 20, occupied: 15, type: "Computer Lab", status: "active", team: "Cloud Chasers" },
  { id: 8, name: "Server Room", capacity: 5, occupied: 3, type: "Technical", status: "restricted", team: null },
  { id: 9, name: "Cafeteria", capacity: 100, occupied: 25, type: "Common Area", status: "active", team: null },
  { id: 10, name: "Lounge", capacity: 30, occupied: 12, type: "Rest Area", status: "active", team: null },
  { id: 11, name: "Room 201", capacity: 8, occupied: 0, type: "Meeting Room", status: "available", team: null },
  { id: 12, name: "Room 202", capacity: 8, occupied: 6, type: "Meeting Room", status: "active", team: "Neural Ninjas" },
]

export default function RoomsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const filteredRooms = roomsData.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         room.type.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || room.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const totalRooms = roomsData.length
  const occupiedRooms = roomsData.filter(r => r.status === "active" || r.status === "full").length
  const availableRooms = roomsData.filter(r => r.status === "available").length
  const totalCapacity = roomsData.reduce((acc, r) => acc + r.capacity, 0)
  const totalOccupied = roomsData.reduce((acc, r) => acc + r.occupied, 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-primary/20 text-primary"
      case "full": return "bg-destructive/20 text-destructive"
      case "available": return "bg-chart-2/20 text-chart-2"
      case "restricted": return "bg-chart-3/20 text-chart-3"
      default: return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Room Management</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor all venue rooms</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground btn-glow">
          <Plus className="w-4 h-4 mr-2" />
          Add Room
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <DoorOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalRooms}</p>
                <p className="text-xs text-muted-foreground">Total Rooms</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-chart-2/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{occupiedRooms}</p>
                <p className="text-xs text-muted-foreground">Occupied</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-chart-3/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{availableRooms}</p>
                <p className="text-xs text-muted-foreground">Available</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-chart-4/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-chart-4" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalOccupied}/{totalCapacity}</p>
                <p className="text-xs text-muted-foreground">Capacity</p>
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
            placeholder="Search rooms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary/50 border-border/50 rounded-xl"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["all", "active", "available", "full", "restricted"].map((status) => (
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

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredRooms.map((room) => (
          <Card key={room.id} className="glass-card border-border/50 hover:border-primary/30 transition-all duration-300">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{room.name}</h3>
                  <p className="text-sm text-muted-foreground">{room.type}</p>
                </div>
                <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getStatusColor(room.status)}`}>
                  {room.status}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Capacity</span>
                  <span className="text-foreground font-medium">{room.occupied}/{room.capacity}</span>
                </div>
                
                {/* Progress bar */}
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${
                      room.occupied / room.capacity > 0.9 ? "bg-destructive" :
                      room.occupied / room.capacity > 0.7 ? "bg-chart-3" : "bg-primary"
                    }`}
                    style={{ width: `${(room.occupied / room.capacity) * 100}%` }}
                  />
                </div>

                {room.team && (
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{room.team}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
                <Button variant="ghost" size="sm" className="flex-1 text-muted-foreground hover:text-foreground">
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="ghost" size="sm" className="flex-1 text-destructive hover:text-destructive hover:bg-destructive/10">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
