// [문제 이해하기]
// 타일링하는 방법의 수를 return

// [문제 풀이하기]
// 1 => 1
// 2 => 2
// 3 => 3
// 4 => 5
// 피보나치랑 비슷한 규칙을 가지고 있음

// [문제 세분화하기]
// I. memoization 으로 풀이
function solution(n) {
  let ans = Array(n).fill(0);
  ans[1] = 1;
  ans[2] = 2;

  for (let i = 3; i <= n; i++) {
    let sum = ans[i - 1] + ans[i - 2];
    if (sum >= 1000000007)
      ans[i] = sum % 1000000007; // 후훗,,
    else ans[i] = sum;
  }

  return ans[n];
}
