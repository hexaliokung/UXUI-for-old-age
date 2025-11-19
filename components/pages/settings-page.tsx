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
  const [notifications, setNotifications] = useState(true)
  const [showAddRelativeDialog, setShowAddRelativeDialog] = useState(false)
  const [newRelativeName, setNewRelativeName] = useState("")
  const [newRelativePhone, setNewRelativePhone] = useState("")
  const [showAddressDialog, setShowAddressDialog] = useState(false)
  const [address, setAddress] = useState("123 หมู่ 5 บ้านสันติสุข")
  const [mapPosition, setMapPosition] = useState({ x: 50, y: 50 }) // จำลองตำแหน่งบนแผนที่

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

  const handleAddRelative = () => {
    if (newRelativeName.trim() && newRelativePhone.trim()) {
      const newId = relatives.length > 0 ? Math.max(...relatives.map(r => parseInt(r.id))) + 1 : 1
      setRelatives([...relatives, {
        id: newId.toString(),
        name: newRelativeName,
        phone: newRelativePhone
      }])
      setNewRelativeName("")
      setNewRelativePhone("")
      setShowAddRelativeDialog(false)
    }
  }

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMapPosition({ x, y })
  }

  const handleSaveAddress = () => {
    // จำลองการบันทึกตำแหน่ง
    const mockLat = (13.7 + (mapPosition.y / 100) * 0.2).toFixed(6)
    const mockLng = (100.5 + (mapPosition.x / 100) * 0.2).toFixed(6)
    alert(`บันทึกที่อยู่สำเร็จ!\nพิกัด: ${mockLat}, ${mockLng}`)
    setShowAddressDialog(false)
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
              <div className="flex items-start gap-3 sm:gap-4 text-base sm:text-2xl">
                <span className="font-bold text-muted-foreground whitespace-nowrap">ที่อยู่:</span>
                <div className="flex-1">
                  <p className="text-foreground mb-2">{address}</p>
                  <button
                    onClick={() => setShowAddressDialog(true)}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-bold text-base sm:text-xl transition-all active:scale-95"
                  >
                    📍 แก้ไขที่อยู่
                  </button>
                </div>
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

      {/* Address Dialog with Map */}
      {showAddressDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card max-w-4xl w-full rounded-2xl shadow-2xl border-4 border-border max-h-[90vh] overflow-y-auto">
            <div className="p-6 sm:p-10">
              <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-6 sm:mb-8 text-center">
                📍 แก้ไขที่อยู่
              </h2>

              {/* Address Input */}
              <div className="mb-5 sm:mb-6">
                <label className="block text-xl sm:text-2xl font-bold text-foreground mb-3">
                  ที่อยู่
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="กรอกที่อยู่ของคุณ"
                  rows={3}
                  className="w-full px-4 sm:px-6 py-4 sm:py-6 text-lg sm:text-2xl border-4 border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/30 transition-all resize-none"
                />
              </div>

              {/* Mock Map */}
              <div className="mb-6 sm:mb-8">
                <label className="block text-xl sm:text-2xl font-bold text-foreground mb-3">
                  📌 ปักหมุดตำแหน่งบนแผนที่
                </label>
                <p className="text-base sm:text-xl text-muted-foreground mb-4">
                  คลิกบนแผนที่เพื่อปักหมุดตำแหน่งที่อยู่ของคุณ
                </p>
                
                {/* Mock Map Container */}
                <div 
                  onClick={handleMapClick}
                  className="relative w-full h-64 sm:h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl border-4 border-border overflow-hidden cursor-crosshair shadow-lg"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px'
                  }}
                >
                  {/* Mock Map Roads */}
                  <div className="absolute top-1/4 left-0 right-0 h-2 bg-gray-400 opacity-30" />
                  <div className="absolute top-1/2 left-0 right-0 h-3 bg-gray-500 opacity-40" />
                  <div className="absolute top-3/4 left-0 right-0 h-2 bg-gray-400 opacity-30" />
                  <div className="absolute top-0 bottom-0 left-1/4 w-2 bg-gray-400 opacity-30" />
                  <div className="absolute top-0 bottom-0 left-1/2 w-3 bg-gray-500 opacity-40" />
                  <div className="absolute top-0 bottom-0 left-3/4 w-2 bg-gray-400 opacity-30" />
                  
                  {/* Mock Buildings */}
                  <div className="absolute top-[15%] left-[20%] w-12 h-12 sm:w-16 sm:h-16 bg-blue-300 opacity-50 rounded" />
                  <div className="absolute top-[35%] left-[60%] w-10 h-10 sm:w-14 sm:h-14 bg-red-300 opacity-50 rounded" />
                  <div className="absolute top-[65%] left-[30%] w-14 h-14 sm:w-20 sm:h-20 bg-yellow-300 opacity-50 rounded" />
                  <div className="absolute top-[55%] left-[70%] w-8 h-8 sm:w-12 sm:h-12 bg-purple-300 opacity-50 rounded" />

                  {/* Map Label */}
                  <div className="absolute top-4 left-4 bg-white/90 px-3 py-2 rounded-lg shadow-md">
                    <p className="text-xs sm:text-sm font-bold text-gray-700">🗺️ แผนที่ (จำลอง)</p>
                  </div>

                  {/* Pin Marker */}
                  <div 
                    className="absolute transition-all duration-200"
                    style={{ 
                      left: `${mapPosition.x}%`, 
                      top: `${mapPosition.y}%`,
                      transform: 'translate(-50%, -100%)'
                    }}
                  >
                    <div className="relative">
                      {/* Pin Shadow */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-6 h-2 sm:w-8 sm:h-3 bg-black/20 rounded-full blur-sm" />
                      {/* Pin */}
                      <div className="text-5xl sm:text-7xl animate-bounce">📍</div>
                    </div>
                  </div>

                  {/* Coordinates Display */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 px-4 py-2 rounded-lg shadow-md">
                    <p className="text-xs sm:text-sm font-bold text-gray-700">
                      พิกัด: {(13.7 + (mapPosition.y / 100) * 0.2).toFixed(6)}, {(100.5 + (mapPosition.x / 100) * 0.2).toFixed(6)}
                    </p>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-muted-foreground mt-3 text-center">
                  💡 ในระบบจริงจะใช้ Google Maps หรือ OpenStreetMap
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={handleSaveAddress}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl p-5 sm:p-6 font-bold text-xl sm:text-2xl shadow-xl transition-all active:scale-98"
                >
                  💾 บันทึกที่อยู่
                </button>
                <button
                  onClick={() => setShowAddressDialog(false)}
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
