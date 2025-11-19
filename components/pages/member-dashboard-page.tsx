"use client"

import { Button } from "@/components/ui/button"

interface MemberDashboardPageProps {
  userName: string
  onEmergency: () => void
  onReportIssue: () => void
  onNews: () => void
  onActivities: () => void
  onSettings: () => void
}

export default function MemberDashboardPage({
  userName,
  onEmergency,
  onReportIssue,
  onNews,
  onActivities,
  onSettings,
}: MemberDashboardPageProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 sm:p-8 shadow-2xl">
        <div className="absolute inset-0 opacity-10" />
        <div className="flex items-center justify-between relative z-10">
          <div>
            <h1 className="text-xl sm:text-4xl font-bold mb-1 drop-shadow-lg">สวัสดี, {userName} 👋</h1>
            <p className="text-base sm:text-2xl drop-shadow-md">ระบบดูแลชุมชน</p>
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
          {/* ปุ่มฉุกเฉิน - ยังคงเด่นอยู่ */}
          <Button
            onClick={onEmergency}
            className="w-full rounded-3xl p-6 sm:p-10 font-bold text-2xl sm:text-4xl shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(239,68,68,0.5)] transition-all duration-300 flex items-center justify-center gap-4 sm:gap-6 active:scale-95 min-h-[120px] sm:min-h-[160px] h-auto bg-gradient-to-br from-red-500 via-red-600 to-pink-600 hover:from-red-600 hover:via-red-700 hover:to-pink-700 text-white border-0 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="text-5xl sm:text-7xl animate-bounce relative z-10">🆘</span>
            <span className="relative z-10">ขอความช่วยเหลือฉุกเฉิน</span>
          </Button>

          {/* เมนูหลัก */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
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
        </div>
      </div>

      {/* Footer */}
      <div className="bg-muted text-muted-foreground text-center py-3 sm:py-6 text-base sm:text-xl font-semibold border-t-4 border-border">
        🏘️ ดูแลชุมชนของเราด้วยกัน
      </div>
    </div>
  )
}
