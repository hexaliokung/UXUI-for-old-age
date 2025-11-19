"use client"

import { useState } from "react"
import HomePage from "@/components/pages/home-page"
import LoginPage from "@/components/pages/login-page"
import MemberDashboardPage from "@/components/pages/member-dashboard-page"
import RelativeDashboardPage from "@/components/pages/relative-dashboard-page"
import EmergencyHelpPage from "@/components/pages/emergency-help-page"
import EmergencyAlertsPage from "@/components/pages/emergency-alerts-page"
import ReportProblemPage from "@/components/pages/report-problem-page"
import CommunityNewsPage from "@/components/pages/community-news-page"
import ActivitiesPage from "@/components/pages/activities-page"
import CreateActivityPage from "@/components/pages/create-activity-page"
import ConfirmationPage from "@/components/pages/confirmation-page"
import SettingsPage from "@/components/pages/settings-page"
import type { User } from "@/lib/mock-users"

interface UserSession {
  id: string
  name: string
  phoneNumber: string
  role: "elderly" | "relative"
}

type PageType =
  | "home"
  | "login"
  | "emergency"
  | "report"
  | "news"
  | "confirmation"
  | "member-dashboard"
  | "relative-dashboard"
  | "emergency-alerts"
  | "activities"
  | "create-activity"
  | "settings"

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<UserSession | null>(null)
  const [currentPage, setCurrentPage] = useState<PageType>("home")
  const [confirmationType, setConfirmationType] = useState<"emergency" | "report" | "activity">("emergency")

  const handleLogin = (userId: string, name: string, phoneNumber: string, role: "elderly" | "relative") => {
    setUser({ id: userId, name, phoneNumber, role })
    setIsLoggedIn(true)
    // ถ้าเป็นญาติให้ไปหน้า relative-dashboard, ถ้าเป็นผู้สูงอายุให้ไปหน้า member-dashboard
    setCurrentPage(role === "relative" ? "relative-dashboard" : "member-dashboard")
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
    setCurrentPage("home")
  }

  const handleEmergencySubmit = () => {
    setConfirmationType("emergency")
    setCurrentPage("confirmation")
  }

  const handleReportSubmit = () => {
    setConfirmationType("report")
    setCurrentPage("confirmation")
  }

  const handleActivitySubmit = () => {
    setConfirmationType("activity")
    setCurrentPage("confirmation")
  }

  const handleBackToHome = () => {
    setCurrentPage("home")
  }

  const handleBackToDashboard = () => {
    if (isLoggedIn && user) {
      // เช็ค role ของ user เพื่อกลับไปหน้า dashboard ที่ถูกต้อง
      setCurrentPage(user.role === "relative" ? "relative-dashboard" : "member-dashboard")
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
        type={confirmationType}
        onBack={isLoggedIn ? handleBackToDashboard : handleBackToHome}
      />
    )
  }

  // ระบบสำหรับสมาชิกที่ล็อกอินแล้ว
  if (isLoggedIn && user) {
    return (
      <main className="min-h-screen bg-background">
        {currentPage === "relative-dashboard" && (
        <RelativeDashboardPage
          userId={user.id}
          userName={user.name}
          onEmergencyAlerts={() => setCurrentPage("emergency-alerts")}
          onReportIssue={() => setCurrentPage("report-issue")}
          onNews={() => setCurrentPage("news")}
          onActivities={() => setCurrentPage("activities")}
          onSettings={() => setCurrentPage("settings")}
        />
      )}
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
        {currentPage === "emergency-alerts" && (
          <EmergencyAlertsPage onBack={() => setCurrentPage("relative-dashboard")} />
        )}
        {currentPage === "report" && (
          <ReportProblemPage onSubmit={handleReportSubmit} onBack={handleBackToDashboard} />
        )}
        {currentPage === "report-issue" && (
          <ReportProblemPage onSubmit={handleReportSubmit} onBack={() => setCurrentPage("relative-dashboard")} />
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
            userId={user.id}
            userName={user.name}
            userPhone={user.phoneNumber}
            userRole={user.role}
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
