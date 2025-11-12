"use client"

import { useState } from "react"

interface EmergencyHelpPageProps {
  onSubmit: () => void
  onBack: () => void
}

const emergencyContacts = [
  { id: 1, name: "ลูกสาว: พริม", phone: "081-234-5678", icon: "👩‍🦰" },
  { id: 2, name: "เพื่อนบ้าน: มานะ", phone: "081-987-6543", icon: "👨‍🌾" },
  { id: 3, name: "กำนันหมู่บ้าน", phone: "081-555-1234", icon: "👔" },
  { id: 4, name: "หมอ: สมชาย", phone: "081-111-9876", icon: "⚕️" },
]

export default function EmergencyHelpPage({ onSubmit, onBack }: EmergencyHelpPageProps) {
  const [sosPressed, setSosPressed] = useState(false)
  const [selectedContact, setSelectedContact] = useState<number | null>(null)

  const handleSOSClick = () => {
    setSosPressed(true)
    setTimeout(() => {
      onSubmit()
    }, 1000)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-red-50 to-background">
      {/* Header */}
      <div className="bg-destructive text-white p-3 sm:p-6 flex items-center justify-between shadow-xl">
        <button onClick={onBack} className="text-lg sm:text-3xl font-bold hover:opacity-80 transition-all min-w-14 sm:min-w-[100px] text-left">
          ← กลับ
        </button>
        <h1 className="text-base sm:text-3xl md:text-4xl font-bold text-center leading-tight px-2">ขอความช่วยเหลือฉุกเฉิน</h1>
        <div className="w-14 sm:w-[100px]" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 gap-5 sm:gap-10 md:p-12">
        {/* Big SOS Button */}
        <div className="text-center">
          <p className="text-xl sm:text-4xl font-bold mb-4 sm:mb-8 text-foreground leading-tight px-2">กดปุ่มเพื่อขอความช่วยเหลือ</p>
          <button
            onClick={handleSOSClick}
            className={`w-36 h-36 sm:w-56 sm:h-56 rounded-full font-bold text-4xl sm:text-6xl shadow-2xl transition-all duration-200 transform hover:scale-110 border-8 ${
              sosPressed ? "bg-green-500 text-white scale-110 border-green-600" : "bg-destructive hover:bg-destructive/90 text-white border-destructive-foreground/20 animate-pulse"
            }`}
          >
            {sosPressed ? "✅" : "SOS"}
          </button>
        </div>

        {!sosPressed && (
          <>
            {/* Emergency Contacts */}
            <div className="w-full max-w-2xl">
              <p className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-6 text-foreground text-center">ติดต่อด่วน</p>
              <div className="space-y-3 sm:space-y-5">
                {emergencyContacts.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => setSelectedContact(contact.id)}
                    className={`w-full rounded-xl sm:rounded-2xl p-4 sm:p-8 font-bold text-lg sm:text-2xl transition-all shadow-xl border-4 ${
                      selectedContact === contact.id
                        ? "bg-primary text-white border-primary scale-105"
                        : "bg-card text-foreground border-border hover:border-primary"
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-6">
                      <span className="text-4xl sm:text-6xl">{contact.icon}</span>
                      <div className="text-left flex-1 min-w-0">
                        <p className="font-bold text-xl sm:text-3xl mb-1 sm:mb-2 truncate">{contact.name}</p>
                        <p className="text-lg sm:text-2xl opacity-90">{contact.phone}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Info Box */}
            <div className="w-full max-w-2xl bg-yellow-100 rounded-2xl sm:rounded-3xl p-5 sm:p-8 border-4 border-yellow-400 shadow-lg">
              <p className="text-center text-xl sm:text-3xl font-bold text-foreground leading-relaxed">
                ⚠️ กดปุ่ม SOS เพื่อแจ้งเหตุฉุกเฉิน
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
