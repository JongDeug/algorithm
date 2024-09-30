// [문제 이해하기]
// 스도쿠 문제 풀어줘잉
//
// [조건]
// 가로, 세로줄에는 1 ~ 9 숫자가 한 번씩 나타나야 함.
// 3 * 3 에도 1 ~ 9 숫자가 한 번씩
// => 가로 세로만 맞추면 알아서 될 것 같음 => Base Case 를 가로만 일단 채우면서 세로 체킹 식으로
//
// [문제 세분화]
function solution(board) {
  // I. Base Case (가로, 세로, 3*3)
  const inRow = (num, row) => {
    return board[row].includes(num);
  };
  const inCol = (num, col) => {
    return board.some((row) => row[col] === num);
  };
  const inBox = (num, row, col) => {
    // I. 신박하네
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
      for (let j = boxCol; j < boxCol + 3; j++) {
        if (board[i][j] === num) return true;
      }
    }
    return false;
  };
  const isValid = (num, row, col) => {
    return !(inRow(num, row) || inCol(num, col) || inBox(num, row, col));
  };

  // I. 가로부터 방문한 곳을 제외하고 채워야 함
  const recursive = () => {
    let emptyCoor;
    // I. 빈 공간 찾기
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0) emptyCoor = [i, j];
      }
    }
    // I. 빈 칸이 없으면 종료
    if (!emptyCoor) return true;

    const [row, col] = emptyCoor;
    // I. 숫자 넣기
    for (let num = 1; num <= 9; num++) {
      if (isValid(num, row, col)) {
        board[row][col] = num;
        if (recursive()) return true;
        board[row][col] = 0;
      }
    }
    return false;
  };

  recursive();
  return board;
}

console.log(
  solution([
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ]),
);
