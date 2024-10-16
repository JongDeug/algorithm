// [문제 이해하기]
// Long Increasing Subsequence
// 최장 증가 부분 수열의 길이를 구해라
//
// [문제 풀이]
// N: 현재 인덱스
// K: 이전 인덱스
//
// arr[K]보다 arr[N]이 크면
// Max(dp[k] + 1, dp[n]) 으로 초기화
//
// 종료 조건 N이 길이를 넘었을 때
//
// [문제 세분화]
// M. dp 배열 초기화
// I. for nums 길이만큼
// i. for 0 ~ i - 1 만큼 점화식에 맞춰 구현
function solution(nums) {
  // M.dp 초기화
  let dp = new Array(nums.length).fill(1); // 1이 맞지

  // I. 반복문
  for (let n = 1; n < nums.length; n++) {
    for (let k = n - 1; k >= 0; k--) {
      if (nums[k] < nums[n]) {
        dp[n] = Math.max(dp[k] + 1, dp[n]);
      }
    }
  }

  return Math.max(...dp);
}

console.log(solution([1, 4, 2, 3, 1, 5, 7, 3]));
console.log(solution([3, 2, 1]));
