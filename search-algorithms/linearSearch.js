function linearSearch(arr, value) {
    // entries 함수는 배열의 내장 함수
    const entries = arr.entries();
    // index, element 를 받을 수 있음.
    for (const [index, element] of entries) {
        if (element === value) return index;
    }
    return -1;
}

console.log(linearSearch([1, 2, 3, 4, 5], 5));