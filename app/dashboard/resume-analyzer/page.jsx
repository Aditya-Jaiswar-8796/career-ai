'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react'

export default function ResumeAnalyzer() {
  const containerRef = useRef(null)
  const uploadRef = useRef(null)
  const resultsRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analyzed, setAnalyzed] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    // Header animation
    gsap.from(containerRef.current.querySelector('h1'), {
      duration: 0.6,
      y: -20,
      opacity: 0,
      ease: 'back.out(1.5)'
    })

    // Upload area animation
    gsap.from(uploadRef.current, {
      duration: 0.7,
      scale: 0.95,
      opacity: 0,
      ease: 'back.out(1.2)'
    })

    return () => {
      gsap.killTweensOf(containerRef.current)
    }
  }, [])

  useEffect(() => {
    if (!analyzed || !resultsRef.current) return

    // Results animation
    gsap.from(resultsRef.current?.querySelectorAll('[data-result-item]'), {
      duration: 0.6,
      y: 20,
      opacity: 0,
      stagger: 0.1,
      ease: 'power2.out'
    })
  }, [analyzed])

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    
    // Simulate analysis with animation
    gsap.to(uploadRef.current, {
      duration: 0.5,
      scale: 0.95,
      opacity: 0.5,
      ease: 'power2.out'
    })

    // Animated progress
    const progressEl = uploadRef.current?.querySelector('.progress-bar')
    if (progressEl) {
      gsap.from(progressEl, {
        duration: 2,
        width: '0%',
        ease: 'power2.out'
      })
    }

    setTimeout(() => {
      setIsAnalyzing(false)
      setAnalyzed(true)
    }, 2000)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
    gsap.to(uploadRef.current, {
      duration: 0.2,
      backgroundColor: 'var(--primary)',
      opacity: 0.05
    })
  }

  const handleDragLeave = () => {
    setIsDragging(false)
    gsap.to(uploadRef.current, {
      duration: 0.2,
      backgroundColor: 'transparent',
      opacity: 1
    })
  }

  const feedbackItems = [
    {
      category: 'Structure',
      score: 85,
      feedback: 'Your resume structure is clear and well-organized',
      status: 'good'
    },
    {
      category: 'Keywords',
      score: 72,
      feedback: 'Consider adding more industry-specific keywords',
      status: 'warning'
    },
    {
      category: 'Experience',
      score: 88,
      feedback: 'Great descriptions of your achievements',
      status: 'good'
    },
    {
      category: 'Formatting',
      score: 79,
      feedback: 'Font consistency could be improved',
      status: 'warning'
    }
  ]

  return (
    <div ref={containerRef} className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Resume Analyzer</h1>
        <p className="text-muted-foreground">Upload your resume and get AI-powered feedback</p>
      </div>

      {!analyzed ? (
        <div
          ref={uploadRef}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${
            isDragging ? 'border-primary bg-primary/5' : 'border-border'
          }`}
        >
          <div className="mb-6 inline-block">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <Upload className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Drop your resume here</h2>
          <p className="text-muted-foreground mb-6">or click to browse (PDF, DOC, DOCX)</p>
          
          <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
          
          <Button onClick={handleAnalyze} disabled={isAnalyzing} size="lg">
            {isAnalyzing ? 'Analyzing...' : 'Upload & Analyze'}
          </Button>

          {isAnalyzing && (
            <div className="mt-6">
              <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                <div className="progress-bar h-full bg-gradient-to-r from-primary to-accent rounded-full" />
              </div>
              <p className="text-sm text-muted-foreground mt-2">Analyzing your resume...</p>
            </div>
          )}
        </div>
      ) : (
        <div ref={resultsRef} className="space-y-6">
          {/* Overall Score */}
          <Card data-result-item className="p-8 border border-border bg-card/50 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Overall Score</h2>
                <p className="text-muted-foreground mt-1">Your resume is in great shape!</p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold text-primary">81</div>
                <p className="text-muted-foreground text-sm">out of 100</p>
              </div>
            </div>
            <div className="w-full h-3 bg-border rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full" style={{ width: '81%' }} />
            </div>
          </Card>

          {/* Feedback Items */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">Detailed Feedback</h3>
            <div className="space-y-3">
              {feedbackItems.map((item, index) => (
                <Card key={index} data-result-item className="p-4 border border-border bg-card/50 backdrop-blur-sm hover:bg-card transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {item.status === 'good' ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-yellow-500" />
                        )}
                        <span className="font-semibold text-foreground">{item.category}</span>
                      </div>
                      <p className="text-muted-foreground text-sm">{item.feedback}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{item.score}%</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <Card data-result-item className="p-6 border border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Top Recommendations
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-2"><span className="text-primary">→</span> Add more quantifiable achievements</li>
              <li className="flex gap-2"><span className="text-primary">→</span> Include relevant keywords from job descriptions</li>
              <li className="flex gap-2"><span className="text-primary">→</span> Improve font consistency throughout</li>
            </ul>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button className="flex-1">Download Report</Button>
            <Button variant="outline" className="flex-1" onClick={() => setAnalyzed(false)}>
              Analyze Another Resume
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
