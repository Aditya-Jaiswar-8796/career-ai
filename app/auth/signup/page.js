'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Sparkles, Github } from 'lucide-react'
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const containerRef = useRef(null)
  const formRef = useRef(null)
  const [userType, setUserType] = useState('seeker')
  const [name, setName] = useState('')
  const [email, setemail] = useState('')
  const [pass, setPass] = useState('')
  const [cpass, setCpass] = useState('')
  const router = useRouter()



  const signUp = async (event) => {
    event?.preventDefault?.();

    if (!email || !pass || !cpass) {
      console.log("Please fill all required fields");
      return;
    }

    if (cpass !== pass) {
      console.log("Passwords do not match");
      return;
    }

    const res = await fetch("/api/auth/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password: pass,
        name,
        role: userType,
      }),
    });

    const data = await res.json();
    if (data.success) {
      await signIn("credentials", {
        email,
        password: pass,
        redirect: false,
      });
      router.push("/");
      return;
    }

    console.log("Signup failed:", data.message);
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

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
            <input
              type="text" value={name} onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className=" w-full px-4 py-2 rounded-lg border border-border bg-background/50 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <input
              type="email" value={email} onChange={(e) => setemail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background/50 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Password</label>
            <input
              type="password" onChange={(e) => { setPass(e.target.value) }}
              placeholder="••••••••"
              className="form-input w-full px-4 py-2 rounded-lg border border-border bg-background/50 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
            <input
              type="password" onChange={(e) => { setCpass(e.target.value) }}
              placeholder="••••••••"
              className="form-input w-full px-4 py-2 rounded-lg border border-border bg-background/50 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <label className="form-input flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded" />
            <span className="text-sm text-muted-foreground">
              I agree to the{' '}
              <Link href="#" className="text-primary hover:underline">
                Terms of Service
              </Link>
            </span>
          </label>

          <button type="button" onClick={signUp} className=" w-full py-2 whitespace-nowrap text-sm font-medium transition-all shrink-0 outline-none bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-lg px-6">
            Create Account
          </button>
        </form>

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
