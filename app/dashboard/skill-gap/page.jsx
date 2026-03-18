'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Clock, BookOpen } from 'lucide-react'

export default function SkillGap() {
  const containerRef = useRef(null)
  const skillsRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    gsap.from(containerRef.current.querySelector('h1'), {
      duration: 0.6,
      y: -20,
      opacity: 0,
      ease: 'back.out(1.5)'
    })

    gsap.from(skillsRef.current?.querySelectorAll('[data-skill-item]'), {
      duration: 0.6,
      x: -20,
      opacity: 0,
      stagger: 0.1,
      ease: 'power2.out'
    })
  }, [])

  const skills = [
    {
      name: 'Machine Learning',
      current: 30,
      target: 80,
      resources: 3,
      estimatedHours: 120,
      priority: 'high'
    },
    {
      name: 'Cloud Architecture',
      current: 45,
      target: 85,
      resources: 5,
      estimatedHours: 80,
      priority: 'high'
    },
    {
      name: 'System Design',
      current: 60,
      target: 90,
      resources: 4,
      estimatedHours: 60,
      priority: 'medium'
    },
    {
      name: 'Advanced SQL',
      current: 70,
      target: 95,
      resources: 2,
      estimatedHours: 40,
      priority: 'medium'
    }
  ]

  return (
    <div ref={containerRef} className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Skill Gap Analysis</h1>
        <p className="text-muted-foreground">Identify and close the gaps in your skill set</p>
      </div>

      <div ref={skillsRef} className="space-y-4">
        {skills.map((skill, index) => {
          const gap = skill.target - skill.current
          const progress = ((skill.current - 0) / (skill.target - 0)) * 100

          return (
            <Card
              key={index}
              data-skill-item
              className="p-6 border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground">{skill.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Current Level: {skill.current}% → Target: {skill.target}%
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  skill.priority === 'high'
                    ? 'bg-red-500/20 text-red-700 dark:text-red-300'
                    : 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300'
                }`}>
                  {skill.priority.charAt(0).toUpperCase() + skill.priority.slice(1)} Priority
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Your Progress</p>
                  <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Est. Hours</p>
                    <p className="font-semibold text-foreground flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {skill.estimatedHours}h
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Resources</p>
                    <p className="font-semibold text-foreground flex items-center gap-1">
                      <BookOpen className="w-4 h-4" /> {skill.resources}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  View Resources
                </Button>
                <Button size="sm" variant="outline">
                  Track Progress
                </Button>
              </div>
            </Card>
          )
        })}
      </div>

      <Card className="mt-8 p-6 border border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10">
        <h3 className="text-lg font-bold text-foreground mb-2">Estimated Timeline</h3>
        <p className="text-muted-foreground mb-4">
          Based on your current pace, you can master all target skills in approximately 300 hours (about 6 months with 12 hours/week).
        </p>
        <Button>Create Learning Plan</Button>
      </Card>
    </div>
  )
}
