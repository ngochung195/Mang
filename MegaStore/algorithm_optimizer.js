/**
 * HỆ THỐNG TÌM KIẾM MEGASTORE - TOÀN BỘ MÃ NGUỒN HOÀN CHỈNH
 */

// --- CÁCH TIẾP CẬN CŨ (LEGACY CODE) ---
function searchAndSortLegacy(dataArray, keyword) {
    console.time("LegacyProcess");
    let results = [];

    // 1. Tìm kiếm tuyến tính qua mảng lồng nhau O(N*M)
    for (let i = 0; i < dataArray.length; i++) {
        for (let j = 0; j < dataArray[i].length; j++) {
            if (dataArray[i][j].name.includes(keyword)) {
                results.push(dataArray[i][j]);
            }
        }
    }

    // 2. Bubble Sort để sắp xếp theo giá O(K^2)
    for (let i = 0; i < results.length - 1; i++) {
        for (let j = 0; j < results.length - 1 - i; j++) {
            if (results[j].price > results[j + 1].price) {
                let temp = results[j];
                results[j] = results[j + 1];
                results[j + 1] = temp;
            }
        }
    }
    console.timeEnd("LegacyProcess");
    return results;
}

// --- CÁCH TIẾP CẬN TỐI ƯU  ---

// [NHIỆM VỤ 1]: Làm phẳng mảng 2 chiều thành 1 chiều
function flattenProducts(dataArray) {
    return dataArray.flat(1);
}

// [NHIỆM VỤ 2]: Sắp xếp hiệu suất cao bằng Merge Sort O(N log N)
function mergeSortByPrice(array) {
    if (array.length <= 1) return array;

    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    return merge(mergeSortByPrice(left), mergeSortByPrice(right));
}

function merge(left, right) {
    let resultArray = [], leftIndex = 0, rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex].price < right[rightIndex].price) {
            resultArray.push(left[leftIndex]);
            leftIndex++;
        } else {
            resultArray.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return resultArray
        .concat(left.slice(leftIndex))
        .concat(right.slice(rightIndex));
}

// [NHIỆM VỤ 3]: Binary Search (Dùng để tìm kiếm chính xác theo giá khi mảng đã sort)
function binarySearchByPrice(sortedArray, targetPrice) {
    let left = 0;
    let right = sortedArray.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (sortedArray[mid].price === targetPrice) {
            return sortedArray[mid];
        } else if (sortedArray[mid].price < targetPrice) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return null;
}


function searchAndSortOptimized(flatList, keyword) {
    // 1. Lọc tuyến tính 1 chiều (Nhanh hơn lặp lồng nhau 2 tầng)
    const filtered = flatList.filter(item => item.name.includes(keyword));

    // 2. Sắp xếp mảng kết quả bằng Merge Sort thay vì Bubble Sort
    return mergeSortByPrice(filtered);
}


// --- [NHIỆM VỤ 4]: ĐO LƯỜNG VÀ KIỂM TRA HIỆU NĂNG ---
const mockData = [];
for (let i = 0; i < 500; i++) {
    const category = [];
    for (let j = 0; j < 40; j++) {
        category.push({
            id: i * 40 + j,
            name: `Product-${i}-${j}`,
            price: Math.floor(Math.random() * 10000) + 1
        });
    }
    mockData.push(category);
}

console.log("=== BẮT ĐẦU KIỂM TRA HIỆU NĂNG ===");

// Chuẩn bị sẵn mảng phẳng (Hệ thống thực tế thường làm bước này một lần duy nhất khi nạp dữ liệu)
const flatProductList = flattenProducts(mockData);

// --- TEST TOÀN DIỆN 1: LEGACY ---
console.time("Cách tiếp cận Legacy");
const legacyRes = searchAndSortLegacy(mockData, "Product-250");
console.timeEnd("Cách tiếp cận Legacy");

// --- TEST TOÀN DIỆN 2: OPTIMIZED ---
console.time("Cách tiếp cận Tối Ưu");
const optimizedRes = searchAndSortOptimized(flatProductList, "Product-250");
console.timeEnd("Cách tiếp cận Tối Ưu");

console.log(`Số lượng kết quả tìm thấy: ${optimizedRes.length}`);