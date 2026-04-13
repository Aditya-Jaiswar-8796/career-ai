'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Plus, Download, Eye, Edit2 } from 'lucide-react'

const templateOptions = [
  { id: 'modern', label: 'Modern' },
  { id: 'clean', label: 'Clean' },
  { id: 'minimal', label: 'Minimal' },
  { id: 'professional', label: 'Professional' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'onepage', label: 'One Page' },
  { id: 'creative', label: 'Creative' },
]

const defaultData = {
  name: 'John Doe',
  title: 'Senior Product Manager',
  email: 'john@example.com',
  phone: '(555) 123-4567',
  linkedin: 'linkedin.com/in/johndoe',
  summary: 'Results-driven product leader with 8+ years of experience building modern SaaS products and managing cross-functional teams.',
  skills: ['Product Strategy', 'Roadmap Execution', 'Stakeholder Communication', 'Data Analysis'],
  experience: [
    {
      title: 'Senior Product Manager',
      company: 'Tech Company Inc',
      start: 'Jan 2021',
      end: 'Present',
      description: 'Led product strategy and roadmap execution for a mobile-scale platform, improving adoption by 18% year-over-year.',
    },
  ],
  education: [
    {
      school: 'University of Example',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      start: '2012',
      end: '2016',
    },
  ],
  projects: [
    {
      name: 'CareerAI Resume Redesign',
      description: 'Designed a modern resume template system and interactive builder to improve candidate presentation.',
    },
  ],
}

export default function ResumeBuilder() {
  const containerRef = useRef(null)
  const editorRef = useRef(null)
  const previewRef = useRef(null)
  const [editMode, setEditMode] = useState('summary')
  const [selectedTemplate, setSelectedTemplate] = useState('modern')
  const [formData, setFormData] = useState(defaultData)
  const [skillInput, setSkillInput] = useState('')

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const title = containerRef.current?.querySelector('h1')
      if (title) {
        gsap.from(title, {
          duration: 0.6,
          y: -20,
          opacity: 0,
          ease: 'back.out(1.5)',
        })
      }

      if (editorRef.current) {
        gsap.from(editorRef.current, {
          duration: 0.7,
          x: -30,
          opacity: 0,
          ease: 'power2.out',
        })
      }

      if (previewRef.current) {
        gsap.from(previewRef.current, {
          duration: 0.7,
          x: 30,
          opacity: 0,
          ease: 'power2.out',
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handleModeChange = (mode) => {
    gsap.to(editorRef.current, {
      duration: 0.3,
      opacity: 0.5,
      y: -10,
      ease: 'power2.out',
    })

    setTimeout(() => {
      setEditMode(mode)
      gsap.to(editorRef.current, {
        duration: 0.3,
        opacity: 1,
        y: 0,
        ease: 'power2.out',
      })
    }, 150)
  }

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const updateArrayItem = (arrayKey, index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev[arrayKey]]
      updated[index] = { ...updated[index], [field]: value }
      return { ...prev, [arrayKey]: updated }
    })
  }

  const addArrayItem = (arrayKey, template) => {
    setFormData((prev) => ({ ...prev, [arrayKey]: [...prev[arrayKey], template] }))
  }

  const removeArrayItem = (arrayKey, index) => {
    setFormData((prev) => {
      const updated = [...prev[arrayKey]]
      updated.splice(index, 1)
      return { ...prev, [arrayKey]: updated }
    })
  }

  const addSkill = () => {
    if (!skillInput.trim()) return

    setFormData((prev) => ({ ...prev, skills: [...prev.skills, skillInput.trim()] }))
    setSkillInput('')
  }

  const previewStyles = {
    modern: 'bg-white text-foreground',
    clean: 'bg-slate-50 text-foreground',
    minimal: 'bg-white text-foreground',
    professional: 'bg-white text-foreground',
    portfolio: 'bg-slate-50 text-foreground',
    onepage: 'bg-white text-foreground',
    creative: 'bg-slate-950 text-white',
  }

  const sectionButtons = [
    { id: 'summary', label: 'Professional Summary', icon: '📝' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'skills', label: 'Skills', icon: '🛠️' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
  ]

  return (
    <div ref={containerRef} className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Resume Builder</h1>
        <p className="text-muted-foreground">Live editing with a preview panel and modern template options.</p>
      </div>

      <div className="grid lg:grid-cols-[1.25fr_0.85fr] gap-6">
        <div ref={editorRef} className="space-y-5">
          <div className="p-4 rounded-xl border border-border bg-card/50">
            <h2 className="text-base font-semibold text-foreground mb-3">Personal Details</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: 'Full Name', key: 'name', type: 'text' },
                { label: 'Title', key: 'title', type: 'text' },
                { label: 'Email', key: 'email', type: 'email' },
                { label: 'Phone', key: 'phone', type: 'text' },
                { label: 'LinkedIn', key: 'linkedin', type: 'text' },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-foreground mb-2">{field.label}</label>
                  <input
                    type={field.type}
                    value={formData[field.key]}
                    onChange={(e) => updateField(field.key, e.target.value)}
                    className="w-full rounded-lg border border-border bg-background/80 px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 p-4 bg-card/50 rounded-xl border border-border">
            {sectionButtons.map((section) => (
              <button
                key={section.id}
                onClick={() => handleModeChange(section.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  editMode === section.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {section.icon} {section.label}
              </button>
            ))}
          </div>

          <div className="p-6 rounded-xl border border-border bg-card/50">
            {editMode === 'summary' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Summary</h3>
                <textarea
                  value={formData.summary}
                  onChange={(e) => updateField('summary', e.target.value)}
                  placeholder="Write your professional summary here..."
                  className="w-full min-h-[160px] rounded-xl border border-border bg-background/80 p-3 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            )}

            {editMode === 'experience' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Work Experience</h3>
                {formData.experience.map((item, idx) => (
                  <div key={idx} className="space-y-3 rounded-2xl border border-border bg-background/80 p-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Job Title</label>
                        <input
                          value={item.title}
                          onChange={(e) => updateArrayItem('experience', idx, 'title', e.target.value)}
                          className="w-full rounded-lg border border-border bg-white px-3 py-2 text-foreground"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Company</label>
                        <input
                          value={item.company}
                          onChange={(e) => updateArrayItem('experience', idx, 'company', e.target.value)}
                          className="w-full rounded-lg border border-border bg-white px-3 py-2 text-foreground"
                        />
                      </div>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Start Date</label>
                        <input
                          type="text"
                          value={item.start}
                          onChange={(e) => updateArrayItem('experience', idx, 'start', e.target.value)}
                          placeholder="Jan 2021"
                          className="w-full rounded-lg border border-border bg-white px-3 py-2 text-foreground"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">End Date</label>
                        <input
                          type="text"
                          value={item.end}
                          onChange={(e) => updateArrayItem('experience', idx, 'end', e.target.value)}
                          placeholder="Present"
                          className="w-full rounded-lg border border-border bg-white px-3 py-2 text-foreground"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Description</label>
                      <textarea
                        value={item.description}
                        onChange={(e) => updateArrayItem('experience', idx, 'description', e.target.value)}
                        className="w-full min-h-[100px] rounded-xl border border-border bg-white px-3 py-2 text-foreground"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeArrayItem('experience', idx)}
                      className="text-sm text-destructive"
                    >
                      Remove experience
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    addArrayItem('experience', {
                      title: '',
                      company: '',
                      start: '',
                      end: '',
                      description: '',
                    })
                  }
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  <Plus className="w-4 h-4" />
                  Add Experience
                </button>
              </div>
            )}

            {editMode === 'education' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Education</h3>
                {formData.education.map((item, idx) => (
                  <div key={idx} className="space-y-3 rounded-2xl border border-border bg-background/80 p-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">School / University</label>
                      <input
                        value={item.school}
                        onChange={(e) => updateArrayItem('education', idx, 'school', e.target.value)}
                        className="w-full rounded-lg border border-border bg-white px-3 py-2 text-foreground"
                      />
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Degree</label>
                        <input
                          value={item.degree}
                          onChange={(e) => updateArrayItem('education', idx, 'degree', e.target.value)}
                          className="w-full rounded-lg border border-border bg-white px-3 py-2 text-foreground"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Field of Study</label>
                        <input
                          value={item.field}
                          onChange={(e) => updateArrayItem('education', idx, 'field', e.target.value)}
                          className="w-full rounded-lg border border-border bg-white px-3 py-2 text-foreground"
                        />
                      </div>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Start Year</label>
                        <input
                          value={item.start}
                          onChange={(e) => updateArrayItem('education', idx, 'start', e.target.value)}
                          className="w-full rounded-lg border border-border bg-white px-3 py-2 text-foreground"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">End Year</label>
                        <input
                          value={item.end}
                          onChange={(e) => updateArrayItem('education', idx, 'end', e.target.value)}
                          className="w-full rounded-lg border border-border bg-white px-3 py-2 text-foreground"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeArrayItem('education', idx)}
                      className="text-sm text-destructive"
                    >
                      Remove education
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    addArrayItem('education', {
                      school: '',
                      degree: '',
                      field: '',
                      start: '',
                      end: '',
                    })
                  }
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  <Plus className="w-4 h-4" />
                  Add Education
                </button>
              </div>
            )}

            {editMode === 'skills' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Skills</h3>
                <div className="space-y-3">
                  <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                    <input
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      placeholder="Add a skill"
                      className="w-full rounded-lg border border-border bg-white px-3 py-2 text-foreground"
                    />
                    <button
                      type="button"
                      onClick={addSkill}
                      className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill, idx) => (
                      <div key={idx} className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-foreground">
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeArrayItem('skills', idx)}
                          className="font-bold"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {editMode === 'projects' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Projects</h3>
                {formData.projects.map((item, idx) => (
                  <div key={idx} className="space-y-3 rounded-2xl border border-border bg-background/80 p-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Project Name</label>
                      <input
                        value={item.name}
                        onChange={(e) => updateArrayItem('projects', idx, 'name', e.target.value)}
                        className="w-full rounded-lg border border-border bg-white px-3 py-2 text-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Description</label>
                      <textarea
                        value={item.description}
                        onChange={(e) => updateArrayItem('projects', idx, 'description', e.target.value)}
                        className="w-full min-h-[100px] rounded-xl border border-border bg-white px-3 py-2 text-foreground"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeArrayItem('projects', idx)}
                      className="text-sm text-destructive"
                    >
                      Remove project
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    addArrayItem('projects', {
                      name: '',
                      description: '',
                    })
                  }
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  <Plus className="w-4 h-4" />
                  Add Project
                </button>
              </div>
            )}

            <button
              type="button"
              className="inline-flex w-full mt-4 items-center justify-center gap-2 rounded-xl border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Edit2 className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>

        <div ref={previewRef} className="space-y-5">
          <div className="rounded-xl border border-border bg-card/50 p-4">
            <h2 className="text-lg font-semibold text-foreground mb-3">Choose Template</h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {templateOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedTemplate(option.id)}
                  className={`rounded-2xl border px-3 py-2 text-left text-sm transition ${
                    selectedTemplate === option.id
                      ? 'border-primary bg-primary/10 text-foreground'
                      : 'border-border bg-background text-muted-foreground hover:border-primary hover:text-foreground'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className={`p-6 rounded-3xl border border-border min-h-[40rem] ${previewStyles[selectedTemplate]}`}>
            <div className={`${selectedTemplate === 'creative' ? 'rounded-3xl p-6 bg-gradient-to-br from-purple-900 to-fuchsia-600' : ''}`}>
              <div className={`${selectedTemplate === 'creative' ? 'text-white' : 'text-foreground'}`}>
                <div className="space-y-4">
                  <div>
                    <h1 className={`text-3xl font-bold ${selectedTemplate === 'creative' ? 'text-white' : 'text-foreground'}`}>{formData.name}</h1>
                    <p className={`mt-1 text-sm ${selectedTemplate === 'creative' ? 'text-slate-200' : 'text-muted-foreground'}`}>{formData.title}</p>
                    <p className={`mt-2 text-sm ${selectedTemplate === 'creative' ? 'text-slate-200' : 'text-muted-foreground'}`}>{formData.email} | {formData.phone} | {formData.linkedin}</p>
                  </div>

                  <div className={`rounded-2xl p-4 ${selectedTemplate === 'creative' ? 'bg-white/10' : 'bg-slate-50'} ${selectedTemplate === 'clean' ? 'border border-border' : ''}`}>
                    <h2 className={`text-base font-semibold ${selectedTemplate === 'creative' ? 'text-white' : 'text-foreground'}`}>Summary</h2>
                    <p className={`mt-2 text-sm leading-6 ${selectedTemplate === 'creative' ? 'text-slate-100' : 'text-muted-foreground'}`}>{formData.summary}</p>
                  </div>

                  <div className="space-y-4">
                    <h2 className={`text-base font-semibold ${selectedTemplate === 'creative' ? 'text-white' : 'text-foreground'}`}>Experience</h2>
                    {formData.experience.map((item, idx) => (
                      <div key={idx} className={`rounded-2xl p-4 ${selectedTemplate === 'creative' ? 'bg-white/10' : 'bg-slate-50'}`}>
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                          <p className={`font-semibold ${selectedTemplate === 'creative' ? 'text-white' : 'text-foreground'}`}>{item.title || 'Job Title'}</p>
                          <p className={`text-sm ${selectedTemplate === 'creative' ? 'text-slate-200' : 'text-muted-foreground'}`}>{item.start || 'Start'} — {item.end || 'End'}</p>
                        </div>
                        <p className={`text-sm ${selectedTemplate === 'creative' ? 'text-slate-200' : 'text-muted-foreground'}`}>{item.company || 'Company Name'}</p>
                        <p className={`mt-2 text-sm leading-6 ${selectedTemplate === 'creative' ? 'text-slate-100' : 'text-foreground'}`}>{item.description || 'Add your achievement or responsibility here.'}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h2 className={`text-base font-semibold ${selectedTemplate === 'creative' ? 'text-white' : 'text-foreground'}`}>Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((skill, idx) => (
                        <span key={idx} className={`inline-flex rounded-full px-3 py-1 text-sm ${selectedTemplate === 'creative' ? 'bg-white/15 text-white' : 'bg-primary/10 text-primary'}`}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className={`text-base font-semibold ${selectedTemplate === 'creative' ? 'text-white' : 'text-foreground'}`}>Education</h2>
                    {formData.education.map((item, idx) => (
                      <div key={idx} className={`rounded-2xl p-4 ${selectedTemplate === 'creative' ? 'bg-white/10' : 'bg-slate-50'}`}>
                        <p className={`font-semibold ${selectedTemplate === 'creative' ? 'text-white' : 'text-foreground'}`}>{item.school || 'School Name'}</p>
                        <p className={`text-sm ${selectedTemplate === 'creative' ? 'text-slate-200' : 'text-muted-foreground'}`}>{item.degree || 'Degree'}, {item.field || 'Field of Study'}</p>
                        <p className={`mt-1 text-sm ${selectedTemplate === 'creative' ? 'text-slate-200' : 'text-muted-foreground'}`}>{item.start || 'Start'} — {item.end || 'End'}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h2 className={`text-base font-semibold ${selectedTemplate === 'creative' ? 'text-white' : 'text-foreground'}`}>Projects</h2>
                    {formData.projects.map((item, idx) => (
                      <div key={idx} className={`rounded-2xl p-4 ${selectedTemplate === 'creative' ? 'bg-white/10' : 'bg-slate-50'}`}>
                        <p className={`font-semibold ${selectedTemplate === 'creative' ? 'text-white' : 'text-foreground'}`}>{item.name || 'Project Title'}</p>
                        <p className={`mt-2 text-sm leading-6 ${selectedTemplate === 'creative' ? 'text-slate-100' : 'text-foreground'}`}>{item.description || 'Describe the project and your impact.'}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
