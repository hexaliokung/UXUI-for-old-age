"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getRelativeElderlyList } from "@/lib/mock-users"
import { useState, useEffect } from "react"

interface RelativeDashboardPageProps {
  userId: string
  userName: string
  onEmergency: () => void
  onReportIssue: () => void
  onNews: () => void
  onActivities: () => void
  onRequestTracking: () => void
  onNotificationSettings: () => void
  onSettings: () => void
}

export default function RelativeDashboardPage({
  userId,
  userName,
  onEmergency,
  onReportIssue,
  onNews,
  onActivities,
  onRequestTracking,
  onNotificationSettings,
  onSettings,
}: RelativeDashboardPageProps) {
  const [elderlyList, setElderlyList] = useState<Array<{
    id: string
    name: string
    age: number
    village: string
  }>>([])

  useEffect(() => {
    const elderly = getRelativeElderlyList(userId)
    setElderlyList(elderly.map(e => ({
      id: e.id,
      name: e.name,
      age: e.age,
      village: e.village
    })))
  }, [userId])

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 sm:p-8 shadow-2xl">
        <div className="flex items-center justify-between relative z-10">
          <div>
            <h1 className="text-xl sm:text-4xl font-bold mb-1 drop-shadow-lg">สวัสดี, {userName} 👋</h1>
            <p className="text-base sm:text-2xl drop-shadow-md">แดชบอร์ดญาติผู้ดูแล</p>
          </div>
          <button
            onClick={onSettings}
            className="text-3xl sm:text-5xl hover:scale-110 transition-all duration-300 hover:rotate-90"
          >
            ⚙️
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-5 sm:space-y-8">
          
          {/* ผู้สูงอายุที่ดูแล */}
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4 sm:mb-6 flex items-center gap-3">
              <span className="text-4xl sm:text-6xl">👴👵</span>
              ผู้สูงอายุที่ดูแล
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {elderlyList.map((elderly) => (
                <Card key={elderly.id} className="border-4 border-border shadow-xl hover:shadow-2xl transition-all">
                  <CardContent className="p-5 sm:p-8">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-3xl font-bold text-foreground mb-2">{elderly.name}</h3>
                        <div className="space-y-1 sm:space-y-2">
                          <p className="text-base sm:text-2xl text-muted-foreground">
                            🎂 อายุ {elderly.age} ปี
                          </p>
                          <p className="text-base sm:text-2xl text-muted-foreground">
                            🏘️ {elderly.village}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 sm:gap-3">
                        <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-primary flex items-center justify-center">
                          <span className="text-3xl sm:text-5xl">✅</span>
                        </div>
                        <p className="text-sm sm:text-lg font-bold text-primary text-center">ปกติ</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* ปุ่มฉุกเฉิน - ใหญ่และเด่นที่สุด */}
          <button
            onClick={onEmergency}
            className="w-full rounded-3xl p-6 sm:p-10 font-bold text-2xl sm:text-4xl shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(211,47,47,0.5)] transition-all duration-300 flex items-center justify-center gap-4 sm:gap-6 active:scale-95 min-h-[120px] sm:min-h-[160px] h-auto bg-destructive hover:bg-destructive/90 text-destructive-foreground border-0 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="text-5xl sm:text-7xl animate-bounce relative z-10">🆘</span>
            <span className="relative z-10">ขอความช่วยเหลือฉุกเฉิน</span>
          </button>

          {/* เมนูหลัก */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {/* ติดตามสถานะคำร้อง */}
            <button
              onClick={onRequestTracking}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-2xl p-5 sm:p-8 font-bold text-lg sm:text-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center gap-3 sm:gap-4 border-0 active:scale-95 min-h-[140px] sm:min-h-[180px]"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center relative z-10">
                <span className="text-5xl sm:text-7xl">📋</span>
              </div>
              <span className="text-center leading-tight relative z-10">ติดตามสถานะคำร้อง</span>
            </button>

            {/* ตั้งค่าการแจ้งเตือน */}
            <button
              onClick={onNotificationSettings}
              className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-2xl p-5 sm:p-8 font-bold text-lg sm:text-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center gap-3 sm:gap-4 border-0 active:scale-95 min-h-[140px] sm:min-h-[180px]"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center relative z-10">
                <span className="text-5xl sm:text-7xl">🔔</span>
              </div>
              <span className="text-center leading-tight relative z-10">ตั้งค่าการแจ้งเตือน</span>
            </button>

            {/* แจ้งปัญหาชุมชน */}
            <button
              onClick={onReportIssue}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl p-5 sm:p-8 font-bold text-lg sm:text-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center gap-3 sm:gap-4 border-0 active:scale-95 min-h-[140px] sm:min-h-[180px]"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center relative z-10">
                <span className="text-5xl sm:text-7xl">🛠️</span>
              </div>
              <span className="text-center leading-tight relative z-10">แจ้งปัญหาชุมชน</span>
            </button>

            {/* ข่าวสารชุมชน */}
            <button
              onClick={onNews}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-2xl p-5 sm:p-8 font-bold text-lg sm:text-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center gap-3 sm:gap-4 border-0 active:scale-95 min-h-[140px] sm:min-h-[180px]"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center relative z-10">
                <span className="text-5xl sm:text-7xl">📢</span>
              </div>
              <span className="text-center leading-tight relative z-10">ข่าวสารชุมชน</span>
            </button>

            {/* กิจกรรมชุมชน */}
            <button
              onClick={onActivities}
              className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-2xl p-5 sm:p-8 font-bold text-lg sm:text-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center gap-3 sm:gap-4 border-0 active:scale-95 min-h-[140px] sm:min-h-[180px]"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center relative z-10">
                <span className="text-5xl sm:text-7xl">🎉</span>
              </div>
              <span className="text-center leading-tight relative z-10">กิจกรรมชุมชน</span>
            </button>

            {/* ตั้งค่า */}
            <button
              onClick={onSettings}
              className="bg-muted hover:bg-muted/90 text-foreground rounded-2xl p-5 sm:p-8 font-bold text-lg sm:text-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center gap-3 sm:gap-4 border-0 active:scale-95 min-h-[140px] sm:min-h-[180px]"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center relative z-10">
                <span className="text-5xl sm:text-7xl">⚙️</span>
              </div>
              <span className="text-center leading-tight relative z-10">ตั้งค่า</span>
            </button>
          </div>

          {/* ข้อมูลติดต่อด่วน */}
          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-lg">
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
                <Card className="bg-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-destructive flex items-center justify-center shadow-lg">
                        <span className="text-3xl sm:text-5xl">🚒</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-lg sm:text-2xl font-bold text-gray-800">ดับเพลิง</p>
                        <p className="text-xl sm:text-3xl font-bold text-destructive-foreground">199</p>
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
      </div>

      {/* Footer */}
      <div className="bg-muted text-muted-foreground text-center py-3 sm:py-6 text-base sm:text-xl font-semibold border-t-4 border-border">
        💜 ดูแลคนที่เรารักด้วยกัน
      </div>
    </div>
  )
}
