function same(arr1, arr2) {
    // 빈도 수도 동일 해야한다.
    if (arr1.length !== arr2.length) return false;
    let frequencyCounter1 = {};
    let frequencyCounter2 = {};

    for (let val of arr1) {
        frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1;
    }
    for (let val of arr2) {
        frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1;
    }

    for (let key in frequencyCounter1) {
        // key가 있는지 체킹
        if (!(key ** 2 in frequencyCounter2)) return false;
        // 빈도수가 맞는지 체킹
        if (frequencyCounter2[key ** 2] !== frequencyCounter1[key])
            return false;
    }

    return true;
}
