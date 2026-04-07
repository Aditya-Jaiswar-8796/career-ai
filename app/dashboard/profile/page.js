'use client'

import { useEffect, useRef, useState } from 'react'
import { User, Mail, Lock, Bell, Shield, LogOut, Save } from 'lucide-react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'

export default function Profile() {
  const containerRef = useRef(null)
  const sectionsRef = useRef(null)
  const [user, setuser] = useState()
  const { data: session, status } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push('/auth/login')
    }
  }, [session, status, router])


  return (
    <div ref={containerRef} className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Account Settings</h1>
        <p className="text-muted-foreground">Manage your profile and preferences</p>
      </div>

      <div ref={sectionsRef} className="space-y-6">
        {/* Profile Section */}
        <section data-section className="p-6 rounded-xl shadow-sm border border-border bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">{session?.user.name}</h2>
              <p className="text-muted-foreground">{session?.user.email}</p>
            </div>
            <button className="ml-auto border border-border/80 rounded-lg hover:bg-muted/50 font-medium hover:scale-105 hover:text-accent active:scale-95 p-2">Change Avatar</button>
          </div>
        </section>

        {/* Personal Information */}
        <section data-section className="p-6 rounded-xl shadow-sm border border-border bg-card/50 backdrop-blur-sm">
          <h3 className="text-lg font-bold text-foreground mb-4">Personal Information</h3>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                <input className=" px-4 py-2 w-full rounded-lg border border-border bg-background/50 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" defaultValue={session?.user.name.split(' ')[0]} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                <input className=" px-4 py-2 w-full rounded-lg border border-border bg-background/50 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" defaultValue={session?.user.name.split(' ')[1]} />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                <input className="px-4 py-2 w-full rounded-lg border border-border bg-background/50 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" type="email" defaultValue={session?.user.email} disabled/>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                <input className="px-4 py-2 w-full rounded-lg border border-border bg-background/50 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" type="tel" onChange={(e) => { setuser(e.target.value) }} />
              </div>
            </div>
            <button className="gap-2 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all shrink-0 outline-none bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-md px-6">
              <Save className="w-4 h-4 " />
              Save Changes
            </button>
          </div>
        </section>

        {/* Professional Information */}
        <section data-section className="p-6 rounded-xl shadow-sm border border-border bg-card/50 backdrop-blur-sm">
          <h3 className="text-lg font-bold text-foreground mb-4">Professional Information</h3>
          <div className="flex flex-col mb-4  md:flex-row justify-between items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Current Title</label>
              <input className=" px-4 py-2 rounded-lg border border-border bg-background/50 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Company</label>
              <input className=" px-4 py-2 rounded-lg border border-border bg-background/50 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-nowrap text-foreground mb-2">Years of Experience</label>
              <input className=" px-4 py-2 w-30 rounded-lg border border-border bg-background/50 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" type="number" />
            </div>
          </div>
          <button className="gap-2 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all shrink-0 outline-none bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-md px-6">
            <Save className="w-4 h-4 " />
            Save Changes
          </button>
        </section>

        {/* Security */}
        <section data-section className="p-6 rounded-xl shadow-sm border border-border bg-card/50 backdrop-blur-sm">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            Security
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-foreground font-medium mb-3">Change Password</p>
              <div className="flex flex-col  md:flex-row justify-between items-center gap-4">
                <input className=" px-4 py-2 rounded-lg border border-border bg-background/50 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" type="password" placeholder='Current Password'/>
                <input className=" px-4 py-2 rounded-lg border border-border bg-background/50 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" type="password" placeholder='New Password'/>
                <input className=" px-4 py-2 rounded-lg border border-border bg-background/50 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" type="password" placeholder='Confirm Password'/>
              </div>
            </div>
            <button className="gap-2 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all shrink-0 outline-none bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-md px-6">
              <Lock className="w-4 h-4" />
              Update Password
            </button>
          </div>
        </section>

        {/* Notifications */}
        <section data-section className="p-6 rounded-xl shadow-sm border border-border bg-card/50 backdrop-blur-sm">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Notifications
          </h3>
          <div className="space-y-3">
            {[
              { label: 'Email notifications for new job matches', defaultChecked: true },
              { label: 'Weekly resume tips and insights', defaultChecked: true },
              { label: 'Marketing emails', defaultChecked: false },
              { label: 'Product updates', defaultChecked: true }
            ].map((notification, idx) => (
              <label key={idx} className="flex items-center gap-3 cursor-pointer">
                <input type='checkbox'
                  defaultChecked={notification.defaultChecked}

                />
                <span className="text-foreground">{notification.label}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Privacy & Data */}
        <section data-section className="p-6 rounded-xl shadow-sm border border-border bg-card/50 backdrop-blur-sm">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Privacy & Data
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-foreground font-medium mb-2">Data & Privacy</p>
              <p className="text-sm text-muted-foreground mb-4">
                Manage how your data is used and shared
              </p>
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none shrink-0 outline-none border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md px-3 gap-2">Data Request</button>
            </div>
            <div className="border-t border-border pt-4">
              <p className="text-sm text-foreground font-medium mb-2">Download Your Data</p>
              <p className="text-sm text-muted-foreground mb-4">
                Download a copy of all your profile data
              </p>
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none shrink-0 outline-none border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md px-3 gap-2">Download Data</button>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section data-section className="p-6 rounded-xl shadow-sm border border-destructive/20 bg-destructive/5">
          <h3 className="text-lg font-bold text-destructive mb-4">Danger Zone</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-foreground font-medium mb-2">Delete Account</p>
              <p className="text-sm text-muted-foreground mb-4">
                Permanently delete your account and all associated data
              </p>
              <button  className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none bg-destructive text-white hover:bg-destructive/90 dark:bg-destructive/60 h-8 rounded-md gap-1.5 px-3 ">Delete Account</button>
            </div>
            <div className="border-t border-destructive/20 pt-4">
              <p className="text-sm text-foreground font-medium mb-2">Logout All Devices</p>
              <p className="text-sm text-muted-foreground mb-4">
                Sign out from all active sessions
              </p>
              <button variant="outline" size="sm" className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none shrink-0 outline-none border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-8 rounded-md px-3 gap-2">
                <LogOut className="w-4 h-4" />
                Logout All
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
