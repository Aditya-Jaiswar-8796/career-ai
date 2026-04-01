'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CheckCircle2, Circle, Lock, Target } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function CareerRoadmap() {
  const containerRef = useRef(null)
  const timelineRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    gsap.from(containerRef.current.querySelector('h1'), {
      duration: 0.6,
      y: -20,
      opacity: 0,
      ease: 'back.out(1.5)'
    })

    gsap.utils.toArray('[data-milestone]').forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 80%'
        },
        duration: 0.7,
        scale: 0.9,
        opacity: 0,
        ease: 'back.out(1.2)'
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const roadmap = [
    {
      phase: 'Phase 1',
      title: 'Foundation Building',
      duration: '3 months',
      status: 'completed',
      milestones: [
        'Learn core programming concepts',
        'Complete AWS certification',
        'Build 2 side projects'
      ]
    },
    {
      phase: 'Phase 2',
      title: 'Skill Enhancement',
      duration: '4 months',
      status: 'in-progress',
      milestones: [
        'Advanced system design',
        'Machine learning basics',
        'Contribute to open source'
      ]
    },
    {
      phase: 'Phase 3',
      title: 'Senior Developer',
      duration: '5 months',
      status: 'upcoming',
      milestones: [
        'Lead technical projects',
        'Mentor junior developers',
        'Architect scalable systems'
      ]
    },
    {
      phase: 'Phase 4',
      title: 'Engineering Manager',
      duration: '6 months',
      status: 'upcoming',
      milestones: [
        'Build leadership skills',
        'Manage team of 5+',
        'Drive product strategy'
      ]
    }
  ]

  return (
    <div ref={containerRef} className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Your Career Roadmap</h1>
        <p className="text-muted-foreground">A personalized path to your dream role</p>
      </div>

      <div ref={timelineRef} className="space-y-8">
        {roadmap.map((phase, index) => {
          const statusConfig = {
            completed: { icon: CheckCircle2, color: 'text-green-500', bgColor: 'bg-green-500/20' },
            'in-progress': { icon: Circle, color: 'text-primary', bgColor: 'bg-primary/20' },
            upcoming: { icon: Lock, color: 'text-muted-foreground', bgColor: 'bg-muted/20' }
          }

          const config = statusConfig[phase.status]
          const Icon = config.icon

          return (
            <div key={index} data-milestone className="relative">
              {/* Timeline connector */}
              {index < roadmap.length - 1 && (
                <div className="absolute left-6 top-24 w-1 h-16 bg-gradient-to-b from-primary/50 to-primary/10" />
              )}

              <div className={`p-6 border transition-all ${
                phase.status === 'completed' 
                  ? 'border-green-500/20 bg-green-500/5'
                  : phase.status === 'in-progress'
                  ? 'border-primary/20 bg-primary/5'
                  : 'border-border bg-card/50'
              }`}>
                <div className="flex gap-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${config.bgColor}`}>
                    <Icon className={`w-6 h-6 ${config.color}`} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground">{phase.phase}</p>
                        <h3 className="text-xl font-bold text-foreground">{phase.title}</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-muted-foreground">{phase.duration}</p>
                        <p className="text-xs text-muted-foreground capitalize mt-1">{phase.status}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-3 mt-4">
                      {phase.milestones.map((milestone, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-lg bg-background/50 border border-border hover:border-primary/50 transition-colors"
                        >
                          <div className="flex items-start gap-2">
                            <Target className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                              phase.status === 'completed' ? 'text-green-500' : 'text-primary'
                            }`} />
                            <p className="text-sm text-foreground">{milestone}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {phase.status === 'in-progress' && (
                      <div className="mt-4">
                        <p className="text-xs text-muted-foreground mb-2">Progress: 60%</p>
                        <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                          <div className="h-full w-3/5 bg-gradient-to-r from-primary to-accent rounded-full" />
                        </div>
                      </div>
                    )}

                    {phase.status !== 'upcoming' && (
                      <button type="button" className="mt-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
                        {phase.status === 'completed' ? 'Review' : 'Continue Learning'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-12 p-6 border border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10">
        <h3 className="text-lg font-bold text-foreground mb-3">Next Steps</h3>
        <ol className="space-y-2 text-muted-foreground">
          <li className="flex gap-2"><span className="font-bold text-primary">1.</span> Complete remaining tasks in Phase 2</li>
          <li className="flex gap-2"><span className="font-bold text-primary">2.</span> Network with engineers in your target role</li>
          <li className="flex gap-2"><span className="font-bold text-primary">3.</span> Apply for senior developer positions</li>
        </ol>
      </div>
    </div>
  )
}
