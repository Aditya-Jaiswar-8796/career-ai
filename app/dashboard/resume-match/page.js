'use client'

import { useEffect, useRef, useState, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { CheckCircle2, X, TrendingUp, Upload, FileText, ChevronDown } from 'lucide-react'
import { useGSAP } from '@gsap/react'

export default function ResumeMatch() {
  const [mounted, setMounted] = useState(false)
  const [resumeFile, setResumeFile] = useState(null)
  const [jobDescription, setJobDescription] = useState('')
  const [analyzed, setAnalyzed] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState({})

  const containerRef = useRef(null)
  const resultsRef = useRef(null)

  useLayoutEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !containerRef.current) return

    gsap.from(containerRef.current.querySelector('h1'), {
      duration: 0.6,
      y: -20,
      opacity: 0,
      ease: 'back.out(1.5)'
    })

    if (analyzed && resultsRef.current) {
      gsap.from(resultsRef.current.querySelectorAll('[data-result-item]'), {
        duration: 0.6,
        scale: 0.95,
        opacity: 0,
        stagger: 0.12,
        ease: 'back.out(1.2)'
      })
    }
  }, [mounted, analyzed])


  const handleAnalyze = async () => {
    if (!resumeFile || !jobDescription.trim()) {
      alert('Please upload a resume and enter a job description')
      return
    }
    setAnalyzing(true)
    const formData = new FormData();
    formData.append("file", resumeFile)
    const res = await fetch(`/python/upload-resume`, {
      method: "POST",
      body: formData
    })
    const datum = await res.json()

    const resp = await fetch(`/python/match-job`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "resume": datum.resume_json, "job_description": jobDescription })
    })
    const data = await resp.json()
    console.log(data)


    setResult(data)
    setAnalyzed(true)
    setAnalyzing(false)

  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }


  const matchResult = {
    title: result?.jobTitle,
    matchScore: result?.matchScore,
    matchedSkills: result?.matchSkills,
    missingSkills: result?.missingSkills,
    strengths: result?.strengths,
    improvements: result?.suggestions
  }

  return (
    <div ref={containerRef} className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Resume Match Analyzer</h1>
        <p className="text-muted-foreground">Upload your resume and paste a job description to see how well you match</p>
      </div>

      {!analyzed ? (
        <div className="p-8  border border-border bg-card/50 backdrop-blur-sm">
          <div className="space-y-6">
            {/* Resume Upload */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Upload Your Resume</label>
              <div onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => {
                  e.preventDefault()
                  let file = e.dataTransfer.files[0]
                  if (file) {
                    setResumeFile(file)
                  }
                }}
                className="border-2 py-20 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => document.getElementById('resume-input')?.click()}>
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground text-sm mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">PDF, DOC, DOCX (Max 5MB)</p>
                <input
                  id="resume-input"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      setResumeFile(file)
                    }
                  }}
                  className="hidden"
                />
              </div>
              {resumeFile && (
                <div className="mt-3 flex items-center gap-2 p-3 bg-green-500/20 rounded-lg">
                  <FileText className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm text-green-700 dark:text-green-300">{resumeFile.name}</span>
                </div>
              )}
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Paste Job Description</label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the full job description here..."
                className="w-full h-64 p-4 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <p className="text-xs text-muted-foreground mt-2">Include job title, requirements, and responsibilities for best results</p>
            </div>

            {/* Analyze button */}
            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="w-full py-6 text-base btnDeep"
            >
              {analyzing ? 'Analyzing...' : 'Analyze Match'}
            </button>
          </div>
        </div>
      ) : (<div className="">
        <div ref={resultsRef} className=" space-y-6">
          {/* Match Score */}
          <div
            data-result-item
            className="p-8 rounded-xl border border-border bg-card/50 backdrop-blur-sm "
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">{matchResult.title}</h2>
                <p className="text-muted-foreground">Based on your resume and job description</p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold text-primary">{matchResult.matchScore}%</div>
                <p className="text-sm text-muted-foreground mt-1">Overall Match</p>
              </div>
            </div>

            <div className="w-full h-3 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-primary to-accent rounded-full transition-all"
                style={{ width: `${matchResult.matchScore}%` }}
              />
            </div>
          </div>
          <div id='scoreBoard' className="w-full flex flex-col gap-4 mb-6">
            <div className="flex justify-center items-center gap-4">
              <div id="tleft" className="flex border border-border bg-card/50 rounded-lg backdrop-blur-sm p-5 w-1/2 items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">

                    <span className="font-semibold text-foreground">Education</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{result?.scoreBreakdown?.educationMatch}%</div>
                </div>
              </div>
              <div id="tright" className="flex border border-border bg-card/50 rounded-lg backdrop-blur-sm p-5 w-1/2 items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">

                    <span className="font-semibold text-foreground">Experience</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{result?.scoreBreakdown?.experienceMatch}%</div>
                </div>
              </div>
            </div>
            <div id="bleft" className="flex justify-center items-center gap-4">
              <div id="bright" className="flex border border-border bg-card/50 rounded-lg backdrop-blur-sm p-5 w-1/2 items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">

                    <span className="font-semibold text-foreground">Skills</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{result?.scoreBreakdown?.skillsMatch}%</div>
                </div>
              </div>
              <div className="flex border border-border bg-card/50 rounded-lg backdrop-blur-sm p-5 w-1/2  items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">

                    <span className="font-semibold text-foreground">Soft Skills</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{result?.scoreBreakdown?.softSkillsMatch}%</div>
                </div>
              </div>
            </div>
          </div>

        </div>
        {/* Skills Analysis */}
        <div
          data-result-item
          className="p-6 border border-border bg-card/50 rounded-xl backdrop-blur-sm"
        >
          <h3 className="text-xl font-bold text-foreground mb-4">Skills Analysis</h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-semibold text-green-600 dark:text-green-400 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Matched Skills ({matchResult.matchedSkills.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {matchResult.matchedSkills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-full bg-green-500/20 text-green-700 dark:text-green-300 text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-red-600 dark:text-red-400 mb-3 flex items-center gap-2">
                <X className="w-4 h-4" /> Missing Skills ({matchResult.missingSkills.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {matchResult.missingSkills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-full bg-red-500/20 text-red-700 dark:text-red-300 text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Strengths & Improvements */}
        <div className="grid md:grid-cols-2 gap-6 my-6 ">
          <div
            data-result-item
            className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm"
          >
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" /> Strengths
            </h3>
            <ul className="space-y-3">
              {matchResult.strengths.map((strength, idx) => (
                <li key={idx} className="text-sm text-foreground flex gap-3">
                  <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            data-result-item
            className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm"
          >
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" /> Improvements
            </h3>
            <ul className="space-y-3">
              {matchResult.improvements.map((improvement, idx) => (
                <li key={idx} className="text-sm text-foreground flex gap-3">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">→</span>
                  <span>{improvement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* New Analysis button */}
        <button
          onClick={() => {
            setAnalyzed(false)
            setResumeFile(null)
            setJobDescription('')
          }}
          
          className="btnLight py-5 text-xl font-bold w-full"
        >
          Analyze Another Job
        </button>
      </div>
      )}
    </div>
  )
}


