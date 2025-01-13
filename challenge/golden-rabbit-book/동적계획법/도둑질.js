// [문제 이해하기]
// 도둑질하는데 도둑이 훔칠 수 있는 돈의 최댓값을 반환해라.

// [접근법]
// dp 문제임
// 1. 첫 번째 집을 선택한 경우 
// 2. 두 번째 집을 선택한 경우 
// 점화식 dp[i] = max(dp[i-1], dp[i-2] + money[i])

// 하나의 for문으로 문제를 끝내지 않고 임의로 첫 번째 집, 두 번째 집을
// 선택하게 한 이유는 여러 경우를 살펴봐야 하거든. 
// 첫 번째 집과 마지막 집이 연결되어 있기 때문에, 첫 번째 집을 선택하면 마지막 집을 선택할 수 없고,
// 마지막 집을 선택하면 첫 번째 집을 선택할 수 없음

// 만약 하나의 for문만 돌리게 되면 돌리게 한 가지 경우만 구하는 꼴이됨
// 또 각 경우에 대해 dp를 적절하게 초기화 하지 않으면 원하는 경우의 적절한 값을 기대할 수 없음(첫 번째를 선택하게 해야 하는데 두 번째를 선택한 경우가 될 수 있단 말)

// tip: 이전 값을 끌고 온다. => 두번 점핑이 가능해짐
// 이전 값을 끌고 옴으로써 아래 1번 예제처럼 3 -> 6으로 점점핑이 가능해지는거

// [구체적인 예시 찾기]
// [3,5,4,6,7] => 12가 정답 [5,7]
// [5,4,6,7,3] => 12 

// [문제 풀이하기]
// 1. 두 개의 dp 배열을 생성한다
// 2. 첫 번째 집을 선택한 경우와 선택하지 않은 경우로 나눈다
// 3. 각 경우에 대해 dp 배열을 채운다
// 4. 두 경우에서의 최댓값을 반환한다
function solution(money) {
  const dp1 = money.map(x => 0);
  const dp2 = money.map(x => 0);

  // 첫 번째 집
  dp1[0] = money[0];
  dp1[1] = money[0]; // money[1]로 초기화하면 경우에 따라 두 번째 집을 선택한 꼴이될 수 있음.
  for (let i = 2; i < money.length - 1; i++) {
    dp1[i] = Math.max(dp1[i - 1], dp1[i - 2] + money[i]);
  }

  // 두 번째 집
  dp2[0] = 0;
  dp2[1] = money[1];
  for (let i = 2; i < money.length; i++) {
    dp2[i] = Math.max(dp2[i - 1], dp2[i - 2] + money[i]);
  }

  // 마지막 값을 선택하지 않은 경우와 그런 값을 비교
  return Math.max(dp1[money.length - 2], dp2[money.length - 1]);
}

console.log(solution([3, 5, 4, 6, 7]));