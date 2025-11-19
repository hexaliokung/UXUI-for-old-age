"use client"

import { useState } from "react"
import HomePage from "@/components/pages/home-page"
import LoginPage from "@/components/pages/login-page"
import EmergencyHelpPage from "@/components/pages/emergency-help-page"
import ReportProblemPage from "@/components/pages/report-problem-page"
import CommunityNewsPage from "@/components/pages/community-news-page"
import ConfirmationPage from "@/components/pages/confirmation-page"
import MemberDashboardPage from "@/components/pages/member-dashboard-page"
import ActivitiesPage from "@/components/pages/activities-page"
import CreateActivityPage from "@/components/pages/create-activity-page"
import SettingsPage from "@/components/pages/settings-page"

interface UserSession {
  id: string
  name: string
  phoneNumber: string
}

type PageType =
  | "home"
  | "login"
  | "emergency"
  | "report"
  | "news"
  | "confirmation"
  | "member-dashboard"
  | "activities"
  | "create-activity"
  | "settings"

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<UserSession | null>(null)
  const [currentPage, setCurrentPage] = useState<PageType>("home")

  const handleLogin = (userId: string, name: string, phoneNumber: string) => {
    setUser({ id: userId, name, phoneNumber })
    setIsLoggedIn(true)
    setCurrentPage("member-dashboard")
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
    setCurrentPage("home")
  }

  const handleEmergencySubmit = () => {
    setCurrentPage("confirmation")
  }

  const handleReportSubmit = () => {
    setCurrentPage("confirmation")
  }

  const handleActivitySubmit = () => {
    setCurrentPage("confirmation")
  }

  const handleBackToHome = () => {
    setCurrentPage("home")
  }

  const handleBackToDashboard = () => {
    if (isLoggedIn) {
      setCurrentPage("member-dashboard")
    } else {
      setCurrentPage("home")
    }
  }

  // หน้าแรกสำหรับผู้ใช้ที่ยังไม่ได้ล็อกอิน (Guest Mode)
  if (currentPage === "home" && !isLoggedIn) {
    return (
      <HomePage
        onEmergency={() => setCurrentPage("emergency")}
        onLogin={() => setCurrentPage("login")}
      />
    )
  }

  // หน้าล็อกอิน
  if (currentPage === "login") {
    return <LoginPage onLoginSuccess={handleLogin} />
  }

  // หน้าฉุกเฉิน (ใช้ได้ทั้งแบบล็อกอินและไม่ล็อกอิน)
  if (currentPage === "emergency") {
    return (
      <EmergencyHelpPage
        onSubmit={handleEmergencySubmit}
        onBack={isLoggedIn ? handleBackToDashboard : handleBackToHome}
      />
    )
  }

  // หน้ายืนยัน
  if (currentPage === "confirmation") {
    return (
      <ConfirmationPage
        onBack={isLoggedIn ? handleBackToDashboard : handleBackToHome}
      />
    )
  }

  // ระบบสำหรับสมาชิกที่ล็อกอินแล้ว
  if (isLoggedIn && user) {
    return (
      <main className="min-h-screen bg-background">
        {currentPage === "member-dashboard" && (
          <MemberDashboardPage
            userName={user.name}
            onEmergency={() => setCurrentPage("emergency")}
            onReportIssue={() => setCurrentPage("report")}
            onNews={() => setCurrentPage("news")}
            onActivities={() => setCurrentPage("activities")}
            onSettings={() => setCurrentPage("settings")}
          />
        )}
        {currentPage === "report" && (
          <ReportProblemPage onSubmit={handleReportSubmit} onBack={handleBackToDashboard} />
        )}
        {currentPage === "news" && <CommunityNewsPage onBack={handleBackToDashboard} />}
        {currentPage === "activities" && (
          <ActivitiesPage
            onBack={handleBackToDashboard}
            onCreateActivity={() => setCurrentPage("create-activity")}
          />
        )}
        {currentPage === "create-activity" && (
          <CreateActivityPage
            onSubmit={handleActivitySubmit}
            onBack={() => setCurrentPage("activities")}
          />
        )}
        {currentPage === "settings" && (
          <SettingsPage
            userName={user.name}
            userPhone={user.phoneNumber}
            onBack={handleBackToDashboard}
            onLogout={handleLogout}
          />
        )}
      </main>
    )
  }

  // Default fallback
  return <HomePage onEmergency={() => setCurrentPage("emergency")} onLogin={() => setCurrentPage("login")} />
}
