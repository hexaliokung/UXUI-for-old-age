"use client"

interface CommunityNewsPageProps {
  onBack: () => void
}

const newsItems = [
  {
    id: 1,
    title: "ตรวจสุขภาพฟรี ที่ศาลาหมู่บ้าน",
    date: "10 พ.ย. เวลา 09:00 น.",
    location: "ศาลาหมู่บ้าน",
    icon: "🏥",
    description: "ตรวจสุขภาพประจำปีสำหรับชาวบ้านทุกคน กรุณานำบัตรประชาชนมาด้วย",
  },
  {
    id: 2,
    title: "พิธีทำบุญ",
    date: "วันอาทิตย์ เวลา 07:00 น.",
    location: "วัดกลาง",
    icon: "🕯️",
    description: "พิธีทำบุญตามประเพณี ขอเชิญชาวบ้านร่วมทำบุญ",
  },
  {
    id: 3,
    title: "วันทำความสะอาดวัด",
    date: "วันอาทิตย์ เช้า",
    location: "วัดบ้านกลาง",
    icon: "🧹",
    description: "ขอเชิญชาวบ้านมาช่วยกันทำความสะอาดวัด มีอาหารว่างบริการ",
  },
  {
    id: 4,
    title: "ซ่อมแซมถนนหมู่บ้าน",
    date: "12-14 พ.ย.",
    location: "ถนนสายหลัก",
    icon: "🛠️",
    description: "กรุณาหลีกเลี่ยงการใช้ถนนสายหลักในช่วงเวลาซ่อมแซม",
  },
  {
    id: 5,
    title: "ตลาดนัดชุมชน",
    date: "วันเสาร์ เวลา 08:00 น.",
    location: "ลานตลาด",
    icon: "🛒",
    description: "ตลาดนัดประจำสัปดาห์ มีสินค้าสดและของใช้ในท้องถิ่น",
  },
]

export default function CommunityNewsPage({ onBack }: CommunityNewsPageProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-background">
      {/* Header */}
      <div className="bg-accent text-white p-8 flex items-center justify-between shadow-xl">
        <button onClick={onBack} className="text-4xl font-bold hover:opacity-80 transition-all min-w-[120px] text-left">
          ← กลับ
        </button>
        <h1 className="text-4xl md:text-5xl font-bold">ข่าวสารชุมชน</h1>
        <div className="w-[120px]" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-8 md:p-12 overflow-y-auto">
        <div className="max-w-3xl mx-auto w-full space-y-6">
          {newsItems.map((item) => (
            <div
              key={item.id}
              className="bg-card rounded-3xl p-8 border-4 border-border shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="flex gap-6">
                <div className="text-7xl flex-shrink-0">{item.icon}</div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-foreground mb-4 leading-tight">{item.title}</h3>
                  <div className="space-y-2 mb-4">
                    <p className="text-2xl font-bold text-primary">📅 {item.date}</p>
                    <p className="text-2xl text-muted-foreground font-semibold">📍 {item.location}</p>
                  </div>
                  <p className="text-2xl text-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="max-w-3xl mx-auto w-full mt-10 bg-blue-100 rounded-3xl p-8 border-4 border-blue-400 text-center shadow-lg">
          <p className="text-3xl font-bold text-foreground">ℹ️ กลับมาดูข่าวสารใหม่ๆ อีกนะคะ</p>
        </div>
      </div>
    </div>
  )
}
