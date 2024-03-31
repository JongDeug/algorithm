// 큰 문제를 세분화 해서 간단한 문제로 만든 뒤, 복잡한 문제를 해결해 나가는 패턴
// 언제 사용?
// 1. 반복되는 하위 문제가 있을 때 사용
// 2. 최적 하위 구조 : 해당 경로까지의 최적을 찾는다고 가정했을 때, 그 하위 구조로부터 도출되는 것을 말함.

// 예시 1) 피보나치 문제

// 1) 그냥 재귀로 풀었을 때 n이 커짐에 따라 효율이 떨어짐.
function fibonacci1(n) {
    if (n <= 2) return 1;
    return fibonacci1(n - 1) + fibonacci1(n - 2);
}

// 2) Bottom-Up (상향식)
function fibonacci2(n) {
    if (n <= 2) return 1;
    let arr = [0, 1, 1];
    for (let i = arr.length; i <= n; i++) {
        arr[i] = arr[i - 1] + arr[i - 2];
    }
    return arr;
}


// 3) Top-Down (하향식) => 재귀
// memoization, 반복되는 하위 문제를 저장함.
function fibonacci3(n, memo = []) {
    // undefined 가 아니면,
    if (memo[n] !== undefined) return memo[n];
    if (n <= 2) return 1;
    let res = fibonacci3(n - 1, memo) + fibonacci3(n - 2, memo);
    memo[n] = res;
    return res;
}
