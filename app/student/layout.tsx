"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Bell,
  MessageSquare,
  Users,
  User,
  QrCode,
  Trophy,
  Settings,
  LogOut,
  Search,
  Zap,
  Menu,
  X,
  Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/student" },
  { icon: Bell, label: "Updates", href: "/student/updates" },
  { icon: MessageSquare, label: "Queries / Feedback", href: "/student/queries" },
  { icon: Users, label: "Team Registration", href: "/student/team" },
  { icon: User, label: "Profile", href: "/student/profile" },
  { icon: QrCode, label: "QR Access", href: "/student/qr" },
  { icon: Trophy, label: "Leaderboard", href: "/student/leaderboard" },
]

const bottomItems = [
  { icon: Settings, label: "Settings", href: "/student/settings" },
]

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [currentRound, setCurrentRound] = useState(2)
  const [timeRemaining, setTimeRemaining] = useState({ hours: 4, minutes: 32, seconds: 15 })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      setTimeRemaining(prev => {
        let { hours, minutes, seconds } = prev
        seconds--
        if (seconds < 0) {
          seconds = 59
          minutes--
        }
        if (minutes < 0) {
          minutes = 59
          hours--
        }
        if (hours < 0) {
          hours = 0
          minutes = 0
          seconds = 0
        }
        return { hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-sidebar-border">
            <Link href="/student" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center glow-emerald">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-sidebar-foreground">HackHub</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 text-sidebar-foreground hover:bg-sidebar-accent rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground glow-emerald"
                      : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? "text-sidebar-primary-foreground" : ""}`} />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Bottom Items */}
          <div className="px-4 py-4 border-t border-sidebar-border space-y-1">
            {bottomItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground glow-emerald"
                      : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              )
            })}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="h-16 bg-card/50 backdrop-blur-xl border-b border-border sticky top-0 z-30">
          <div className="flex items-center justify-between h-full px-4 lg:px-6">
            {/* Left Side */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-foreground hover:bg-secondary rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search..."
                  className="w-64 pl-10 h-10 bg-secondary/50 border-border/50 rounded-xl"
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* Live Clock */}
              <div className="hidden md:flex items-center gap-6 px-4 py-2 bg-secondary/50 rounded-xl border border-border/50">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    {currentTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
                <div className="h-4 w-px bg-border" />
                <div className="text-sm">
                  <span className="text-muted-foreground">Round </span>
                  <span className="font-semibold text-primary">{currentRound}</span>
                </div>
                <div className="h-4 w-px bg-border" />
                <div className="text-sm">
                  <span className="text-muted-foreground">Countdown: </span>
                  <span className="font-semibold text-foreground">
                    {String(timeRemaining.hours).padStart(2, "0")}:
                    {String(timeRemaining.minutes).padStart(2, "0")}:
                    {String(timeRemaining.seconds).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
              </Button>

              {/* Profile */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">JD</span>
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-medium text-foreground">John Doe</p>
                  <p className="text-xs text-muted-foreground">Team Code Wizards</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
