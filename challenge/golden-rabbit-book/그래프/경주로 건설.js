// // [문제 이해하기]
// // 출발 ~ 도착 까지 최소 경로를 구하고 직선, 코너 비용을 반환하는 함수를 구현해라

// // [문제 풀이]
// // BFS => 최단 경로
// // 상하좌우 숫자 기록
// // 숫자 => 직선
// // 숫자가 다르면 코너
// //
// // [문제 세분화]
// // I. BFS => 상하좌우 돌때 방문
// // I. 기록할 때 {직선, 코너, 숫자} => 초기 {0, 0, 0} => 코너는 - 1 해야 정답임

// // 지금 내가 간과하고 있는게 더 나은 경로가 있으면 그걸로 가야되는거잖아.
// // 코너에 따라 돈이 달라지니까 아하, 이미 방문했다고 해버리면 답이 없어짐
// //
// // [피드백] ====> 4방향에 따라서 더 나은 경로가 있을 수 있는데 그냥 cost를 넣으면 모든 경로를 생각하지 않는 greedy가 됨
// class Queue {
//   constructor() {
//     this.rear = -1;
//     this.front = -1;
//     this.values = [];
//   }

//   enqueue(x, y, prevD, cost) {
//     this.values.push([x, y, prevD, cost]);
//     this.rear++;
//   }

//   dequeue() {
//     if (this.isEmpty()) return null;
//     return this.values[++this.front];
//   }

//   isEmpty() {
//     return this.rear === this.front;
//   }
// }

// function solution(board) {
//   const rowLen = board.length;
//   const colLen = board[0].length;

//   const [dx, dy] = [
//     [null, 0, 0, -1, 1],
//     [null, -1, 1, 0, 0],
//   ];

//   const costs = Array.from({ length: rowLen }, () =>
//     Array.from({ length: colLen }, () => new Array(4).fill(Infinity))
//   );

//   const rangeCheck = (x, y) => {
//     if (x < 0 || x >= colLen || y < 0 || y >= rowLen) return false;
//     if (board[y][x]) return false;
//     return true;
//   };

//   // I. 초기화
//   const queue = new Queue();
//   queue.enqueue(0, 0, -1, 0); // x, y, prevD, cost
//   for (let i = 0; i < 4; i++) costs[0][0][i] = 0;

//   while (!queue.isEmpty()) {
//     const [x, y, prevDirection, cost] = queue.dequeue();

//     for (let k = 1; k <= 4; k++) {
//       const nx = dx[k] + x;
//       const ny = dy[k] + y;

//       if (rangeCheck(nx, ny)) {
//         let newCost = cost + 100;
//         // I. 코너 처리
//         if (prevDirection !== k && prevDirection !== -1) {
//           newCost += 500; // 100원 이미 더함
//         }

//         if (newCost < costs[ny][nx][k - 1]) {
//           costs[ny][nx][k - 1] = newCost;
//           queue.enqueue(nx, ny, k, newCost);
//         }
//       }
//     }
//   }

//   return Math.min(...costs[rowLen - 1][colLen - 1]);
// }

// // console.log(
// //   solution([
// //     [0, 0, 0, 0, 0, 0, 0, 1],
// //     [0, 0, 0, 0, 0, 0, 0, 0],
// //     [0, 0, 0, 0, 0, 1, 0, 0],
// //     [0, 0, 0, 0, 1, 0, 0, 0],
// //     [0, 0, 0, 1, 0, 0, 0, 1],
// //     [0, 0, 1, 0, 0, 0, 1, 0],
// //     [0, 1, 0, 0, 0, 1, 0, 0],
// //     [1, 0, 0, 0, 0, 0, 0, 0],
// //   ]),
// // );

// console.log(
//   solution([
//     [0, 0, 0, 0, 0, 0],
//     [0, 1, 1, 1, 1, 0],
//     [0, 0, 1, 0, 0, 0],
//     [1, 0, 0, 1, 0, 1],
//     [0, 1, 0, 0, 0, 1],
//     [0, 0, 0, 0, 0, 0],
//   ])
// );

// 3200 이 답
// 3500 으로 나옴

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

// [두 번째 풀이] => 테스트 케이스 10, 11 안풀림
// 최솟값으로 모두 선택했기 때문에
// 아마 직선 거리 개수랑, 코너 거리 개수랑 매치되지 않는 길 인듯.
// function solution(board) {
//   const dy = [-1, 1, 0, 0]; // 상하좌우
//   const dx = [0, 0, -1, 1];
//   const rowLen = board.length;
//   const colLen = board[0].length;

//   const st = board.map((x) =>
//     Array.from({ length: x.length }, () => Array(4).fill(Infinity))
//   );
//   const cor = board.map((x) =>
//     Array.from({ length: x.length }, () => Array(4).fill(Infinity))
//   );

//   const isInvalid = (x, y) => {
//     return x >= 0 && x < colLen && y >= 0 && y < rowLen && !board[y][x];
//   };

//   const queue = [[0, 0, -1]];
//   st[0][0] = [0, 0, 0, 0];
//   cor[0][0] = [0, 0, 0, 0]; // 코너 -1 초기화

//   while (queue.length) {
//     let [x, y, prevK] = queue.shift();

//     // 0, 1 상하 => 0
//     // 2, 3 좌우 => 1
//     for (let k = 0; k < 4; k++) {
//       const nx = dx[k] + x;
//       const ny = dy[k] + y;

//       if (isInvalid(nx, ny)) {
//         const prev = [0, 1].includes(prevK) ? 0 : 1;
//         const cur = [0, 1].includes(k) ? 0 : 1;

//         const straight = prevK === -1 ? 0 : st[y][x][prevK];
//         const corner = prevK === -1 ? -1 : cor[y][x][prevK];

//         // 이전 노드 코너가 다음 노드 코너보다 작으면 시작하는거임
//         if (corner < cor[ny][nx][k]) {
//           // 처음 상태이거나 방향이 다르면, corner 초기화
//           if (prevK === -1 || prev !== cur) {
//             cor[ny][nx][k] = corner + 1;
//           } else {
//             cor[ny][nx][k] = corner;
//           }

//           // 만약 다음 노드 코너보다 크면 애초에 푸쉬자체를 하지 않으면 됨
//           // record[ny][nx][0] = Math.min(straight, record[ny][nx][0]) + 1;
//           st[ny][nx][k] = straight + 1;
//           queue.push([nx, ny, k]);
//         }
//       }
//     }
//   }

//   const straight = Math.min(...st[rowLen - 1][colLen - 1]);
//   const corner = Math.min(...cor[rowLen - 1][colLen - 1]);
//   //   console.log(straight, corner);
//   return straight * 100 + corner * 500;
// }

// console.log(
//   solution([
//     [0, 0, 0, 0, 0],
//     [0, 1, 1, 1, 0],
//     [0, 0, 1, 0, 0],
//     [1, 0, 0, 0, 1],
//     [0, 1, 1, 0, 0],
//   ])
// );

// [끝]
// function solution(board) {
//   const dy = [-1, 1, 0, 0]; // 상하좌우
//   const dx = [0, 0, -1, 1];
//   const rowLen = board.length;
//   const colLen = board[0].length;

//   const costs = board.map((x) =>
//     Array.from({ length: x.length }, () => Array(4).fill(Infinity))
//   );

//   const isInvalid = (x, y) => {
//     return x >= 0 && x < colLen && y >= 0 && y < rowLen && !board[y][x];
//   };

//   const queue = [[0, 0, 0, -1]];
//   costs[0][0] = [0, 0, 0, 0];

//   while (queue.length) {
//     let [x, y, cost, prevK] = queue.shift();

//     // 0, 1 상하 => 0
//     // 2, 3 좌우 => 1
//     for (let k = 0; k < 4; k++) {
//       const nx = dx[k] + x;
//       const ny = dy[k] + y;

//       if (isInvalid(nx, ny)) {
//         const prev = [0, 1].includes(prevK) ? 0 : 1;
//         const cur = [0, 1].includes(k) ? 0 : 1;

//         let newCost = cost + 100;
//         if (prevK !== -1 || prev !== cur) {
//           newCost += 500;
//         }

//         if (newCost < costs[ny][nx][k]) {
//           costs[ny][nx][k] = newCost;
//           queue.push([nx, ny, newCost, k]);
//         }
//       }
//     }
//   }

//   return Math.min(...costs[rowLen - 1][colLen - 1]);
// }

// console.log(
//   solution([
//     [0, 0, 0, 0, 0],
//     [0, 1, 1, 1, 0],
//     [0, 0, 1, 0, 0],
//     [1, 0, 0, 0, 1],
//     [0, 1, 1, 0, 0],
//   ])
// );

// [실험용] *******************************************************************************************************************
// 알겠다.
// straight, corner 계속 최소를 선택하면 경로가 안맞아;;;;
// 최소 거리로 엔드포인트까지 가는데 corner는 그게 아닐 수 있음
// 코너가 최소여도 최소 직전 거리(straight)랑 맞지 않는 길일 수 있기 때문에 비용의 합으로 구해야됨;;;
// 즉 이 문제는 비용으로 해결해야 한다.

// 이게 코너나 직선 거리 기준으로 한다는게 웃긴거였네. 합으로써 동작해야했는데

// 입출력 예제 4번을 보셈. 나는 붉은색 코너 + 파란색 직선 거리를 사용하고 있는거임 ***************************************************************************

// [한가지 의문점]
// 왜 코스트 값을 [상,하,좌,우] 로 해야함?
// 사방 팔방에서 노드에 진입하기 때문에 지금 최솟값이라 해서 그게 나중에 최소 경로가 된다는 보장이 없음
// 한개의 값으로 많은 경로를 판단할 수 없기 때문에 [상, 하, 좌, 우] 사용함
// 보셈 중요함 : https://school.programmers.co.kr/questions/30355

// function solution(board) {
//   const dy = [-1, 1, 0, 0]; // 상하좌우
//   const dx = [0, 0, -1, 1];
//   const rowLen = board.length;
//   const colLen = board[0].length;

//   const cor = board.map((x) =>
//     Array.from({ length: x.length }, () => Array(4).fill(Infinity))
//   );

//   const st = [];

//   const isInvalid = (x, y) => {
//     return x >= 0 && x < colLen && y >= 0 && y < rowLen && !board[y][x];
//   };

//   const queue = [[0, 0, -1, 0]];
//   cor[0][0] = [0, 0, 0, 0]; // 코너 -1 초기화

//   while (queue.length) {
//     let [x, y, prevK, straight] = queue.shift();

//     if (x === colLen - 1 && y === rowLen - 1) {
//       st.push(straight);
//     }

//     for (let k = 0; k < 4; k++) {
//       const nx = dx[k] + x;
//       const ny = dy[k] + y;

//       if (isInvalid(nx, ny)) {
//         const corner = prevK < 0 ? 0 : cor[y][x][prevK];

//         if (corner < cor[ny][nx][k]) {
//           if (prevK !== -1 && prevK !== k) {
//             cor[ny][nx][k] = corner + 1;
//           } else {
//             cor[ny][nx][k] = corner;
//           }
//           queue.push([nx, ny, k, straight + 1]);
//         }
//       }
//     }
//   }

//   const corner = Math.min(...cor[rowLen - 1][colLen - 1]);
//   const straight = Math.min(...st);
//   // console.log(st[rowLen - 1][colLen - 1]);
//   console.log(straight, corner);
//   return straight * 100 + corner * 500;
// }

function solution(board) {
  const dy = [-1, 1, 0, 0]; // 상하좌우
  const dx = [0, 0, -1, 1];
  const rowLen = board.length;
  const colLen = board[0].length;

  const costs = board.map((x) =>
    Array.from({ length: x.length }, () => Infinity)
  );

  const isInvalid = (x, y) => {
    return x >= 0 && x < colLen && y >= 0 && y < rowLen && !board[y][x];
  };

  const queue = [[0, 0, 0, -1]];
  costs[0][0] = 0;

  while (queue.length) {
    let [x, y, cost, prevK] = queue.shift();

    // 0, 1 상하 => 0
    // 2, 3 좌우 => 1
    for (let k = 0; k < 4; k++) {
      const nx = dx[k] + x;
      const ny = dy[k] + y;

      if (isInvalid(nx, ny)) {
        const prev = [0, 1].includes(prevK) ? 0 : 1;
        const cur = [0, 1].includes(k) ? 0 : 1;

        let newCost = cost + 100;
        if (prevK !== -1 || prev !== cur) {
          newCost += 500;
        }

        if (newCost < costs[ny][nx]) {
          costs[ny][nx] = newCost;
          queue.push([nx, ny, newCost, k]);
        }
      }
    }
  }

  console.log(costs);
  return costs[rowLen - 1][colLen - 1];
}

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
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 1, 0, 0],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 0, 0],
  ])
);

console.log(
  solution([
    [0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0],
    [0, 0, 1, 0, 0, 0],
    [1, 0, 0, 1, 0, 1],
    [0, 1, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0],
  ])
);

// console.log(
//   solution([
//     [0, 0, 0],
//     [0, 0, 0],
//     [0, 0, 0],
//   ])
// );

// console.log(
//   solution([
//     [0, 0, 0, 0, 0, 0, 0, 1],
//     [0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 1, 0, 0],
//     [0, 0, 0, 0, 1, 0, 0, 0],
//     [0, 0, 0, 1, 0, 0, 0, 1],
//     [0, 0, 1, 0, 0, 0, 1, 0],
//     [0, 1, 0, 0, 0, 1, 0, 0],
//     [1, 0, 0, 0, 0, 0, 0, 0],
//   ])
// );

// console.log(
//   solution([
//     [0, 0, 1],
//     [0, 0, 0],
//     [0, 0, 0],
//     [1, 0, 0],
//   ])
// );

// console.log(
//   solution([
//     [0, 0, 0],
//     [0, 0, 0],
//     [0, 0, 0],
//   ])
// );

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
