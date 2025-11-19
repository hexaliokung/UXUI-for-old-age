"use client"

import { useState, useEffect } from "react"
import { getElderlyRelatives, getRelativeElderlyList, type ElderlyUser, type RelativeUser } from "@/lib/mock-users"

interface SettingsPageProps {
  userId: string
  userName: string
  userPhone: string
  userRole: "elderly" | "relative"
  onBack: () => void
  onLogout: () => void
}

interface RelativeContact {
  id: string
  name: string
  phone: string
  relationship?: string
}

export default function SettingsPage({ userId, userName, userPhone, userRole, onBack, onLogout }: SettingsPageProps) {
  const [relatives, setRelatives] = useState<RelativeContact[]>([])

  // โหลดข้อมูลญาติเมื่อ component mount
  useEffect(() => {
    if (userRole === "elderly") {
      // ถ้าเป็นผู้สูงอายุ ให้แสดงรายชื่อญาติที่ดูแล
      const relativeList = getElderlyRelatives(userId)
      setRelatives(relativeList.map(r => ({
        id: r.id,
        name: `${r.relationship}: ${r.name}`,
        phone: r.phoneNumber,
        relationship: r.relationship
      })))
    } else if (userRole === "relative") {
      // ถ้าเป็นญาติ ให้แสดงรายชื่อผู้สูงอายุที่ดูแล
      const elderlyList = getRelativeElderlyList(userId)
      setRelatives(elderlyList.map(e => ({
        id: e.id,
        name: e.name,
        phone: e.phoneNumber,
        relationship: "ผู้สูงอายุที่ดูแล"
      })))
    }
  }, [userId, userRole])
  const [notifications, setNotifications] = useState(true)
  const [showAddRelativeDialog, setShowAddRelativeDialog] = useState(false)
  const [newRelativeName, setNewRelativeName] = useState("")
  const [newRelativePhone, setNewRelativePhone] = useState("")

  const handleAddRelative = () => {
    if (newRelativeName.trim() && newRelativePhone.trim()) {
      const newId = relatives.length > 0 ? Math.max(...relatives.map(r => r.id)) + 1 : 1
      setRelatives([...relatives, {
        id: newId,
        name: newRelativeName,
        phone: newRelativePhone
      }])
      setNewRelativeName("")
      setNewRelativePhone("")
      setShowAddRelativeDialog(false)
    }
  }

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
          ตั้งค่า
        </h1>
        <div className="w-14 sm:w-[100px]" />
      </div>

      {/* Content */}
      <div className="flex-1 p-4 sm:p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-5 sm:space-y-8">
          {/* ข้อมูลส่วนตัว */}
          <div className="bg-card rounded-2xl p-5 sm:p-8 border-4 border-border shadow-lg">
            <h2 className="text-xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-6 flex items-center gap-3">
              <span className="text-3xl sm:text-5xl">👤</span>
              ข้อมูลส่วนตัว
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3 sm:gap-4 text-base sm:text-2xl">
                <span className="font-bold text-muted-foreground">ชื่อ:</span>
                <span className="text-foreground">{userName}</span>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 text-base sm:text-2xl">
                <span className="font-bold text-muted-foreground">เบอร์โทร:</span>
                <span className="text-foreground">{userPhone}</span>
              </div>
            </div>
          </div>

          {/* จัดการญาติ/ผู้สูงอายุที่ดูแล */}
          <div className="bg-card rounded-2xl p-5 sm:p-8 border-4 border-border shadow-lg">
            <h2 className="text-xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-6 flex items-center gap-3">
              <span className="text-3xl sm:text-5xl">👨‍👩‍👧‍👦</span>
              {userRole === "elderly" ? "จัดการญาติ" : "ผู้สูงอายุที่ดูแล"}
            </h2>
            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              {relatives.map((relative) => (
                <div
                  key={relative.id}
                  className="flex items-center justify-between p-3 sm:p-5 bg-background rounded-xl border-2 border-border"
                >
                  <div>
                    <p className="text-lg sm:text-2xl font-bold text-foreground">{relative.name}</p>
                    <p className="text-base sm:text-xl text-muted-foreground">{relative.phone}</p>
                  </div>
                  <button
                    onClick={() => setRelatives(relatives.filter((r) => r.id !== relative.id))}
                    className="text-destructive text-2xl sm:text-4xl hover:scale-110 transition-all"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
            {userRole === "elderly" && (
              <button
                onClick={() => setShowAddRelativeDialog(true)}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl p-4 sm:p-6 font-bold text-lg sm:text-2xl shadow-lg transition-all active:scale-98"
              >
                + เพิ่มญาติ
              </button>
            )}
          </div>

          {/* การแจ้งเตือน */}
          <div className="bg-card rounded-2xl p-5 sm:p-8 border-4 border-border shadow-lg">
            <h2 className="text-xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-6 flex items-center gap-3">
              <span className="text-3xl sm:text-5xl">🔔</span>
              การแจ้งเตือน
            </h2>
            <div className="flex items-center justify-between">
              <span className="text-lg sm:text-2xl text-foreground">รับการแจ้งเตือนจากแอป</span>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`w-16 h-8 sm:w-20 sm:h-10 rounded-full transition-all ${
                  notifications ? "bg-primary" : "bg-muted"
                }`}
              >
                <div
                  className={`w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full shadow-lg transition-all ${
                    notifications ? "ml-9 sm:ml-11" : "ml-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* ความช่วยเหลือ */}
          <div className="bg-card rounded-2xl p-5 sm:p-8 border-4 border-border shadow-lg">
            <h2 className="text-xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-6 flex items-center gap-3">
              <span className="text-3xl sm:text-5xl">❓</span>
              ความช่วยเหลือ
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <button className="w-full bg-background hover:bg-muted text-foreground rounded-xl p-4 sm:p-6 font-bold text-lg sm:text-2xl border-2 border-border transition-all text-left">
                📖 คู่มือการใช้งาน
              </button>
              <button className="w-full bg-background hover:bg-muted text-foreground rounded-xl p-4 sm:p-6 font-bold text-lg sm:text-2xl border-2 border-border transition-all text-left">
                📞 ติดต่อผู้ดูแลระบบ
              </button>
            </div>
          </div>

          {/* ออกจากระบบ */}
          <button
            onClick={onLogout}
            className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-2xl p-5 sm:p-8 font-bold text-xl sm:text-3xl shadow-xl transition-all active:scale-98 min-h-20 sm:min-h-[100px]"
          >
            🚪 ออกจากระบบ
          </button>
        </div>
      </div>

      {/* Add Relative Dialog */}
      {showAddRelativeDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card max-w-2xl w-full rounded-2xl shadow-2xl border-4 border-border">
            <div className="p-6 sm:p-10">
              <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-6 sm:mb-8 text-center">
                เพิ่มญาติ
              </h2>

              {/* Name Input */}
              <div className="mb-5 sm:mb-6">
                <label className="block text-xl sm:text-2xl font-bold text-foreground mb-3">
                  ชื่อญาติ
                </label>
                <input
                  type="text"
                  value={newRelativeName}
                  onChange={(e) => setNewRelativeName(e.target.value)}
                  placeholder="เช่น ลูกสาว: สมใจ"
                  className="w-full px-4 sm:px-6 py-4 sm:py-6 text-lg sm:text-2xl border-4 border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/30 transition-all"
                />
              </div>

              {/* Phone Input */}
              <div className="mb-6 sm:mb-8">
                <label className="block text-xl sm:text-2xl font-bold text-foreground mb-3">
                  เบอร์โทรศัพท์
                </label>
                <input
                  type="tel"
                  value={newRelativePhone}
                  onChange={(e) => setNewRelativePhone(e.target.value)}
                  placeholder="081-234-5678"
                  className="w-full px-4 sm:px-6 py-4 sm:py-6 text-lg sm:text-2xl border-4 border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/30 transition-all"
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={handleAddRelative}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl p-5 sm:p-6 font-bold text-xl sm:text-2xl shadow-xl transition-all active:scale-98"
                >
                  ✓ เพิ่มญาติ
                </button>
                <button
                  onClick={() => {
                    setShowAddRelativeDialog(false)
                    setNewRelativeName("")
                    setNewRelativePhone("")
                  }}
                  className="flex-1 bg-muted hover:bg-muted/80 text-foreground rounded-xl p-5 sm:p-6 font-bold text-xl sm:text-2xl border-2 border-border transition-all active:scale-98"
                >
                  ✕ ยกเลิก
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
