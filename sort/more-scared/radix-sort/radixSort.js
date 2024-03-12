// main 함수
function radixSort(arr) {
    let most = mostDigits(arr);
    // 버킷 생성
    let bucket = [];
    for (let i = 0; i < 10; i++) {
        bucket.push([]);
    }

    // most 기반으로 루프를 돌거임, i는 place로 쓰일 수 있겠다.
    for (let i = 0; i < most; i++) {
        // 버킷에 삽입
        for (const num of arr) {
            bucket[getDigit(num, i)].push(num);
        }

        // 버킷에서 추출
        arr = [];
        for (const item of bucket) {
            arr = [...arr, ...item];
        }

        // 버킷 초기화 
        bucket = [];
        for (let i = 0; i < 10; i++) {
            bucket.push([]);
        }
    }

    return arr;
}

console.log(radixSort([123, 4, 5, 56, 123, 11]));

// 12345, 3을 얻고 싶으면 (100[10^2]), 2 자릿수 ok,
function getDigit(num, place) {
    return (Math.floor(Math.abs(num) / Math.pow(10, place) % 10));
}

// console.log(getDigit(12345, 5));

function digitCount(num) {
    // return num.toString().split('').length;
    if (num === 0) return 1; // 0을 log10에 넣으면 -Infinity 나와서 ㅇ.ㅇ
    return Math.floor(Math.log10(Math.abs(num))) + 1; // 오호!
}

// console.log(digitCount(12345))

function mostDigits(arr) {
    let most = 0;
    for (const item of arr) {
        // if (most < digitCount(item)) most = digitCount(item);
        most = Math.max(most, digitCount(item));
    }
    return most;
}

// console.log(mostDigits([1234, 2, 43]));