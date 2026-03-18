'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2, X, TrendingUp, Zap } from 'lucide-react'

export default function ResumeMatch() {
  const containerRef = useRef(null)
  const jobsRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    gsap.from(containerRef.current.querySelector('h1'), {
      duration: 0.6,
      y: -20,
      opacity: 0,
      ease: 'back.out(1.5)'
    })

    gsap.from(jobsRef.current?.querySelectorAll('[data-job-card]'), {
      duration: 0.6,
      scale: 0.95,
      opacity: 0,
      stagger: 0.12,
      ease: 'back.out(1.2)'
    })
  }, [])

  const jobs = [
    {
      title: 'Senior Product Manager',
      company: 'Tech Company Inc',
      match: 92,
      matchedSkills: ['Product Management', 'Leadership', 'Data Analysis'],
      missingSkills: ['Machine Learning'],
      location: 'San Francisco, CA'
    },
    {
      title: 'Product Manager',
      company: 'Digital Solutions',
      match: 78,
      matchedSkills: ['Project Management', 'Communication'],
      missingSkills: ['Technical Skills', 'Analytics'],
      location: 'New York, NY'
    },
    {
      title: 'Technical Program Manager',
      company: 'Innovation Labs',
      match: 85,
      matchedSkills: ['Strategic Planning', 'Team Management'],
      missingSkills: ['DevOps', 'Cloud Architecture'],
      location: 'Remote'
    }
  ]

  return (
    <div ref={containerRef} className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Resume Match</h1>
        <p className="text-muted-foreground">See how well your resume matches with job descriptions</p>
      </div>

      <div className="space-y-4" ref={jobsRef}>
        {jobs.map((job, index) => (
          <Card
            key={index}
            data-job-card
            className="p-6 border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {job.title}
                </h3>
                <p className="text-muted-foreground">{job.company} • {job.location}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">{job.match}%</div>
                <p className="text-xs text-muted-foreground">Match</p>
              </div>
            </div>

            <div className="w-full h-2 bg-border rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
                style={{ width: `${job.match}%` }}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-green-600 dark:text-green-400 mb-2 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Matched Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {job.matchedSkills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full bg-green-500/20 text-green-700 dark:text-green-300 text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center gap-1">
                  <X className="w-3 h-3" /> Missing Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {job.missingSkills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full bg-red-500/20 text-red-700 dark:text-red-300 text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Button size="sm" className="gap-1">
                <TrendingUp className="w-4 h-4" />
                View Details
              </Button>
              <Button size="sm" variant="outline">
                Save Job
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
