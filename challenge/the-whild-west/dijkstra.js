function WeightedGraph() {
    this.adjacencyList = {};
}

/***
 *** Use Graph as a constructor for WeightedGraph to inherit from!
 ***
 ***/
WeightedGraph.prototype.addVertex = function(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
};
WeightedGraph.prototype.addEdge = function(v1, v2, weight) {
    this.adjacencyList[v1].push({ node: v2, weight });
    this.adjacencyList[v2].push({ node: v1, weight });
};

WeightedGraph.prototype.Dijkstra = function(start, end) {
    // previous, distances, priorityQueue
    let previous = {};
    let distances = {};
    let priorityQueue = new PriorityQueue();
    let visited = [start];
    let result = [];

    // 변수 초기화, previous, distances는 Infinity다 !!(start는 0으로), queue에는 start
    for (const key in this.adjacencyList) {
        previous[key] = null;
        distances[key] = Infinity;
    }
    distances[start] = 0;
    priorityQueue.enqueue(start, 0);

    // 반복 로직
    while (true) {
        let { val, priority } = priorityQueue.dequeue();

        // 종료
        if (val === end) {
            while (previous[end]) {
                result.push(end);
                end = previous[end];
            }
            result.push(start);
            return result.reverse();
        }
        // 그 외 로직 1. 인접 노드 다 찾아서 queue에 저장, 2. 거리, previous 설정
        for (const neighbor of this.adjacencyList[val]) {
            // 방문한 노드가 아니면
            if (!visited.includes(neighbor.node)) {
                // 거리보다 작으면 넣기
                // refactoring
                let candidate = distances[val] + neighbor.weight;
                if (candidate < distances[neighbor.node]) {
                    priorityQueue.enqueue(neighbor.node, candidate);
                    distances[neighbor.node] = candidate;
                    previous[neighbor.node] = val;
                }
                // if (distances[neighbor.node] > priority + neighbor.weight) {
                // priorityQueue.enqueue(neighbor.node, priority + neighbor.weight);
                // distances[neighbor.node] = priority + neighbor.weight;
                // previous[neighbor.node] = val;
                // }
            }
        }
        // 방문한 노드
        visited.push(val);
    }
};

/***
 *** Use the following as a PriorityQueue (it's a min heap)!
 ***
 ***/
class PriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(val, priority) {
        this.values.push({ val, priority });
        this.sort();
    }

    dequeue() {
        return this.values.shift();
    }

    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    };
}

var g = new WeightedGraph();

g.addVertex('A');
g.addVertex('Z');
g.addVertex('C');
g.addVertex('D');
g.addVertex('E');
g.addVertex('H');
g.addVertex('Q');
g.addVertex('G');

g.addEdge('A', 'Z', 7);
g.addEdge('A', 'C', 8);

g.addEdge('Z', 'Q', 2);

g.addEdge('C', 'G', 4);

g.addEdge('D', 'Q', 8);

g.addEdge('E', 'H', 1);

g.addEdge('H', 'Q', 3);

g.addEdge('Q', 'C', 6);

g.addEdge('G', 'Q', 9);

// console.log(g.Dijkstra('A', 'E')); // ["A", "Z", "Q", "H", "E"]
// console.log(g.Dijkstra('A', 'Q')); // ["A", "Z", "Q"]
console.log(g.Dijkstra('A', 'G')); // ["A", "C", "G"]
console.log(g.Dijkstra('A', 'D')); // ["A", "Z", "Q", "D"]