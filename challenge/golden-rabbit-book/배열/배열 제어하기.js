// [문제 이해하기]
// 중복 제거 => 내림차순 정렬
// NlogN

function solution(arr) {
    const newSet = new Set(arr);
    return [...newSet].sort((a, b) => b - a);
}

console.log(solution([4, 2, 2, 1, 3, 4]));
console.log(solution([2, 1, 1, 3, 2, 5, 4]));
