import CoverLetterGenerator from '@/components/CoverLetterGenerator'

export default function CoverLetterPage() {
  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Generate a Cover Letter</h1>
        <p className="text-muted-foreground">Use your stored resume data to create a polished letter tailored to the job description.</p>
      </div>
      <CoverLetterGenerator />
    </div>
  )
}
