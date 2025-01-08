// [문제 이해하기]
// 격자에 있는 모든 경로를 다 탐색하기 위해 필요한 최소한의 사다리 비용을 구해라. 

// [조건]
// height 이하라면 칸에서 칸으로 이동가능하지만 넘어가면 사다리를 세워야함.

// [문제 접근법]
// 사다리를 최소한으로 세우고 모든 경로를 탐색하므로 최단 경로를 구하는 BFS를 활용하면 됨
// 하지만 높이(가중치)가 있기 때문에 다익스트라에서 사용하는 우선순위 큐를 사용해야 함.

// [문제 세분화]
// 우선 순위 큐 구현
// BFS 구현
// 뽑아서 방문처리함
// 시작 노드에서 상하좌우로 우선 순위 큐 넣기 
//  방문은 for문안에서 처리하지 않음. 각자 칸의 높이가 있기 때문에 비교를 해봐야함
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

    // swap
    // size
    // enqueue(bubbleUp)
    // dequeue(bubbleDown)

    swap(i, j) {
        return [this.values[i], this.values[j]] = [this.values[j], this.values[i]];
    }

    size() {
        return this.values.length;
    }

    enqueue(x, y, priority) {
        let node = new Node(x, y, priority);
        this.values.push(node);
        this.bubbleUp();
    }

    bubbleUp() {
        let currentIdx = this.size() - 1;

        while (currentIdx > 0) {
            let parentIdx = Math.floor((currentIdx - 1) / 2);

            // 같을 때도 제외
            if (this.values[currentIdx].priority >= this.values[parentIdx].priority) break;

            this.swap(currentIdx, parentIdx);
            currentIdx = parentIdx;
        }
    }

    dequeue() {
        if (this.size() === 0) return null;
        this.swap(0, this.size() - 1);
        const removed = this.values.pop();
        this.bubbleDown();
        return removed;
    }

    bubbleDown() {
        let currentIdx = 0;

        // 왼쪽 자식이 있냐
        while (currentIdx * 2 + 1 < this.size()) {
            let leftIdx = currentIdx * 2 + 1;
            let rightIdx = currentIdx * 2 + 2;
            // 오른쪽 자식 있냐
            let swapIdx = rightIdx < this.size() && this.values[leftIdx].priority > this.values[rightIdx].priority
                ? rightIdx
                : leftIdx;

            if (this.values[currentIdx].priority <= this.values[swapIdx].priority) break;

            this.swap(currentIdx, swapIdx);
            currentIdx = swapIdx;
        }
    }
}

function solution(land, height) {
    let answer = 0;
    let [rowLen, colLen] = [land.length, land[0].length];
    let [dy, dx] = [[-1, 1, 0, 0], [0, 0, -1, 1]];
    let visited = new Set();
    let isValid = (x, y) => {
        return x >= 0 && x < colLen && y >= 0 && y < rowLen;
    };

    let minHeap = new MinHeap();
    minHeap.enqueue(0, 0, 0);

    while (minHeap.size() > 0) {
        const { x, y, priority } = minHeap.dequeue();

        if (!visited.has(`${y},${x}`)) {
            // 기존 BFS와 다르게 뽑았을 때 방문 처리하는 이유는 각자의 높이가 있어 비교를 통해 최소로 작은걸 선택해야 함.
            // 만약 for문 안에서 방문 처리를 했다면 더 작은 칸을 방문하지 못할 수도 있음
            visited.add(`${y},${x}`);

            if (priority > height) answer += priority;

            for (let k = 0; k < 4; k++) {
                const ny = dy[k] + y;
                const nx = dx[k] + x;

                if (isValid(nx, ny) && !visited.has(`${ny},${nx}`)) {
                    minHeap.enqueue(nx, ny, Math.abs(land[ny][nx] - land[y][x]));
                }
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
