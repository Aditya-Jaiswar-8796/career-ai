'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles, Zap, Target, TrendingUp, Users, Shield } from 'lucide-react'
import { useSession, signOut } from "next-auth/react";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function LandingPage() {
  const containerRef = useRef(null)
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const statsRef = useRef(null)
  const ctaRef = useRef(null)
  const { data: session, status } = useSession();

  useGSAP(() => {
    const root = containerRef.current
    const hero = heroRef.current
    if (!root || !hero) return

    const ctx = gsap.context((self) => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // —— Hero entrance
      const intro = gsap.timeline({
        defaults: { ease: 'power3.out' },
        paused: reduced,
      })

      intro
        .from('.landing-logo', { y: -28, opacity: 0, duration: 0.65 })
        .from(
          '.nav-item a',
          { y: -14, opacity: 0, stagger: 0.07, duration: 0.45 },
          '-=0.4'
        )
        .from(
          '.nav-options > *',
          { y: -12, opacity: 0, stagger: 0.08, duration: 0.4 },
          '-=0.35'
        )
        .from(
          '.hero-line-inner',
          { yPercent: 110, opacity: 0, stagger: 0.11, duration: 0.75 },
          '-=0.25'
        )
        .from('.hero-subtitle', { y: 32, opacity: 0, duration: 0.55 }, '-=0.45')
        .from(
          '.hero-cta > *',
          {
            y: 40,
            opacity: 0,
            stagger: 0.12,
            duration: 0.55,
            ease: 'back.out(1.35)',
          },
          '-=0.35'
        )

      if (reduced) {
        intro.progress(1, false)
      }

      if (!reduced) {
        gsap.to('.hero-blob', {
          y: 'random(-18, 18)',
          x: 'random(-12, 12)',
          duration: 'random(5, 8)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: { each: 0.4, from: 'random' },
        })

        const onMove = (e) => {
          const { innerWidth: w, innerHeight: h } = window
          const nx = (e.clientX / w - 0.5) * 2
          const ny = (e.clientY / h - 0.5) * 2
          gsap.to('.hero-blob-1', {
            x: nx * 36,
            y: ny * 28,
            duration: 1.15,
            ease: 'power2.out',
            overwrite: 'auto',
          })
          gsap.to('.hero-blob-2', {
            x: -nx * 28,
            y: -ny * 22,
            duration: 1.15,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        }
        hero.addEventListener('mousemove', onMove)
        self.add(() => hero.removeEventListener('mousemove', onMove))
      }

      if (reduced) return

      // —— Features: scroll reveal
      const featCards = gsap.utils.toArray(root.querySelectorAll('#features .feature-reveal'))
      featCards.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
          y: 56,
          opacity: 0,
          rotateX: 6,
          transformOrigin: '50% 100%',
          duration: 0.7,
          delay: i * 0.04,
          ease: 'power3.out',
        })
      })

      gsap.from('#features .features-header', {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 0.65,
        ease: 'power3.out',
      })

      gsap.from('#how-it-works .features-header', {
        scrollTrigger: { trigger: '#how-it-works', start: 'top 78%' },
        y: 36,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      })
      gsap.from('#how-it-works .step-card', {
        scrollTrigger: { trigger: '#how-it-works .step-grid', start: 'top 82%' },
        y: 48,
        opacity: 0,
        stagger: 0.14,
        duration: 0.65,
        ease: 'power3.out',
      })

      const statNums = root.querySelectorAll('.stat-number')
      statNums.forEach((el) => {
        const end = parseInt(el.getAttribute('data-value') || '0', 10)
        const obj = { v: 0 }
        gsap.to(obj, {
          v: end,
          duration: 2.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            once: true,
          },
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toLocaleString()
          },
        })
      })

      const statsGrid = statsRef.current?.querySelector('.stats-grid')
      if (statsGrid) {
        gsap.from(gsap.utils.toArray(statsGrid.children), {
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 82%',
          },
          y: 36,
          opacity: 0,
          stagger: 0.1,
          duration: 0.55,
          ease: 'power3.out',
        })
      }

      gsap.from('.testimonials-header', {
        scrollTrigger: { trigger: '.testimonials-section', start: 'top 78%' },
        y: 32,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      })
      gsap.from('.testimonial-card', {
        scrollTrigger: { trigger: '.testimonials-grid', start: 'top 85%' },
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.65,
        ease: 'power3.out',
      })

      gsap.from('#pricing .features-header', {
        scrollTrigger: { trigger: '#pricing', start: 'top 78%', once: true },
        y: 32,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      })
      const pricingCards = root.querySelectorAll('#pricing .pricing-card')
      if (pricingCards.length) {
        gsap.fromTo(
          pricingCards,
          { y: 48, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: '#pricing',
              start: 'top 72%',
              once: true,
            },
          }
        )
      }

      if (ctaRef.current) {
        gsap.from(gsap.utils.toArray(ctaRef.current.children), {
          scrollTrigger: { trigger: ctaRef.current, start: 'top 82%' },
          y: 44,
          opacity: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: 'power3.out',
        })
      }

      gsap.from('footer .footer-col', {
        scrollTrigger: { trigger: 'footer', start: 'top 92%' },
        y: 24,
        opacity: 0,
        stagger: 0.06,
        duration: 0.5,
        ease: 'power2.out',
      })
    }, root)

    return () => ctx.revert()
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="w-full overflow-hidden bg-linear-to-b from-background to-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border">
        <div className="max-w-full  mx-10 px-6 py-4 flex items-center justify-between">
          <div className="text-2xl landing-logo font-bold text-primary flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            CareerAI
          </div>
          <div className="nav-item gap-8 flex">
            <Link href="#features" className="text-sm font-medium  hover:text-primary">Features</Link>
            <Link href="#how-it-works" className="text-sm font-medium  hover:text-primary">How It Works</Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary">Pricing</Link>
          </div>
          <div className="nav-options flex items-center gap-4">
            <Link href={session ? "/dashboard" : "/auth/login"}>
              <button className={`inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap text-sm  transition-all shrink-0 outline-none ${session ? "px-2 py-1 rounded-2xl text-slate-400 font-semibold" : "hover:bg-accent rounded-md  font-medium hover:text-primary-foreground h-10 px-6"}  bg-background/90 border-border/90 border shadow-md  `}>{session ? session.user.email : "Login"}</button>
            </Link>
            <Link onClick={() => { session && signOut() }} className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium shrink-0 outline-none bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-md px-6" href="/auth/signup">
              <button>{session ? "Sign Out" : "Get Started"}</button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden pt-20 [perspective:1200px]">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="hero-blob hero-blob-1 absolute top-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl will-change-transform" />
        <div className="hero-blob hero-blob-2 absolute bottom-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl will-change-transform" />

        <div className="hero-content relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight overflow-hidden">
            <span className="hero-line block overflow-hidden">
              <span className="hero-line-inner inline-block">Your AI Career </span>
            </span>
            <span className="hero-line block overflow-hidden">
              <span className="hero-line-inner inline-block text-primary">Superpower</span>
            </span>
          </h1>
          <p className="hero-subtitle text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Land your dream job with AI-powered resume analysis, skill gap detection, and personalized career guidance
          </p>
          <div className="hero-cta flex items-center sm:flex-row gap-4 justify-center">
            <Link className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium shrink-0 outline-none bg-accent text-primary-foreground hover:bg-primary/90 h-10 rounded-md px-6" href="/auth/signup">
              <button className=" flex gap-2">
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium shrink-0 outline-none hover:bg-accent hover:text-primary-foreground bg-background/90 border-border/90 border shadow-md h-10 rounded-md px-6" href="#features">
              <button className="cta-button">
                Explore Features
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={featuresRef} className="py-24 overflow-hidden px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 features-header">
            <h2 className="text-4xl font-bold text-foreground mb-4">Powerful Features</h2>
            <p className="text-lg text-muted-foreground">Everything you need to advance your career</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                side: "lef",
                title: 'AI Resume Analysis',
                description: 'Get instant feedback on your resume with AI-powered scoring and improvement suggestions'
              },
              {
                icon: Target,
                side: "cent1",
                title: 'Job Matching',
                description: 'Match your resume against job descriptions and see compatibility scores'
              },
              {
                icon: TrendingUp,
                side: "righ",
                title: 'Skill Gap Analysis',
                description: 'Identify missing skills and get a personalized learning roadmap to get your goals'
              },
              {
                icon: Sparkles, side: "lef",
                title: 'Resume Optimization',
                description: 'AI-powered resume rewriting to highlight your best achievements'
              },
              {
                icon: Users, side: "cent2",
                title: 'Candidate Ranking',
                description: 'For recruiters: rank candidates and find top talent efficiently'
              },
              {
                icon: Shield, side: "righ",
                title: 'Secure & Private',
                description: 'Your data is encrypted and never shared with third parties'
              }
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} data-feature-side={feature.side} className="feature-card feature-reveal group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative p-8 rounded-xl border border-border bg-background/50 hover:bg-background transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="overflow-hidden text-center mb-16 features-header">
            <h2 className="text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">Three simple steps to transform your career</p>
          </div>

          <div id='steps' className="step-grid grid md:grid-cols-3 gap-8">
            {[
              { number: '1', title: 'Upload', description: 'Upload your resume in seconds' },
              { number: '2', title: 'Analyze', description: 'Get AI-powered insights and recommendations' },
              { number: '3', title: 'Improve', description: 'Implement feedback and land your dream job' }
            ].map((step, index) => (
              <div key={index} className="overflow-hidden step-card text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">{step.number}</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-24 px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="stats-grid grid md:grid-cols-4 gap-8">
            {[
              { label: 'Active Users', value: '50' },
              { label: 'Resumes Analyzed', value: '10000' },
              { label: 'Jobs Matched', value: '25000' },
              { label: 'Success Rate', value: '92' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="stat-number text-4xl font-bold text-primary mb-2" data-value={stat.value}>0</div>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 testimonials-header">
            <h2 className="text-4xl font-bold text-foreground mb-4">What Users Say</h2>
            <p className="text-lg text-muted-foreground">Join thousands of professionals who've transformed their careers</p>
          </div>

          <div className="testimonials-grid grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Product Manager',
                text: 'CareerAI helped me land a senior PM role. The resume insights were game-changing!'
              },
              {
                name: 'Mike Chen',
                role: 'Software Engineer',
                text: 'The skill gap analysis identified exactly what I needed to learn. Highly recommended!'
              },
              {
                name: 'Emily Rodriguez',
                role: 'UX Designer',
                text: 'Best career tool I\'ve used. The AI feedback was professional and actionable.'
              }
            ].map((testimonial, index) => (
              <div key={index} className="testimonial-card p-6 rounded-xl border border-border bg-background/50 hover:bg-background transition-colors">
                <p className="text-foreground mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id='pricing' className="py-24 px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 features-header">
            <h2 className="text-4xl font-bold text-foreground mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground">Choose the plan that fits your needs</p>
          </div>

          <div className="pricing-grid grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Starter',
                price: 'Free',
                features: ['1 resume analysis', 'Basic feedback', 'Community access']
              },
              {
                name: 'Professional',
                price: '$9.99',
                period: '/month',
                features: ['Unlimited analyses', 'AI rewriting', 'Job matching', 'Skill gap analysis'],
                highlighted: true
              },
              {
                name: 'Enterprise',
                price: '$99.99',
                period: '/month',
                features: ['Everything in Pro', 'Bulk candidate analysis', 'API access', 'Priority support']
              }
            ].map((plan, index) => (
              <div
                key={index}
                className={`pricing-card feature-card p-8 rounded-xl border transition-all ${plan.highlighted
                  ? 'bg-primary/10 border-primary md:scale-105'
                  : 'bg-background/50 border-border'
                  }`}
              >
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-foreground">
                      <span className="text-primary">✓</span> {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full" variant={plan.highlighted ? 'default' : 'outline'}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Ready to Transform Your Career?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of professionals already using CareerAI to advance their careers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all shrink-0 outline-none bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-md px-6">
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link href="#features">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all shrink-0 outline-none hover:bg-accent hover:text-primary-foreground bg-background/90 border-border/90 border shadow-md h-10 rounded-md px-6" >
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="footer-col">
              <p className="font-semibold text-foreground mb-4">CareerAI</p>
              <p className="text-muted-foreground">AI-powered career advancement platform</p>
            </div>
            <div className="footer-col">
              <p className="font-semibold text-foreground mb-4">Product</p>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="#" className="hover:text-primary">Features</Link></li>
                <li><Link href="#" className="hover:text-primary">Pricing</Link></li>
                <li><Link href="#" className="hover:text-primary">FAQ</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <p className="font-semibold text-foreground mb-4">Company</p>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="#" className="hover:text-primary">About</Link></li>
                <li><Link href="#" className="hover:text-primary">Blog</Link></li>
                <li><Link href="#" className="hover:text-primary">Contact</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <p className="font-semibold text-foreground mb-4">Legal</p>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="#" className="hover:text-primary">Privacy</Link></li>
                <li><Link href="#" className="hover:text-primary">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 CareerAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
