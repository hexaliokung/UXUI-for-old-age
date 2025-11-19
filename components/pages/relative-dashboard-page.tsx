"use client"

import { useState } from "react"

interface RelativeDashboardPageProps {
  elderlyName: string
  onEmergencyCall: () => void
  onViewAlerts: () => void
  onSettings: () => void
}

export default function RelativeDashboardPage({
  elderlyName,
  onEmergencyCall,
  onViewAlerts,
  onSettings,
}: RelativeDashboardPageProps) {
  const [elderlyStatus, setElderlyStatus] = useState<"normal" | "emergency">("normal")

  const recentActivities = [
    { id: 1, action: "แจ้งปัญหา: ถนนชำรุด", time: "2 ชั่วโมงที่แล้ว" },
    { id: 2, action: "เข้าร่วมกิจกรรม: ทำบุญตักบาตร", time: "1 วันที่แล้ว" },
    { id: 3, action: "อ่านข่าวสาร: ตรวจสุขภาพฟรี", time: "2 วันที่แล้ว" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="bg-linear-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground p-4 sm:p-8 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-4xl font-bold mb-1">แดชบอร์ดญาติ</h1>
            <p className="text-base sm:text-2xl">ติดตามดูแล: {elderlyName}</p>
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
          {/* สถานะผู้สูงอายุ */}
          <div
            className={`rounded-2xl sm:rounded-3xl p-6 sm:p-10 border-4 shadow-xl ${
              elderlyStatus === "emergency"
                ? "bg-red-100 border-red-500 animate-pulse"
                : "bg-green-100 border-green-500"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-2">
                  สถานะปัจจุบัน
                </h2>
                <p className="text-xl sm:text-3xl font-bold">
                  {elderlyStatus === "emergency" ? (
                    <span className="text-red-600">🚨 กำลังเรียกความช่วยเหลือ!</span>
                  ) : (
                    <span className="text-green-600">✓ ปกติ</span>
                  )}
                </p>
              </div>
              <span className="text-6xl sm:text-8xl">
                {elderlyStatus === "emergency" ? "🆘" : "😊"}
              </span>
            </div>
          </div>

          {/* ปุ่มติดต่อฉุกเฉิน */}
          <button
            onClick={onEmergencyCall}
            className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-2xl sm:rounded-3xl p-6 sm:p-10 font-bold text-2xl sm:text-4xl shadow-2xl transition-all flex items-center justify-center gap-4 sm:gap-6 border-4 border-destructive/20 active:scale-98 min-h-[120px] sm:min-h-[160px]"
          >
            <span className="text-5xl sm:text-7xl">📞</span>
            <span>ติดต่อฉุกเฉิน</span>
          </button>

          {/* ตำแหน่งล่าสุด */}
          {elderlyStatus === "emergency" && (
            <div className="bg-card rounded-2xl p-5 sm:p-8 border-4 border-border shadow-lg">
              <h3 className="text-xl sm:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="text-3xl sm:text-5xl">📍</span>
                ตำแหน่งล่าสุด
              </h3>
              <div className="bg-muted rounded-xl p-4 sm:p-6">
                <p className="text-lg sm:text-2xl text-foreground">
                  ใกล้วัดบ้านกลาง, ถนนหน้าวัด
                </p>
                <p className="text-base sm:text-xl text-muted-foreground mt-2">
                  อัพเดทเมื่อ: 2 นาทีที่แล้ว
                </p>
              </div>
            </div>
          )}

          {/* กิจกรรมล่าสุด */}
          <div className="bg-card rounded-2xl p-5 sm:p-8 border-4 border-border shadow-lg">
            <h3 className="text-xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-6 flex items-center gap-3">
              <span className="text-3xl sm:text-5xl">📋</span>
              กิจกรรมล่าสุด
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="bg-background rounded-xl p-4 sm:p-6 border-2 border-border"
                >
                  <p className="text-lg sm:text-2xl font-bold text-foreground mb-1">
                    {activity.action}
                  </p>
                  <p className="text-base sm:text-xl text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ดูประวัติการแจ้งเหตุ */}
          <button
            onClick={onViewAlerts}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-2xl p-5 sm:p-8 font-bold text-xl sm:text-3xl shadow-xl transition-all flex items-center justify-center gap-3 sm:gap-5 border-4 border-accent/30 active:scale-98"
          >
            <span className="text-4xl sm:text-6xl">📜</span>
            <span>ดูประวัติการแจ้งเหตุ</span>
          </button>
        </div>
      </div>
    </div>
  )
}
