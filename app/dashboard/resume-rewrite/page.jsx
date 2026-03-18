'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy, RefreshCw, Download } from 'lucide-react'

export default function ResumeRewrite() {
  const containerRef = useRef(null)
  const contentRef = useRef(null)
  const [selectedSuggestion, setSelectedSuggestion] = useState(null)

  useEffect(() => {
    if (!containerRef.current) return

    gsap.from(containerRef.current.querySelector('h1'), {
      duration: 0.6,
      y: -20,
      opacity: 0,
      ease: 'back.out(1.5)'
    })

    gsap.from(contentRef.current?.querySelectorAll('[data-content-section]'), {
      duration: 0.6,
      y: 20,
      opacity: 0,
      stagger: 0.12,
      ease: 'power2.out'
    })
  }, [])

  const handleCopy = () => {
    gsap.to(event.target, {
      duration: 0.3,
      scale: 0.95,
      ease: 'back.out'
    })
  }

  const improvements = [
    {
      section: 'Summary',
      original: 'Experienced project manager with 5 years in tech',
      improved: 'Strategic Project Manager with 5+ years driving high-impact initiatives at Fortune 500 tech companies, delivering 20% efficiency gains and leading cross-functional teams of 15+',
      impact: '+45% more impactful'
    },
    {
      section: 'Experience',
      original: 'Led projects and managed teams',
      improved: 'Led 8+ concurrent projects valued at $2M+, managing cross-functional teams of 15 engineers, designers, and analysts; achieved 20% efficiency improvement through process optimization',
      impact: '+60% stronger'
    },
    {
      section: 'Skills',
      original: 'Project Management, Leadership, Communication',
      improved: 'Strategic Project Management, Agile/Scrum Leadership, Stakeholder Management, P&L Management ($2M+), Cross-functional Team Leadership (15+ members)',
      impact: '+35% more relevant'
    }
  ]

  return (
    <div ref={containerRef} className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Resume Rewriter</h1>
        <p className="text-muted-foreground">Get AI-powered suggestions to improve your resume impact</p>
      </div>

      <div ref={contentRef} className="space-y-6">
        {improvements.map((item, index) => (
          <Card
            key={index}
            data-content-section
            className={`border transition-all ${
              selectedSuggestion === index
                ? 'border-primary bg-primary/5'
                : 'border-border bg-card/50'
            }`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">{item.section}</h3>
                  <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    <span className="text-green-600 dark:text-green-400 font-semibold">{item.impact}</span>
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">Original</p>
                  <p className="p-4 rounded-lg bg-background/50 border border-border text-foreground leading-relaxed">
                    {item.original}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-primary mb-2">Improved</p>
                  <p className="p-4 rounded-lg bg-primary/10 border border-primary/30 text-foreground leading-relaxed">
                    {item.improved}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1"
                  onClick={handleCopy}
                >
                  <Copy className="w-4 h-4" />
                  Copy Improved
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedSuggestion(selectedSuggestion === index ? null : index)}
                >
                  {selectedSuggestion === index ? 'Hide' : 'Show'} Analysis
                </Button>
              </div>

              {selectedSuggestion === index && (
                <div className="mt-4 p-4 rounded-lg bg-muted/50 border border-border">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">Why this is better:</span> Uses specific metrics and quantifiable achievements instead of generic statements, making your accomplishments more credible and impressive to recruiters.
                  </p>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Button size="lg" className="gap-2">
          <Download className="w-5 h-5" />
          Download Improved Resume
        </Button>
        <Button size="lg" variant="outline">
          Get More Suggestions
        </Button>
      </div>

      <Card className="mt-8 p-6 border border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10">
        <h3 className="text-lg font-bold text-foreground mb-2">Pro Tips</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-primary font-bold">→</span>
            Use action verbs like "Led", "Drove", "Increased" to start bullet points
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">→</span>
            Always include quantifiable metrics and results
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">→</span>
            Tailor your resume for each job application
          </li>
        </ul>
      </Card>
    </div>
  )
}
