/**
 * HỆ THỐNG PHÂN TÍCH DỮ LIỆU DATASTREAM - LEGACY CODE
 * Nhiệm vụ: Lấy email của khách VIP và tính tổng doanh thu từ họ.
 */

const rawUsers = [
    { "id": 1, "name": "Alice", "role": "VIP", "email": "alice@mail.com", "totalSpent": 500 },
    { "id": 2, "name": "Bob", "role": "MEMBER", "email": "bob@mail.com", "totalSpent": 120 },
    { "id": 3, "name": "Charlie", "role": "vip", "email": "charlie@mail.com", "totalSpent": 800 },
    { "id": 4, "name": "David", "role": "GUEST", "totalSpent": 50 },
    { "id": 5, "name": "Eve", "role": "VIP", "email": "eve@mail.com", "totalSpent": -150 },
    { "id": 6, "name": "Frank", "role": "member", "email": "frank@mail.com", "totalSpent": 0 },
    { "id": 7, "name": "Grace", "role": "VIP", "email": "", "totalSpent": 350 },
    { "id": 8, "name": "Heidi", "role": null, "email": "heidi@mail.com", "totalSpent": 200 },
    { "id": 9, "name": "Ivan", "role": "VIP", "email": "ivan@mail.com", "totalSpent": "1000" },
    { "id": 10, "name": "Judy", "role": "GUEST", "email": "judy@mail.com", "totalSpent": -5 },
    { "id": 11, "name": "Mallory", "role": "Vip", "email": "mallory@mail.com", "totalSpent": 450 },
    { "id": 12, "name": "Nia", "role": "MEMBER", "email": "nia@mail.com" },
    { "id": 13, "name": "Oscar", "role": "ADMIN", "email": "oscar@mail.com", "totalSpent": 1500 },
    { "id": 14, "name": "Peggy", "role": "VIP", "email": "peggy_mail.com", "totalSpent": 300 },
    { "id": 15, "name": "Quentin", "role": "guest", "email": null, "totalSpent": 20 },
    { "id": 16, "name": "Robin", "role": "VIP", "email": "robin@mail.com", "totalSpent": NaN },
    { "id": 17, "name": "Sybil", "role": "   VIP   ", "email": "sybil@mail.com", "totalSpent": 600 },
    { "id": 18, "name": "Trent", "role": "MEMBER", "email": "trent@mail.com", "totalSpent": -200 },
    { "id": 19, "name": "Victor", "role": "VIP", "email": "victor@mail.com", "totalSpent": undefined },
    { "id": 20, "name": "Walter", "role": "MEMBER", "email": "walter@mail.com", "totalSpent": 99.99 }
];


// Hàm bổ trợ kiểm tra email hợp lệ cơ bản
const isValidEmail = (email) => typeof email === 'string' && email.includes('@') && email.trim() !== '';

// Hàm bổ trợ kiểm tra xem user đó có phải VIP không (bất chấp hoa thường, khoảng trắng, hay null)
const isVipUser = (user) => {
    if (!user || typeof user.role !== 'string') return false;
    return user.role.trim().toUpperCase() === 'VIP';
};


// 1. Tạo hằng số modernVipEmails
const modernVipEmails = rawUsers
    .filter(user => isVipUser(user) && isValidEmail(user.email))
    .map(user => user.email.trim());


// 2. Tạo hằng số modernTotalRevenue
const modernTotalRevenue = rawUsers
    .filter(user => isVipUser(user))
    .reduce((sum, user) => {
        // Chuyển đổi về dạng số, nếu là dữ liệu rác (NaN, undefined) thì coi như = 0
        const spent = Number(user.totalSpent);

        // Chỉ cộng nếu đó là số hợp lệ và lớn hơn 0 (bỏ qua số âm)
        return (isNaN(spent) || spent < 0) ? sum : sum + spent;
    }, 0);


// --- KIỂM TRA KẾT QUẢ ---
console.log("VIP Emails:", modernVipEmails);
// Output chính xác: [ 'alice@mail.com', 'charlie@mail.com', 'eve@mail.com', 'ivan@mail.com', 'mallory@mail.com', 'robin@mail.com', 'sybil@mail.com', 'victor@mail.com' ]
// (Đã loại bỏ thành công các email lỗi như rỗng, null, hoặc thiếu chữ @)

console.log("Total VIP Revenue:", modernTotalRevenue);
// Output chính xác: 4000
