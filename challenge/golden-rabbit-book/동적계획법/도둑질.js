// [문제 이해하기]
// 도둑질하는데 도둑이 훔칠 수 있는 돈의 최댓값을 반환

// [문제 풀이하기]
// 지금까지 내가 이해한거로는 (3, 4, 7) 3번째(7)을 선택해야 하는 경우까지 생각해야 하므로
// I. 첫 번째 집을 선택한 경우
// I. 두 번째 집을 선택한 경우로 나눠서 점화식을 세움
// I. dp[i] = max(dp[i-1], dp[i-2] + money[i])
function solution(money) {
  const n = money.length;
  const dp1 = new Array(n).fill(0);
  const dp2 = new Array(n).fill(0);

  // 첫 번째 집 선택
  dp1[0] = money[0];
  dp1[1] = money[0];
  for (let i = 2; i < n - 1; i++) {
    dp1[i] = Math.max(dp1[i - 1], dp1[i - 2] + money[i]);
  }

  // 첫 번째 집 x
  dp2[0] = 0;
  dp2[1] = money[1];
  for (let i = 2; i < n; i++) {
    dp2[i] = Math.max(dp2[i - 1], dp2[i - 2] + money[i]);
  }

  return Math.max(dp1[n - 2], dp2[n - 1]);
}
