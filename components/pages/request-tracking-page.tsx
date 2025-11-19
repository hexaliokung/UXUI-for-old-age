"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

interface RequestTrackingPageProps {
  onBack: () => void
  elderlyName: string
}

// Mock data สำหรับคำร้องต่างๆ
const mockRequests = [
  {
    id: 1,
    type: "activity" as const,
    title: "ขอเข้าร่วมกิจกรรมตรวจสุขภาพ",
    date: "18 พฤศจิกายน 2568",
    time: "10:30 น.",
    status: "approved" as const,
    details: "กิจกรรมตรวจสุขภาพประจำเดือน วันที่ 25 พ.ย. 68",
    respondedBy: "คณะกรรมการหมู่บ้าน",
    respondedDate: "18 พ.ย. 68 เวลา 14:00 น."
  },
  {
    id: 2,
    type: "report" as const,
    title: "แจ้งไฟฟ้าดับบริเวณศาลาหมู่บ้าน",
    date: "15 พฤศจิกายน 2568",
    time: "16:45 น.",
    status: "inprogress" as const,
    details: "ไฟฟ้าดับตั้งแต่เช้า ต้องการให้ซ่อมด่วน",
    respondedBy: "ช่างไฟฟ้า - นายสมชาย",
    respondedDate: "15 พ.ย. 68 เวลา 17:30 น."
  },
  {
    id: 3,
    type: "activity" as const,
    title: "ขอจัดกิจกรรมทำบุญวันเกิด",
    date: "12 พฤศจิกายน 2568",
    time: "09:15 น.",
    status: "rejected" as const,
    details: "ขอจัดกิจกรรมทำบุญวันเกิด 80 ปี ที่ศาลาหมู่บ้าน",
    respondedBy: "คณะกรรมการหมู่บ้าน",
    respondedDate: "13 พ.ย. 68 เวลา 11:00 น.",
    rejectReason: "ศาลาหมู่บ้านมีการจองแล้ว แนะนำเลื่อนเป็นวันที่ 20 พ.ย."
  },
  {
    id: 4,
    type: "report" as const,
    title: "แจ้งท่อน้ำแตก",
    date: "10 พฤศจิกายน 2568",
    time: "14:20 น.",
    status: "completed" as const,
    details: "ท่อน้ำแตกหน้าบ้าน น้ำไหลเยอะ",
    respondedBy: "ช่างประปา - นายวิชัย",
    respondedDate: "11 พ.ย. 68 เวลา 09:00 น.",
    completedDate: "11 พ.ย. 68 เวลา 15:30 น."
  },
  {
    id: 5,
    type: "activity" as const,
    title: "ขอเข้าร่วมกิจกรรมออกกำลังกาย",
    date: "8 พฤศจิกายน 2568",
    time: "08:00 น.",
    status: "pending" as const,
    details: "ขอเข้าร่วมกิจกรรมออกกำลังกายผู้สูงอายุทุกวันพฤหัสบดี",
    respondedBy: null,
    respondedDate: null
  }
]

export default function RequestTrackingPage({ onBack, elderlyName }: RequestTrackingPageProps) {
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null)
  const [filter, setFilter] = useState<"all" | "pending" | "inprogress" | "approved" | "rejected" | "completed">("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 px-3 sm:px-4 py-1 sm:py-2 text-base sm:text-xl font-bold border-2 border-yellow-400">
            ⏳ รอดำเนินการ
          </Badge>
        )
      case "inprogress":
        return (
          <Badge className="bg-blue-100 text-blue-800 px-3 sm:px-4 py-1 sm:py-2 text-base sm:text-xl font-bold border-2 border-blue-400">
            🔄 กำลังดำเนินการ
          </Badge>
        )
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 px-3 sm:px-4 py-1 sm:py-2 text-base sm:text-xl font-bold border-2 border-green-400">
            ✅ อนุมัติแล้ว
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 px-3 sm:px-4 py-1 sm:py-2 text-base sm:text-xl font-bold border-2 border-red-400">
            ❌ ไม่อนุมัติ
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-purple-100 text-purple-800 px-3 sm:px-4 py-1 sm:py-2 text-base sm:text-xl font-bold border-2 border-purple-400">
            ✔️ เสร็จสิ้น
          </Badge>
        )
      default:
        return null
    }
  }

  const getTypeIcon = (type: string) => {
    return type === "activity" ? "🎉" : "🛠️"
  }

  const getTypeName = (type: string) => {
    return type === "activity" ? "กิจกรรม" : "แจ้งปัญหา"
  }

  const filteredRequests = filter === "all" 
    ? mockRequests 
    : mockRequests.filter(req => req.status === filter)

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-indigo-50 to-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 sm:p-6 shadow-2xl">
        <button
          onClick={onBack}
          className="text-lg sm:text-3xl font-bold hover:opacity-80 transition-all mb-2"
        >
          ← กลับ
        </button>
        <h1 className="text-xl sm:text-4xl font-bold mb-2">📋 ติดตามสถานะคำร้อง</h1>
        <p className="text-base sm:text-2xl opacity-90">ของคุณ {elderlyName}</p>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border-b-4 border-border p-3 sm:p-4 overflow-x-auto">
        <div className="flex gap-2 sm:gap-3 min-w-max">
          {[
            { key: "all", label: "ทั้งหมด", icon: "📊" },
            { key: "pending", label: "รอดำเนินการ", icon: "⏳" },
            { key: "inprogress", label: "กำลังดำเนินการ", icon: "🔄" },
            { key: "approved", label: "อนุมัติแล้ว", icon: "✅" },
            { key: "completed", label: "เสร็จสิ้น", icon: "✔️" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold text-base sm:text-xl transition-all whitespace-nowrap ${
                filter === tab.key
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 sm:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          {/* สรุปจำนวน */}
          <Card className="border-4 border-border shadow-xl bg-gradient-to-br from-white to-indigo-50">
            <CardContent className="p-5 sm:p-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-3xl sm:text-5xl font-bold text-yellow-600">
                    {mockRequests.filter(r => r.status === "pending").length}
                  </p>
                  <p className="text-sm sm:text-lg text-muted-foreground mt-1">รอดำเนินการ</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl sm:text-5xl font-bold text-blue-600">
                    {mockRequests.filter(r => r.status === "inprogress").length}
                  </p>
                  <p className="text-sm sm:text-lg text-muted-foreground mt-1">กำลังดำเนินการ</p>
                </div>
                <div className="text-center col-span-2 sm:col-span-1">
                  <p className="text-3xl sm:text-5xl font-bold text-green-600">
                    {mockRequests.filter(r => r.status === "completed" || r.status === "approved").length}
                  </p>
                  <p className="text-sm sm:text-lg text-muted-foreground mt-1">เสร็จสิ้น</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* รายการคำร้อง */}
          {filteredRequests.length === 0 ? (
            <Card className="border-4 border-border shadow-lg">
              <CardContent className="p-8 sm:p-12 text-center">
                <span className="text-6xl sm:text-8xl mb-4 block">📭</span>
                <p className="text-xl sm:text-3xl font-bold text-muted-foreground">
                  ไม่มีคำร้องในหมวดนี้
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {filteredRequests.map((request) => (
                <Card
                  key={request.id}
                  className="border-4 border-border shadow-xl hover:shadow-2xl transition-all cursor-pointer"
                  onClick={() => setSelectedRequest(selectedRequest === request.id ? null : request.id)}
                >
                  <CardContent className="p-5 sm:p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3 flex-1">
                        <span className="text-4xl sm:text-5xl">{getTypeIcon(request.type)}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className="bg-secondary/20 text-secondary-foreground px-2 sm:px-3 py-1 text-sm sm:text-base font-bold border-2 border-secondary">
                              {getTypeName(request.type)}
                            </Badge>
                          </div>
                          <h3 className="text-lg sm:text-2xl font-bold text-foreground mb-2">
                            {request.title}
                          </h3>
                          <p className="text-sm sm:text-lg text-muted-foreground">
                            📅 {request.date} เวลา {request.time}
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(request.status)}
                    </div>

                    {/* Details */}
                    <div className="bg-muted/50 rounded-xl p-4 sm:p-5 mb-4">
                      <p className="text-base sm:text-xl text-foreground leading-relaxed">
                        {request.details}
                      </p>
                    </div>

                    {/* Response Info */}
                    {request.respondedBy && (
                      <div className={`p-4 sm:p-5 rounded-xl border-2 ${
                        request.status === "rejected" 
                          ? "bg-red-50 border-red-300"
                          : request.status === "completed"
                          ? "bg-purple-50 border-purple-300"
                          : request.status === "approved"
                          ? "bg-green-50 border-green-300"
                          : "bg-blue-50 border-blue-300"
                      }`}>
                        <p className="text-base sm:text-xl font-bold mb-2">
                          👤 ดำเนินการโดย: {request.respondedBy}
                        </p>
                        <p className="text-sm sm:text-lg text-muted-foreground">
                          🕐 {request.respondedDate}
                        </p>
                        {request.rejectReason && (
                          <div className="mt-3 p-3 bg-white rounded-lg">
                            <p className="text-base sm:text-xl font-bold text-red-700 mb-1">
                              เหตุผล:
                            </p>
                            <p className="text-base sm:text-lg text-foreground">
                              {request.rejectReason}
                            </p>
                          </div>
                        )}
                        {request.completedDate && (
                          <p className="text-base sm:text-xl font-bold text-purple-700 mt-2">
                            ✅ แก้ไขเสร็จสิ้น: {request.completedDate}
                          </p>
                        )}
                      </div>
                    )}

                    {!request.respondedBy && (
                      <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 sm:p-5">
                        <p className="text-base sm:text-xl text-yellow-800 text-center font-bold">
                          ⏳ รอเจ้าหน้าที่ตรวจสอบ
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
