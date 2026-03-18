'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { CheckCircle2, X, ArrowRight, Sparkles } from 'lucide-react'

export default function Pricing() {
  const containerRef = useRef(null)
  const plansRef = useRef(null)

  

  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for getting started',
      features: [
        'Resume analysis (1/month)',
        'Basic feedback',
        'Community access',
        'Email support'
      ],
      unavailable: ['Job matching', 'Skill gap analysis', 'AI rewriting'],
      cta: 'Get Started',
      highlighted: false
    },
    {
      name: 'Professional',
      price: '$9.99',
      period: '/month',
      description: 'Best for job seekers',
      features: [
        'Unlimited resume analyses',
        'AI-powered rewriting',
        'Job matching',
        'Skill gap analysis',
        'Career roadmap',
        'Priority email support',
        'Monthly career insights'
      ],
      unavailable: ['API access', 'Team features'],
      cta: 'Start Free Trial',
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: '$99.99',
      period: '/month',
      description: 'For recruiters & teams',
      features: [
        'Everything in Pro',
        'Bulk candidate analysis',
        'Candidate ranking',
        'Team collaboration',
        'API access',
        '24/7 phone support',
        'Custom integrations',
        'White-label options'
      ],
      unavailable: [],
      cta: 'Contact Sales',
      highlighted: false
    }
  ]

  const faqs = [
    {
      question: 'Can I change my plan anytime?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes, Professional plan users get 14 days free. No credit card required.'
    },
    {
      question: 'Do you offer discounts for annual billing?',
      answer: 'Yes! Annual billing saves you 20% compared to monthly.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.'
    }
  ]

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-background to-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl flex items-center gap-2 font-bold text-primary">
            <Sparkles className="w-6 h-6" />
             CareerAI
          </Link>
          <Link href="/">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all shrink-0 outline-none hover:bg-accent hover:text-primary-foreground bg-background/90 border-border/90 border shadow-md h-10 rounded-md px-6" >Back to Home</button>
          </Link>
        </div>
      </nav>

      {/* Header */}
      <div className="pt-32 pb-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="subtitle text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that fits your career goals
        </p>
      </div>

      {/* Pricing Plans */}
      <div ref={plansRef} className="max-w-7xl mx-auto px-6 grid  md:grid-cols-3 gap-8 mb-20">
        {plans.map((plan, index) => (
          <div
            key={index}
            data-plan
            className={`p-8 border rounded-2xl shadow-md backdrop-blur-xl transition-all h-full ${
              plan.highlighted
                ? 'bg-primary/10 border-primary md:scale-105 md:shadow-2xl'
                : 'bg-card/50 border-border hover:border-primary/50'
            }`}
          >
            {plan.highlighted && (
              <div className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold mb-4">
                Most Popular
              </div>
            )}

            <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
            <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

            <div className="mb-6">
              <span className="text-4xl font-bold text-primary">{plan.price}</span>
              {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
            </div>

            <button
              className={`w-full mb-8 ${plan.highlighted ? 'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all shrink-0 outline-none bg-primary h-10 text-primary-foreground hover:bg-primary/90 rounded-md' : 'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all shrink-0 outline-none hover:bg-accent hover:text-primary-foreground bg-background/90 border-border/90 border shadow-md h-10 rounded-md'}`}
            >
              {plan.cta}
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>

            <div className="space-y-4">
              <p className="text-xs font-semibold text-foreground uppercase">Includes</p>
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm">{feature}</span>
                </div>
              ))}

              {plan.unavailable.length > 0 && (
                <>
                  <p className="text-xs font-semibold text-muted-foreground uppercase pt-2">Not included</p>
                  {plan.unavailable.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <X className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-6 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-2">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Have questions? We have answers</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="text-card-foreground flex flex-col gap-6 rounded-xl shadow-sm p-6 border border-border bg-card/50 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-foreground mb-2">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-6 mb-20 text-center">
        <div className="px-8 py-10 flex flex-col items-center gap-5 rounded-xl border border-primary/20 bg-linear-to-r from-primary/10 to-accent/10">
          <h2 className="text-3xl  font-bold text-foreground mb-4">
            Ready to transform your career?
          </h2>
          <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
            Join thousands of professionals already using CareerAI to advance their careers
          </p>
          <Link href="/auth/signup">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all shrink-0 outline-none bg-primary text-primary-foreground hover:bg-primary/90  h-10 rounded-md px-6" >
              Start Your Free Trial
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center text-muted-foreground text-sm">
          <p>&copy; 2024 CareerAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
