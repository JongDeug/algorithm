// // [문제 이해하기]
// // 달팽이 수열을 채우는 함수를 구현해라.

// // [입력]: int(n, n*n 배열)
// // [출력]: array(2차원 배열, 달팽이 수열)

// // [접근법]
// // 패턴이 단순해서 반복문을 사용하면 됨
// // 아래를 계속 반복
// // x 증가 => y 증가 => x 감소 => y 감소

// // [문제 세분화]
// // n*n 배열 생성, 0으로 초기화
// // count 값 = 1
// // while count가 n*n이면 종료
// function solution(n) {
//   const sequence = Array.from({ length: n }, () => Array(n).fill(0));
//   let count = 1;
//   let [y1, x2, y3, x4] = [0, n - 1, n - 1, 0];

//   while (count <= n * n) {
//     for (let x1 = 0; x1 < n; x1++) {
//       if (!sequence[y1][x1]) sequence[y1][x1] = count++;
//     }
//     y1++;

//     for (let y2 = 0; y2 < n; y2++) {
//       if (!sequence[y2][x2]) sequence[y2][x2] = count++;
//     }
//     x2--;

//     for (let x3 = n - 1; x3 >= 0; x3--) {
//       if (!sequence[y3][x3]) sequence[y3][x3] = count++;
//     }
//     y3--;

//     for (let y4 = n - 1; y4 >= 0; y4--) {
//       if (!sequence[y4][x4]) sequence[y4][x4] = count++;
//     }
//     x4++;
//   }

//   return sequence;
// }

// [문제 이해하기]
// 달팽이 수열을 채우는 함수를 구현해라.
//
// [문제 풀이]
// DFS (우, 하, 좌, 상)
// i. 막히면 돌아가라
// i. 방문했으면 skip
//
// 문제: 상을 갈 수 있음에도 못가네, 27줄로 해결 ... ㄷ
//
// [문제 세분화]
function solution(n) {
  // M. dy, dx, answer, valid 함수
  let dy = [0, 1, 0, -1];
  let dx = [1, 0, -1, 0];
  let answer = Array.from({ length: n }, () => Array(n).fill(0));
  let isValid = (x, y) => x >= 0 && x < n && y >= 0 && y < n;

  // M. DFS 구현
  const DFS = (depth, direction, x, y) => {
    // I. BASE CASE, 넘으면 멈춰야됨
    if (depth === n * n + 1) return;

    answer[y][x] = depth;

    for (let i = 0; i < 4; i++) {
      let k = (direction + i) % 4; // 시계방향, 미쳤다 ....
      let ny = dy[k] + y;
      let nx = dx[k] + x;
      // I. 유효, 방문하지 않았어야
      if (isValid(nx, ny) && !answer[ny][nx]) {
        DFS(depth + 1, k, nx, ny);
      }
    }
  };

  DFS(1, 0, 0, 0);

  return answer;
}

for (const v of solution(4)) {
  console.log(v);
}
console.log(solution(5));
console.log(solution(3));
