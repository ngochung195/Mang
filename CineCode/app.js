// --- KHU VỰC THỰC HÀNH CỦA HỌC VIÊN ---
// NHIỆM VỤ 1: Khai báo `cinemaSeats` là một mảng 2 chiều (ví dụ 3x3 hoặc 5x10) chứa số 0 và 1.
let cinemaSeats = [
    [0, 1, 0, 0, 1],
    [1, 0, 1, 0, 0],
    [0, 0, 0, 1, 0]
];
// NHIỆM VỤ 2: Khai báo `waitlistArray` là một mảng 1 chiều chứa tên khách hàng.
let waitlistArray = ["An", "Bình", "Châm"];
// NHIỆM VỤ 3: Viết hàm bookSeat(row, col) để chuyển giá trị từ 0 sang 1 tại vị trí tương ứng trong mảng 2 chiều.
function bookSeat(row, col) {
    if (row < 0 || row >= cinemaSeats.length || col < 0 || col >= cinemaSeats[0].length) {
        console.log(`Vị trí ghế (${row}, ${col}) không tồn tại!`);
        return;
    }

    if (cinemaSeats[row][col] === 0) {
        cinemaSeats[row][col] = 1;
        console.log(`Đặt ghế thành công tại vị trí: Hàng ${row} - Cột ${col}`);
    } else {
        console.log(`Ghế tại vị trí (${row}, ${col}) đã được đặt!`);
    }
}
// NHIỆM VỤ 4: Viết hàm addCustomerToWaitlist(name) để thêm tên vào mảng 1 chiều.
function addCustomerToWaitlist(name) {
    if (!name || name.trim() === "") {
        console.log("Tên khách hàng không hợp lệ!");
        return;
    }

    waitlistArray.push(name);
    console.log(`Đã thêm khách hàng "${name}" vào danh sách chờ.`);
}

// THỬ NGHIỆM CHẠY HÀM (TEST)
console.log("%c--- TRẠNG THÁI BAN ĐẦU ---", "color: blue; font-weight: bold;");
console.log("Sơ đồ ghế ban đầu:");
console.table(cinemaSeats);
console.log("Danh sách chờ ban đầu:", [...waitlistArray]);
console.log("\n-----------------------------------------------\n");

console.log("%c--- BẮT ĐẦU CHẠY CÁC TEST CASE ---", "color: purple; font-weight: bold;");

// --- CASE 1: Đặt một ghế trống ---
// Ghế tại Hàng 0 - Cột 2 hiện đang là 0 (Trống)
console.log("%c[Test 1] Đặt ghế trống (0, 2):", "font-weight: bold;");
bookSeat(0, 2);


// --- CASE 2: Đặt một ghế đã có người ---
// Ghế tại Hàng 1 - Cột 0 hiện đang là 1 (Đã đặt)
console.log("\n%c[Test 2] Đặt ghế đã có người (1, 0):", "font-weight: bold;");
bookSeat(1, 0);


// --- CASE 3: Thêm khách vào danh sách chờ ---
console.log("\n%c[Test 3] Thêm khách mới vào danh sách chờ:", "font-weight: bold;");
addCustomerToWaitlist("Dũng");


// --- CASE 4: Bắt lỗi Index Out of Bounds (Hàng không tồn tại) ---
// Mảng chỉ có hàng 0, 1, 2. Hàng 5 là vượt quá phạm vi.
console.log("\n%c[Test 4] Lỗi Index Out of Bounds (Hàng 5 không tồn tại):", "font-weight: bold;");
bookSeat(5, 1);


// --- CASE 5: Bắt lỗi Index Out of Bounds (Cột không tồn tại) ---
// Mỗi hàng chỉ có cột từ 0 đến 4. Cột 9 là vượt quá phạm vi.
console.log("\n%c[Test 5] Lỗi Index Out of Bounds (Cột 9 không tồn tại):", "font-weight: bold;");
bookSeat(2, 9);


// --- CASE 6: Bắt lỗi Index Out of Bounds (Số âm) ---
console.log("\n%c[Test 6] Lỗi Index Out of Bounds (Chỉ số âm -1):", "font-weight: bold;");
bookSeat(-1, 3);


console.log("\n-----------------------------------------------\n");
console.log("%c--- TRẠNG THÁI SAU KHI TEST ---", "color: green; font-weight: bold;");
console.log("Sơ đồ ghế hiện tại (Ghế 0,2 đã chuyển từ 0 sang 1):");
console.table(cinemaSeats);
console.log("Danh sách chờ hiện tại (Đã thêm Dũng):", [...waitlistArray]);