'use client'

import { BarChart3, FileText, Target, Zap, Building2, User, LogOut, Settings, Menu, Brain, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useSession, signOut } from "next-auth/react"



const menuItems = [
  { icon: BarChart3, label: 'Dashboard', href: '/dashboard' },
  { icon: FileText, label: 'Resume Analyzer', href: '/dashboard/resume-analyzer' },
  { icon: Target, label: 'Resume Match', href: '/dashboard/resume-match' },
  { icon: Zap, label: 'Skill Gap', href: '/dashboard/skill-gap' },
  { icon: Brain, label: 'Resume Builder', href: '/dashboard/resume-builder' },
  { icon: TrendingUp, label: 'Career Roadmap', href: '/dashboard/career-roadmap' },
  { icon: Settings, label: 'Resume Rewrite', href: '/dashboard/resume-rewrite' }
]

const hrMenuItems = [
  { icon: BarChart3, label: 'Dashboard', href: '/dashboard' },
  { icon: Building2, label: 'Bulk Analyzer', href: '/dashboard/bulk-analyzer' },
  { icon: Target, label: 'Candidate Ranking', href: '/dashboard/candidate-ranking' },
  { icon: Settings, label: 'Settings', href: '/dashboard/profile' }
]

export default function DashboardLayout({ children }) {

  const { data: session, status } = useSession()
  const [userType, setUserType] = useState(session?.user.role)
  const [userPanel, setUserPanel] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const headerRef = useRef(null)
  const sidebarRef = useRef(null)


  const items = userType === 'seeker' ? menuItems : hrMenuItems

  return (
    <div>
      <div onClick={() => { userPanel && setUserPanel(false) }} className="flex h-screen bg-background">
        {/* Sidebar */}
        <div className="border-r border-border">
          <div className="border-b border-border p-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-primary">
              <span className="text-xl">⚡</span>
              CareerAI
            </Link>
          </div>
          <div ref={sidebarRef} className="p-4">
            <div className="space-y-2">
              {items.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.href} data-menu-item>
                    <div className="group relative">
                      <Link href={item.href} className="flex items-center gap-3 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-300">
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header ref={headerRef} className="border-b border-border bg-background/50 backdrop-blur-sm sticky top-0 z-40">
            <div className="px-6 py-4 flex items-center mx-12  justify-between">
              <div className="flex items-center gap-4">
                <div className="md:hidden" />
                <h2 className="text-lg font-semibold text-foreground">Dashboard</h2>
              </div>

              <div className="flex items-center gap-4">
                <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
                </button>

                <div>
                  <div>
                    <button onClick={() => { setUserPanel(!userPanel) }} className="relative w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                      <User className="w-5 h-5" />
                    </button>
                  </div>
                  <div align="end" className={` ${userPanel ? "block": "hidden"} active:block w-56 border bg-white absolute right-18 top-16 border-border/80 rounded-lg`}>
                    <div className="px-4 py-3">
                      <div className="flex flex-col items-center gap-1">
                        <p className="font-semibold text-foreground">{session?.user.name}</p>
                        <p className="text-sm text-muted-foreground">{session?.user.email}</p>
                        <hr className='w-[70%] h-1 mt-1' />
                      </div>
                    </div>
                    <div>
                      <Link href="/dashboard/profile" className="flex items-center gap-2 cursor-pointer px-4 py-2">
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                    </div>
                    <div>
                      <Link href="#" className="flex items-center gap-2 cursor-pointer px-4 py-2">
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                    </div>
                    <div>
                      <button onClick={signOut} className="flex items-center gap-2 w-full cursor-pointer px-4 py-2 text-destructive">
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 mx-10 overflow-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

function Bell({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  )
}
