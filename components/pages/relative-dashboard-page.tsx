"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getRelativeElderlyList } from "@/lib/mock-users"
import { useState, useEffect } from "react"

interface RelativeDashboardPageProps {
  userId: string
  userName: string
  onEmergencyAlerts: () => void
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
  onEmergencyAlerts,
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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white p-4 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-pulse" />
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
                        <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
                          <span className="text-3xl sm:text-5xl">✅</span>
                        </div>
                        <p className="text-sm sm:text-lg font-bold text-green-600 text-center">ปกติ</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* เมนูหลัก */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {/* ติดตามสถานะคำร้อง */}
            <button
              onClick={onRequestTracking}
              className="bg-gradient-to-br from-indigo-400 to-purple-600 hover:from-indigo-500 hover:to-purple-700 text-white rounded-2xl p-5 sm:p-8 font-bold text-lg sm:text-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center gap-3 sm:gap-4 border-0 active:scale-95 min-h-[140px] sm:min-h-[180px] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center relative z-10">
                <span className="text-5xl sm:text-7xl">📋</span>
              </div>
              <span className="text-center leading-tight relative z-10">ติดตามสถานะคำร้อง</span>
            </button>

            {/* ตั้งค่าการแจ้งเตือน */}
            <button
              onClick={onNotificationSettings}
              className="bg-gradient-to-br from-green-400 to-teal-600 hover:from-green-500 hover:to-teal-700 text-white rounded-2xl p-5 sm:p-8 font-bold text-lg sm:text-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center gap-3 sm:gap-4 border-0 active:scale-95 min-h-[140px] sm:min-h-[180px] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center relative z-10">
                <span className="text-5xl sm:text-7xl">🔔</span>
              </div>
              <span className="text-center leading-tight relative z-10">ตั้งค่าการแจ้งเตือน</span>
            </button>

            {/* การแจ้งเตือนฉุกเฉิน */}
            <button
              onClick={onEmergencyAlerts}
              className="bg-gradient-to-br from-red-400 to-pink-600 hover:from-red-500 hover:to-pink-700 text-white rounded-2xl p-5 sm:p-8 font-bold text-lg sm:text-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center gap-3 sm:gap-4 border-0 active:scale-95 min-h-[140px] sm:min-h-[180px] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center relative z-10">
                <span className="text-5xl sm:text-7xl">🚨</span>
              </div>
              <span className="text-center leading-tight relative z-10">การแจ้งเตือนฉุกเฉิน</span>
            </button>

            {/* แจ้งปัญหาชุมชน */}
            <button
              onClick={onReportIssue}
              className="bg-gradient-to-br from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white rounded-2xl p-5 sm:p-8 font-bold text-lg sm:text-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center gap-3 sm:gap-4 border-0 active:scale-95 min-h-[140px] sm:min-h-[180px] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center relative z-10">
                <span className="text-5xl sm:text-7xl">🛠️</span>
              </div>
              <span className="text-center leading-tight relative z-10">แจ้งปัญหาชุมชน</span>
            </button>

            {/* ข่าวสารชุมชน */}
            <button
              onClick={onNews}
              className="bg-gradient-to-br from-blue-400 to-indigo-600 hover:from-blue-500 hover:to-indigo-700 text-white rounded-2xl p-5 sm:p-8 font-bold text-lg sm:text-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center gap-3 sm:gap-4 border-0 active:scale-95 min-h-[140px] sm:min-h-[180px] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center relative z-10">
                <span className="text-5xl sm:text-7xl">📢</span>
              </div>
              <span className="text-center leading-tight relative z-10">ข่าวสารชุมชน</span>
            </button>

            {/* กิจกรรมชุมชน */}
            <button
              onClick={onActivities}
              className="bg-gradient-to-br from-purple-400 to-pink-600 hover:from-purple-500 hover:to-pink-700 text-white rounded-2xl p-5 sm:p-8 font-bold text-lg sm:text-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center gap-3 sm:gap-4 border-0 active:scale-95 min-h-[140px] sm:min-h-[180px] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center relative z-10">
                <span className="text-5xl sm:text-7xl">🎉</span>
              </div>
              <span className="text-center leading-tight relative z-10">กิจกรรมชุมชน</span>
            </button>

            {/* ตั้งค่า */}
            <button
              onClick={onSettings}
              className="bg-gradient-to-br from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 text-white rounded-2xl p-5 sm:p-8 font-bold text-lg sm:text-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center gap-3 sm:gap-4 border-0 active:scale-95 min-h-[140px] sm:min-h-[180px] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center relative z-10">
                <span className="text-5xl sm:text-7xl">⚙️</span>
              </div>
              <span className="text-center leading-tight relative z-10">ตั้งค่า</span>
            </button>
          </div>

          {/* ข้อมูลติดต่อด่วน */}
          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-lg">
            <CardContent className="p-5 sm:p-8">
              <p className="text-xl sm:text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 sm:mb-6">📞 ข้อมูลติดต่อด่วน</p>
              <div className="space-y-3 sm:space-y-4">
                <Card className="bg-gradient-to-br from-white to-blue-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                        <span className="text-3xl sm:text-5xl">🚓</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-lg sm:text-2xl font-bold text-gray-800">ตำรวจ</p>
                        <p className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">191</p>
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
                      <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                        <span className="text-3xl sm:text-5xl">🚑</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-lg sm:text-2xl font-bold text-gray-800">กู้ภัย</p>
                        <p className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">1669</p>
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
