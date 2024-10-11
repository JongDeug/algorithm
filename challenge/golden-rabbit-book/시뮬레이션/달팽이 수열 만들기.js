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

// console.log(solution(3));
for (const v of solution(4)) {
  console.log(v);
}
