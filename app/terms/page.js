'use client'

import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-3xl rounded-3xl border border-border/90 bg-white p-8 shadow-lg">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Terms of Service</h1>
          <p className="text-muted-foreground">These terms explain how Career-AI uses your data to deliver resume and career analysis services.</p>
        </div>

        <div className="space-y-5 text-sm text-foreground">
          <div>
            <h2 className="text-xl font-semibold mb-2">1. AI Disclosure & Human Review</h2>
            <p>Career-AI provides automated insights. Users acknowledge that these are AI-generated suggestions and have the right to request human review of any automated decision that significantly impacts their employment opportunities.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">2. Data Training Opt-Out</h2>
            <p>Your resume data is used solely to provide services to you. Career-AI does not use your personal data to train public foundation models without your separate, explicit opt-in.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">3. Right to Deletion</h2>
            <p>You may delete your uploaded resume at any time through your dashboard. Upon deletion, we will purge your file from our active storage and request our AI sub-processors to cease processing of that specific data point.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">4. AI Processing Consent</h2>
            <p>By using Career-AI, you consent to our processing of your resume through third-party AI systems (including Google Gemini) for career analysis and recommendations.</p>
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
