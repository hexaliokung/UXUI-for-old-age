// Mock users for development/testing
export const MOCK_USERS = [
  {
    id: "user-1",
    name: "สมชาย วิมล",
    nameEn: "Somchai Wimol",
    phoneNumber: "0812345678",
    email: "somchai@example.com",
    age: 72,
    village: "Ban Nakhon",
  },
  {
    id: "user-2",
    name: "สมหญิง เนียม",
    nameEn: "Somying Niam",
    phoneNumber: "0898765432",
    email: "somying@example.com",
    age: 68,
    village: "Ban Nakhon",
  },
  {
    id: "user-3",
    name: "วิชัย สุขพล",
    nameEn: "Wichai Sukphon",
    phoneNumber: "0881234567",
    email: "wichai@example.com",
    age: 75,
    village: "Ban Nakhon",
  },
]

export async function authenticateUser(phoneNumber: string) {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Find user by phone number (flexible matching)
  const user = MOCK_USERS.find((u) => u.phoneNumber.includes(phoneNumber.slice(-7)))
  if (user) {
    return { success: true, user }
  }

  return { success: false, error: "User not found" }
}
