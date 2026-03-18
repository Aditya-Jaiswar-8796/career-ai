'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { FileText, Target, TrendingUp, Brain, ArrowRight, BarChart3, Zap } from 'lucide-react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const containerRef = useRef(null)
  const statsRef = useRef(null)
  const cardsRef = useRef(null)
  const activityRef = useRef(null)

   const { data: session, status } = useSession()
    const router = useRouter()
    useEffect(() => {
      if (status === "loading") return
  
      if (!session) {
        router.push('/auth/login')
      }
    }, [session, status, router])


  const stats = [
    { label: 'Resume Score', value: '92%', icon: BarChart3 },
    { label: 'Jobs Matched', value: '24', icon: Target },
    { label: 'Applications', value: '8', icon: FileText },
    { label: 'Profile Views', value: '156', icon: TrendingUp }
  ]

  const actions = [
    {
      title: 'Analyze Resume',
      description: 'Get AI-powered feedback on your resume',
      icon: FileText,
      href: '/dashboard/resume-analyzer',
      color: 'from-blue-500/20 to-blue-600/20'
    },
    {
      title: 'Match Jobs',
      description: 'Find and match with relevant job postings',
      icon: Target,
      href: '/dashboard/resume-match',
      color: 'from-purple-500/20 to-purple-600/20'
    },
    {
      title: 'Skill Gap',
      description: 'Identify and bridge your skill gaps',
      icon: Zap,
      href: '/dashboard/skill-gap',
      color: 'from-yellow-500/20 to-yellow-600/20'
    },
    {
      title: 'Build Resume',
      description: 'Create a professional resume with AI help',
      icon: Brain,
      href: '/dashboard/resume-builder',
      color: 'from-green-500/20 to-green-600/20'
    }
  ]

  const activityFeed = [
    { action: 'Resume analyzed', detail: '92% score - Great job!', time: '2 hours ago' },
    { action: 'Job match found', detail: 'Senior Product Manager at Tech Co', time: '5 hours ago' },
    { action: 'Skills updated', detail: 'Added Python, Machine Learning', time: 'Yesterday' },
    { action: 'Profile viewed', detail: 'By Amazon Recruiter', time: '2 days ago' }
  ]

  return (
    <div ref={containerRef} className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Welcome back, {session?.user.name}! 👋
        </h1>
        <p className="text-muted-foreground">Here's your career progress overview</p>
      </div>

      {/* Stats Grid */}
      <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} data-stat-card className="p-6 shadow-sm rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:bg-card transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
          <div ref={cardsRef} className="grid  md:grid-cols-2 gap-4">
            {actions.map((action, index) => {
              const Icon = action.icon
              return (
                <Link key={index} href={action.href}>
                  <div
                    className={`p-6 h-full rounded-xl shadow-sm border border-border bg-linear-to-br ${action.color} hover:border-primary/50 hover:-translate-y-2     transition-all cursor-pointer group`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-background/50 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-foreground" />
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Activity Feed */}
        <div>
          <h2 className="text-xl  font-bold text-foreground mb-4">Recent Activity</h2>
          <div className="border border-border bg-card/50 py-4 rounded-xl backdrop-blur-sm">
            <div ref={activityRef} className="divide-y  divide-border">
              {activityFeed.map((item, index) => (
                <div key={index} data-activity-item className="p-4 hover:bg-muted/30 transition-colors">
                  <p className="font-medium text-foreground text-sm">{item.action}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.detail}</p>
                  <p className="text-xs text-muted-foreground/60 mt-2">{item.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-8 p-8 rounded-xl border border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">Ready to level up?</h3>
            <p className="text-muted-foreground">Upgrade to Premium for advanced analytics and unlimited analyses</p>
          </div>
          <button className="ml-4 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all shrink-0 outline-none bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-md px-6">Upgrade Now</button>
        </div>
      </div>
    </div>
  )
}
