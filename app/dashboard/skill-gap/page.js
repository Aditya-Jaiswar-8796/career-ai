'use client'

import { useState } from 'react'
import { AlertCircle, CheckCircle2, Download, Lightbulb, TrendingUp, BookOpen, Award, Upload, FileText } from 'lucide-react'

export default function SkillGap() {
  const [resumeFile, setResumeFile] = useState(null)
  const [jobDescription, setJobDescription] = useState('')
  const [result, setResult] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [error, setError] = useState('')
  const [showTooltip, setShowTooltip] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleAnalyze = async () => {
    if (!resumeFile || !jobDescription.trim()) {
      setError('Please upload a resume and enter a job description.')
      return
    }

    setError('')
    setAnalyzing(true)

    try {
      const formData = new FormData()
      formData.append('file', resumeFile)

      const resumeResponse = await fetch('/python/upload-resume', {
        method: 'POST',
        body: formData
      })

      if (!resumeResponse.ok) {
        const message = await resumeResponse.text()
        throw new Error(message || 'Unable to parse resume')
      }

      const resumeData = await resumeResponse.json()

      const response = await fetch('/python/skill-gap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ resume: resumeData.resume_json, job_description: jobDescription })
      })

      if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Unable to analyze skill gap')
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      console.error(err)
      setError(err?.message || 'Something went wrong while analyzing your skill gap.')
      setResult(null)
    } finally {
      setAnalyzing(false)
    }
  }

  const parseList = (value) => {
    if (!value) return []
    if (Array.isArray(value)) return value
    if (typeof value === 'string') {
      return value
        .split(/\n|,|;/)
        .map((item) => item.trim())
        .filter(Boolean)
    }
    return []
  }

  const matchScore = result?.match_score ?? 0
  const missingSkills = parseList(result?.missing_skills)
  const strengths = parseList(result?.strengths)
  const learningPlan = Array.isArray(result?.learning_plan)
    ? result.learning_plan
    : typeof result?.learning_plan === 'string'
      ? result.learning_plan.split(/\n{1,}/).map((item) => item.trim()).filter(Boolean)
      : []

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-red-500/20 text-red-700 dark:text-red-300',
      medium: 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300',
      low: 'bg-blue-500/20 text-blue-700 dark:text-blue-300'
    }
    return colors[priority] || 'bg-blue-500/20 text-blue-700 dark:text-blue-300'
  }

  const matchMessage = result
    ? matchScore >= 85
      ? 'Excellent alignment. Your resume matches the job closely.'
      : matchScore >= 65
        ? 'Good progress, but some skill gaps remain.'
        : 'Significant skill gaps were identified. Focus on the recommended learning plan.'
    : 'Analyze your resume and job description to surface gaps and recommendations.'

  const recommendedSkills = {
    Frontend: ['React', 'Vue.js', 'Next.js', 'Tailwind CSS'],
    Backend: ['Node.js', 'Express', 'Python', 'Django'],
    Tools: ['Docker', 'Git', 'AWS', 'GitHub Actions'],
    'Soft Skills': ['Communication', 'Leadership', 'Problem Solving']
  }

  const skillGapData = [
    { category: 'Frontend Skills', required: 90, current: 45 },
    { category: 'Backend Skills', required: 85, current: 55 },
    { category: 'DevOps Tools', required: 75, current: 30 },
    { category: 'Soft Skills', required: 80, current: 70 }
  ]

  const improvementTips = [
    'Build real-world projects showcasing learned skills',
    'Contribute to open-source to gain practical experience',
    'Take online courses with certificates (Coursera, Udemy)',
    'Join coding communities and participate in challenges',
    'Create a portfolio website demonstrating your projects'
  ]

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <div className="mb-8 flex flex-col gap-4 md:flex-row items-start justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Skill Gap Analysis</h1>
          <p className="text-muted-foreground">Paste your resume and the target job description to identify the most important gaps.</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="p-6 border border-border bg-card/50 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-foreground mb-4">Analyze your skill gap</h2>

          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">Upload Your Resume</label>
              <div
                onDragOver={(e) => {
                  e.preventDefault()
                  setIsDragging(true)
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault()
                  setIsDragging(false)
                  const file = e.dataTransfer.files?.[0]
                  if (file) setResumeFile(file)
                }}
                onClick={() => document.getElementById('resume-input')?.click()}
                className={`border-2 py-20 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${isDragging ? 'border-primary/70 bg-primary/5' : 'border-border bg-background'}`}
              >
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground text-sm mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">PDF, DOC, DOCX (Max 5MB)</p>
                <input
                  id="resume-input"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) setResumeFile(file)
                  }}
                  className="hidden"
                />
              </div>
              {resumeFile && (
                <div className="mt-3 flex items-center gap-2 rounded-lg border border-border bg-green-500/10 p-4 text-sm text-foreground">
                  <FileText className="w-4 h-4 text-green-600" />
                  <span>{resumeFile.name}</span>
                </div>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">Job Description</label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description you want to match..."
                className="w-full min-h-[220px] rounded-lg border border-border bg-background p-4 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={analyzing}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <TrendingUp className="w-4 h-4" />
            {analyzing ? 'Analyzing...' : 'Analyze Skill Gap'}
          </button>
        </div>

        <div className="p-8 border border-border bg-card/50 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground mb-2">Skill Gap Score</h2>
              <p className="text-muted-foreground mb-4">{matchMessage}</p>
              <div className="flex gap-3 flex-wrap">
                <button type="button" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90">
                  <TrendingUp className="w-4 h-4" />
                  Review Skills
                </button>
                <button type="button" className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition hover:bg-accent hover:text-accent-foreground">
                  <BookOpen className="w-4 h-4" />
                  View Roadmap
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full" viewBox="0 0 160 160">
                  <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="none" className="text-border" />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(matchScore / 100) * 440} 440`}
                    strokeLinecap="round"
                    className="text-yellow-600 dark:text-yellow-400 transition-all"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-yellow-600 dark:text-yellow-400">{matchScore}%</span>
                  <span className="text-xs text-muted-foreground">Skills Aligned</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.25fr_0.85fr]">
          <div className="space-y-6">
            <div className="p-6 border border-border bg-card/50 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                <h3 className="text-xl font-bold text-foreground">Missing Skills</h3>
              </div>
              {missingSkills.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {missingSkills.map((skill, idx) => (
                    <div key={idx} className="rounded-xl border border-border bg-background p-4">
                      <span className="text-sm font-medium text-foreground">{skill}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No missing skills found yet. Run the analysis to generate recommendations.</p>
              )}
            </div>

            <div className="p-6 border border-border bg-card/50 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                <h3 className="text-xl font-bold text-foreground">Strengths</h3>
              </div>
              {strengths.length > 0 ? (
                <ul className="space-y-2">
                  {strengths.map((item, idx) => (
                    <li key={idx} className="rounded-xl border border-border bg-background p-4 text-sm text-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">Strengths will appear here after analysis.</p>
              )}
            </div>

            <div className="p-6 border border-border bg-card/50 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                <h3 className="text-xl font-bold text-foreground">AI Insights</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Use the generated skill gap score and learning plan to focus your next projects and learning steps.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 border border-border bg-card/50 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold text-foreground">Learning Plan</h3>
              </div>
              {learningPlan.length > 0 ? (
                <ul className="space-y-3">
                  {learningPlan.map((item, idx) => (
                    <li key={idx} className="rounded-xl border border-border bg-background p-4 text-sm text-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">A tailored 4-week roadmap will appear here after analysis.</p>
              )}
            </div>

            <div className="p-6 border border-border bg-card/50 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xl font-bold text-foreground">Recommended Skills</h3>
              </div>
              <div className="grid gap-3">
                {Object.entries(recommendedSkills).map(([category, skills]) => (
                  <div key={category}>
                    <p className="text-sm font-semibold text-muted-foreground mb-2">{category}</p>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, idx) => (
                        <span key={idx} className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-700 dark:text-green-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border border-border bg-card/50 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-foreground mb-4">Development Tips</h3>
          <ul className="space-y-3">
            {improvementTips.map((tip, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-foreground">
                <span className="text-primary font-bold flex-shrink-0">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
