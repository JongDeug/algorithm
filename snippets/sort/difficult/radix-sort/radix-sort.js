// Main 함수
function radixSort(arr) {
    let most = mostDigits(arr);

    for (let i = 0; i < most; i++) {
        let bucket = Array.from({ length: 10 }, () => []); // 이거 좀 찾아보자

        for (const num of arr) {
            bucket[getDigit(num, i)].push(num);
        }

        arr = [].concat(...bucket); // 매우 간편한 방식
    }
    return arr;
}

console.log(radixSort([123, 4, 5, 56, 123, 11]));

// 원하는 자릿수의 값을 가져오는 함수
function getDigit(num, place) {
    return (Math.floor(Math.abs(num) / Math.pow(10, place) % 10));
}

// 자릿수 세리는 함수
function digitCount(num) {
    if (num === 0) return 1; // 0을 log10에 넣으면 -Infinity 나와서 ㅇ.ㅇ
    return Math.floor(Math.log10(Math.abs(num))) + 1;
}

// 주어진 배열에서 가장 많은 자릿수를 찾아 반환하는 함수
function mostDigits(arr) {
    let most = 0;
    for (const item of arr) {
        most = Math.max(most, digitCount(item));
    }
    return most;
}

// 예전에 작성한 조금은 비효율적인 코드 1
// function radixSort(arr) {
//     let most = mostDigits(arr);
//     // 버킷 생성
//     let bucket = [];
//     for (let i = 0; i < 10; i++) {
//         bucket.push([]);
//     }
//
//     // most 기반으로 루프를 돌거임, i는 place로 쓰일 수 있겠다.
//     for (let i = 0; i < most; i++) {
//         // 버킷에 삽입
//         for (const num of arr) {
//             bucket[getDigit(num, i)].push(num);
//         }
//
//         // 버킷에서 추출
//         arr = [];
//         for (const item of bucket) {
//             arr = [...arr, ...item];
//         }
//
//         // 버킷 초기화
//         bucket = [];
//         for (let i = 0; i < 10; i++) {
//             bucket.push([]);
//         }
//     }
//     return arr;
// }

// 예전에 작성한 조금은 비효율적인 코드 2
// function radixSort(nums) {
//     // mostDigits 로 반복문 n 번
//     let n = mostDigits(nums);
//
//     for (let i = 0; i < n; i++) {
//         // bucket 생성
//         let bucket = Array.from({ length: 10 }, (i) => []);
//
//         // getDigit i에 따라 bucket에 넣기
//         // 아 i를 뒤에서 부터 시작해야됨
//         while (nums.length) {
//             let element = nums.pop();
//             bucket[getDigit(element, i)].push(element)
//         }
//
//         // bucket에 있는거 nums로 다시 넣기
//         for (let item of bucket) {
//             while (item.length) {
//                 nums.push(item.pop())
//             }
//         }
//     }
// }



