"use client"

import { useState } from "react"
import LoginPage from "@/components/pages/login-page"
import HomePage from "@/components/pages/home-page"
import EmergencyHelpPage from "@/components/pages/emergency-help-page"
import ReportProblemPage from "@/components/pages/report-problem-page"
import CommunityNewsPage from "@/components/pages/community-news-page"
import ConfirmationPage from "@/components/pages/confirmation-page"

interface UserSession {
  id: string
  name: string
  phoneNumber: string
}

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<UserSession | null>(null)
  const [currentPage, setCurrentPage] = useState<"home" | "emergency" | "report" | "news" | "confirmation">("home")
  const [confirmationMessage, setConfirmationMessage] = useState("")
  const [confirmationIcon, setConfirmationIcon] = useState("✅")

  const handleLogin = (userId: string, name: string, phoneNumber: string) => {
    setUser({ id: userId, name, phoneNumber })
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
    setCurrentPage("home")
  }

  const handleEmergencySubmit = () => {
    setConfirmationMessage("Help is on the way! 🚨")
    setConfirmationIcon("✅")
    setCurrentPage("confirmation")
  }

  const handleReportSubmit = () => {
    setConfirmationMessage("Your report has been sent. Thank you! 📋")
    setConfirmationIcon("✅")
    setCurrentPage("confirmation")
  }

  const handleBackToHome = () => {
    setCurrentPage("home")
  }

  if (!isLoggedIn || !user) {
    return <LoginPage onLoginSuccess={handleLogin} />
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b-3 border-border shadow-md sticky top-0 z-50">
        <div className="px-4 py-4 flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🏘️</span>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Village Care Connect</h1>
              <p className="text-lg text-primary font-semibold">👋 {user.name}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-5 py-2 text-lg font-bold bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-lg transition-all active:scale-95 shadow-md"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        {currentPage === "home" && (
          <HomePage
            onEmergency={() => setCurrentPage("emergency")}
            onReport={() => setCurrentPage("report")}
            onNews={() => setCurrentPage("news")}
          />
        )}
        {currentPage === "emergency" && (
          <EmergencyHelpPage onSubmit={handleEmergencySubmit} onBack={handleBackToHome} />
        )}
        {currentPage === "report" && <ReportProblemPage onSubmit={handleReportSubmit} onBack={handleBackToHome} />}
        {currentPage === "news" && <CommunityNewsPage onBack={handleBackToHome} />}
        {currentPage === "confirmation" && (
          <ConfirmationPage message={confirmationMessage} icon={confirmationIcon} onBack={handleBackToHome} />
        )}
      </div>
    </main>
  )
}
