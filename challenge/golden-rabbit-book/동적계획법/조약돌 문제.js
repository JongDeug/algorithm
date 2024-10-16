// [문제 이해하기]
// 조약돌을 놓을 때 최대 가중치의 합을 반환
//
// [문제 풀이]
// 3열 N행의 가중치가 있는 배열 arr 주어짐
// 패턴 1, 패턴 2 대로 진행하면 되는데, 맨위 맨아래 고를 때 음수이면 거름, 둘 다 음수면 가장 작은 음수 선택
//
// [문제 세분화]
// M. 패턴 1, 패턴 2 저장할 배열
// I. for 문 써서 로직 구현
function solution(arr) {
  let colLen = arr[0].length;
  // M. 패턴 1, 패턴 2
  let pattern1 = new Array(colLen).fill(0);
  let pattern2 = new Array(colLen).fill(0);

  const calPattern = (pattern, idx, flag) => {
    // 짝수
    if (flag % 2 === 0) {
      pattern[idx] = arr[1][idx];
    }
    // 홀수
    else {
      // 음수가 있을 경우, 큰놈 선택
      if (arr[0][idx] < 0 || arr[2][idx] < 0) {
        pattern[idx] = Math.max(arr[0][idx], arr[2][idx]);
      } else {
        pattern[idx] = arr[0][idx] + arr[2][idx];
      }
    }
  };

  for (let j = 0; j < colLen; j++) {
    // 패턴 1
    calPattern(pattern1, j, j);
    // 패턴 2
    calPattern(pattern2, j, j + 1);
  }

  return Math.max(
    pattern1.reduce((acc, value) => acc + value, 0),
    pattern2.reduce((acc, value) => acc + value, 0),
  );
}

// function solution(arr) {
//   const n = arr[0].length; // ❶ 입력 배열의 열의 개수를 저장합니다.
//   const dp = Array.from(Array(4), () => Array(n).fill(0)); // ❷ dp 배열을 초기화합니다. 4행 n열의 2차원 배열입니다.
//
//   // 각 열에서 선택 가능한 4가지 조약돌 배치 패턴에 대해 첫 번째 열의 가중치를 초기화합니다.
//   // ❸ 0: 상단, 1: 중앙, 2: 하단, 3: 상단과 하단
//   dp[0][0] = arr[0][0];
//   dp[1][0] = arr[1][0];
//   dp[2][0] = arr[2][0];
//   dp[3][0] = arr[0][0] + arr[2][0];
//
//   // ❹ 두 번째 열부터 마지막 열까지 각 열에서 선택 가능한 4가지 조약돌 배치 패턴에 대해 최대 가중치를 계산합니다.
//   for (let i = 1; i < n; i++) {
//     // 패턴 0이 선택된 경우, 이전은 패턴 {1, 2} 가능
//     dp[0][i] = arr[0][i] + Math.max(dp[1][i - 1], dp[2][i - 1]);
//     // 패턴 1이 선택된 경우, 이전은 패턴 {0, 2, 3|가능
//     dp[1][i] = arr[1][i] + Math.max(dp[0][i - 1], dp[2][i - 1], dp[3][i - 1]);
//     // 패턴 2가 선택된 경우, 이전은 패턴 {0, 1}이 가능
//     dp[2][i] = arr[2][i] + Math.max(dp[0][i - 1], dp[1][i - 1]);
//     // 패턴 3이 선택된 경우, 이전은 패턴{1}이 가능
//     dp[3][i] = arr[0][i] + arr[2][i] + dp[1][i - 1];
//   }
//
//   // ❺ 마지막 열에서 선택 가능한 4가지 조약돌 배치 패턴 중 최대 가중치를 반환합니다.
//   return Math.max(...dp.map((row) => row[n - 1]));
// }

console.log(
  solution([
    [1, 3, 3, 2],
    [2, 1, 4, 1],
    [1, 5, 2, 3],
  ]),
);

console.log(
  solution([
    [1, 7, 13, 2, 6],
    [2, -4, 2, 5, 4],
    [5, 3, 5, -3, 1],
  ]),
);

console.log(
  solution([
    [-1, -2, -3],
    [-4, -5, -6],
    [-7, -8, -9],
  ]),
);

console.log(
  solution([
    [100, 0, 0],
    [0, 100, 0],
    [0, 0, 100],
  ]),
);
