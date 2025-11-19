"use client"

interface ConfirmationPageProps {
  onBack: () => void
}

export default function ConfirmationPage({ onBack }: ConfirmationPageProps) {
  return (
    <div className="flex flex-col min-h-screen bg-linear-to-b from-green-100 to-background items-center justify-center p-4 sm:p-8">
      {/* Confirmation Card */}
      <div className="max-w-2xl w-full bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-16 text-center border-4 border-green-400 animate-pulse">
        <div className="text-6xl sm:text-9xl mb-5 sm:mb-8">✅</div>
        <h1 className="text-2xl sm:text-5xl font-bold text-foreground mb-4 sm:mb-6 text-pretty leading-tight px-2">ส่งข้อความเรียบร้อยแล้ว</h1>
        <p className="text-xl sm:text-3xl text-green-600 font-bold mb-6 sm:mb-10">ระบบได้รับการแจ้งเหตุของคุณแล้ว</p>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="w-full bg-primary hover:bg-primary/90 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 font-bold text-2xl sm:text-4xl transition-all shadow-2xl active:scale-98 min-h-20 sm:min-h-[120px]"
        >
          กลับสู่หน้าแรก
        </button>
      </div>
    </div>
  )
}
