// 재귀
// function fibonacci(n) {
//     if (n <= 2) return 1;
//     return fibonacci(n - 1) + fibonacci(n - 2);
// }

// 동적
// 그냥 계산한 것을 저장하고 다시 쓰면 되잖아. 재귀처럼 굳이 다시 계산해야해 ?
// function fibonacci(n) {
//     let memo = [0];
//
//     for (let i = 1; i <= n; i++) {
//         if (i === 1) memo[i] = 1;
//         else if (i === 2) memo[i] = 1;
//         else {
//             memo[i] = memo[i - 1] + memo[i - 2];
//         }
//     }
//     return memo;
// }
function fibonacci(n) {
    if (n <= 2) return 1;
    let memo = [0, 1, 1];
    for (let i = memo.length; i <= n; i++) {
        memo[i] = memo[i - 1] + memo[i - 2];
    }
    return memo;
}

// function fibonacci(n, memo = []) {
//     // undefined가 아니면 이미 계산된 결과가 존재함.
//     if (memo[n] !== undefined) return memo[n];
//     // undefined 면,
//     if (n <= 2) return 1;
//     let res = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
//     memo[n] = res;
//     return res;
// }


console.log(fibonacci(7));