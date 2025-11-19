"use client"

import { useState } from "react"

interface RelativeSettingsPageProps {
  onBack: () => void
}

export default function RelativeSettingsPage({ onBack }: RelativeSettingsPageProps) {
  const [pushNotif, setPushNotif] = useState(true)
  const [smsNotif, setSmsNotif] = useState(true)
  const [callNotif, setCallNotif] = useState(false)
  const [fullTime, setFullTime] = useState(true)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted text-foreground p-3 sm:p-6 flex items-center justify-between shadow-xl border-b-4 border-border">
        <button
          onClick={onBack}
          className="text-lg sm:text-3xl font-bold hover:opacity-80 transition-all min-w-14 sm:min-w-[100px] text-left"
        >
          ← กลับ
        </button>
        <h1 className="text-base sm:text-3xl md:text-4xl font-bold text-center leading-tight px-2">
          ตั้งค่าการแจ้งเตือน
        </h1>
        <div className="w-14 sm:w-[100px]" />
      </div>

      {/* Content */}
      <div className="flex-1 p-4 sm:p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-5 sm:space-y-8">
          {/* ช่องทางการแจ้งเตือน */}
          <div className="bg-card rounded-2xl p-5 sm:p-8 border-4 border-border shadow-lg">
            <h2 className="text-xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-6 flex items-center gap-3">
              <span className="text-3xl sm:text-5xl">📢</span>
              ช่องทางการแจ้งเตือน
            </h2>
            <div className="space-y-4 sm:space-y-6">
              {/* Push Notification */}
              <div className="flex items-center justify-between p-4 sm:p-5 bg-background rounded-xl border-2 border-border">
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-2xl sm:text-4xl">📱</span>
                  <div>
                    <p className="text-lg sm:text-2xl font-bold text-foreground">
                      การแจ้งเตือนในแอป
                    </p>
                    <p className="text-sm sm:text-lg text-muted-foreground">
                      Push Notification
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setPushNotif(!pushNotif)}
                  className={`w-16 h-8 sm:w-20 sm:h-10 rounded-full transition-all ${
                    pushNotif ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <div
                    className={`w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full shadow-lg transition-all ${
                      pushNotif ? "ml-9 sm:ml-11" : "ml-1"
                    }`}
                  />
                </button>
              </div>

              {/* SMS */}
              <div className="flex items-center justify-between p-4 sm:p-5 bg-background rounded-xl border-2 border-border">
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-2xl sm:text-4xl">💬</span>
                  <div>
                    <p className="text-lg sm:text-2xl font-bold text-foreground">ข้อความ SMS</p>
                    <p className="text-sm sm:text-lg text-muted-foreground">
                      รับการแจ้งเตือนทาง SMS
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSmsNotif(!smsNotif)}
                  className={`w-16 h-8 sm:w-20 sm:h-10 rounded-full transition-all ${
                    smsNotif ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <div
                    className={`w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full shadow-lg transition-all ${
                      smsNotif ? "ml-9 sm:ml-11" : "ml-1"
                    }`}
                  />
                </button>
              </div>

              {/* Call */}
              <div className="flex items-center justify-between p-4 sm:p-5 bg-background rounded-xl border-2 border-border">
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-2xl sm:text-4xl">📞</span>
                  <div>
                    <p className="text-lg sm:text-2xl font-bold text-foreground">การโทรเข้า</p>
                    <p className="text-sm sm:text-lg text-muted-foreground">
                      รับสายโทรเมื่อฉุกเฉิน
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setCallNotif(!callNotif)}
                  className={`w-16 h-8 sm:w-20 sm:h-10 rounded-full transition-all ${
                    callNotif ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <div
                    className={`w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full shadow-lg transition-all ${
                      callNotif ? "ml-9 sm:ml-11" : "ml-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* เวลาที่ต้องการรับการแจ้งเตือน */}
          <div className="bg-card rounded-2xl p-5 sm:p-8 border-4 border-border shadow-lg">
            <h2 className="text-xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-6 flex items-center gap-3">
              <span className="text-3xl sm:text-5xl">🕐</span>
              เวลาที่รับการแจ้งเตือน
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <button
                onClick={() => setFullTime(true)}
                className={`w-full p-4 sm:p-6 rounded-xl font-bold text-lg sm:text-2xl border-4 transition-all ${
                  fullTime
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-foreground border-border"
                }`}
              >
                🕐 24 ชั่วโมง (ตลอดเวลา)
              </button>
              <button
                onClick={() => setFullTime(false)}
                className={`w-full p-4 sm:p-6 rounded-xl font-bold text-lg sm:text-2xl border-4 transition-all ${
                  !fullTime
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-foreground border-border"
                }`}
              >
                ⏰ ช่วงเวลาทำงาน (08:00 - 18:00)
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="bg-yellow-100 rounded-2xl p-5 sm:p-8 border-4 border-yellow-400">
            <p className="text-center text-lg sm:text-2xl font-bold text-foreground leading-relaxed">
              ⚠️ การแจ้งเตือนฉุกเฉินจะถูกส่งทุกครั้งโดยไม่คำนึงถึงการตั้งค่า
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
