function radixSort(arr) {
    let most = mostDigits(arr);

    for (let i = 0; i < most; i++) {
        let bucket = Array.from({ length: 10 }, () => []); // 이거 좀 찾아보자

        for (const num of arr) {
            bucket[getDigit(num, i)].push(num);
        }

        // 겁나 간편해 ㄷ드드드드드
        arr = [].concat(...bucket);
        // console.log([].concat(...bucket));
    }
    return arr;
}

console.log(radixSort([123, 4, 5, 56, 123, 11]));


function getDigit(num, place) {
    return (Math.floor(Math.abs(num) / Math.pow(10, place) % 10));
}

function digitCount(num) {
    // return num.toString().split('').length;
    if (num === 0) return 1; // 0을 log10에 넣으면 -Infinity 나와서 ㅇ.ㅇ
    return Math.floor(Math.log10(Math.abs(num))) + 1; // 오호!
}

function mostDigits(arr) {
    let most = 0;
    for (const item of arr) {
        // if (most < digitCount(item)) most = digitCount(item);
        most = Math.max(most, digitCount(item));
    }
    return most;
}

