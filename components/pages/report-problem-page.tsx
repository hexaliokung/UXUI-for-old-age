"use client"

import { useState } from "react"

interface ReportProblemPageProps {
  onSubmit: () => void
  onBack: () => void
}

const problemTypes = [
  { id: 1, name: "ไฟฟ้าส่องสว่างเสีย", icon: "💡", color: "bg-yellow-100" },
  { id: 2, name: "ถนนชำรุด", icon: "🛣️", color: "bg-gray-100" },
  { id: 3, name: "ปัญหาขยะ", icon: "🗑️", color: "bg-green-100" },
  { id: 4, name: "น้ำรั่ว", icon: "💧", color: "bg-blue-100" },
  { id: 5, name: "เสียงดัง รบกวน", icon: "🔊", color: "bg-red-100" },
  { id: 6, name: "อื่นๆ", icon: "❓", color: "bg-purple-100" },
]

const locations = ["ใกล้วัดบ้านกลาง", "ศาลาหมู่บ้าน", "ตลาดหลัก", "บริเวณโรงเรียน", "ถนนหน้าวัด", "บ้านของฉัน"]

export default function ReportProblemPage({ onSubmit, onBack }: ReportProblemPageProps) {
  const [selectedProblem, setSelectedProblem] = useState<number | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [description, setDescription] = useState("")

  const handleSubmit = () => {
    if (selectedProblem && selectedLocation) {
      onSubmit()
    }
  }

  const isFormValid = selectedProblem && selectedLocation

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-background">
      {/* Header */}
      <div className="bg-secondary text-white p-4 sm:p-8 flex items-center justify-between shadow-xl">
        <button onClick={onBack} className="text-xl sm:text-4xl font-bold hover:opacity-80 transition-all min-w-16 sm:min-w-[120px] text-left">
          ← กลับ
        </button>
        <h1 className="text-lg sm:text-4xl md:text-5xl font-bold text-center leading-tight px-2">แจ้งปัญหาในชุมชน</h1>
        <div className="w-16 sm:w-[120px]" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-4 sm:p-8 md:p-12 overflow-y-auto max-w-3xl mx-auto w-full">
        {/* Problem Type Selection */}
        <div className="mb-6 sm:mb-10">
          <p className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 text-foreground">ปัญหาที่พบคืออะไร?</p>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
            {problemTypes.map((problem) => (
              <button
                key={problem.id}
                onClick={() => setSelectedProblem(problem.id)}
                className={`rounded-xl sm:rounded-2xl p-4 sm:p-8 font-bold text-base sm:text-xl transition-all border-4 min-h-[120px] sm:min-h-40 ${
                  selectedProblem === problem.id ? "border-secondary scale-105 shadow-2xl" : "border-border"
                } ${problem.color}`}
              >
                <div className="flex flex-col items-center gap-2 sm:gap-4">
                  <span className="text-4xl sm:text-6xl">{problem.icon}</span>
                  <span className="text-sm sm:text-xl text-center leading-tight">{problem.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Location Selection */}
        <div className="mb-6 sm:mb-10">
          <p className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 text-foreground">สถานที่เกิดเหตุ</p>
          <div className="space-y-3 sm:space-y-4">
            {locations.map((location) => (
              <button
                key={location}
                onClick={() => setSelectedLocation(location)}
                className={`w-full rounded-xl sm:rounded-2xl p-5 sm:p-8 font-bold text-lg sm:text-2xl transition-all border-4 text-left ${
                  selectedLocation === location
                    ? "bg-secondary text-white border-secondary shadow-xl scale-105"
                    : "bg-card text-foreground border-border hover:border-secondary"
                }`}
              >
                📍 {location}
              </button>
            ))}
          </div>
        </div>

        {/* Description (Optional) */}
        <div className="mb-6 sm:mb-10">
          <p className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 text-foreground">รายละเอียดเพิ่มเติม (ถ้ามี)</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="อธิบายปัญหาเพิ่มเติม..."
            className="w-full rounded-xl sm:rounded-2xl p-4 sm:p-6 border-4 border-border focus:border-secondary focus:outline-none text-lg sm:text-2xl resize-none"
            rows={4}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`w-full rounded-2xl sm:rounded-3xl p-6 sm:p-10 font-bold text-2xl sm:text-4xl shadow-2xl transition-all min-h-[90px] sm:min-h-[120px] ${
            isFormValid
              ? "bg-secondary hover:bg-secondary/90 text-white active:scale-98"
              : "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
          }`}
        >
          ✅ ส่งรายงาน
        </button>
      </div>
    </div>
  )
}
