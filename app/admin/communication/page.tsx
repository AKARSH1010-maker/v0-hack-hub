"use client"

import { useState } from "react"
import { MessageSquare, Send, Search, Users, Hash, Plus, Paperclip, Smile } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const channels = [
  { id: 1, name: "general", type: "channel", unread: 3, members: 486 },
  { id: 2, name: "announcements", type: "channel", unread: 0, members: 486 },
  { id: 3, name: "tech-support", type: "channel", unread: 5, members: 124 },
  { id: 4, name: "volunteers", type: "channel", unread: 2, members: 24 },
  { id: 5, name: "mentors", type: "channel", unread: 0, members: 15 },
  { id: 6, name: "organizers", type: "channel", unread: 1, members: 8 }
]

const directMessages = [
  { id: 1, name: "Sarah Chen", avatar: "SC", status: "online", unread: 2, lastMessage: "Got it, thanks!" },
  { id: 2, name: "Mike Johnson", avatar: "MJ", status: "online", unread: 0, lastMessage: "Issue resolved" },
  { id: 3, name: "Emily Davis", avatar: "ED", status: "away", unread: 0, lastMessage: "On my way" },
  { id: 4, name: "Alex Kim", avatar: "AK", status: "offline", unread: 0, lastMessage: "See you tomorrow" }
]

const messages = [
  { id: 1, sender: "Sarah Chen", avatar: "SC", message: "Hey team, the WiFi issue in Hall B has been resolved!", time: "10:32 AM", isOwn: false },
  { id: 2, sender: "You", avatar: "AD", message: "Great work! Can you update the issue tracker?", time: "10:33 AM", isOwn: true },
  { id: 3, sender: "Sarah Chen", avatar: "SC", message: "Already done! Also, we might need more power strips in Lab 1.", time: "10:34 AM", isOwn: false },
  { id: 4, sender: "Mike Johnson", avatar: "MJ", message: "I have some spare ones in the storage room. Will bring them over.", time: "10:35 AM", isOwn: false },
  { id: 5, sender: "You", avatar: "AD", message: "Perfect, thanks Mike! How are the mentor sessions going?", time: "10:36 AM", isOwn: true },
  { id: 6, sender: "Emily Davis", avatar: "ED", message: "All good here! We have 3 mentors currently with teams. Queue is moving smoothly.", time: "10:38 AM", isOwn: false },
  { id: 7, sender: "Alex Kim", avatar: "AK", message: "Registration desk is clear now. All teams are checked in!", time: "10:40 AM", isOwn: false },
  { id: 8, sender: "You", avatar: "AD", message: "Excellent progress everyone! Lunch service starts in 2 hours. Make sure to take breaks.", time: "10:42 AM", isOwn: true }
]

export default function CommunicationPage() {
  const [selectedChannel, setSelectedChannel] = useState(channels[0])
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage("")
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Communication Hub</h1>
        <p className="text-muted-foreground mt-1">Real-time messaging with teams and volunteers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-220px)] min-h-[600px]">
        {/* Sidebar */}
        <Card className="glass-card border-border/50 lg:col-span-1 overflow-hidden">
          <CardContent className="p-0 h-full flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-border/50">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary/50 border-border/50 rounded-xl"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {/* Channels */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Channels</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-1">
                  {channels.map((channel) => (
                    <button
                      key={channel.id}
                      onClick={() => setSelectedChannel(channel)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg transition-all duration-200 ${
                        selectedChannel.id === channel.id
                          ? "bg-primary/10 text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Hash className="w-4 h-4" />
                        <span className="text-sm">{channel.name}</span>
                      </div>
                      {channel.unread > 0 && (
                        <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                          {channel.unread}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Direct Messages */}
              <div className="p-4 border-t border-border/50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Direct Messages</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-1">
                  {directMessages.map((dm) => (
                    <button
                      key={dm.id}
                      className="w-full flex items-center gap-3 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-200"
                    >
                      <div className="relative">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-xs font-medium text-primary">{dm.avatar}</span>
                        </div>
                        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card ${
                          dm.status === "online" ? "bg-primary" :
                          dm.status === "away" ? "bg-chart-3" : "bg-muted-foreground"
                        }`} />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <p className="text-sm font-medium truncate">{dm.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{dm.lastMessage}</p>
                      </div>
                      {dm.unread > 0 && (
                        <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                          {dm.unread}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Chat Area */}
        <Card className="glass-card border-border/50 lg:col-span-3 overflow-hidden">
          <CardContent className="p-0 h-full flex flex-col">
            {/* Channel Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Hash className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{selectedChannel.name}</h3>
                  <p className="text-xs text-muted-foreground">{selectedChannel.members} members</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <Users className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.isOwn ? "flex-row-reverse" : ""}`}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <span className="text-sm font-medium text-primary">{message.avatar}</span>
                  </div>
                  <div className={`max-w-[70%] ${message.isOwn ? "text-right" : ""}`}>
                    <div className={`flex items-center gap-2 mb-1 ${message.isOwn ? "flex-row-reverse" : ""}`}>
                      <span className="text-sm font-medium text-foreground">{message.sender}</span>
                      <span className="text-xs text-muted-foreground">{message.time}</span>
                    </div>
                    <div className={`inline-block p-3 rounded-2xl ${
                      message.isOwn
                        ? "bg-primary text-primary-foreground rounded-tr-md"
                        : "bg-secondary/50 text-foreground rounded-tl-md"
                    }`}>
                      <p className="text-sm">{message.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border/50">
              <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                <Button variant="ghost" size="icon" type="button" className="text-muted-foreground hover:text-foreground shrink-0">
                  <Paperclip className="w-5 h-5" />
                </Button>
                <Input
                  placeholder={`Message #${selectedChannel.name}...`}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 bg-secondary/50 border-border/50 rounded-xl"
                />
                <Button variant="ghost" size="icon" type="button" className="text-muted-foreground hover:text-foreground shrink-0">
                  <Smile className="w-5 h-5" />
                </Button>
                <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0">
                  <Send className="w-5 h-5" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
