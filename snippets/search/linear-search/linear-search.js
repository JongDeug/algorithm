// 가장 기본적인 검색 알고리즘
function linearSearch(arr, value) {
    // entries 함수는 배열의 내장 함수
    // Iterator 반환(entries.next().value로 접근 가능)
    const entries = arr.entries();
    for (const [index, element] of entries) {
        if (element === value) return index;
    }
    return -1;
}

console.log(linearSearch([1, 2, 3, 4, 5], 3));