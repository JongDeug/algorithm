// [문제 이해하기]
// 조건에 맞춰 땅을 밟아 최고점을 반환해라.
//
// [문제 풀이]
// 이중 for 문을 돌면서 칸마다 최고를 비교해 저장하도록 한다.
// 4열 때문에 시간복잡도 O(N)이라고 한듯함
// 위에서 아래? 아래에서 위??
// 아래에서 위 ㄱㄱ
//
// [문제 세분화]
// I. 이중 for 문
function solution(land) {
  const rowLen = land.length;
  const colLen = 4;
  const dp = land.map((x) => [...x]);

  for (let i = rowLen - 1; i > 0; i--) {
    for (let j = 0; j <= colLen - 1; j++) {
      let k = [0, 1, 2, 3].filter((x) => x !== j);

      k.forEach((idx) => {
        // land 가 고정값잖음
        dp[i - 1][idx] = Math.max(dp[i][j] + land[i - 1][idx], dp[i - 1][idx]);
      });
    }
  }

  return Math.max(...dp[0]);
}

// [문제 이해하기] => 복습큐
// 땅따먹기 게임 최고점 return

// [입력]: 2d arr(land, 땅 점수)
// [출력]: int(최고점)

// [접근법]
// Top-Down: dp[1][0] = Math.max(dp[1][0] + land[1][0] + dp[0][~]) 따로 원본 관리가 필요
// Bottom-Up: 뭐야 얘도 원본 관리가 필요한데?

// [문제 세분화]
// for문 N-2 ~ 0
//	for문 4
// 		자신의 열에 있는 놈 제외하고 업데이트 진행
function solution(land) {
  const n = land.length;
  const dp = land.map((x) => [...x]);

  for (let i = n - 2; i >= 0; i--) {
    for (let j = 0; j < 4; j++) {
      // [0, 1, 2, 3].forEach((x) => {
      //   if (x !== j) dp[i][j] = Math.max(dp[i][j], dp[i + 1][x] + land[i][j]);
      // });
      // 진짜 보법이 다르네 ㄷㄷ
      dp[i][j] += Math.max(...dp[i + 1].filter((v, idx) => idx !== j));
    }
  }
  return Math.max(...dp[0]);
}

// // [피드백] => 위에서 아래가 더 직관적, 그리고 열을 다 돌되 math.max 를 쓰는 것이 편리
// function solution(land) {
//   const rowLen = land.length;
//   const colLen = 4;
//   const dp = land.map((x) => [...x]);

//   for (let i = 1; i < rowLen; i++) {
//     for (let j = 0; j < colLen; j++) {
//       // => 오우 보법이 다르네
//       dp[i][j] += Math.max(...dp[i - 1].filter((_, idx) => idx !== j));
//     }
//   }

//   return Math.max(...dp[rowLen - 1]);
// }

console.log(
  solution([
    [1, 2, 3, 5],
    [5, 6, 7, 8],
    [4, 3, 2, 1],
  ])
);
