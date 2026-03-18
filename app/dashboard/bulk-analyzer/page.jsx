'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload, Download, Trash2, CheckCircle2 } from 'lucide-react'

export default function BulkAnalyzer() {
  const containerRef = useRef(null)
  const uploadRef = useRef(null)
  const [files, setFiles] = useState([])
  const [analyzing, setAnalyzing] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    gsap.from(containerRef.current.querySelector('h1'), {
      duration: 0.6,
      y: -20,
      opacity: 0,
      ease: 'back.out(1.5)'
    })

    gsap.from(uploadRef.current, {
      duration: 0.7,
      scale: 0.95,
      opacity: 0,
      ease: 'back.out(1.2)'
    })
  }, [])

  const handleAnalyze = () => {
    setAnalyzing(true)
    const progressEl = uploadRef.current?.querySelector('.progress-bar')
    
    gsap.to(progressEl, {
      duration: 3,
      width: '100%',
      ease: 'power2.out'
    })

    setTimeout(() => {
      setAnalyzing(false)
      gsap.from(containerRef.current?.querySelectorAll('[data-result-card]'), {
        duration: 0.6,
        y: 20,
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.out'
      })
    }, 3000)
  }

  const candidates = [
    { name: 'Sarah Johnson', role: 'Senior Developer', match: 92, status: 'excellent' },
    { name: 'Mike Chen', role: 'Frontend Engineer', match: 78, status: 'good' },
    { name: 'Emily Davis', role: 'Full Stack', match: 85, status: 'good' },
    { name: 'Alex Kumar', role: 'DevOps Engineer', match: 65, status: 'fair' }
  ]

  return (
    <div ref={containerRef} className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Bulk Resume Analyzer</h1>
        <p className="text-muted-foreground">Upload multiple resumes and analyze candidates at scale</p>
      </div>

      <div
        ref={uploadRef}
        className="border-2 border-dashed border-border rounded-xl p-12 text-center mb-8 hover:border-primary transition-colors"
      >
        <div className="mb-6 inline-block">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            <Upload className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Drop resumes here</h2>
        <p className="text-muted-foreground mb-6">Upload up to 100 resumes at once (ZIP or PDF)</p>
        
        <Button onClick={handleAnalyze} disabled={analyzing} size="lg">
          {analyzing ? 'Analyzing...' : 'Upload & Analyze'}
        </Button>

        {analyzing && (
          <div className="mt-6">
            <div className="w-full h-2 bg-border rounded-full overflow-hidden">
              <div className="progress-bar h-full bg-gradient-to-r from-primary to-accent rounded-full" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">Processing 4 resumes...</p>
          </div>
        )}
      </div>

      {!analyzing && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-foreground">Results</h3>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Candidate</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Position</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Match Score</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                  <th className="text-right py-3 px-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate, index) => (
                  <tr
                    key={index}
                    data-result-card
                    className="border-b border-border hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-4 px-4 text-foreground font-medium">{candidate.name}</td>
                    <td className="py-4 px-4 text-muted-foreground">{candidate.role}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-border rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-accent"
                            style={{ width: `${candidate.match}%` }}
                          />
                        </div>
                        <span className="font-semibold text-foreground">{candidate.match}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        candidate.status === 'excellent'
                          ? 'bg-green-500/20 text-green-700 dark:text-green-300'
                          : candidate.status === 'good'
                          ? 'bg-blue-500/20 text-blue-700 dark:text-blue-300'
                          : 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300'
                      }`}>
                        {candidate.status === 'excellent' && <CheckCircle2 className="w-3 h-3" />}
                        {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Button size="sm" variant="ghost" className="gap-1">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Card className="p-6 border border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10">
            <h3 className="text-lg font-bold text-foreground mb-2">Bulk Actions</h3>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline">Send Rejection Email</Button>
              <Button size="sm" variant="outline">Send Interview Invite</Button>
              <Button size="sm" variant="outline">Add to Pipeline</Button>
              <Button size="sm" variant="outline" className="text-destructive">
                Delete Selected
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
