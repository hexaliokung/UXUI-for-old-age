"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface HomePageProps {
  onEmergency: () => void
  onLogin: () => void
}

export default function HomePage({ onEmergency, onLogin }: HomePageProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Welcome Banner */}
      <div className="bg-primary text-primary-foreground p-4 sm:p-8 text-center shadow-2xl">
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-5xl md:text-6xl font-bold mb-1 sm:mb-3 drop-shadow-lg">ยินดีต้อนรับ ✨</h1>
          <p className="text-lg sm:text-2xl md:text-3xl font-semibold drop-shadow-md">ระบบดูแลชุมชน</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 gap-5 sm:gap-8 py-6 sm:py-12">
        {/* Emergency Button - ใหญ่สุด สีเด่น */}
        <div className="w-full max-w-3xl">
          <Button
            onClick={onEmergency}
            className="w-full rounded-3xl sm:rounded-[2rem] p-8 sm:p-16 font-bold text-3xl sm:text-5xl md:text-6xl shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(239,68,68,0.5)] transition-all duration-300 flex flex-col items-center gap-4 sm:gap-6 active:scale-95 min-h-[180px] sm:min-h-[280px] h-auto bg-gradient-to-br from-red-500 via-red-600 to-pink-600 hover:from-red-600 hover:via-red-700 hover:to-pink-700 text-white border-0 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="text-7xl sm:text-9xl animate-bounce">🆘</span>
            <span className="leading-tight text-center relative z-10">ขอความช่วยเหลือฉุกเฉิน</span>
          </Button>
        </div>

        {/* Login Button - ขนาดเล็กกว่า */}
        <div className="w-full max-w-2xl">
          <Button
            onClick={onLogin}
            className="w-full rounded-2xl sm:rounded-3xl p-4 sm:p-8 font-bold text-xl sm:text-3xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 sm:gap-4 active:scale-95 min-h-20 sm:min-h-[120px] h-auto bg-secondary hover:bg-secondary/90 text-secondary-foreground border-0"
          >
            <span className="text-4xl sm:text-5xl">🔐</span>
            <span>เข้าสู่ระบบ / สมัครสมาชิก</span>
          </Button>
        </div>

        {/* ข้อมูลติดต่อด่วน */}
        <Card className="w-full max-w-3xl border-0 shadow-2xl bg-white/80 backdrop-blur-lg">
          <CardContent className="p-5 sm:p-8">
            <p className="text-xl sm:text-3xl font-bold text-center text-primary mb-4 sm:mb-6">📞 ข้อมูลติดต่อด่วน</p>
            <div className="space-y-3 sm:space-y-4">
              <Card className="bg-gradient-to-br from-white to-blue-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
                      <span className="text-3xl sm:text-5xl">🚓</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-lg sm:text-2xl font-bold text-gray-800">ตำรวจ</p>
                      <p className="text-xl sm:text-3xl font-bold text-primary">191</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-white to-red-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-lg">
                      <span className="text-3xl sm:text-5xl">🚒</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-lg sm:text-2xl font-bold text-gray-800">ดับเพลิง</p>
                      <p className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">199</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-white to-green-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
                      <span className="text-3xl sm:text-5xl">🚑</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-lg sm:text-2xl font-bold text-gray-800">กู้ภัย</p>
                      <p className="text-xl sm:text-3xl font-bold text-primary">1669</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="bg-muted text-muted-foreground text-center py-3 sm:py-6 text-lg sm:text-2xl font-semibold border-t-4 border-border">
        🏘️ ดูแลชุมชนของเราด้วยกัน
      </div>
    </div>
  )
}
