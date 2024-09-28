// [문제 이해하기]
// 출발 ~ 도착 까지 최소 경로를 구하고 직선, 코너 비용을 반환하는 함수를 구현해라

// [문제 풀이]
// BFS => 최단 경로
// 상하좌우 숫자 기록
// 숫자 => 직선
// 숫자가 다르면 코너
//
// [문제 세분화]
// I. BFS => 상하좌우 돌때 방문
// I. 기록할 때 {직선, 코너, 숫자} => 초기 {0, 0, 0} => 코너는 - 1 해야 정답임

// 지금 내가 간과하고 있는게 더 나은 경로가 있으면 그걸로 가야되는거잖아.
// 코너에 따라 돈이 달라지니까 아하, 이미 방문했다고 해버리면 답이 없어짐
//
// [피드백] ====> 4방향에 따라서 더 나은 경로가 있을 수 있는데 그냥 cost를 넣으면 모든 경로를 생각하지 않는 greedy가 됨
class Queue {
  constructor() {
    this.rear = -1;
    this.front = -1;
    this.values = [];
  }

  enqueue(x, y, prevD, cost) {
    this.values.push([x, y, prevD, cost]);
    this.rear++;
  }

  dequeue() {
    if (this.isEmpty()) return null;
    return this.values[++this.front];
  }

  isEmpty() {
    return this.rear === this.front;
  }
}

function solution(board) {
  const rowLen = board.length;
  const colLen = board[0].length;

  const [dx, dy] = [
    [null, 0, 0, -1, 1],
    [null, -1, 1, 0, 0],
  ];

  const costs = Array.from({ length: rowLen }, () =>
    Array.from({ length: colLen }, () => new Array(4).fill(Infinity)),
  );

  const rangeCheck = (x, y) => {
    if (x < 0 || x >= colLen || y < 0 || y >= rowLen) return false;
    if (board[y][x]) return false;
    return true;
  };

  // I. 초기화
  const queue = new Queue();
  queue.enqueue(0, 0, -1, 0); // x, y, prevD, cost
  costs[0][0] = 0;

  while (!queue.isEmpty()) {
    const [x, y, prevDirection, cost] = queue.dequeue();

    if (x === colLen - 1 && y === rowLen - 1) {
      return Math.min(...costs[y][x]); // 어떤 방향에서 온지 모르니까
    }

    for (let k = 1; k <= 4; k++) {
      const nx = dx[k] + x;
      const ny = dy[k] + y;

      if (rangeCheck(nx, ny)) {
        let newCost = cost + 100;
        // I. 코너 처리
        if (prevDirection !== k && prevDirection !== -1) {
          newCost += 500; // 100원 이미 더함
        }

        if (newCost < costs[ny][nx][k - 1]) {
          costs[ny][nx][k - 1] = newCost;
          queue.enqueue(nx, ny, k, newCost);
        }
      }
    }
  }
}

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
  ]),
);
