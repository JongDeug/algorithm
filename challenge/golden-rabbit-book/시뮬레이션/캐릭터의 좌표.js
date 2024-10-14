// [문제 이해하기]
// command에 맞춰 캐릭터의 좌표를 이동하고, 끝난 뒤 캐릭터 좌표 [x, y]를 return 하는 함수를 구현해라.

// [문제 세분화]
// I. dy, dx 구현 상하좌우
// I. range check 하는 함수 구현
function solution(keyinput, board) {
  // M. dy, dx 구현, 상하 좌우
  let dx = [0, 0, -1, 1];
  let dy = [1, -1, 0, 0];
  // M. range check, (w-1) / 2 의 abs
  let xLen = (board[0] - 1) / 2;
  let yLen = (board[1] - 1) / 2;
  const isValid = (x, y) => x >= -xLen && x <= xLen && y >= -yLen && y <= yLen;
  // M. x, y
  let [x, y] = [0, 0];

  for (const command of keyinput) {
    let nx;
    let ny;
    if (command === "left") {
      nx = dx[2] + x;
      ny = dy[2] + y;
    } else if (command === "right") {
      nx = dx[3] + x;
      ny = dy[3] + y;
    } else if (command === "up") {
      nx = dx[0] + x;
      ny = dy[0] + y;
    } else if (command === "down") {
      nx = dx[1] + x;
      ny = dy[1] + y;
    }

    if (isValid(nx, ny)) {
      x = nx;
      y = ny;
    }
  }

  return [x, y];
}

// console.log(solution(["left", "right", "up", "right", "right"], [11, 11]));
console.log(solution(["down", "down", "down", "down", "down"], [7, 9]));
