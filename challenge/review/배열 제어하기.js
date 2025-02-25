// [문제 이해하기]
// 배열의 중복값을 제거하고 배열 데이터를 내림차순으로 정렬해서 반환하는 solution 함수를 구현하세요

// [제약 조건]
// 배열 길이는 2이상 1000이하 입니다. 

// [문제 세분화]
function solution(arr) {
    // set으로 중복 제거를 한다. 
    // const removeRedundant = new Set(arr);
    const removeRedundant = [...new Set(arr)];

    // // sort로 정렬한다.
    // return Array.from(removeRedundant).sort((a, b) => b - a);
    return removeRedundant.sort((a, b) => b - a);
}

console.log(solution([4, 2, 2, 1, 3, 4]));
console.log(solution([2, 1, 1, 3, 2, 5, 4]));
