'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Github, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSession, signIn} from 'next-auth/react'

export default function LoginPage() {
  const containerRef = useRef(null)
  const formRef = useRef(null)
  const [email, setemail] = useState('')
  const [pass, setPass] = useState('')
  const router = useRouter()
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status]);

  const login = async () => {
    if (!email || !pass) {
      console.log("Please fill all required fields");
      return;
    }
    console.log("login....");
    
    const res = await signIn("credentials", {
      email,
      password: pass,
      redirect: false,
    });
    
    if (res?.error) {
      console.log("Login failed:", res.error);
      return;
    }
    
    console.log("no error....");
    router.push("/");
    router.refresh();
  }


  return (
    <div ref={containerRef} className=" bg-linear-to-br from-background via-card to-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="login-glow absolute top-10 right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
      <div className="login-glow absolute bottom-10 left-20 w-60 h-60 bg-accent/20 rounded-full blur-3xl" />

      <div ref={formRef} className="w-full border border-border/90 rounded-xl p-8 max-w-lg bg-white my-4  relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-primary mb-6">
            <Sparkles className="w-6 h-6" />
            CareerAI
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to continue to your dashboard</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <input
              type="email" onChange={(e) => { setemail(e.target.value) }}
              placeholder="you@example.com"
              className="form-input w-full px-4 py-2 rounded-lg border border-border bg-background/50 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
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

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="form-input rounded" />
              <span className="text-muted-foreground">Remember me</span>
            </label>
            <Link href="#" className="text-primary hover:underline">
              Forgot password?
            </Link>
          </div>

          <button type="button" onClick={login} className="w-full py-2 whitespace-nowrap text-sm font-medium transition-all shrink-0 outline-none bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-lg px-6">
            Sign In
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
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

        <p className="signup-link text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="text-primary font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
