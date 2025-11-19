"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface EmergencyHelpPageProps {
  onSubmit: () => void
  onBack: () => void
}

export default function EmergencyHelpPage({ onSubmit, onBack }: EmergencyHelpPageProps) {
  const [message, setMessage] = useState("")
  const [image, setImage] = useState<string | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording)
    // จำลองการบันทึกเสียง
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false)
      }, 3000)
    }
  }

  const handleSendHelp = () => {
    setShowConfirmDialog(true)
  }

  const handleConfirm = () => {
    setShowConfirmDialog(false)
    onSubmit()
  }

  const handleCancel = () => {
    setShowConfirmDialog(false)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="bg-destructive text-destructive-foreground p-3 sm:p-6 flex items-center justify-between shadow-2xl">
        <button onClick={onBack} className="text-lg sm:text-3xl font-bold hover:opacity-80 transition-all min-w-14 sm:min-w-[100px] text-left relative z-10 hover:scale-110 duration-300">
          ← กลับ
        </button>
        <h1 className="text-base sm:text-3xl md:text-4xl font-bold text-center leading-tight px-2 relative z-10 drop-shadow-lg">ขอความช่วยเหลือฉุกเฉิน</h1>
        <div className="w-14 sm:w-[100px]" />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-5 sm:space-y-8">
          {/* ช่องกรอกข้อความ */}
          <div>
            <label className="block text-xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">
              📝 เกิดเหตุฉุกเฉินที่...
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="พิมพ์ข้อความสั้นๆ บอกเหตุการณ์"
              rows={4}
              className="w-full px-4 sm:px-6 py-4 sm:py-6 text-lg sm:text-2xl border-4 border-border rounded-2xl bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-destructive focus:ring-4 focus:ring-destructive/30 transition-all resize-none"
            />
          </div>

          {/* แสดงรูปภาพที่แนบ */}
          {image && (
            <div className="relative">
              <img src={image} alt="แนบรูปภาพ" className="w-full rounded-2xl border-4 border-border" />
              <button
                onClick={() => setImage(null)}
                className="absolute top-2 right-2 bg-destructive text-white rounded-full w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center font-bold text-xl sm:text-2xl shadow-lg"
              >
                ×
              </button>
            </div>
          )}

          {/* ปุ่มแนบรูปภาพ */}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="block w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-2xl p-5 sm:p-8 font-bold text-xl sm:text-3xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 sm:gap-5 border-0 cursor-pointer active:scale-95 min-h-[90px] sm:min-h-[120px]"
            >
              <span className="text-4xl sm:text-6xl">📷</span>
              <span>แนบรูปภาพ</span>
            </label>
          </div>

          {/* ปุ่มบันทึกเสียง */}
          <button
            onClick={handleVoiceRecord}
            className={`w-full rounded-2xl p-5 sm:p-8 font-bold text-xl sm:text-3xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 sm:gap-5 border-0 active:scale-95 min-h-[90px] sm:min-h-[120px] ${
              isRecording
                ? "bg-gradient-to-r from-red-500 to-pink-600 text-white animate-pulse"
                : "bg-primary hover:bg-primary/90 text-primary-foreground"
            }`}
          >
            <span className="text-4xl sm:text-6xl">🎤</span>
            <span>{isRecording ? "กำลังบันทึก..." : "บันทึกเสียง"}</span>
          </button>

          {/* ปุ่มส่งความช่วยเหลือ - ใหญ่สุด สีแดง */}
          <Button
            onClick={handleSendHelp}
            variant="destructive"
            className="w-full rounded-2xl sm:rounded-3xl p-6 sm:p-12 font-bold text-2xl sm:text-4xl shadow-2xl transition-all flex items-center justify-center gap-4 sm:gap-6 border-4 border-destructive/20 active:scale-98 min-h-[120px] sm:min-h-[180px] animate-pulse h-auto"
          >
            <span className="text-5xl sm:text-7xl">🆘</span>
            <span>ส่งความช่วยเหลือ</span>
          </Button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full shadow-2xl border-4 border-destructive">
            <CardContent className="p-6 sm:p-10">
            <div className="text-center mb-6 sm:mb-8">
              <div className="text-6xl sm:text-8xl mb-4">⚠️</div>
              <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4">
                คุณแน่ใจหรือไม่?
              </h2>
              <p className="text-xl sm:text-2xl text-muted-foreground">
                ต้องการส่งความช่วยเหลือฉุกเฉิน
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Button
                onClick={handleConfirm}
                variant="destructive"
                className="flex-1 rounded-xl sm:rounded-2xl p-5 sm:p-8 font-bold text-xl sm:text-3xl shadow-xl transition-all active:scale-98 h-auto"
              >
                ✓ ยืนยัน
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="flex-1 rounded-xl sm:rounded-2xl p-5 sm:p-8 font-bold text-xl sm:text-3xl shadow-xl transition-all active:scale-98 h-auto"
              >
                ✕ ยกเลิก
              </Button>
            </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
