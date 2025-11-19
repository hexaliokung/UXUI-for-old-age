"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface NotificationSettingsPageProps {
  onBack: () => void
  userName: string
}

interface NotificationChannel {
  id: string
  name: string
  icon: string
  enabled: boolean
  connected: boolean
  accountInfo?: string
}

export default function NotificationSettingsPage({ onBack, userName }: NotificationSettingsPageProps) {
  const [channels, setChannels] = useState<NotificationChannel[]>([
    {
      id: "line",
      name: "LINE",
      icon: "💚",
      enabled: true,
      connected: true,
      accountInfo: "@prim_wimon"
    },
    {
      id: "messenger",
      name: "Facebook Messenger",
      icon: "💙",
      enabled: false,
      connected: false,
      accountInfo: undefined
    },
    {
      id: "sms",
      name: "SMS",
      icon: "📱",
      enabled: true,
      connected: true,
      accountInfo: "089-123-4567"
    },
    {
      id: "phone",
      name: "โทรศัพท์",
      icon: "📞",
      enabled: true,
      connected: true,
      accountInfo: "089-123-4567"
    },
    {
      id: "email",
      name: "อีเมล",
      icon: "📧",
      enabled: false,
      connected: false,
      accountInfo: undefined
    }
  ])

  const [notificationTypes, setNotificationTypes] = useState({
    emergency: true,
    activity: true,
    report: true,
    news: false,
    medicine: true,
    appointment: true
  })

  const toggleChannel = (id: string) => {
    setChannels(channels.map(ch => 
      ch.id === id ? { ...ch, enabled: !ch.enabled } : ch
    ))
  }

  const toggleNotificationType = (type: keyof typeof notificationTypes) => {
    setNotificationTypes({
      ...notificationTypes,
      [type]: !notificationTypes[type]
    })
  }

  const handleConnect = (id: string) => {
    // Mock: ในระบบจริงจะเปิดหน้าต่างเชื่อมต่อ OAuth หรือกรอกข้อมูล
    alert(`กำลังเชื่อมต่อกับ ${channels.find(ch => ch.id === id)?.name}...`)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-3 sm:p-6 shadow-2xl">
        <button
          onClick={onBack}
          className="text-lg sm:text-3xl font-bold hover:opacity-80 transition-all mb-2"
        >
          ← กลับ
        </button>
        <h1 className="text-xl sm:text-4xl font-bold mb-2">🔔 ตั้งค่าการแจ้งเตือน</h1>
        <p className="text-base sm:text-2xl opacity-90">เลือกช่องทางที่ต้องการรับการแจ้งเตือน</p>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 sm:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-5 sm:space-y-8">
          
          {/* ช่องทางการแจ้งเตือน */}
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4 sm:mb-6 flex items-center gap-3">
              <span className="text-4xl sm:text-6xl">📲</span>
              ช่องทางการแจ้งเตือน
            </h2>
            
            <div className="space-y-3 sm:space-y-4">
              {channels.map((channel) => (
                <Card 
                  key={channel.id}
                  className={`border-4 shadow-xl transition-all ${
                    channel.enabled 
                      ? "border-primary/50 bg-gradient-to-br from-white to-primary/5" 
                      : "border-gray-300 bg-gray-50 opacity-60"
                  }`}
                >
                  <CardContent className="p-5 sm:p-8">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1">
                        <span className="text-5xl sm:text-7xl">{channel.icon}</span>
                        <div className="flex-1">
                          <h3 className="text-xl sm:text-3xl font-bold text-foreground mb-1">
                            {channel.name}
                          </h3>
                          {channel.connected && channel.accountInfo ? (
                            <p className="text-base sm:text-xl text-muted-foreground">
                              ✓ เชื่อมต่อแล้ว: {channel.accountInfo}
                            </p>
                          ) : (
                            <p className="text-base sm:text-xl text-muted-foreground font-bold">
                              ✗ ยังไม่ได้เชื่อมต่อ
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 items-end">
                        {channel.connected ? (
                          <button
                            onClick={() => toggleChannel(channel.id)}
                            className={`w-16 h-9 sm:w-20 sm:h-12 rounded-full transition-all duration-300 relative ${
                              channel.enabled 
                                ? "bg-primary" 
                                : "bg-gray-300"
                            }`}
                          >
                            <div className={`absolute top-1 w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-white shadow-lg transition-all duration-300 ${
                              channel.enabled ? "right-1" : "left-1"
                            }`} />
                          </button>
                        ) : (
                          <Button
                            onClick={() => handleConnect(channel.id)}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-xl font-bold rounded-xl"
                          >
                            เชื่อมต่อ
                          </Button>
                        )}
                        <p className={`text-sm sm:text-base font-bold ${
                          channel.enabled ? "text-primary" : "text-gray-500"
                        }`}>
                          {channel.enabled ? "เปิดใช้งาน" : "ปิดใช้งาน"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* ประเภทการแจ้งเตือน */}
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4 sm:mb-6 flex items-center gap-3">
              <span className="text-4xl sm:text-6xl">🔔</span>
              ประเภทการแจ้งเตือนที่ต้องการรับ
            </h2>
            
            <Card className="border-4 border-border shadow-xl">
              <CardContent className="p-5 sm:p-8 space-y-4 sm:space-y-5">
                {[
                  { key: "emergency", label: "🚨 เหตุฉุกเฉิน", desc: "แจ้งเตือนทันทีเมื่อผู้สูงอายุขอความช่วยเหลือ", priority: "สูง" },
                  { key: "medicine", label: "💊 เตือนกินยา", desc: "แจ้งเตือนเวลากินยาของผู้สูงอายุ", priority: "สูง" },
                  { key: "appointment", label: "🏥 นัดหมายแพทย์", desc: "แจ้งเตือนนัดตรวจสุขภาพ", priority: "กลาง" },
                  { key: "activity", label: "🎉 กิจกรรม", desc: "แจ้งสถานะคำขอเข้าร่วมกิจกรรม", priority: "กลาง" },
                  { key: "report", label: "🛠️ แจ้งปัญหา", desc: "แจ้งสถานะการแก้ไขปัญหาที่รายงาน", priority: "กลาง" },
                  { key: "news", label: "📢 ข่าวสารชุมชน", desc: "แจ้งข่าวประกาศจากชุมชน", priority: "ต่ำ" }
                ].map((item) => (
                  <div 
                    key={item.key}
                    className={`flex items-start gap-4 p-4 sm:p-5 rounded-xl border-2 transition-all ${
                      notificationTypes[item.key as keyof typeof notificationTypes]
                        ? "bg-gradient-to-br from-white to-primary/5 border-primary/30"
                        : "bg-gray-50 border-gray-300"
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg sm:text-2xl font-bold text-foreground">
                          {item.label}
                        </h3>
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold ${
                          item.priority === "สูง" 
                            ? "bg-muted text-muted-foreground"
                            : item.priority === "กลาง"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}>
                          {item.priority}
                        </span>
                      </div>
                      <p className="text-sm sm:text-lg text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleNotificationType(item.key as keyof typeof notificationTypes)}
                      className={`w-16 h-9 sm:w-20 sm:h-12 rounded-full transition-all duration-300 relative flex-shrink-0 ${
                        notificationTypes[item.key as keyof typeof notificationTypes]
                          ? "bg-primary" 
                          : "bg-gray-300"
                      }`}
                    >
                      <div className={`absolute top-1 w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-white shadow-lg transition-all duration-300 ${
                        notificationTypes[item.key as keyof typeof notificationTypes] ? "right-1" : "left-1"
                      }`} />
                    </button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* คำแนะนำ */}
          <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-50 to-green-50">
            <CardContent className="p-5 sm:p-8">
              <h3 className="text-xl sm:text-3xl font-bold text-center mb-4">
                💡 คำแนะนำ
              </h3>
              <ul className="space-y-2 sm:space-y-3 text-base sm:text-xl">
                <li className="flex gap-3">
                  <span>•</span>
                  <span>แนะนำให้เปิด <strong>LINE</strong> หรือ <strong>SMS</strong> เพื่อรับการแจ้งเตือนที่รวดเร็ว</span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>การแจ้งเตือน <strong>เหตุฉุกเฉิน</strong> จะส่งผ่านทุกช่องทางที่เปิดใช้งาน</span>
                </li>
                <li className="flex gap-3">
                  <span>•</span>
                  <span>สามารถปรับเปลี่ยนการตั้งค่าได้ทุกเมื่อ</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* ปุ่มบันทึก */}
          <Button
            onClick={() => {
              alert("บันทึกการตั้งค่าเรียบร้อยแล้ว!")
              onBack()
            }}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-5 sm:py-8 text-xl sm:text-3xl font-bold rounded-2xl shadow-2xl"
          >
            💾 บันทึกการตั้งค่า
          </Button>
        </div>
      </div>
    </div>
  )
}
