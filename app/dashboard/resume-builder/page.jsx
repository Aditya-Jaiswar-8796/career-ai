'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Download, Eye, Edit2 } from 'lucide-react'

export default function ResumeBuilder() {
  const containerRef = useRef(null)
  const editorRef = useRef(null)
  const previewRef = useRef(null)
  const [editMode, setEditMode] = useState('summary')

  useEffect(() => {
    if (!containerRef.current) return

    gsap.from(containerRef.current.querySelector('h1'), {
      duration: 0.6,
      y: -20,
      opacity: 0,
      ease: 'back.out(1.5)'
    })

    gsap.from(editorRef.current, {
      duration: 0.7,
      x: -30,
      opacity: 0,
      ease: 'power2.out'
    })

    gsap.from(previewRef.current, {
      duration: 0.7,
      x: 30,
      opacity: 0,
      ease: 'power2.out'
    })
  }, [])

  const handleModeChange = (mode) => {
    gsap.to(editorRef.current, {
      duration: 0.3,
      opacity: 0.5,
      y: -10,
      ease: 'power2.out'
    })

    setTimeout(() => {
      setEditMode(mode)
      gsap.to(editorRef.current, {
        duration: 0.3,
        opacity: 1,
        y: 0,
        ease: 'power2.out'
      })
    }, 150)
  }

  const sections = [
    { id: 'summary', label: 'Professional Summary', icon: '📝' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'skills', label: 'Skills', icon: '🛠️' },
    { id: 'projects', label: 'Projects', icon: '🚀' }
  ]

  return (
    <div ref={containerRef} className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Resume Builder</h1>
        <p className="text-muted-foreground">Create and customize your professional resume</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Editor */}
        <div ref={editorRef} className="space-y-4">
          <div className="flex flex-wrap gap-2 p-4 bg-card/50 rounded-lg border border-border">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleModeChange(section.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  editMode === section.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {section.icon} {section.label}
              </button>
            ))}
          </div>

          <Card className="p-6 border border-border bg-card/50 backdrop-blur-sm">
            {editMode === 'summary' && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-foreground">Professional Summary</h2>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">Summary</label>
                  <textarea
                    placeholder="Write a brief summary of your professional background..."
                    className="w-full h-32 p-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            )}

            {editMode === 'experience' && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-foreground">Work Experience</h2>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Job Title</label>
                    <Input placeholder="Senior Product Manager" className="border-border" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Company</label>
                    <Input placeholder="Company Name" className="border-border" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Start Date</label>
                      <Input type="date" className="border-border" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">End Date</label>
                      <Input type="date" className="border-border" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Description</label>
                    <textarea
                      placeholder="Describe your responsibilities and achievements..."
                      className="w-full h-24 p-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
                <Button className="w-full gap-2">
                  <Plus className="w-4 h-4" />
                  Add Experience
                </Button>
              </div>
            )}

            {editMode === 'education' && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-foreground">Education</h2>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">School/University</label>
                    <Input placeholder="University Name" className="border-border" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Degree</label>
                    <Input placeholder="Bachelor of Science" className="border-border" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Field of Study</label>
                    <Input placeholder="Computer Science" className="border-border" />
                  </div>
                </div>
                <Button className="w-full gap-2">
                  <Plus className="w-4 h-4" />
                  Add Education
                </Button>
              </div>
            )}

            {editMode === 'skills' && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-foreground">Skills</h2>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Skill</label>
                    <Input placeholder="e.g., Project Management, Leadership" className="border-border" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Leadership', 'Strategic Planning', 'Analytics', 'Communication'].map((skill) => (
                      <div
                        key={skill}
                        className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm flex items-center gap-2"
                      >
                        {skill}
                        <button className="text-lg leading-none">×</button>
                      </div>
                    ))}
                  </div>
                </div>
                <Button className="w-full gap-2">
                  <Plus className="w-4 h-4" />
                  Add Skill
                </Button>
              </div>
            )}

            {editMode === 'projects' && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-foreground">Projects</h2>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Project Name</label>
                    <Input placeholder="Project Title" className="border-border" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Description</label>
                    <textarea
                      placeholder="Describe your project and your role..."
                      className="w-full h-24 p-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
                <Button className="w-full gap-2">
                  <Plus className="w-4 h-4" />
                  Add Project
                </Button>
              </div>
            )}

            <Button variant="outline" className="w-full mt-4">
              <Edit2 className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </Card>
        </div>

        {/* Preview */}
        <div ref={previewRef} className="space-y-4">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </Button>
            <Button size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          </div>

          <Card className="p-8 border border-border bg-white text-black min-h-96">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">John Doe</h1>
                <p className="text-gray-600">Senior Product Manager</p>
                <p className="text-sm text-gray-500">john@example.com | (555) 123-4567 | linkedin.com/in/johndoe</p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-1">Professional Summary</h2>
                <p className="text-gray-700 mt-2 text-sm">
                  Results-driven Senior Product Manager with 8+ years experience building and scaling products at top tech companies. Proven track record of driving 20% efficiency improvements and leading high-performing teams.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-300 pb-1">Experience</h2>
                <div className="mt-2">
                  <h3 className="font-semibold text-gray-900">Senior Product Manager</h3>
                  <p className="text-sm text-gray-600">Tech Company Inc | Jan 2021 - Present</p>
                  <p className="text-sm text-gray-700 mt-1">Led product strategy and roadmap development for mobile platform, driving 15% YoY growth</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
