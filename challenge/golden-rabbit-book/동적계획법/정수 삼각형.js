// [문제 이해하기]
// 트라이앵글, triangle 따라서 내려올 때 거쳐간 숫자의 최댓값을 return

// [문제 풀이]
// i, j => i+1, j / i+1, j+1
// 이중 for문으로 돌면서 max 값을 채우면 됨

// [문제 세분화]
// I. triangle => dp 배열 초기화
// I. 이중 for문 돌면서 로직 처리
function solution(triangle) {
  let dp = triangle.map((x) => [...x]);
  // let dp = triangle.map(x => Array(x.length).fill(0)); // ㅋㅋ 여기서 시간 초과 났었네

  let rowLen = triangle.length;
  dp[0][0] = triangle[0][0];

  // I. 끝 배열은 계산 x
  for (let i = 0; i < rowLen - 1; i++) {
    for (let j = 0; j < i + 1; j++) {
      // triangle 은 다음값
      dp[i + 1][j] = Math.max(dp[i][j] + triangle[i + 1][j], dp[i + 1][j]);
      dp[i + 1][j + 1] = Math.max(
        dp[i][j] + triangle[i + 1][j + 1],
        dp[i + 1][j + 1],
      );
    }
  }

  return Math.max(...dp[rowLen - 1]);
}
