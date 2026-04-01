'use client'

import { useState } from 'react'
import { AlertCircle, CheckCircle2, Download, Lightbulb, TrendingUp, BookOpen, Award } from 'lucide-react'

export default function SkillGap() {
  const [showTooltip, setShowTooltip] = useState(null)

  const matchData = {
    score: 68,
    message: 'Good progress, but gap exists'
  }

  const missingSkills = [
    { skill: 'React', priority: 'high', reason: 'Core framework for frontend development' },
    { skill: 'TypeScript', priority: 'high', reason: 'Improves code quality and type safety' },
    { skill: 'Node.js', priority: 'high', reason: 'Essential backend runtime' },
    { skill: 'Docker', priority: 'medium', reason: 'Container orchestration and deployment' },
    { skill: 'GraphQL', priority: 'medium', reason: 'Modern API query language' },
    { skill: 'Kubernetes', priority: 'low', reason: 'Advanced container management' }
  ]

  const recommendedSkills = {
    'Frontend': ['React', 'Vue.js', 'Next.js', 'Tailwind CSS'],
    'Backend': ['Node.js', 'Express', 'Python', 'Django'],
    'Tools': ['Docker', 'Git', 'AWS', 'GitHub Actions'],
    'Soft Skills': ['Communication', 'Leadership', 'Problem Solving']
  }

  const skillGapData = [
    { category: 'Frontend Skills', required: 90, current: 45 },
    { category: 'Backend Skills', required: 85, current: 55 },
    { category: 'DevOps Tools', required: 75, current: 30 },
    { category: 'Soft Skills', required: 80, current: 70 }
  ]

  const roadmap = [
    {
      month: 'Month 1',
      skills: ['React Fundamentals', 'JavaScript ES6+'],
      tasks: ['Build a React calculator app', 'Complete 20 coding challenges'],
      estimatedHours: 40
    },
    {
      month: 'Month 2',
      skills: ['TypeScript Basics', 'Node.js Fundamentals'],
      tasks: ['Convert React app to TypeScript', 'Build a simple REST API'],
      estimatedHours: 50
    },
    {
      month: 'Month 3',
      skills: ['Docker', 'Database Design'],
      tasks: ['Containerize an application', 'Design a database schema'],
      estimatedHours: 35
    }
  ]

  const insights = [
    'Focus on React and TypeScript to increase job match score by 25%',
    'Your soft skills are strong - highlight them in resume',
    'Adding 2 capstone projects could improve match score by 20%',
    'Backend skills development is critical for full-stack roles'
  ]

  const improvementTips = [
    'Build real-world projects showcasing learned skills',
    'Contribute to open-source to gain practical experience',
    'Take online courses with certificates (Coursera, Udemy)',
    'Join coding communities and participate in challenges',
    'Create a portfolio website demonstrating your projects'
  ]

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-red-500/20 text-red-700 dark:text-red-300',
      medium: 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300',
      low: 'bg-blue-500/20 text-blue-700 dark:text-blue-300'
    }
    return colors[priority] || colors.low
  }

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Skill Gap Analysis</h1>
          <p className="text-muted-foreground">Identify gaps and create a personalized learning roadmap</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Match Score Section */}
        <div className="p-8 border border-border bg-card/50 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground mb-2">Skill Gap Score</h2>
              <p className="text-muted-foreground mb-4">{matchData.message}</p>
              <div className="flex gap-3">
                <button type="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                  <TrendingUp className="w-4 h-4" />
                  Start Learning
                </button>
                <button type="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                  <BookOpen className="w-4 h-4" />
                  View Resources
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full" viewBox="0 0 160 160">
                  <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="none" className="text-border" />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(matchData.score / 100) * 440} 440`}
                    strokeLinecap="round"
                    className="text-yellow-600 dark:text-yellow-400 transition-all"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-yellow-600 dark:text-yellow-400">{matchData.score}%</span>
                  <span className="text-xs text-muted-foreground">Skills Aligned</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Missing Skills Section */}
        <div className="p-6 border border-border bg-card/50 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            Missing Skills
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {missingSkills.map((item, idx) => (
              <div
                key={idx}
                className="relative"
                onMouseEnter={() => setShowTooltip(idx)}
                onMouseLeave={() => setShowTooltip(null)}
              >
                <div className={`px-4 py-2 rounded-lg font-medium text-sm ${getPriorityColor(item.priority)} cursor-help`}>
                  {item.skill}
                </div>
                {showTooltip === idx && (
                  <div className="absolute bottom-full left-0 mb-2 p-2 bg-foreground text-background text-xs rounded-lg whitespace-nowrap z-10 tooltip">
                    {item.reason}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Skill Gap Visualization */}
        <div className="p-6 border border-border bg-card/50 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-foreground mb-6">Skill Gap Comparison</h3>
          <div className="space-y-6">
            {skillGapData.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-foreground">{item.category}</span>
                  <span className="text-xs text-muted-foreground">Required: {item.required}% | Current: {item.current}%</span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 h-3 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500/60"
                      style={{ width: `${item.current}%` }}
                    />
                  </div>
                  <div className="flex-1 h-3 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500/60"
                      style={{ width: `${item.required}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500/60" />
              <span className="text-muted-foreground">Your Level</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="text-muted-foreground">Required Level</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Recommended Skills */}
          <div className="p-6 border border-border bg-card/50 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
              Recommended Skills
            </h3>
            <div className="space-y-4">
              {Object.entries(recommendedSkills).map(([category, skills]) => (
                <div key={category}>
                  <p className="text-sm font-semibold text-muted-foreground mb-2">{category}</p>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-full bg-green-500/20 text-green-700 dark:text-green-300 text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="p-6 border border-border bg-card/50 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Learning Summary
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-background rounded-lg border border-border">
                <p className="text-sm text-muted-foreground mb-1">Total Skills Gap</p>
                <p className="text-2xl font-bold text-foreground">{missingSkills.length} Skills</p>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border">
                <p className="text-sm text-muted-foreground mb-1">Estimated Hours</p>
                <p className="text-2xl font-bold text-foreground">125+ Hours</p>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border">
                <p className="text-sm text-muted-foreground mb-1">Timeline</p>
                <p className="text-2xl font-bold text-foreground">3 Months</p>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Roadmap */}
        <div className="p-6 border border-border bg-card/50 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-foreground mb-6">Learning Roadmap</h3>
          <div className="space-y-6">
            {roadmap.map((phase, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-sm font-bold text-primary">
                    {idx + 1}
                  </div>
                  {idx < roadmap.length - 1 && <div className="w-0.5 h-24 bg-border mt-2" />}
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-sm font-semibold text-muted-foreground">{phase.month}</p>
                  <p className="text-lg font-bold text-foreground mb-2">{phase.skills.join(', ')}</p>
                  <ul className="space-y-1 mb-3">
                    {phase.tasks.map((task, tidx) => (
                      <li key={tidx} className="text-sm text-muted-foreground flex gap-2">
                        <span className="text-primary">•</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-muted-foreground">
                    Estimated: {phase.estimatedHours} hours
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="p-6 border border-border bg-card/50 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            AI Insights
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {insights.map((insight, idx) => (
              <div key={idx} className="p-4 bg-background rounded-lg border border-border">
                <p className="text-sm text-foreground">{insight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Resume Improvement Tips */}
        <div className="p-6 border border-border bg-card/50 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-foreground mb-4">Development Tips</h3>
          <ul className="space-y-3">
            {improvementTips.map((tip, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-foreground">
                <span className="text-primary font-bold flex-shrink-0">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button type="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 flex-1">
            <TrendingUp className="w-4 h-4" />
            Create Learning Plan
          </button>
          <button type="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 flex-1">
            <Download className="w-4 h-4" />
            Download Roadmap
          </button>
          <button type="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 flex-1">
            <BookOpen className="w-4 h-4" />
            Find Resources
          </button>
        </div>
      </div>
    </div>
  )
}
