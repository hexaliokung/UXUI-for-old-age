"use client"

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
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="bg-linear-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground p-4 sm:p-8 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-4xl font-bold mb-1">สวัสดี, {userName}</h1>
            <p className="text-base sm:text-2xl">ระบบดูแลชุมชน</p>
          </div>
          <button
            onClick={onSettings}
            className="text-3xl sm:text-5xl hover:scale-110 transition-all"
          >
            ⚙️
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-5 sm:space-y-8">
          {/* ปุ่มฉุกเฉิน - ยังคงเด่นอยู่ */}
          <button
            onClick={onEmergency}
            className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-2xl sm:rounded-3xl p-6 sm:p-10 font-bold text-2xl sm:text-4xl shadow-2xl transition-all flex items-center justify-center gap-4 sm:gap-6 border-4 border-destructive/20 active:scale-98 min-h-[120px] sm:min-h-[160px] animate-pulse"
          >
            <span className="text-5xl sm:text-7xl">🆘</span>
            <span>ขอความช่วยเหลือฉุกเฉิน</span>
          </button>

          {/* เมนูหลัก */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {/* แจ้งปัญหาชุมชน */}
            <button
              onClick={onReportIssue}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-2xl p-5 sm:p-8 font-bold text-lg sm:text-2xl shadow-xl transition-all flex flex-col items-center gap-3 sm:gap-4 border-4 border-secondary/30 active:scale-98 min-h-[140px] sm:min-h-[180px]"
            >
              <span className="text-5xl sm:text-7xl">🛠️</span>
              <span className="text-center leading-tight">แจ้งปัญหาชุมชน</span>
            </button>

            {/* ข่าวสารชุมชน */}
            <button
              onClick={onNews}
              className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-2xl p-5 sm:p-8 font-bold text-lg sm:text-2xl shadow-xl transition-all flex flex-col items-center gap-3 sm:gap-4 border-4 border-accent/30 active:scale-98 min-h-[140px] sm:min-h-[180px]"
            >
              <span className="text-5xl sm:text-7xl">📢</span>
              <span className="text-center leading-tight">ข่าวสารชุมชน</span>
            </button>

            {/* กิจกรรมชุมชน */}
            <button
              onClick={onActivities}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl p-5 sm:p-8 font-bold text-lg sm:text-2xl shadow-xl transition-all flex flex-col items-center gap-3 sm:gap-4 border-4 border-primary/30 active:scale-98 min-h-[140px] sm:min-h-[180px]"
            >
              <span className="text-5xl sm:text-7xl">🎉</span>
              <span className="text-center leading-tight">กิจกรรมชุมชน</span>
            </button>

            {/* ตั้งค่า */}
            <button
              onClick={onSettings}
              className="bg-muted hover:bg-muted/80 text-foreground rounded-2xl p-5 sm:p-8 font-bold text-lg sm:text-2xl shadow-xl transition-all flex flex-col items-center gap-3 sm:gap-4 border-4 border-border active:scale-98 min-h-[140px] sm:min-h-[180px]"
            >
              <span className="text-5xl sm:text-7xl">⚙️</span>
              <span className="text-center leading-tight">ตั้งค่า</span>
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
