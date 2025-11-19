"use client"

interface HomePageProps {
  onEmergency: () => void
  onLogin: () => void
}

export default function HomePage({ onEmergency, onLogin }: HomePageProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground p-4 sm:p-8 text-center shadow-lg">
        <h1 className="text-2xl sm:text-5xl md:text-6xl font-bold mb-1 sm:mb-3">ยินดีต้อนรับ</h1>
        <p className="text-lg sm:text-2xl md:text-3xl font-semibold">ระบบดูแลชุมชน</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 gap-5 sm:gap-8 py-6 sm:py-12">
        {/* Emergency Button - ใหญ่สุด สีเด่น */}
        <div className="w-full max-w-3xl">
          <button
            onClick={onEmergency}
            className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-2xl sm:rounded-3xl p-8 sm:p-16 font-bold text-3xl sm:text-5xl md:text-6xl shadow-2xl hover:shadow-3xl transition-all duration-200 flex flex-col items-center gap-4 sm:gap-6 border-4 border-destructive/20 active:scale-98 min-h-[180px] sm:min-h-[280px] animate-pulse"
          >
            <span className="text-7xl sm:text-9xl">🆘</span>
            <span className="leading-tight text-center">ขอความช่วยเหลือฉุกเฉิน</span>
          </button>
        </div>

        {/* Login Button - ขนาดเล็กกว่า */}
        <div className="w-full max-w-2xl">
          <button
            onClick={onLogin}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl sm:rounded-2xl p-4 sm:p-8 font-bold text-xl sm:text-3xl shadow-xl transition-all flex items-center justify-center gap-3 sm:gap-4 border-4 border-primary/20 active:scale-98 min-h-[80px] sm:min-h-[120px]"
          >
            <span className="text-4xl sm:text-5xl">🔐</span>
            <span>เข้าสู่ระบบ / สมัครสมาชิก</span>
          </button>
        </div>

        {/* ข้อมูลติดต่อด่วน */}
        <div className="w-full max-w-3xl bg-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 border-4 border-border shadow-xl">
          <p className="text-xl sm:text-3xl font-bold text-center text-foreground mb-4 sm:mb-6">📞 ข้อมูลติดต่อด่วน</p>
          <div className="space-y-3 sm:space-y-4">
            <div className="bg-background rounded-xl p-4 sm:p-6 border-2 border-border">
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="text-3xl sm:text-5xl">🚓</span>
                <div className="flex-1">
                  <p className="text-lg sm:text-2xl font-bold text-foreground">ตำรวจ</p>
                  <p className="text-xl sm:text-3xl font-bold text-primary">191</p>
                </div>
              </div>
            </div>
            <div className="bg-background rounded-xl p-4 sm:p-6 border-2 border-border">
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="text-3xl sm:text-5xl">🚒</span>
                <div className="flex-1">
                  <p className="text-lg sm:text-2xl font-bold text-foreground">ดับเพลิง</p>
                  <p className="text-xl sm:text-3xl font-bold text-primary">199</p>
                </div>
              </div>
            </div>
            <div className="bg-background rounded-xl p-4 sm:p-6 border-2 border-border">
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="text-3xl sm:text-5xl">🚑</span>
                <div className="flex-1">
                  <p className="text-lg sm:text-2xl font-bold text-foreground">กู้ภัย</p>
                  <p className="text-xl sm:text-3xl font-bold text-primary">1669</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-muted text-muted-foreground text-center py-3 sm:py-6 text-lg sm:text-2xl font-semibold border-t-4 border-border">
        🏘️ ดูแลชุมชนของเราด้วยกัน
      </div>
    </div>
  )
}
