function getDigit(num, i) {
    return Math.floor((num / Math.pow(10, i)) % 10);
}

// console.log(getDigit(1,0))

function digitCount(num) {
    if (num === 0) return 1;
    // return num.toString().split('').length;
    return Math.floor(Math.log10(num) + 1);
}

// console.log(digitCount(0));

function mostDigits(nums) {
    let result = 0;
    nums.forEach(num => {
        if (result < digitCount(num)) result = digitCount(num);
    });
    return result;
}

function radixSort(nums) {
    // mostDigits 로 반복문 n 번
    let n = mostDigits(nums);

    for (let i = 0; i < n; i++) {
        // bucket 생성
        let bucket = Array.from({ length: 10 }, (i) => []);

        // 아니 이게 말이 안돼 너무 깔끔해졌다.
        for (let item of nums) {
            bucket[getDigit(item, i)].push(item);
        }
        console.log(bucket);
        nums = [].concat(...bucket);
    }
    // return nums
    return nums;
}

console.log(radixSort([8, 6, 1, 12]));
// console.log(radixSort([902, 4, 7, 408, 29, 9637, 1556, 3556, 8157, 4386, 86, 593]));