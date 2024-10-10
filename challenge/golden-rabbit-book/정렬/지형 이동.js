// [문제 이해하기]
// 주어진 height 이하면 이동 가능, 초과하면 사다리 설치해야 하는데 이때 모든 지형을 다 방문할 수 있도록 하기 위한 사다리 최소 비용을 반환해라.
//
// [문제 풀이]
// DFS 로 풀어보려 했으나 다시 돌아갈 때 최소 비용으로 선택하는 곳에서 문제가 생기
// BFS 로 풀어야함, 최소힙을 사용한 우선순위 큐
//
// [문제 세분화]
// I. 우선 순위 큐 구현
// I. 시작 노드에서 상하좌우로 우선 순위 큐 넣기
// I. 뽑아서 방문
//  i. 만약 height 보다 크면 answer 에 삽입
//  i. 모두 방문했다면 종료
//
class Node {
  constructor(x, y, priority) {
    this.x = x;
    this.y = y;
    this.priority = priority;
  }
}
class MinHeap {
  constructor() {
    this.values = [];
  }

  // size
  // swap
  // enqueue
  // dequeue
  // bubbleUp
  // bubbleDown

  size() {
    return this.values.length;
  }

  swap(i, j) {
    [this.values[i], this.values[j]] = [this.values[j], this.values[i]];
  }

  enqueue(node) {
    this.values.push(node);
    this.bubbleUp();
  }

  bubbleUp() {
    let currentIdx = this.size() - 1;
    while (currentIdx > 0) {
      let parentIdx = Math.floor((currentIdx - 1) / 2);

      // I. 부모랑 비교, 같거나 크면 종료
      if (this.values[currentIdx].priority >= this.values[parentIdx].priority)
        break;

      this.swap(currentIdx, parentIdx);
      currentIdx = parentIdx;
    }
  }

  dequeue() {
    if (this.size() === 0) return null;
    this.swap(0, this.size() - 1);
    let removed = this.values.pop();
    this.bubbleDown();
    return removed;
  }

  bubbleDown() {
    let currentIdx = 0;
    // I. 왼쪽 자식 먼저
    while (currentIdx * 2 + 1 < this.size()) {
      // 안에 넣어야되네 ....
      let leftIdx = currentIdx * 2 + 1;
      // I. 오른쪽 자식, 존재하면 왼쪽이랑 비교
      let rightIdx = currentIdx * 2 + 2;
      let swapIdx =
        rightIdx < this.size() &&
        this.values[leftIdx].priority > this.values[rightIdx].priority
          ? rightIdx
          : leftIdx; // rightIdx 없으면 false;

      // I. 자식과 비교
      if (this.values[currentIdx].priority <= this.values[swapIdx].priority)
        break;

      this.swap(currentIdx, swapIdx);
      currentIdx = swapIdx;
    }
  }
}

function solution(land, height) {
  let answer = 0;
  // M. dy dx (상하좌우) xLen yLen, 방문
  let [xLen, yLen] = [land[0].length, land.length];
  let [dy, dx] = [
    [-1, 1, 0, 0],
    [0, 0, -1, 1],
  ];
  let visited = new Set();

  // M. 범위 체크 함수
  const isValid = (x, y) => {
    return x >= 0 && x < xLen && y >= 0 && y < yLen;
  };

  // I. 0,0 좌표부터 시작
  let queue = new MinHeap();
  queue.enqueue(new Node(0, 0, 0));

  // I. 모두 방문했다면 종료
  while (queue.size() > 0) {
    // I. 뽑아서 방문
    let { x, y, priority } = queue.dequeue();

    if (visited.has(`${x},${y}`)) continue; // 방문했으면 x
    visited.add(`${x},${y}`); // 뽑았을 때 방문

    if (priority > height) answer += priority;

    // I. 내가 잘못한건 현재 노드의 우선순위를 사용한거라고 ?!
    for (let k = 0; k < 4; k++) {
      let [nx, ny] = [dx[k] + x, dy[k] + y];
      if (!visited.has(`${nx},${ny}`) && isValid(nx, ny)) {
        queue.enqueue(new Node(nx, ny, Math.abs(land[ny][nx] - land[y][x])));
        // 여기서 바로 더하면 안됨, 뽑았을 때 더해야함
        // if (priority > height) answer += priority;
      }
    }
  }

  return answer;
}

console.log(
  solution(
    [
      [1, 4, 8, 10],
      [5, 5, 5, 5],
      [10, 10, 10, 10],
      [10, 10, 10, 20],
    ],
    3,
  ),
);

console.log(
  solution(
    [
      [10, 11, 10, 11],
      [2, 21, 20, 10],
      [1, 20, 21, 11],
      [2, 1, 2, 1],
    ],
    1,
  ),
);
