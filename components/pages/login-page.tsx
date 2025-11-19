"use client"

import type React from "react"
import { useState } from "react"
import { authenticateUser } from "@/lib/mock-users"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface LoginPageProps {
  onLoginSuccess: (userId: string, name: string, phoneNumber: string, role: "elderly" | "relative") => void
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<"phone" | "otp" | "success">("phone")
  const [otpSent, setOtpSent] = useState(false)

  const MOCK_OTP = "1234"

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!phoneNumber.trim()) {
      setError("กรุณาใส่เบอร์โทรศัพท์")
      setIsLoading(false)
      return
    }

    if (phoneNumber.replace(/\D/g, "").length < 9) {
      setError("เบอร์โทรไม่ถูกต้อง กรุณาใส่เบอร์ให้ครบ")
      setIsLoading(false)
      return
    }

    // จำลองการส่ง OTP
    setTimeout(() => {
      setOtpSent(true)
      setStep("otp")
      setIsLoading(false)
    }, 1500)
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!otp.trim()) {
      setError("กรุณาใส่รหัส OTP")
      setIsLoading(false)
      return
    }

    if (otp !== MOCK_OTP) {
      setError("รหัส OTP ไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง")
      setIsLoading(false)
      return
    }

    // OTP ถูกต้อง แสดงหน้า success
    setStep("success")
    setIsLoading(false)

    // หลังจาก 2 วินาที ให้ login เข้าระบบ
    setTimeout(async () => {
      try {
        const result = await authenticateUser(phoneNumber)

        if (result.success && result.user) {
          onLoginSuccess(result.user.id, result.user.name, result.user.phoneNumber, result.user.role)
        } else {
          setError("ไม่พบผู้ใช้งาน กรุณาตรวจสอบเบอร์โทร")
          setStep("phone")
        }
      } catch (err) {
        setError("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง")
        setStep("phone")
      }
    }, 2000)
  }

  const handleResendOtp = () => {
    setOtp("")
    setError("")
    setIsLoading(true)
    
    // จำลองการส่ง OTP ใหม่
    setTimeout(() => {
      setIsLoading(false)
      setError("")
    }, 1500)
  }

  const handleBackToPhone = () => {
    setStep("phone")
    setOtp("")
    setOtpSent(false)
    setError("")
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-12">
          <div className="inline-block mb-3 sm:mb-6 p-3 sm:p-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl">
            <span className="text-5xl sm:text-8xl">🏘️</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 sm:mb-4 text-balance px-2 drop-shadow-sm">ระบบดูแลชุมชน</h1>
          <p className="text-xl sm:text-3xl md:text-4xl text-gray-600 text-balance font-semibold">ยินดีต้อนรับ ✨</p>
        </div>

        {/* Success State */}
        {step === "success" && (
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-xl">
            <CardContent className="p-8 sm:p-12 text-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 sm:mb-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-2xl animate-bounce">
                <span className="text-6xl sm:text-8xl">✅</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                เข้าสู่ระบบสำเร็จ! 🎉
              </h2>
              <p className="text-xl sm:text-2xl text-gray-600">กำลังเข้าสู่หน้าหลัก...</p>
            </CardContent>
          </Card>
        )}

        {/* Phone Number Step */}
        {step === "phone" && (
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-xl">
            <CardContent className="p-6 sm:p-10">
              <form onSubmit={handleSendOtp} className="space-y-5 sm:space-y-8">
                {/* Phone Number Input */}
                <div>
                  <label htmlFor="phone" className="block text-xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-4">
                    📱 เบอร์โทรศัพท์
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="0812345678"
                    className="w-full px-4 sm:px-6 py-4 sm:py-6 text-xl sm:text-3xl border-4 border-gray-200 rounded-2xl bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/30 transition-all"
                    disabled={isLoading}
                  />
                  <p className="text-base sm:text-xl text-gray-500 mt-2 sm:mt-3 leading-relaxed">ตัวอย่าง: 0812345678, 0898765432 หรือ 0881234567</p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-4 sm:p-6 bg-red-50 border-4 border-red-300 rounded-2xl">
                    <p className="text-lg sm:text-2xl text-red-600 font-bold text-center leading-tight">{error}</p>
                  </div>
                )}

                {/* Send OTP Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-6 sm:px-8 py-5 sm:py-8 text-2xl sm:text-4xl font-bold rounded-2xl transition-all duration-300 active:scale-95 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.5)] min-h-20 sm:min-h-[100px] bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 disabled:opacity-50"
                >
                  {isLoading ? "กำลังส่ง OTP..." : "ส่งรหัส OTP 📨"}
                </Button>
              </form>

              {/* Help Text */}
              <div className="mt-6 sm:mt-8 p-5 sm:p-8 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl">
                <p className="text-center text-lg sm:text-2xl font-bold text-gray-700 leading-relaxed mb-3">
                  💡 รหัส OTP ทดสอบ: <span className="text-blue-600">1234</span>
                </p>
                <div className="mt-4 pt-4 border-t-2 border-blue-200">
                  <p className="text-center text-base sm:text-xl font-bold text-gray-600 mb-2">เบอร์ทดสอบผู้สูงอายุ:</p>
                  <p className="text-center text-sm sm:text-lg text-gray-600">0812345678, 0898765432, 0881234567</p>
                  <p className="text-center text-base sm:text-xl font-bold text-gray-600 mb-2 mt-3">เบอร์ทดสอบญาติ:</p>
                  <p className="text-center text-sm sm:text-lg text-gray-600">0891234567, 0862345678, 0923456789, 0854567890, 0875678901</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* OTP Verification Step */}
        {step === "otp" && (
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-xl">
            <CardContent className="p-6 sm:p-10">
              <form onSubmit={handleVerifyOtp} className="space-y-5 sm:space-y-8">
                {/* Success Message */}
                <div className="p-4 sm:p-6 bg-green-50 border-4 border-green-300 rounded-2xl">
                  <p className="text-lg sm:text-2xl text-green-700 font-bold text-center leading-tight">
                    ✅ ส่ง OTP ไปยัง {phoneNumber} แล้ว
                  </p>
                </div>

                {/* OTP Input */}
                <div>
                  <label htmlFor="otp" className="block text-xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-4">
                    🔐 รหัส OTP
                  </label>
                  <input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    placeholder="1234"
                    maxLength={4}
                    className="w-full px-4 sm:px-6 py-4 sm:py-6 text-xl sm:text-3xl border-4 border-gray-200 rounded-2xl bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/30 transition-all text-center tracking-[1em] font-bold"
                    disabled={isLoading}
                    autoFocus
                  />
                  <p className="text-base sm:text-xl text-gray-500 mt-2 sm:mt-3 leading-relaxed text-center">กรุณากรอกรหัส OTP 4 หลัก</p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-4 sm:p-6 bg-red-50 border-4 border-red-300 rounded-2xl">
                    <p className="text-lg sm:text-2xl text-red-600 font-bold text-center leading-tight">{error}</p>
                  </div>
                )}

                {/* Verify Button */}
                <Button
                  type="submit"
                  disabled={isLoading || otp.length !== 4}
                  className="w-full px-6 sm:px-8 py-5 sm:py-8 text-2xl sm:text-4xl font-bold rounded-2xl transition-all duration-300 active:scale-95 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(34,197,94,0.5)] min-h-20 sm:min-h-[100px] bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 disabled:opacity-50"
                >
                  {isLoading ? "กำลังตรวจสอบ..." : "ยืนยัน OTP ✓"}
                </Button>

                {/* Resend & Back Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={isLoading}
                    className="flex-1 px-4 sm:px-6 py-4 sm:py-6 text-lg sm:text-2xl font-bold rounded-xl transition-all duration-300 bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white border-0 disabled:opacity-50"
                  >
                    🔄 ส่ง OTP ใหม่
                  </Button>
                  <Button
                    type="button"
                    onClick={handleBackToPhone}
                    disabled={isLoading}
                    className="flex-1 px-4 sm:px-6 py-4 sm:py-6 text-lg sm:text-2xl font-bold rounded-xl transition-all duration-300 bg-gray-200 hover:bg-gray-300 text-gray-800 border-0 disabled:opacity-50"
                  >
                    ← เปลี่ยนเบอร์
                  </Button>
                </div>
              </form>

              {/* Help Text */}
              <div className="mt-6 sm:mt-8 p-5 sm:p-8 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl">
                <p className="text-center text-lg sm:text-2xl font-bold text-gray-700 leading-relaxed">
                  💡 รหัส OTP ทดสอบ: <span className="text-green-600">1234</span>
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}
