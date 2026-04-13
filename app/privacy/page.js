'use client'

import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-3xl rounded-3xl border border-border/90 bg-white p-8 shadow-lg">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground">This policy describes how Career-AI collects, stores, and processes your resume data.</p>
        </div>

        <div className="space-y-5 text-sm text-foreground">
          <div>
            <h2 className="text-xl font-semibold mb-2">Data Use</h2>
            <p>We use your resume and profile data only to provide Career-AI services, including resume analysis, job matching, and career recommendations.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">AI Processing</h2>
            <p>Your resume may be processed by third-party AI systems such as Google Gemini to generate career insights. This processing is only performed with your explicit consent.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Training Opt-Out</h2>
            <p>Career-AI does not use your personal data to train public foundation models without your separate opt-in.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Deletion Rights</h2>
            <p>You may delete your uploaded resume at any time through your dashboard. Upon deletion, we purge the file from active storage and ask our AI subprocessors to stop processing that data.</p>
          </div>
        </div>

        <div className="mt-8">
          <Link href="/auth/signup" className="text-primary hover:underline">
            Return to Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}
