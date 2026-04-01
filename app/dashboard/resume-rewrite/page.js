'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Copy, RefreshCw, Download, X } from 'lucide-react'

const INITIAL_IMPROVEMENTS = [
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

export default function ResumeRewrite() {
  const containerRef = useRef(null)
  const contentRef = useRef(null)
  const [selectedSuggestion, setSelectedSuggestion] = useState(null)
  const [improvements, setImprovements] = useState(INITIAL_IMPROVEMENTS)
  const [loadingIndex, setLoadingIndex] = useState(null)
  const [toast, setToast] = useState(null)
  const toastTimerRef = useRef(null)

  const showToast = (message) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    setToast(message)
    toastTimerRef.current = setTimeout(() => setToast(null), 6000)
  }

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

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    }
  }, [])

  const handleCopy = async (event, text) => {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      gsap.to(event.currentTarget, {
        duration: 0.3,
        scale: 0.95,
        yoyo: true,
        repeat: 1,
        ease: 'back.out'
      })
    } catch {
      // no-op
    }
  }

  const getImproved = async (index, section, original) => {
    const resumeText = improvements
      .map((item) => `${item.section}: ${item.original}`)
      .join('\n')

    try {
      setLoadingIndex(index)
      const response = await fetch('/api/resume-improve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section,
          original,
          resumeText
        })
      })

      if (!response.ok) {
        let message = 'Could not improve this section. Please try again.'
        try {
          const errBody = await response.json()
          message = errBody.error || errBody.details || message
        } catch {
          message = `Request failed (${response.status})`
        }
        showToast(message)
        return
      }

      const data = await response.json()
      const improvedText = data?.improvedText || original
      data?.error && console.log("Error: ", data.details)
      setImprovements((prev) =>
        prev.map((item, i) =>
          i === index ? { ...item, improved: improvedText } : item
        )
      )
    } catch {
      showToast('Network error. Check your connection and try again.')
    } finally {
      setLoadingIndex(null)
    }
  }

  return (
    <div ref={containerRef} className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Resume Rewriter</h1>
        <p className="text-muted-foreground">Get AI-powered suggestions to improve your resume impact</p>
      </div>

      <div ref={contentRef} className="space-y-6">
        {improvements.map((item, index) => (
          <div
            key={index}
            data-content-section
            className={`border transition-all ${selectedSuggestion === index
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
                  <input
                    className="p-4 w-full rounded-lg bg-background/50 border border-border text-foreground leading-relaxed"
                    placeholder="Enter original text"
                    value={item.original}
                    onChange={(e) =>
                      setImprovements((prev) =>
                        prev.map((current, i) =>
                          i === index ? { ...current, original: e.target.value } : current
                        )
                      )
                    }
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-primary mb-2">Improved</p>
                  <p className="p-4 rounded-lg bg-primary/10 border border-primary/30 text-foreground leading-relaxed">
                    {item.improved}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                  onClick={(event) => handleCopy(event, item.improved)}
                >
                  <Copy className="w-4 h-4" />
                  Copy Improved
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                  disabled={loadingIndex === index}
                  onClick={async () => {
                    setSelectedSuggestion(selectedSuggestion === index ? null : index);
                    await getImproved(index, item.section, item.original)
                  }}
                >
                  {loadingIndex === index ? 'Improving...' : `${selectedSuggestion === index ? 'Hide' : 'Show'} Analysis`}
                </button>
              </div>

              {selectedSuggestion === index && (
                <div className="mt-4 p-4 rounded-lg bg-muted/50 border border-border">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">Why this is better:</span> Uses specific metrics and quantifiable achievements instead of generic statements, making your accomplishments more credible and impressive to recruiters.
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button type="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
          <Download className="w-5 h-5" />
          Download Improved Resume
        </button>
        <button type="button" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8">
          Get More Suggestions
        </button>
      </div>

      <div className="mt-8 p-6 border border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10">
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
      </div>

      {toast && (
        <div
          role="alert"
          className="fixed bottom-6 right-6 z-50 max-w-md rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-foreground shadow-lg backdrop-blur-sm md:left-auto"
        >
          <div className="flex items-start gap-3">
            <p className="flex-1 pt-0.5 leading-snug">{toast}</p>
            <button
              type="button"
              onClick={() => {
                if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
                setToast(null)
              }}
              className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-background/80 hover:text-foreground"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
