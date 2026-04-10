'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Upload, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react'
import { useGSAP } from '@gsap/react'

export default function ResumeAnalyzer() {
  const containerRef = useRef(null)
  const uploadRef = useRef(null)
  const resultsRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analyzed, setAnalyzed] = useState(false)
  const [result, setResult] = useState({})

  useEffect(() => {
  if (isAnalyzing) {
    const progressEl = uploadRef.current?.querySelector('.progress-bar')

    if (!progressEl) return

    gsap.fromTo(
      progressEl,
      { width: '0%' },
      {
        width: '100%',
        duration: 7,
        ease: 'power2.out'
      }
    )
  }
}, [isAnalyzing])


  useGSAP(() => {
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
  })

  useGSAP(() => {
    if (!analyzed || !resultsRef.current) return

    // Results animation
    gsap.from(resultsRef.current?.querySelectorAll('[data-result-item]'), {
      duration: 0.6,
      y: 20,
      opacity: 0,
      stagger: 0.1,
      ease: 'power2.out'
    })
  }, { scope: analyzed })

  const handleAnalyze = () => {
  setIsAnalyzing(true)

  let tl = gsap.timeline()

  tl.fromTo(uploadRef.current,
    {
      scale: 0.95,
      opacity: 0.2
    },
    {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out'
    }
  )
}

  const comment = (type, score) => {
    switch (type) {
      case "structure":
        if (score <= 50) {
          return "The document lacks a logical hierarchy and essential sections, making it difficult for recruiters or ATS to navigate."
        }
        else if (50 < score && score <= 75) {
          return "The layout is functional but would benefit from a more traditional, reverse-chronological flow to highlight recent roles."
        }
        else if (75 < score && score <= 90) {
          return "A clean and professional structure that effectively guides the reader's eye to your most important qualifications."
        }
        else if (90 < score && score <= 100) {
          return "Exceptional organization that meets all industry standards for both human readability and automated parsing."
        }

      case "keywords":
        if (score <= 50) {
          return "Critical industry terms are missing, significantly reducing the chances of appearing in relevant search results."
        }
        else if (50 < score && score <= 75) {
          return "Some relevant skills are present, but more specific technical keywords are needed to fully align with the job description."
        }
        else if (75 < score && score <= 90) {
          return "Strong alignment with the target role through the natural integration of primary industry-specific terminology."
        }
        else if (90 < score && score <= 100) {
          return "Perfect keyword density that demonstrates a mastery of the tools and methodologies required for the position."
        }

      case "formatting":
        if (score <= 50) {
          return "Elite-level descriptions that flawlessly combine high-level strategy with measurable, data-driven successes."
        }
        else if (50 < score && score <= 75) {
          return "The document is readable but feels cluttered, requiring more white space to improve the overall scanability."
        }
        else if (75 < score && score <= 90) {
          return "Professional and consistent formatting that ensures a polished look across different devices and platforms."
        }
        else if (90 < score && score <= 100) {
          return "A visually perfect document that balances content and design for a seamless reading experience."
        }

      case "experience":
        if (score <= 50) {
          return "Bullet points focus on basic job duties rather than demonstrating the value or results achieved in each role."
        }
        else if (50 < score && score <= 75) {
          return "Good use of action verbs, though adding more quantifiable data would better illustrate the scale of your contributions."
        }
        else if (75 < score && score <= 90) {
          return "Impressive use of metrics and percentages to prove the direct impact of your work on past business objectives."
        }
        else if (90 < score && score <= 100) {
          return "Elite-level descriptions that flawlessly combine high-level strategy with measurable, data-driven successes."
        }

      default:
        return "error"
    }
  }


  const input = async (file) => {
    console.log(file);

    console.log("got input")
    if (file) {
      console.log("got file")
    } else {
      console.log("no file received")
    }

    const formData = new FormData();
    formData.append("file", file)

    handleAnalyze()
    const res = await fetch(`/python/py/upload-resume`, {
      method: "POST",
      body: formData
    })
    const data = await res.json()
    setResult(data.resume_json)
    setIsAnalyzing(false)
    setAnalyzed(true)
    console.log(data.resume_json);
    console.log(result);

  }


  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const feedbackItems = [
    {
      category: 'Structure',
      score: result.score?.structureScore,
      feedback: comment('structure',result.score?.structureScore),
      status: result.score?.structureScore > 75 ? "good" : "warning"
    },
    {
      category: 'Keywords',
      score: result.score?.keywordScore,
      feedback: comment('keywords',result.score?.keywordScore),
      status: result.score?.structureScore > 75 ? "good" : "warning"
    },
    {
      category: 'Experience',
      score: result.score?.experienceScore,
      feedback: comment('experience',result.score?.experienceScore),
      status:  result.score?.structureScore > 75 ? "good" : "warning"
    },
    {
      category: 'Formatting',
      score: result.score?.formattingScore,
      feedback: comment('formatting',result.score?.formattingScore),
      status:  result.score?.structureScore > 75 ? "good" : "warning"
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
          onDrop={(e) => {
            e.preventDefault()
            let file = e.dataTransfer.files[0]
            input(file)
          }}
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${isDragging ? 'border-primary bg-primary/5' : 'border-border'
            }`}
        >
          <div className="mb-6 inline-block">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <Upload className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Drop your resume here</h2>
          <p className="text-muted-foreground mb-6">or click to browse (PDF, DOC, DOCX)</p>

          <input onChange={(e) => {
            let file = e.target.files[0];
            console.log("change file");

            input(file)
          }
          } id='up' type="file" className="hidden" accept=".pdf,.doc,.docx" />

          <label htmlFor='up' disabled={isAnalyzing} className="btnDeep">
            {isAnalyzing ? 'Analyzing...' : 'Upload & Analyze'}
          </label>

          {isAnalyzing && (
            <div className="mt-6">
              <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                <div className="progress-bar h-full bg-linear-to-r from-primary to-accent rounded-full" />
              </div>
              <p className="text-sm text-muted-foreground mt-2">Analyzing your resume...</p>
            </div>
          )}
        </div>
      ) : (
        <div ref={resultsRef} className="space-y-6">
          {/* Overall Score */}
          <section data-result-item className="p-8 rounded-xl border border-border bg-card/50 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Overall Score</h2>
                <p className="text-muted-foreground text-wrap w-[90%] mt-1">{result.score?.comment}</p>
              </div>
              <div className="text-right pr-2">
                <div className="text-5xl font-bold text-primary">{result.score?.overallScore}</div>
                <p className="text-muted-foreground text-sm text-nowrap">out of 100</p>
              </div>
            </div>
            <div className="w-full h-3 bg-border rounded-full overflow-hidden">
              <div className="h-full bg-linear-to-r from-primary to-accent rounded-full w-[81%]" />
            </div>
          </section>

          {/* Feedback Items */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">Detailed Feedback</h3>
            <div className="space-y-3">
              {feedbackItems.map((item, index) => (
                <div key={index} data-result-item className="p-4 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:bg-card transition-colors">
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
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div data-result-item className="p-6 rounded-xl border border-primary/20 bg-linear-to-r from-primary/10 to-accent/10">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Top Recommendations
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-2"><span className="text-primary">→</span> {result.score?.recommendations[0]}</li>
              <li className="flex gap-2"><span className="text-primary">→</span> {result.score?.recommendations[1]}</li>
              <li className="flex gap-2"><span className="text-primary">→</span> {result.score?.recommendations[2]}</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button className="flex-1 btnLight py-5">Download Report</button>
            <button  className="flex-1 btnDeep" onClick={() => setAnalyzed(false)}>
              Analyze Another Resume
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
