"use client"

import { useState } from "react"
import { Users, Plus, Mail, Phone, Github, Linkedin, Trophy, Code, Crown, UserPlus, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const teamData = {
  name: "Code Wizards",
  projectName: "SmartAssist - AI-Powered Assistant",
  category: "AI/ML",
  rank: 1,
  score: 950,
  members: [
    {
      id: 1,
      name: "John Doe",
      role: "Team Lead",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      github: "johndoe",
      linkedin: "johndoe",
      isLeader: true,
      isYou: true
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "Backend Developer",
      email: "sarah.chen@email.com",
      phone: "+1 (555) 234-5678",
      github: "sarahchen",
      linkedin: "sarahchen",
      isLeader: false,
      isYou: false
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "Frontend Developer",
      email: "mike.j@email.com",
      phone: "+1 (555) 345-6789",
      github: "mikej",
      linkedin: "mikejohnson",
      isLeader: false,
      isYou: false
    },
    {
      id: 4,
      name: "Emily Davis",
      role: "ML Engineer",
      email: "emily.d@email.com",
      phone: "+1 (555) 456-7890",
      github: "emilyd",
      linkedin: "emilydavis",
      isLeader: false,
      isYou: false
    }
  ]
}

const pendingRequests = [
  { id: 1, name: "Alex Kim", email: "alex.k@email.com", message: "Would love to join your team! I have experience in React and Node.js." },
  { id: 2, name: "Lisa Wong", email: "lisa.w@email.com", message: "Interested in contributing to the AI/ML aspects of your project." }
]

export default function TeamPage() {
  const [showInviteForm, setShowInviteForm] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Team Registration</h1>
        <p className="text-muted-foreground mt-1">Manage your team and project details</p>
      </div>

      {/* Team Overview */}
      <Card className="glass-card border-primary/30 glow-border">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                <Code className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{teamData.name}</h2>
                <p className="text-muted-foreground">{teamData.projectName}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-lg">{teamData.category}</span>
                  <span className="text-xs bg-secondary/50 text-muted-foreground px-2 py-1 rounded-lg">
                    {teamData.members.length} members
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-chart-3" />
                  <span className="text-3xl font-bold text-chart-3">#{teamData.rank}</span>
                </div>
                <p className="text-xs text-muted-foreground">Current Rank</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <span className="text-3xl font-bold text-primary">{teamData.score}</span>
                <p className="text-xs text-muted-foreground">Points</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Members */}
      <Card className="glass-card border-border/50">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="w-8 h-8 rounded-lg bg-chart-2/10 flex items-center justify-center">
                <Users className="w-4 h-4 text-chart-2" />
              </div>
              Team Members
            </CardTitle>
            <Button 
              onClick={() => setShowInviteForm(!showInviteForm)}
              variant="outline" 
              size="sm"
              className="border-primary/30 text-primary hover:bg-primary/10"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Invite Member
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showInviteForm && (
            <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
              <p className="text-sm font-medium text-foreground mb-3">Invite a new team member</p>
              <div className="flex gap-3">
                <Input
                  placeholder="Enter email address..."
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="flex-1 bg-secondary/50 border-border/50 rounded-xl"
                />
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Send Invite
                </Button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teamData.members.map((member) => (
              <div
                key={member.id}
                className={`p-4 rounded-xl transition-all duration-300 ${
                  member.isYou 
                    ? "bg-primary/10 border border-primary/30" 
                    : "bg-secondary/30 hover:bg-secondary/50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0 relative">
                    <span className="text-lg font-bold text-primary">
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </span>
                    {member.isLeader && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-chart-3 flex items-center justify-center">
                        <Crown className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{member.name}</h3>
                      {member.isYou && (
                        <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-lg">You</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{member.role}</p>
                    <div className="flex items-center gap-3">
                      <a href={`mailto:${member.email}`} className="text-muted-foreground hover:text-foreground transition-colors">
                        <Mail className="w-4 h-4" />
                      </a>
                      <a href={`tel:${member.phone}`} className="text-muted-foreground hover:text-foreground transition-colors">
                        <Phone className="w-4 h-4" />
                      </a>
                      <a href={`https://github.com/${member.github}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Github className="w-4 h-4" />
                      </a>
                      <a href={`https://linkedin.com/in/${member.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pending Join Requests */}
      {pendingRequests.length > 0 && (
        <Card className="glass-card border-border/50">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="w-8 h-8 rounded-lg bg-chart-3/10 flex items-center justify-center">
                <UserPlus className="w-4 h-4 text-chart-3" />
              </div>
              Join Requests
              <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-lg ml-2">
                {pendingRequests.length}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingRequests.map((request) => (
                <div key={request.id} className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all duration-300">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-chart-3/20 flex items-center justify-center shrink-0">
                        <span className="text-sm font-bold text-chart-3">
                          {request.name.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{request.name}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{request.email}</p>
                        <p className="text-sm text-muted-foreground">{request.message}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button size="sm" variant="outline" className="border-destructive/30 text-destructive hover:bg-destructive/10">
                        Decline
                      </Button>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Accept
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
