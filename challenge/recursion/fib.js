// [문제 이해하기]
// 피보나치 수열의 n번째 값 반환하는 함수 구현
// Input : integer
// Output : integer
// 가장 중요한 것 ? 재귀로 구현

// [구체적인 예제 찾기]
// fib(4) // 3
// fib(10) // 55
// fib(28) // 317811
// fib(35) // 9227465
// 무효한 값 찾기
// 0번째는 0 return

// [문제 세분화 하기]
// 피보나치 수열의 n번째 수를 반환하는 fib 함수 구현
// 0 1 1 2 3 5 8
function fib(n) {
    // Base Case
    // if (n <= 0) return 0;
    // if (n === 1 || n === 2) return 1;
    if (n <= 2) return 1;

    // return
    return fib(n - 1) + fib(n - 2);
}

console.log(fib(0));
// 5
// 4 | 3 => 3 + 2
// 3, 2 => 2 + 1 | 2, 1 => 2
