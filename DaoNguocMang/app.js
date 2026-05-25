let x = [-3, 5, 1, 3, 2, 10];
let first = 0;
let last = x.length - 1;

let mangBD = document.getElementById('bd');
mangBD.innerText = "Mảng ban đầu: " + x;

let mangDao = document.getElementById('dao');

while (first < last) {
    let b = x[first];
    x[first] = x[last];
    x[last] = b;
    first++;
    last--
}

mangDao.innerText = "Mảng sau đảo: " + x;
