"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ActivitiesPageProps {
  onBack: () => void
  onCreateActivity: () => void
}

const allActivities = [
  {
    id: 1,
    title: "งานประเพณีสงกรานต์",
    date: "13-15 เมษายน 2568",
    location: "ศาลาหมู่บ้าน",
    status: "approved",
    creator: "คุณสมชาย",
  },
  {
    id: 2,
    title: "ทำบุญตักบาตร",
    date: "1 พฤษภาคม 2568",
    location: "วัดบ้านกลาง",
    status: "approved",
    creator: "คุณสมหญิง",
  },
]

const myActivities = [
  {
    id: 3,
    title: "ออกกำลังกายตอนเช้า",
    date: "ทุกวันจันทร์-ศุกร์",
    location: "สวนสาธารณะ",
    status: "pending",
    creator: "ฉัน",
  },
]

export default function ActivitiesPage({ onBack, onCreateActivity }: ActivitiesPageProps) {
  const [activeTab, setActiveTab] = useState<"all" | "my">("all")

  const activities = activeTab === "all" ? allActivities : myActivities

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-3 sm:p-6 flex items-center justify-between shadow-xl">
        <button
          onClick={onBack}
          className="text-lg sm:text-3xl font-bold hover:opacity-80 transition-all min-w-14 sm:min-w-[100px] text-left"
        >
          ← กลับ
        </button>
        <h1 className="text-base sm:text-3xl md:text-4xl font-bold text-center leading-tight px-2">
          กิจกรรมชุมชน
        </h1>
        <div className="w-14 sm:w-[100px]" />
      </div>

      {/* Tabs */}
      <div className="bg-card border-b-4 border-border">
        <div className="flex">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex-1 p-4 sm:p-6 text-lg sm:text-2xl font-bold transition-all ${
              activeTab === "all"
                ? "bg-primary text-primary-foreground border-b-4 border-primary"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            กิจกรรมทั้งหมด
          </button>
          <button
            onClick={() => setActiveTab("my")}
            className={`flex-1 p-4 sm:p-6 text-lg sm:text-2xl font-bold transition-all ${
              activeTab === "my"
                ? "bg-primary text-primary-foreground border-b-4 border-primary"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            กิจกรรมของฉัน
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 sm:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-5 sm:space-y-6">
          {/* Create Button */}
          <Button
            onClick={onCreateActivity}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-2xl p-5 sm:p-8 font-bold text-xl sm:text-3xl shadow-xl transition-all flex items-center justify-center gap-3 sm:gap-5 border-4 border-accent/30 active:scale-98 h-auto"
          >
            <span className="text-4xl sm:text-6xl">➕</span>
            <span>สร้างกิจกรรมใหม่</span>
          </Button>

          {/* Activities List */}
          {activities.map((activity) => (
            <Card
              key={activity.id}
              className="border-4 shadow-lg hover:shadow-xl transition-all"
            >
              <CardContent className="p-5 sm:p-8">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <h3 className="text-xl sm:text-3xl font-bold text-foreground flex-1">
                  {activity.title}
                </h3>
                {activity.status === "pending" && (
                  <Badge className="bg-yellow-100 text-yellow-800 px-3 sm:px-5 py-1 sm:py-2 text-sm sm:text-xl font-bold border-2 border-yellow-400 hover:bg-yellow-100">
                    รออนุมัติ
                  </Badge>
                )}
                {activity.status === "approved" && (
                  <Badge className="bg-primary/10 text-primary px-3 sm:px-5 py-1 sm:py-2 text-sm sm:text-xl font-bold border-2 border-primary/30 hover:bg-primary/20">
                    อนุมัติแล้ว
                  </Badge>
                )}
              </div>
              <div className="space-y-2 sm:space-y-3 text-base sm:text-2xl text-muted-foreground">
                <p className="flex items-center gap-2 sm:gap-3">
                  <span className="text-xl sm:text-3xl">📅</span>
                  <span>{activity.date}</span>
                </p>
                <p className="flex items-center gap-2 sm:gap-3">
                  <span className="text-xl sm:text-3xl">📍</span>
                  <span>{activity.location}</span>
                </p>
                <p className="flex items-center gap-2 sm:gap-3">
                  <span className="text-xl sm:text-3xl">👤</span>
                  <span>โดย: {activity.creator}</span>
                </p>
              </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
