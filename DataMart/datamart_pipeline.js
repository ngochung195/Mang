// Hàm tối ưu (MVP - Clean Code)
const calculateTotalRevenue = (orderList) =>
    orderList
        .filter(order => order?.status === "Delivered")
        .map(order => (order.price || 0) + (order.tax || 0))
        .reduce((total, finalPrice) => total + finalPrice, 0);

// ==================== KỊCH BẢN KIỂM THỬ (TEST CASES) ====================

// 1. KỊCH BẢN 1: Mảng chuẩn (Happy Path)
// Kiểm tra tính toán đúng luồng dữ liệu thông thường.
const normalOrders = [
    { id: 1, status: "Delivered", price: 100, tax: 10 }, // Hợp lệ -> 110
    { id: 2, status: "Cancelled", price: 200, tax: 20 }, // Bị loại bỏ
    { id: 3, status: "Delivered", price: 300, tax: 30 }  // Hợp lệ -> 330
];
console.log("1. Mảng chuẩn: ", calculateTotalRevenue(normalOrders));
// Kết quả kỳ vọng: 440


// 2. KỊCH BẢN 2: Mảng rỗng (Empty Array)
// Đảm bảo hàm không bị crash và trả về doanh thu bằng 0 khi không có dữ liệu.
const emptyOrders = [];
console.log("2. Mảng rỗng: ", calculateTotalRevenue(emptyOrders));
// Kết quả kỳ vọng: 0


// 3. KỊCH BẢN 3: Dữ liệu dị thường (Edge Cases)
// Giả lập dữ liệu lỗi từ API/Database (Thiếu trường, sai kiểu dữ liệu, phần tử null).
const edgeCaseOrders = [
    { id: 1, status: "Delivered", price: 150 },          // Thiếu tax (tax = undefined)
    { id: 2, status: "Delivered", tax: 15 },             // Thiếu price (price = undefined)
    { id: 3, status: "Delivered", price: 0, tax: 0 },    // Đơn hàng 0 đồng
    { id: 4, status: "DELIVERED", price: 100, tax: 10 }, // Sai định dạng chữ (chữ hoa) -> Sẽ bị loại bỏ
    null,                                                // Phần tử bị null
    { id: 5 }                                            // Object rỗng không có status
];
console.log("3. Dữ liệu dị thường: ", calculateTotalRevenue(edgeCaseOrders));
// Kết quả kỳ vọng: 165 (Đơn 1 ra 150, Đơn 2 ra 15, Đơn 3 ra 0. Các đơn còn lại bị loại)