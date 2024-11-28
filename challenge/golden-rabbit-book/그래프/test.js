// [문제 이해하기]
// 경주로를 건설하는 데 필요한 최소 비용

// [입력]: 2차원 배열 board ([0 또는 1])
// [출력]: int 최소 비용(원)

// [세부 사항]
// 0은 비어있음 ## 1은 채워져있음
// 출발점 0,0 ## 도착점 n-1, n-1
// 직선 100원 ## 코너 500원

// [접근법]
// 최소비용 => BFS
// 직선 = 지나온 칸 - 1 * 100
// 코너 = x * 500
// 노드: [직선, 코너, 0 or 1]

// [문제 세분화]
// 상하좌우 dy, dx 배열
// record [직선, 코너] => 상하좌우로 단 하나의 타겟으로 싸운다
// isInvalid 함수
// BFS 구현 (while, 큐)
// 상하: 0, 좌우: 1 => 틀려지면 count up

// [깨달음]
// visited [상, 하, 좌, 우]를 활용해서 문제를 해결하려 했는데 틀렸더라.
// 좌표 문제 같은 경우 [상 하 좌 우] 방법을 선택하면 됨.

// 이거는 그냥 방문했더라도 코너가 더 작은 경우 그 경로를 선택한다는 문제임
// 그래서 한 번 방문했다고 끝내는 것이 아니라 모든 경우를 체킹해야되네
// visited를 통해 상태를 관리하면 한 번 방문한 놈은 절대로 다시 못옴

// [처음 풀이]
// function solution(board) {
//   const dy = [-1, 1, 0, 0]; // 상하좌우
//   const dx = [0, 0, -1, 1];
//   const rowLen = board.length;
//   const colLen = board[0].length;

//   const record = board.map((x) =>
//     Array.from({ length: x.length }, () => [Infinity, Infinity])
//   );

//   const isInvalid = (x, y) => {
//     return x >= 0 && x < colLen && y >= 0 && y < rowLen && !board[y][x];
//   };

//   const queue = [[0, 0, -1]];
//   record[0][0] = [0, -1]; // 코너 -1 초기화

//   while (queue.length) {
//     let [x, y, prevK] = queue.shift();

//     if (x === colLen - 1 && y === rowLen - 1) {
//       continue; // 야 목표 지점에 도착해도 더 진행해야 함 // 가능성이 있으니까
//     }

//     // 0, 1 상하 => 0
//     // 2, 3 좌우 => 1
//     for (let k = 0; k < 4; k++) {
//       const nx = dx[k] + x;
//       const ny = dy[k] + y;

//       if (isInvalid(nx, ny)) {
//         const prev = [0, 1].includes(prevK) ? 0 : 1;
//         const cur = [0, 1].includes(k) ? 0 : 1;
//         const [_, corner] = record[y][x];

//         // 이전 노드 코너가 다음 노드 코너보다 작으면 시작하는거임
//         if (corner < record[ny][nx][1]) {
//           // 처음 상태이거나 방향이 다르면, corner 초기화
//           if (prevK === -1 || prev !== cur) {
//             record[ny][nx][1] = record[y][x][1] + 1;
//           } else {
//             record[ny][nx][1] = record[y][x][1];
//           }
//           record[ny][nx][0] = record[y][x][0] + 1;
//           queue.push([nx, ny, k]);
//         }
//         // 미쳤다! 이게 키포인트
//         // 만약 다음 노드 코너보다 크면 애초에 푸쉬자체를 하지 않으면 됨
//       }
//     }
//   }

//   const [straight, corner] = record[rowLen - 1][colLen - 1];
//   return straight * 100 + corner * 500;
// }

function solution(board) {
  const dy = [-1, 1, 0, 0]; // 상하좌우
  const dx = [0, 0, -1, 1];
  const rowLen = board.length;
  const colLen = board[0].length;

  const st = board.map((x) =>
    Array.from({ length: x.length }, () => Array(4).fill(Infinity))
  );
  const cor = board.map((x) =>
    Array.from({ length: x.length }, () => Array(4).fill(Infinity))
  );

  const isInvalid = (x, y) => {
    return x >= 0 && x < colLen && y >= 0 && y < rowLen && !board[y][x];
  };

  const queue = [[0, 0, -1]];
  st[0][0] = [0, 0, 0, 0];
  cor[0][0] = [0, 0, 0, 0]; // 코너 -1 초기화

  while (queue.length) {
    let [x, y, prevK] = queue.shift();

    // 0, 1 상하 => 0
    // 2, 3 좌우 => 1
    for (let k = 0; k < 4; k++) {
      const nx = dx[k] + x;
      const ny = dy[k] + y;

      if (isInvalid(nx, ny)) {
        // const prev = [0, 1].includes(prevK) ? 0 : 1;
        // const cur = [0, 1].includes(k) ? 0 : 1;

        const straight = prevK === -1 ? 0 : st[y][x][prevK];
        const corner = prevK === -1 ? -1 : cor[y][x][prevK];

        // 이전 노드 코너가 다음 노드 코너보다 작으면 시작하는거임
        if (corner < cor[ny][nx][k]) {
          // 처음 상태이거나 방향이 다르면, corner 초기화
          if (prevK === -1 || prevK !== k) {
            cor[ny][nx][k] = corner + 1;
          } else {
            cor[ny][nx][k] = corner;
          }

          // 만약 다음 노드 코너보다 크면 애초에 푸쉬자체를 하지 않으면 됨
          // record[ny][nx][0] = Math.min(straight, record[ny][nx][0]) + 1;
          st[ny][nx][k] = straight + 1;
          queue.push([nx, ny, k]);
        }
      }
    }
  }

  const straight = Math.min(...st[rowLen - 1][colLen - 1]);
  const corner = Math.min(...cor[rowLen - 1][colLen - 1]);
  //   console.log(straight, corner);
  return straight * 100 + corner * 500;
}

// console.log(
//   solution([
//     [0, 0, 0, 0, 0],
//     [0, 1, 1, 1, 0],
//     [0, 0, 1, 0, 0],
//     [1, 0, 0, 0, 1],
//     [0, 1, 1, 0, 0],
//   ])
// );

console.log(
  solution([
    [0, 0, 1],
    [0, 0, 0],
    [0, 0, 0],
    [1, 0, 0],
  ])
);

console.log(
  solution([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ])
);

console.log(
  solution([
    [0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1],
    [0, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0],
  ])
);
