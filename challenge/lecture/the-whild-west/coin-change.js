// [문제 이해하기] (상) 어려웠음 ㅜㅜㅠ
// 주어진 denominations로 거스름돈을 만들 수 있는 방법의 수
// 입력 : array of integers, money(integer), 출력 : integer
// 핵심 : 동적 프로그래밍으로 구현
// [문제 세분화하기]
function coinChange(denominations, n) {
    // let dp = Array.from({ length: n + 1 }, () => 0);
    let dp = new Array(n + 1).fill(0);
    dp[0] = 1; // 자기 자신을 만드는 건 1가지 라고 생각해야함.

    // 하나씩 모조리 채워야함. O(denominations.length * n) => O(n)
    for (const coin of denominations) {
        for (let i = coin; i <= n; i++) {
            dp[i] += dp[i - coin];
        }
    }
    return dp[n];
}

console.log(coinChange([1, 5, 10, 25], 10))