'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Upload, Download, Trash2, FileText, CheckCircle2 } from 'lucide-react'

export default function BulkAnalyzer() {
  const containerRef = useRef(null)
  const uploadRef = useRef(null)
  const [files, setFiles] = useState([])
  const [analyzing, setAnalyzing] = useState(false)
  const [jobDescription, setJobDescription] = useState()
  const [candidates, setCandidates] = useState([])

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

  

  const handleAnalyze = async () => {
    if(!jobDescription) {
      return alert('Please paste the job description before analyzing resumes.')
    }
    setAnalyzing(true)
    const progressEl = uploadRef.current?.querySelector('.progress-bar')
    gsap.to(progressEl, {
      duration: 3,
      width: '100%',
      ease: 'power2.out'
    })

    let formData = new FormData()
    files.forEach((file) => {
      formData.append('files', file)
    })
    formData.append('job_description', jobDescription)
    let response = await fetch(`/api/bulk-analyze`, {
      method: 'POST',
      body: formData
    })
    let result = await response.json()
    console.log(result);
    

    setCandidates(result)
      setAnalyzing(true)
      gsap.from(containerRef.current?.querySelectorAll('[data-result-card]'), {
        duration: 0.6,
        y: 20,
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.out'
      })

  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }
  

  return (
    <div ref={containerRef} className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Bulk Resume Analyzer</h1>
        <p className="text-muted-foreground">Upload multiple resumes and analyze candidates at scale</p>
      </div>
      
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={(e) => {
          e.preventDefault()
          let file = e.dataTransfer.files
          if (file) {
            setFiles((prev) => [...prev, file])
          }
        }}
        onClick={() => document.getElementById('resume-input')?.click()}
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
        <input
                  id="resume-input"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  multiple
                  onChange={(e) => {
                    const files = e.target.files
                    if (files) {
                      Array.from(files).forEach((file) => {
                        setFiles((prev) => [...prev, file]);
                      });
                    }
                  }}
                  className="hidden"
                />
        { files?.map((resumeFile, index) => (
                        <div key={index} className="mt-3 flex relative items-center gap-2 p-3 bg-green-500/20 rounded-lg">
                          <FileText className="w-4 mx-2 h-4 text-green-600 dark:text-green-400" />
                          <span className="text-sm text-green-700 dark:text-green-300">{resumeFile.name}</span>
                          <Trash2
                            onClick={(e) => {
                              e.stopPropagation()
                              setFiles((prev) => prev.filter((_, i) => i !== index))
                            }}
                            className="w-4 h-4 absolute right-5 text-red-500 hover:text-red-700 cursor-pointer"
                          />
                        </div>
                      ))}
        {analyzing && (
          <div className="mt-6">
            <div className="w-full h-2 bg-border rounded-full overflow-hidden">
              <div className="progress-bar h-full bg-gradient-to-r from-primary to-accent rounded-full" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">Processing 4 resumes...</p>
          </div>
        )}
      </div>

      {analyzing ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-foreground">Results</h3>
            <button type="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Candidate</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Suitable Position</th>
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
                            className="h-full bg-linear-to-r from-primary to-accent"
                            style={{ width: `${candidate.match}%` }}
                          />
                        </div>
                        <span className="font-semibold text-foreground">{candidate.match}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${candidate.status === 'Strong Match'
                          ? 'bg-green-500/20 text-green-700 dark:text-green-300'
                          : candidate.status === 'Good  Match'
                            ? 'bg-blue-500/20 text-blue-700 dark:text-blue-300'
                            : 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300'
                        }`}>
                        {candidate.status === 'Strong Match' && <CheckCircle2 className="w-3 h-3" />}
                        {candidate.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button type="button" className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-3">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
             
          <div className="p-6 border border-primary/20 bg-linear-to-r from-primary/10 to-accent/10">
            <h3 className="text-lg font-bold text-foreground mb-2">Bulk Actions</h3>
            <div className="flex flex-wrap gap-2">
              <button type="button" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">Send Rejection Email</button>
              <button type="button" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">Send Interview Invite</button>
              <button type="button" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">Add to Pipeline</button>
              <button type="button" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 text-destructive hover:text-destructive">
                Delete Selected
              </button>
            </div>
          </div>
        </div>
      ): <div className="">
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
            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="w-full py-6 text-base btnDeep"
            >
              {analyzing ? 'Analyzing...' : 'Upload & Analyze'}
            </button>
            </div>}
    </div>
  )
}
