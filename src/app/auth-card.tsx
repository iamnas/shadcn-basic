'use client'

import { useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function AuthCard() {
  const { data: session } = useSession()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    await signIn('credentials', { email, password })
  }

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{session ? 'Sign Out' : 'Sign In'}</CardTitle>
        <CardDescription>
          {session 
            ? `Signed in as ${session.user?.email}` 
            : 'Enter your credentials to sign in'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!session ? (
          <form onSubmit={handleSignIn}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </form>
        ) : null}
      </CardContent>
      <CardFooter className="flex justify-between">
        {session ? (
          <Button className="w-full" onClick={handleSignOut}>Sign Out</Button>
        ) : (
          <Button className="w-full" type="submit" onClick={handleSignIn}>Sign In</Button>
        )}
      </CardFooter>
    </Card>
  )
}