// Mock users for development/testing
// แบ่งเป็น 2 ประเภท: ผู้สูงอายุ (elderly) และ ญาติ (relative)

export interface ElderlyUser {
  id: string;
  name: string;
  nameEn: string;
  phoneNumber: string;
  email: string;
  age: number;
  village: string;
  role: "elderly";
  relativeIds: string[]; // ID ของญาติที่ดูแล
}

export interface RelativeUser {
  id: string;
  name: string;
  nameEn: string;
  phoneNumber: string;
  email: string;
  age?: number;
  role: "relative";
  elderlyIds: string[]; // ID ของผู้สูงอายุที่ดูแล
  relationship: string; // ความสัมพันธ์ เช่น "ลูกสาว", "ลูกชาย", "หลาน"
}

export type User = ElderlyUser | RelativeUser;

// ผู้สูงอายุ
export const MOCK_ELDERLY_USERS: ElderlyUser[] = [
  {
    id: "elderly-1",
    name: "สมชาย วิมล",
    nameEn: "Somchai Wimol",
    phoneNumber: "0812345678",
    email: "somchai@example.com",
    age: 72,
    village: "Ban Nakhon",
    role: "elderly",
    relativeIds: ["relative-1", "relative-2"],
  },
  {
    id: "elderly-2",
    name: "สมหญิง เนียม",
    nameEn: "Somying Niam",
    phoneNumber: "0898765432",
    email: "somying@example.com",
    age: 68,
    village: "Ban Nakhon",
    role: "elderly",
    relativeIds: ["relative-3"],
  },
  {
    id: "elderly-3",
    name: "วิชัย สุขพล",
    nameEn: "Wichai Sukphon",
    phoneNumber: "0881234567",
    email: "wichai@example.com",
    age: 75,
    village: "Ban Nakhon",
    role: "elderly",
    relativeIds: ["relative-4", "relative-5"],
  },
];

// ญาติของผู้สูงอายุ
export const MOCK_RELATIVE_USERS: RelativeUser[] = [
  {
    id: "relative-1",
    name: "พริม วิมล",
    nameEn: "Prim Wimol",
    phoneNumber: "0891234567",
    email: "prim@example.com",
    age: 45,
    role: "relative",
    elderlyIds: ["elderly-1"],
    relationship: "ลูกสาว",
  },
  {
    id: "relative-2",
    name: "ธนา วิมล",
    nameEn: "Thana Wimol",
    phoneNumber: "0862345678",
    email: "thana@example.com",
    age: 42,
    role: "relative",
    elderlyIds: ["elderly-1"],
    relationship: "ลูกชาย",
  },
  {
    id: "relative-3",
    name: "สุดา ใจดี",
    nameEn: "Suda Jaidee",
    phoneNumber: "0923456789",
    email: "suda@example.com",
    age: 40,
    role: "relative",
    elderlyIds: ["elderly-2"],
    relationship: "ลูกสาว",
  },
  {
    id: "relative-4",
    name: "มานะ รักดี",
    nameEn: "Mana Rakdee",
    phoneNumber: "0854567890",
    email: "mana@example.com",
    age: 50,
    role: "relative",
    elderlyIds: ["elderly-3"],
    relationship: "ลูกชาย",
  },
  {
    id: "relative-5",
    name: "นภา สุขพล",
    nameEn: "Napa Sukphon",
    phoneNumber: "0875678901",
    email: "napa@example.com",
    age: 25,
    role: "relative",
    elderlyIds: ["elderly-3"],
    relationship: "หลานสาว",
  },
];

// รวม users ทั้งหมด
export const MOCK_USERS: User[] = [
  ...MOCK_ELDERLY_USERS,
  ...MOCK_RELATIVE_USERS,
];

export async function authenticateUser(phoneNumber: string) {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // ทำความสะอาดเบอร์โทรศัพท์ (เอาแต่ตัวเลข)
  const cleanPhone = phoneNumber.replace(/\D/g, "");

  // Find user by phone number (exact match or last 9-10 digits)
  const user = MOCK_USERS.find((u) => {
    const userCleanPhone = u.phoneNumber.replace(/\D/g, "");
    // ตรวจสอบแบบตรงทั้งหมด หรือ ตรง 9-10 หลักท้าย
    return (
      userCleanPhone === cleanPhone ||
      (userCleanPhone.slice(-9) === cleanPhone.slice(-9) &&
        cleanPhone.length >= 9)
    );
  });

  if (user) {
    return { success: true, user };
  }

  return { success: false, error: "User not found" };
}

// Helper functions
export function getElderlyById(id: string): ElderlyUser | undefined {
  return MOCK_ELDERLY_USERS.find((u) => u.id === id);
}

export function getRelativeById(id: string): RelativeUser | undefined {
  return MOCK_RELATIVE_USERS.find((u) => u.id === id);
}

export function getElderlyRelatives(elderlyId: string): RelativeUser[] {
  const elderly = getElderlyById(elderlyId);
  if (!elderly) return [];
  return MOCK_RELATIVE_USERS.filter((r) => r.elderlyIds.includes(elderlyId));
}

export function getRelativeElderlyList(relativeId: string): ElderlyUser[] {
  const relative = getRelativeById(relativeId);
  if (!relative) return [];
  return MOCK_ELDERLY_USERS.filter((e) => relative.elderlyIds.includes(e.id));
}
