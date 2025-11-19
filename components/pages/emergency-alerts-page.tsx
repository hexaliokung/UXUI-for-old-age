"use client"

import { useState } from "react"

interface EmergencyAlertsPageProps {
  onBack: () => void
}

const alerts = [
  {
    id: 1,
    date: "15 พ.ย. 2568",
    time: "14:30",
    message: "เกิดเหตุฉุกเฉินที่บ้าน ขอความช่วยเหลือด่วน",
    location: "ใกล้วัดบ้านกลาง",
    status: "completed",
    hasImage: true,
    hasVoice: false,
  },
  {
    id: 2,
    date: "10 พ.ย. 2568",
    time: "09:15",
    message: "ล้มหกล้ม ขอความช่วยเหลือ",
    location: "บ้านของฉัน",
    status: "completed",
    hasImage: false,
    hasVoice: true,
  },
  {
    id: 3,
    date: "5 พ.ย. 2568",
    time: "16:45",
    message: "ปวดท้องรุนแรง",
    location: "ตลาดหลัก",
    status: "completed",
    hasImage: true,
    hasVoice: true,
  },
]

export default function EmergencyAlertsPage({ onBack }: EmergencyAlertsPageProps) {
  const [selectedAlert, setSelectedAlert] = useState<number | null>(null)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <span className="bg-primary/10 text-primary px-3 sm:px-5 py-1 sm:py-2 rounded-full text-sm sm:text-xl font-bold border-2 border-primary/30">
            เสร็จสิ้น
          </span>
        )
      case "inProgress":
        return (
          <span className="bg-yellow-100 text-yellow-800 px-3 sm:px-5 py-1 sm:py-2 rounded-full text-sm sm:text-xl font-bold border-2 border-yellow-400">
            กำลังดำเนินการ
          </span>
        )
      case "received":
        return (
          <span className="bg-primary/10 text-primary px-3 sm:px-5 py-1 sm:py-2 rounded-full text-sm sm:text-xl font-bold border-2 border-primary/30">
            รับการแจ้งแล้ว
          </span>
        )
      default:
        return null
    }
  }

  return (
        <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="bg-destructive text-destructive-foreground p-3 sm:p-6 flex items-center justify-between shadow-xl">
        <button
          onClick={onBack}
          className="text-lg sm:text-3xl font-bold hover:opacity-80 transition-all min-w-14 sm:min-w-[100px] text-left"
        >
          ← กลับ
        </button>
        <h1 className="text-base sm:text-3xl md:text-4xl font-bold text-center leading-tight px-2">
          ประวัติการแจ้งเหตุ
        </h1>
        <div className="w-14 sm:w-[100px]" />
      </div>

      {/* Content */}
      <div className="flex-1 p-4 sm:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-card rounded-2xl p-5 sm:p-8 border-4 border-border shadow-lg hover:shadow-xl transition-all cursor-pointer"
              onClick={() => setSelectedAlert(selectedAlert === alert.id ? null : alert.id)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <span className="text-2xl sm:text-4xl">🚨</span>
                    <div>
                      <p className="text-lg sm:text-2xl font-bold text-foreground">
                        {alert.date} • {alert.time}
                      </p>
                    </div>
                  </div>
                </div>
                {getStatusBadge(alert.status)}
              </div>

              {/* Message */}
              <div className="mb-3 sm:mb-4">
                <p className="text-xl sm:text-3xl font-bold text-foreground mb-2">{alert.message}</p>
                <div className="flex items-center gap-2 sm:gap-3 text-base sm:text-2xl text-muted-foreground">
                  <span>📍</span>
                  <span>{alert.location}</span>
                </div>
              </div>

              {/* Media indicators */}
              <div className="flex gap-3 sm:gap-4 mb-3 sm:mb-4">
                {alert.hasImage && (
                  <span className="bg-secondary/20 text-secondary-foreground px-3 sm:px-5 py-1 sm:py-2 rounded-full text-sm sm:text-xl font-bold border-2 border-secondary">
                    📷 รูปภาพ
                  </span>
                )}
                {alert.hasVoice && (
                  <span className="bg-accent/20 text-accent-foreground px-3 sm:px-5 py-1 sm:py-2 rounded-full text-sm sm:text-xl font-bold border-2 border-accent">
                    🎤 เสียง
                  </span>
                )}
              </div>

              {/* Expanded Details */}
              {selectedAlert === alert.id && (
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t-2 border-border">
                  <div className="space-y-3 sm:space-y-4">
                    {alert.hasImage && (
                      <div className="bg-muted rounded-xl p-3 sm:p-5">
                        <p className="text-base sm:text-xl font-bold text-foreground mb-2">
                          รูปภาพที่แนบ:
                        </p>
                        <div className="bg-background rounded-lg h-32 sm:h-48 flex items-center justify-center border-2 border-border">
                          <span className="text-4xl sm:text-6xl">🖼️</span>
                        </div>
                      </div>
                    )}
                    {alert.hasVoice && (
                      <div className="bg-muted rounded-xl p-3 sm:p-5">
                        <p className="text-base sm:text-xl font-bold text-foreground mb-2">
                          บันทึกเสียง:
                        </p>
                        <button className="w-full bg-accent text-accent-foreground rounded-lg p-3 sm:p-5 font-bold text-lg sm:text-2xl flex items-center justify-center gap-2 sm:gap-3">
                          <span className="text-2xl sm:text-4xl">▶️</span>
                          <span>เล่นเสียง</span>
                        </button>
                      </div>
                    )}
                    <div className="bg-primary/10 rounded-xl p-4 sm:p-6 border-2 border-primary/30">
                      <p className="text-lg sm:text-2xl font-bold text-primary text-center">
                        ✓ ได้รับการช่วยเหลือเรียบร้อยแล้ว
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
