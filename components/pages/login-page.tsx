"use client"

import type React from "react"
import { useState } from "react"
import { authenticateUser } from "@/lib/mock-users"

interface LoginPageProps {
  onLoginSuccess: (userId: string, name: string, phoneNumber: string) => void
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!phoneNumber.trim()) {
      setError("กรุณาใส่เบอร์โทรศัพท์")
      setIsLoading(false)
      return
    }

    if (phoneNumber.replace(/\D/g, "").length < 9) {
      setError("เบอร์โทรไม่ถูกต้อง กรุณาใส่เบอร์ให้ครบ")
      setIsLoading(false)
      return
    }

    try {
      const result = await authenticateUser(phoneNumber)

      if (result.success) {
        onLoginSuccess(result.user.id, result.user.name, result.user.phoneNumber)
      } else {
        setError("ไม่พบผู้ใช้งาน กรุณาตรวจสอบเบอร์โทร")
      }
    } catch (err) {
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-card flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6 p-6 bg-primary rounded-3xl shadow-xl">
            <span className="text-8xl">🏘️</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 text-balance">ระบบดูแลชุมชน</h1>
          <p className="text-3xl md:text-4xl text-muted-foreground text-balance font-semibold">ยินดีต้อนรับ</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Phone Number Input */}
          <div>
            <label htmlFor="phone" className="block text-3xl font-bold text-foreground mb-4">
              📱 เบอร์โทรศัพท์
            </label>
            <input
              id="phone"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="0812345678"
              className="w-full px-6 py-6 text-3xl border-4 border-border rounded-2xl bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/30 transition-all"
              disabled={isLoading}
            />
            <p className="text-xl text-muted-foreground mt-3 leading-relaxed">ตัวอย่าง: 0812345678, 0898765432 หรือ 0881234567</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-6 bg-destructive/15 border-4 border-destructive rounded-2xl">
              <p className="text-2xl text-destructive font-bold text-center">{error}</p>
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-8 py-8 text-4xl font-bold bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground rounded-2xl transition-all active:scale-98 shadow-2xl disabled:opacity-75 min-h-[100px]"
          >
            {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>

        {/* Help Text */}
        <div className="mt-10 p-8 bg-accent/20 border-4 border-accent rounded-2xl">
          <p className="text-center text-2xl font-bold text-foreground leading-relaxed">
            👨‍🤝‍👨 กรุณาใส่เบอร์โทรศัพท์ของท่านเพื่อเข้าสู่ระบบ
          </p>
        </div>

        {/* Demo Info */}
        <div className="mt-6 p-6 bg-muted rounded-2xl">
          <p className="text-center text-xl text-muted-foreground leading-relaxed">
            🔓 โหมดทดสอบ: ใช้เบอร์โทรตัวอย่างด้านบนได้เลย
          </p>
        </div>
      </div>
    </main>
  )
}
