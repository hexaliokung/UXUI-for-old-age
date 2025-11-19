"use client"

import { useState } from "react"

interface CreateActivityPageProps {
  onSubmit: () => void
  onBack: () => void
}

export default function CreateActivityPage({ onSubmit, onBack }: CreateActivityPageProps) {
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="bg-accent text-accent-foreground p-3 sm:p-6 flex items-center justify-between shadow-xl">
        <button
          onClick={onBack}
          className="text-lg sm:text-3xl font-bold hover:opacity-80 transition-all min-w-14 sm:min-w-[100px] text-left"
        >
          ← กลับ
        </button>
        <h1 className="text-base sm:text-3xl md:text-4xl font-bold text-center leading-tight px-2">
          สร้างกิจกรรมใหม่
        </h1>
        <div className="w-14 sm:w-[100px]" />
      </div>

      {/* Form */}
      <div className="flex-1 p-4 sm:p-8 overflow-y-auto">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-5 sm:space-y-8">
          {/* ชื่อกิจกรรม */}
          <div>
            <label className="block text-xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">
              📝 ชื่อกิจกรรม
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="เช่น งานประเพณีสงกรานต์"
              required
              className="w-full px-4 sm:px-6 py-4 sm:py-6 text-lg sm:text-2xl border-4 border-border rounded-2xl bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/30 transition-all"
            />
          </div>

          {/* วันที่ */}
          <div>
            <label className="block text-xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">
              📅 วันที่
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-4 sm:px-6 py-4 sm:py-6 text-lg sm:text-2xl border-4 border-border rounded-2xl bg-card text-foreground focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/30 transition-all"
            />
          </div>

          {/* เวลา */}
          <div>
            <label className="block text-xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">
              🕐 เวลา
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="w-full px-4 sm:px-6 py-4 sm:py-6 text-lg sm:text-2xl border-4 border-border rounded-2xl bg-card text-foreground focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/30 transition-all"
            />
          </div>

          {/* สถานที่ */}
          <div>
            <label className="block text-xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">
              📍 สถานที่
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="เช่น ศาลาหมู่บ้าน"
              required
              className="w-full px-4 sm:px-6 py-4 sm:py-6 text-lg sm:text-2xl border-4 border-border rounded-2xl bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/30 transition-all"
            />
          </div>

          {/* รายละเอียด */}
          <div>
            <label className="block text-xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">
              📋 รายละเอียด
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="ระบุรายละเอียดของกิจกรรม"
              rows={4}
              required
              className="w-full px-4 sm:px-6 py-4 sm:py-6 text-lg sm:text-2xl border-4 border-border rounded-2xl bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/30 transition-all resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-2xl p-6 sm:p-10 font-bold text-2xl sm:text-4xl shadow-2xl transition-all active:scale-98 min-h-20 sm:min-h-[140px]"
          >
            ส่งเพื่อขออนุมัติ
          </button>
        </form>
      </div>
    </div>
  )
}
