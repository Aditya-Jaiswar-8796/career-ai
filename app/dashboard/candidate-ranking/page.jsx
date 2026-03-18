'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, Mail, Phone, FileText, TrendingUp } from 'lucide-react'

export default function CandidateRanking() {
  const containerRef = useRef(null)
  const candidatesRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    gsap.from(containerRef.current.querySelector('h1'), {
      duration: 0.6,
      y: -20,
      opacity: 0,
      ease: 'back.out(1.5)'
    })

    gsap.from(candidatesRef.current?.querySelectorAll('[data-candidate-card]'), {
      duration: 0.6,
      y: 30,
      opacity: 0,
      stagger: 0.1,
      ease: 'power2.out'
    })
  }, [])

  const candidates = [
    {
      rank: 1,
      name: 'Sarah Johnson',
      score: 95,
      skills: ['Python', 'System Design', 'Leadership'],
      experience: '8+ years',
      email: 'sarah@example.com',
      match: 'Excellent'
    },
    {
      rank: 2,
      name: 'Mike Chen',
      score: 88,
      skills: ['Java', 'Cloud', 'DevOps'],
      experience: '6+ years',
      email: 'mike@example.com',
      match: 'Very Good'
    },
    {
      rank: 3,
      name: 'Emily Davis',
      score: 82,
      skills: ['React', 'Node.js', 'SQL'],
      experience: '5+ years',
      email: 'emily@example.com',
      match: 'Good'
    },
    {
      rank: 4,
      name: 'Alex Kumar',
      score: 76,
      skills: ['Python', 'AWS', 'Analytics'],
      experience: '4+ years',
      email: 'alex@example.com',
      match: 'Good'
    }
  ]

  return (
    <div ref={containerRef} className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Candidate Ranking</h1>
        <p className="text-muted-foreground">Top candidates ranked by fit for Senior Software Engineer</p>
      </div>

      <div ref={candidatesRef} className="space-y-4">
        {candidates.map((candidate) => (
          <Card
            key={candidate.rank}
            data-candidate-card
            className="p-6 border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all"
          >
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">#{candidate.rank}</span>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{candidate.name}</h3>
                    <p className="text-sm text-muted-foreground">{candidate.experience} experience</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.round(candidate.score / 20)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-2xl font-bold text-primary">{candidate.score}%</span>
                  </div>
                </div>

                <p className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {candidate.match}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {candidate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="w-full h-2 bg-border rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
                    style={{ width: `${candidate.score}%` }}
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button size="sm" className="gap-2">
                    <Mail className="w-4 h-4" />
                    Send Offer
                  </Button>
                  <Button size="sm" variant="outline" className="gap-2">
                    <FileText className="w-4 h-4" />
                    View Resume
                  </Button>
                  <Button size="sm" variant="outline" className="gap-2">
                    <Phone className="w-4 h-4" />
                    Schedule Call
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-8 p-6 border border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10">
        <h3 className="text-lg font-bold text-foreground mb-3">Hiring Insights</h3>
        <ul className="space-y-2 text-muted-foreground text-sm">
          <li className="flex gap-2"><span className="text-primary">→</span> Top 3 candidates recommended for interview</li>
          <li className="flex gap-2"><span className="text-primary">→</span> Sarah Johnson is the best fit for this role</li>
          <li className="flex gap-2"><span className="text-primary">→</span> Consider Mike Chen as backup candidate</li>
        </ul>
      </Card>
    </div>
  )
}
