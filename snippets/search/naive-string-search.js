// 미쳤따~
// 문자열을 one by one 검색하는 간단한 검색 알고리즘.
function naiveStringSearch(longer, shorter) {
    let count = 0;

    // longer loop
    for (let i = 0; i < longer.length; i++) {
        // shorter loop
        for (let j = 0; j < shorter.length; j++) {
            if ((i + j) >= longer.length) break;
            // longer, shorter 단일 요소가 다르면,
            if (longer[i + j] !== shorter[j]) break;
            // 비교했을 때 모두 같다면 count 증가
            if (j === shorter.length - 1) count++;
        }
    }
    return count;
}

console.log(naiveStringSearch("abcdefg", "fg"));
// console.log(naiveStringSearch('wowomgzomg', 'omg'));