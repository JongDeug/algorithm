// [문제 이해하기]
// 정수 배열을 정렬해서 반환하는 solution() 함수를 완성하세요

// [조건]
// 정수 배열의 길이는 2이상 10^5 이하입니다. 
// 정수 배열의 각 데이터 값은 -100,000이상 100,000 이하입니다. 

// [문제 세분화]
function solution(arr) {
    // sort 함수를 통해 오름차순으로 정렬한다.

    // const newArr = arr.toSorted();
    // return newArr;

    return arr.sort();
}

console.log(solution([1, -5, 2, 4, 3]));