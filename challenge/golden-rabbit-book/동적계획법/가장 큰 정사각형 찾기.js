// // [문제 이해하기]
// // 가장 큰 정사각형의 크기를 반환하면 됨
// //
// // [문제 풀이하기]
// // board[i][j] = min(up, left, diagonal) + 1
// // 아니 ... 흠.. 생각도 못했는데
// //
// // [문제 세분화]
// function solution(board) {
//   const rowLen = board.length;
//   const colLen = board[0].length;

//   // for 문 [1][1] 부터 시작
//   for (let i = 1; i < rowLen; i++) {
//     for (let j = 1; j < colLen; j++) {
//       // 중요
//       if (board[i][j] === 1) {
//         // up, left, diagonal
//         board[i][j] =
//           Math.min(board[i - 1][j], board[i][j - 1], board[i - 1][j - 1]) + 1;
//       }
//     }
//   }

//   let maxValue = Math.max(...board.map((r) => Math.max(...r)));

//   return maxValue * maxValue;
// }

// console.log(
//   solution([
//     [0, 1, 1, 1],
//     [1, 1, 1, 1],
//     [1, 1, 1, 1],
//     [0, 0, 1, 0],
//   ]),
// );

// [문제 이해하기]
// 가장 큰 정사각형 넓이 찾아 return

// [입력]: 2차원 arr(board, 0과 1로 이뤄짐)
// [출력]: int(정사각형 넓이)

// [접근법]
// 대각선으로 이동하면서 기록함 => 다이나믹 프로그래밍

// [문제 세분화]
// 모든 배열 탐색
// 0은 안됨
// 대각선으로 이동
// 0은 안됨
// i,j 기준 => 대각선이랑 오른쪽, 아래를 비교해서 대각선이랑 같거나 크면 더해서 초기화

// [피드백]
// board[i+1][j+1]가 0이 아닌놈에게만 초기화 해야됨
// 그리고 한 번 지나간 놈은 더 이상 초기화 되지 않는다는 사실도 기억하셈
function solution(board) {
  const rowLen = board.length;
  const colLen = board[0].length;

  const rangeCheck = (i, j) => {
    return i >= 0 && i < rowLen && j >= 0 && j < colLen && board[i][j] === 1;
  };

  for (let i = 0; i < rowLen; i++) {
    for (let j = 0; j < colLen; j++) {
      if (board[i][j] && rangeCheck(i + 1, j + 1)) {
        // 오른쪽 (i, j+1), 아래 (i+1, j), 현재, 의 최소를 더해야되는구만
        board[i + 1][j + 1] =
          Math.min(board[i + 1][j], board[i][j + 1], board[i][j]) + 1;
      }
    }
  }

  // 죽이네!
  let answer = Math.max(...board.map((x) => Math.max(...x)));

  return answer * answer;
}

console.log(
  solution([
    [0, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [0, 0, 1, 0],
  ])
);

console.log(
  solution([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ])
);
