// [문제 이해하기]
// 가장 큰 정사각형의 크기를 반환하면 됨
//
// [문제 풀이하기]
// board[i][j] = min(up, left, diagonal) + 1
// 아니 ... 흠.. 생각도 못했는데
//
// [문제 세분화]
function solution(board) {
  const rowLen = board.length;
  const colLen = board[0].length;

  // for 문 [1][1] 부터 시작
  for (let i = 1; i < rowLen; i++) {
    for (let j = 1; j < colLen; j++) {
      // 중요
      if (board[i][j] === 1) {
        // up, left, diagonal
        board[i][j] =
          Math.min(board[i - 1][j], board[i][j - 1], board[i - 1][j - 1]) + 1;
      }
    }
  }

  let maxValue = Math.max(...board.map((r) => Math.max(...r)));

  return maxValue * maxValue;
}

console.log(
  solution([
    [0, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [0, 0, 1, 0],
  ]),
);
