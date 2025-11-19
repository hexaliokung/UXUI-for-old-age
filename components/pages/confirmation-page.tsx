"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ConfirmationPageProps {
  onBack: () => void
}

export default function ConfirmationPage({ onBack }: ConfirmationPageProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 items-center justify-center p-4 sm:p-8">
      {/* Confirmation Card */}
      <Card className="max-w-2xl w-full shadow-2xl border-0 bg-white/90 backdrop-blur-xl animate-bounce-slow">
        <CardContent className="p-6 sm:p-16 text-center">
        <div className="w-24 h-24 sm:w-40 sm:h-40 mx-auto mb-5 sm:mb-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-2xl animate-bounce">
          <span className="text-6xl sm:text-9xl">✅</span>
        </div>
        <h1 className="text-2xl sm:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4 sm:mb-6 text-pretty leading-tight px-2">ส่งข้อความเรียบร้อยแล้ว</h1>
        <p className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent mb-6 sm:mb-10">ระบบได้รับการแจ้งเหตุของคุณแล้ว 🎉</p>

        {/* Back Button */}
        <Button
          onClick={onBack}
          className="w-full rounded-3xl p-5 sm:p-8 font-bold text-2xl sm:text-4xl transition-all duration-300 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.5)] active:scale-95 min-h-20 sm:min-h-[120px] h-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
        >
          กลับสู่หน้าแรก ✨
        </Button>
        </CardContent>
      </Card>
    </div>
  )
}
