"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {supabase} from '@/supabase-client' // check your export/import!
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    let error

    if (isSignUp) {
      const { error: signUpError } = await supabase.auth.signUp({ email, password })
      error = signUpError
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
      error = signInError
    }

    if (error) {
      alert(error.message)
      return
    }

    alert(isSignUp ? '檢查您的信箱是否有確認電子郵件。' : '登入成功！')
    router.push('/')
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <Card className='w-full max-w-sm'>
        <CardTitle>{isSignUp ? '註冊' : '登入'}</CardTitle>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">電子郵件</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">密碼</Label>
                  
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button variant={"default"} type="submit" className="w-full cursor-pointer">
              {isSignUp ? '註冊' : '登入'}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsSignUp(!isSignUp)}
			  className='cursor-pointer text-blue-200'
            >
              {isSignUp ? '已有帳號? 登入' : '沒有帳號? 註冊'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default AuthPage