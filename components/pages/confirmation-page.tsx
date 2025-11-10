"use client"

import { useEffect, useState } from "react"

interface ConfirmationPageProps {
  message: string
  icon: string
  onBack: () => void
}

export default function ConfirmationPage({ message, icon, onBack }: ConfirmationPageProps) {
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          onBack()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [onBack])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-100 to-background items-center justify-center p-8">
      {/* Confirmation Card */}
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-16 text-center border-4 border-green-400 animate-pulse">
        <div className="text-9xl mb-8">{icon}</div>
        <h1 className="text-5xl font-bold text-foreground mb-6 text-pretty leading-tight">{message}</h1>
        <p className="text-4xl text-green-600 font-bold mb-10">✓ ส่งข้อมูลสำเร็จแล้ว</p>

        {/* Countdown */}
        <div className="bg-muted rounded-3xl p-10 mb-8">
          <p className="text-3xl text-muted-foreground font-bold mb-2">กลับสู่หน้าหลักใน</p>
          <p className="text-7xl font-bold text-primary mt-4">{countdown} วินาที</p>
        </div>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="w-full bg-secondary hover:bg-secondary/90 text-white rounded-3xl p-8 font-bold text-4xl transition-all shadow-2xl active:scale-98 min-h-[100px]"
        >
          ← กลับหน้าหลัก
        </button>
      </div>
    </div>
  )
}
