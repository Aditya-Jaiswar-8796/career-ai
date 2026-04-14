'use client'

import { useEffect, useState } from 'react'

export default function CoverLetterGenerator() {
  const [jobDescription, setJobDescription] = useState('')
  const [coverLetter, setCoverLetter] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch('/api/user/profile')
        const data = await res.json()
        if (data?.success && data?.user?.id) {
          setUserId(data.user.id)
        }
      } catch (err) {
        console.error('Failed to load user profile', err)
      }
    }

    loadUser()
  }, [])

  const generateCoverLetter = async () => {
    setError('')
    setCoverLetter('')

    if (!jobDescription.trim()) {
      setError('Please provide a job description.')
      return
    }

    if (!userId) {
      setError('Unable to determine user ID. Please sign in and try again.')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/python/generate-cover-letter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ job_description: jobDescription, user_id: userId }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.detail || data.message || 'Unable to generate cover letter')
      } else {
        setCoverLetter(data.cover_letter || '')
      }
    } catch (err) {
      console.error(err)
      setError('An error occurred while generating the cover letter.')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async () => {
    if (!coverLetter) return
    await navigator.clipboard.writeText(coverLetter)
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-border bg-card/70 p-8 shadow-sm backdrop-blur-xl">
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Cover Letter Generator</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Paste a job description and generate a tailored cover letter using your stored resume.
            </p>
          </div>

          <div>
            <label className="mb-3 block text-sm font-semibold text-foreground">Job Description</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description here..."
              className="min-h-[220px] w-full rounded-3xl border border-border bg-background px-5 py-4 text-sm text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {error && <div className="rounded-2xl border border-red-300 bg-red-500/10 p-4 text-sm text-red-700">{error}</div>}

          <button
            onClick={generateCoverLetter}
            disabled={loading}
            className="inline-flex h-14 items-center justify-center rounded-3xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>
      </div>

      {coverLetter ? (
        <div className="rounded-3xl border border-border bg-card/70 p-8 shadow-sm backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Generated Cover Letter</h2>
              <p className="text-sm text-muted-foreground">Copy the letter into your application or cover letter template.</p>
            </div>
            <button
              onClick={copyToClipboard}
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-background px-5 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
            >
              Copy to Clipboard
            </button>
          </div>

          <div className="mt-6 whitespace-pre-line rounded-3xl border border-border bg-background/80 p-6 text-sm leading-7 text-foreground">
            {coverLetter}
          </div>
        </div>
      ) : null}
    </div>
  )
}
