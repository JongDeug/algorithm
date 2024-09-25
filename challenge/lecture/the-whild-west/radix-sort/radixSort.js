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

// console.log(mostDigits([0, 100000, 400, 12, 8]))

function radixSort(nums) {
    // mostDigits 로 반복문 n 번
    let n = mostDigits(nums);

    for (let i = 0; i < n; i++) {
        // bucket 생성
        let bucket = Array.from({ length: 10 }, (i) => []);

        // getDigit i에 따라 bucket에 넣기
        // 아 i를 뒤에서 부터 시작해야됨
        while(nums.length) {
            let element = nums.pop();
            bucket[getDigit(element,i)].push(element)
        }

        // bucket에 있는거 nums로 다시 넣기
        for (let item of bucket) {
            while(item.length) {
                nums.push(item.pop())
            }
        }
    }
    // return nums
    return nums;
}

// console.log(radixSort([8, 6, 1, 12]));
console.log(radixSort([902, 4, 7, 408, 29, 9637, 1556, 3556, 8157, 4386, 86, 593]));