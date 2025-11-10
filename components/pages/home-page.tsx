"use client"

interface HomePageProps {
  onEmergency: () => void
  onReport: () => void
  onNews: () => void
}

export default function HomePage({ onEmergency, onReport, onNews }: HomePageProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground p-6 sm:p-10 text-center shadow-lg">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-2 sm:mb-4">ยินดีต้อนรับ</h1>
        <p className="text-2xl sm:text-3xl md:text-4xl font-semibold">ระบบดูแลชุมชน</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 gap-6 sm:gap-10 py-8 sm:py-12">
        {/* Action Buttons */}
        <div className="w-full max-w-3xl space-y-5 sm:space-y-8">
          {/* Emergency Button */}
          <button
            onClick={onEmergency}
            className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-2xl sm:rounded-3xl p-8 sm:p-12 font-bold text-3xl sm:text-4xl md:text-5xl shadow-2xl hover:shadow-3xl transition-all duration-200 flex flex-col items-center gap-3 sm:gap-5 border-4 border-destructive/20 active:scale-98 min-h-[160px] sm:min-h-[200px]"
          >
            <span className="text-6xl sm:text-8xl">🆘</span>
            <span className="leading-tight text-center">ขอความช่วยเหลือฉุกเฉิน</span>
          </button>

          {/* Report Button */}
          <button
            onClick={onReport}
            className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-2xl sm:rounded-3xl p-8 sm:p-12 font-bold text-3xl sm:text-4xl md:text-5xl shadow-2xl hover:shadow-3xl transition-all duration-200 flex flex-col items-center gap-3 sm:gap-5 border-4 border-secondary/20 active:scale-98 min-h-[160px] sm:min-h-[200px]"
          >
            <span className="text-6xl sm:text-8xl">🛠️</span>
            <span className="leading-tight text-center">แจ้งปัญหาในชุมชน</span>
          </button>

          {/* News Button */}
          <button
            onClick={onNews}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-2xl sm:rounded-3xl p-8 sm:p-12 font-bold text-3xl sm:text-4xl md:text-5xl shadow-2xl hover:shadow-3xl transition-all duration-200 flex flex-col items-center gap-3 sm:gap-5 border-4 border-accent/20 active:scale-98 min-h-[160px] sm:min-h-[200px]"
          >
            <span className="text-6xl sm:text-8xl">📢</span>
            <span className="leading-tight text-center">ข่าวสารชุมชน</span>
          </button>
        </div>

        {/* Info Card */}
        <div className="w-full max-w-3xl bg-card rounded-2xl sm:rounded-3xl p-6 sm:p-10 border-4 border-border shadow-xl">
          <p className="text-2xl sm:text-3xl font-bold text-center text-foreground mb-3 sm:mb-4">ℹ️ ต้องการความช่วยเหลือ?</p>
          <p className="text-xl sm:text-2xl text-center text-foreground leading-relaxed">
            กดปุ่มด้านบนเพื่อขอความช่วยเหลือ<br className="sm:hidden" /> หรือแบ่งปันข่าวสารกับเพื่อนบ้าน
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-muted text-muted-foreground text-center py-4 sm:py-6 text-xl sm:text-2xl font-semibold border-t-4 border-border">
        🏘️ ดูแลชุมชนของเราด้วยกัน
      </div>
    </div>
  )
}
