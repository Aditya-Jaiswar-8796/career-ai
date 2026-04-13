'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { Sparkles, Github } from 'lucide-react'
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function SignupPage() {
  const containerRef = useRef(null)
  const formRef = useRef(null)
  const [userType, setUserType] = useState('seeker')
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreed: false,
    },
  })

  const password = watch('password')
  const agreed = watch('agreed')

  const signUp = async (formValues) => {
    const { name, email, password, confirmPassword } = formValues

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    const res = await fetch('/api/auth/signUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
        role: userType,
      }),
    })

    const data = await res.json()
    if (data.success) {
      toast.success('Account created successfully')
      await signIn('credentials', {
        email,
        password,
        redirect: false,
      })
      router.push('/')
      return
    }

    toast.error(data.message || 'Signup failed')
  }









  const handleUserTypeChange = (type) => {
    setUserType(type)
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-linear-to-br from-background via-card to-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="signup-glow absolute top-10 right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
      <div className="signup-glow absolute bottom-10 left-20 w-60 h-60 bg-accent/20 rounded-full blur-3xl" />

      <div ref={formRef} className="w-full border border-border/90 rounded-xl p-8 max-w-lg bg-white relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-primary mb-6">
            <Sparkles className="w-6 h-6" />
            CareerAI
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Create Your Account</h1>
          <p className="text-muted-foreground">Start transforming your career today</p>
        </div>

        {/* User Type Selection */}
        <div className="bg-muted-foreground/30 text-shadow-black relative rounded-lg border border-border/50 mb-6 flex gap-3 justify-between">
          <button
            onClick={() => handleUserTypeChange('seeker')}
            className=" flex-1 seeker py-2 px-3 z-20 rounded-lg hover:[&~span]:left-0.5 font-medium transition-all duration-300"

          >
            Job Seeker
          </button>
          <button
            onClick={() => handleUserTypeChange('recruiter')}
            className="flex-1 recruiter py-2 px-3 z-20 rounded-lg font-medium hover:[&~span]:left-55 transition-all duration-300"

          >
            Recruiter
          </button>
          <span className={`w-1/2 h-[90%] z-10 rounded-md top-0.5 ${userType == "seeker" ? "left-0.5" : "left-55 "} transition-all duration-500 bg-background absolute`}></span>
        </div>

        <form onSubmit={handleSubmit(signUp)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              {...register('name', { required: 'Full name is required' })}
              className=" w-full px-4 py-2 rounded-lg border border-border bg-background/50 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email',
                },
              })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background/50 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              className="form-input w-full px-4 py-2 rounded-lg border border-border bg-background/50 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.password && <p className="text-sm text-destructive mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              {...register('confirmPassword', {
                required: 'Confirm your password',
                validate: (value) => value === password || 'Passwords do not match',
              })}
              className="form-input w-full px-4 py-2 rounded-lg border border-border bg-background/50 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.confirmPassword && <p className="text-sm text-destructive mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <label className="form-input flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...register('agreed', {
                required: 'You must accept the AI Data Consent to continue',
              })}
              className="rounded mt-1"
            />
            <span className="text-sm text-muted-foreground">
              I agree to the{' '}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              , and I provide explicit consent for Career-AI to process my resume using third-party AI systems (Google Gemini) for career analysis.
            </span>
          </label>
          {errors.agreed && <p className="text-sm text-destructive mt-1">{errors.agreed.message}</p>}

          <button
            type="submit"
            disabled={!agreed}
            className="w-full py-2 whitespace-nowrap text-sm font-medium transition-all shrink-0 outline-none bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-lg px-6 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Create Account
          </button>
        </form>
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background text-muted-foreground">Or sign up with</span>
          </div>
        </div>

        <div className="space-y-3">
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all shrink-0 outline-none border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 w-full hover:[&>.icon]:bg-white">
            <span className='icon w-6 h-6 flex items-center justify-center  rounded-full'>
              <img className='w-4 h-4' src="/google.svg" alt="" />
            </span>
            Continue with Google
          </button>
          <button onClick={() => { signIn('github') }} className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium  shrink-0 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 w-full hover:[&>.icon]:fill-white">
            <Github className='icon w-5  h-5 fill-black' />
            Continue with GitHub
          </button>
        </div>
        <p className="login-link text-center text-sm text-muted-foreground mt-6">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
