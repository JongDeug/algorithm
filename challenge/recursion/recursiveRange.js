// [문제 이해하기]
// 0부터 받은 숫자까지의 모든 합을 구하는 함수 구현
// Input : positive integer
// Output : positive integer, sum
// 가장 중요한 것? 재귀로 구현 해야함.

// [구체적인 예시 찾기]
// recursiveRange(6) // 21
// recursiveRange(10) // 55
// 좀 더 복잡한 예제
// recursiveRange(0) // 0

// [문제 세분화 하기]
// 0부터 받은 숫자까지의 모든 합을 구하는 함수를 구현하라.
function recursiveRange(num) {
    // Base Case: num이 0이면 return 0
    if (num === 0) return 0;
    // return 숫자 + 숫자-1
    return num + recursiveRange(--num);
}

console.log(recursiveRange(0))