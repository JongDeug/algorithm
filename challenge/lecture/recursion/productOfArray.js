// [문제 이해하기]
// 숫자 배열을 받아서 이 배열들의 곱을 반환하는 productOfArray 함수 구현
// 입력 : array of integers
// 출력 : integer
// 가장 중요한 것은? : 재귀함수를 통해 문제를 해결하는 것.

// [구체적인 예시 찾기]
// 간단, 복잡한 예제
// productOfArray([1,2,3]) // 6
// productOfArray([1,2,3,10]) // 60
// 무효한 값 ?
// productOfArray([]) => null, 이 문제에선 빈 배열을 주지 않음.

// [문제 세분화 하기]
// 숫자 배열을 받아서 곱을 출력하는 재귀 함수 productOfArray 구현
function productOfArray(arr) {
   if (arr.length === 0) return 1;
   return arr[0] * productOfArray(arr.slice(1))
}

console.log(productOfArray([1,2,3]))