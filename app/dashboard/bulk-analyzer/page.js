'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Upload, Download, Trash2, FileText, CheckCircle2 } from 'lucide-react'

const PAGE_SIZE = 10

export default function BulkAnalyzer() {
  const containerRef = useRef(null)
  const uploadRef = useRef(null)
  const [files, setFiles] = useState([])
  const [jobDescription, setJobDescription] = useState('')
  const [candidatesByPage, setCandidatesByPage] = useState({})
  const [activePage, setActivePage] = useState(1)
  const [pageLoading, setPageLoading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState('')

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

  const totalPages = files.length ? Math.ceil(files.length / PAGE_SIZE) : 1
  const currentPageResults = candidatesByPage[activePage] || []

  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList)
    setFiles((prev) => [...prev, ...newFiles])
  }

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== index))
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files?.length) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const fetchPage = async (page) => {
    if (!jobDescription.trim()) {
      setError('Please paste the job description before analyzing resumes.')
      return
    }

    setError('')

    if (candidatesByPage[page]) {
      setActivePage(page)
      return
    }

    const start = (page - 1) * PAGE_SIZE
    const chunk = files.slice(start, start + PAGE_SIZE)

    if (!chunk.length) return

    setPageLoading(true)

    const progressEl = uploadRef.current?.querySelector('.progress-bar')
    if (progressEl) {
      gsap.to(progressEl, {
        duration: 1.2,
        width: '100%',
        ease: 'power2.out'
      })
    }

    try {
      const formData = new FormData()
      chunk.forEach((file) => formData.append('files', file))
      formData.append('job_description', jobDescription)

      const response = await fetch('/python/bulk-analyze', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const text = await response.text()
        throw new Error(text || 'Failed to analyze resumes')
      }

      const result = await response.json()
      setCandidatesByPage((prev) => ({ ...prev, [page]: result }))
      setActivePage(page)
      gsap.from(containerRef.current?.querySelectorAll('[data-result-card]'), {
        duration: 0.6,
        y: 20,
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.out'
      })
    } catch (err) {
      console.error(err)
      setError(err?.message || 'Unable to fetch page results')
    } finally {
      setPageLoading(false)
    }
  }

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return
    fetchPage(page)
  }

  return (
    <div ref={containerRef} className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Bulk Resume Analyzer</h1>
        <p className="text-muted-foreground">Upload multiple resumes and analyze candidates page by page.</p>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => document.getElementById('resume-input')?.click()}
        ref={uploadRef}
        className={`border-2 border-dashed rounded-xl p-12 text-center mb-8 transition-colors ${isDragging ? 'border-primary bg-primary/5' : 'border-border bg-background'}`}
      >
        <div className="mb-6 inline-block">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            <Upload className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Drop resumes here</h2>
        <p className="text-muted-foreground mb-4">Upload multiple resumes at once and view results in page chunks of {PAGE_SIZE}.</p>
        <p className="text-sm text-muted-foreground mb-6">Supported formats: PDF, DOC, DOCX. Each page sends only {PAGE_SIZE} files to the backend.</p>
        <input
          id="resume-input"
          type="file"
          accept=".pdf,.doc,.docx"
          multiple
          onChange={(e) => {
            if (e.target.files?.length) {
              handleFiles(e.target.files)
            }
          }}
          className="hidden"
        />

        {files.length > 0 && (
          <div className="space-y-2 text-left">
            <div className="text-sm text-muted-foreground">{files.length} files selected — {totalPages} page{totalPages > 1 ? 's' : ''}</div>
            {files.slice(0, 3).map((file, index) => (
              <div key={index} className="text-sm text-foreground">{file.name}</div>
            ))}
            {files.length > 3 && <div className="text-sm text-muted-foreground">+{files.length - 3} more files</div>}
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] mb-8">
        <div className="p-6 border border-border bg-card/50 backdrop-blur-sm">
          <label className="block text-sm font-semibold text-foreground mb-3">Paste Job Description</label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full job description here..."
            className="w-full min-h-[220px] rounded-lg border border-border bg-background p-4 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
          <p className="text-xs text-muted-foreground mt-2">Include job title, requirements, and responsibilities for best results.</p>
        </div>

        <div className="p-6 border border-border bg-card/50 backdrop-blur-sm">
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-background p-4">
              <p className="text-sm text-muted-foreground">Current Page</p>
              <p className="text-3xl font-bold text-foreground">{activePage} / {totalPages}</p>
            </div>
            <div className="rounded-xl border border-border bg-background p-4">
              <p className="text-sm text-muted-foreground">Total Resumes</p>
              <p className="text-3xl font-bold text-foreground">{files.length}</p>
            </div>
            <button
              onClick={() => fetchPage(activePage)}
              disabled={pageLoading || !files.length}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {pageLoading ? 'Loading page...' : `Analyze page ${activePage}`}
            </button>
            {error && <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
          </div>
        </div>
      </div>

      {currentPageResults.length > 0 ? (
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-xl font-bold text-foreground">Analysis Results</h3>
              <p className="text-sm text-muted-foreground">Showing results for page {activePage}.</p>
            </div>
            <button type="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-input bg-background px-4 py-3 text-sm font-medium transition hover:bg-accent hover:text-accent-foreground">
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border bg-card/50">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-border bg-background">
                  <th className="py-3 px-4 text-left text-sm font-semibold text-foreground">Resume File</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-foreground">Candidate</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-foreground">Position</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-foreground">Match</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentPageResults.map((candidate, index) => (
                  <tr key={index} data-result-card className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-4 text-foreground">{candidate.file_name}</td>
                    <td className="py-4 px-4 text-foreground font-medium">{candidate.name}</td>
                    <td className="py-4 px-4 text-muted-foreground">{candidate.role}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-border">
                          <div className="h-full bg-linear-to-r from-primary to-accent" style={{ width: `${candidate.match}%` }} />
                        </div>
                        <span className="text-sm font-semibold text-foreground">{candidate.match}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${candidate.status === 'Strong Match' ? 'bg-green-500/20 text-green-700 dark:text-green-300' : candidate.status === 'Good Match' ? 'bg-blue-500/20 text-blue-700 dark:text-blue-300' : 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300'}`}>
                        {candidate.status === 'Strong Match' && <CheckCircle2 className="w-3 h-3" />}
                        {candidate.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-background p-4">
            <div className="text-sm text-muted-foreground">
              Showing page {activePage} of {totalPages}, {files.length} resumes uploaded.
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handlePageChange(activePage - 1)}
                disabled={activePage === 1 || pageLoading}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm font-medium transition hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePageChange(idx + 1)}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition ${activePage === idx + 1 ? 'bg-primary text-primary-foreground' : 'border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground'}`}
                  disabled={pageLoading}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(activePage + 1)}
                disabled={activePage === totalPages || pageLoading}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm font-medium transition hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card/50 p-6 text-sm text-muted-foreground">
          Upload resumes and click Analyze page {activePage} to fetch the first page of results.
        </div>
      )}
    </div>
  )
}
