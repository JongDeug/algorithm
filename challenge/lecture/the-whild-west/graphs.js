class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    // [문제 이해하기]
    // 그래프에 정점 추가하는 함수 구현하기
    // 입력 : vertext(string), 출력 : x
    // 핵심 : 인접 리스트를 초기화하는 것.
    // [문제 세분화하기]
    addVertex(vertex) {
        this.adjacencyList[vertex] = this.adjacencyList[vertex] || [];
    }

    addEdge(vertex1, vertex2) {
        this.adjacencyList[vertex1].push(vertex2);
        this.adjacencyList[vertex2].push(vertex1);
    }

    // [문제 이해하기]
    // 정점 간 edge를 삭제하는 removeEdge 함수 구현
    // 입력 : v1, v2(strings), 출력 : x
    // 핵심 : 잘 순회해서 제거하면됨.
    removeEdge(vertex1, vertex2) {
        // v1이 있으면
        if (this.adjacencyList[vertex1]) {
            this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(v => v !== vertex2);
        }
        // v2가 있으면
        if (this.adjacencyList[vertex2]) {
            this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(v => v !== vertex1);
        }
    }

    // [문제 이해하기]
    // 그래프에서 정점 제거하기
    // 입력 : vertex(string), 출력 : x
    // 핵심 : 그래프에서 정점을 제거하는데 간선도 제거해야 함.
    // [문제 세분화 하기]
    removeVertex(vertex) {
        // 인접 리스트를 반복해서 다 제거 시켜
        for (const key in this.adjacencyList) {
            if (key === vertex) delete this.adjacencyList[key];
            else this.removeEdge(key, vertex);
        }
    }

    // [문제 이해하기]
    // 그래프 DFS 구현하기(재귀로 구현할거임)
    // 입력 : start(string), 출력 : array
    // 핵심 : 재귀, 반복으로 구현할 수 있음. 이번엔 재귀로 구현해 볼거임.
    // [문제 세분화하기]
    depthFirstSearch(start) {
        // visited, result
        let visited = [start];
        let result = [];
        let adjacencyList = this.adjacencyList;

        // 재귀 헬퍼 함수
        (function dfs(vertex) {
            // Base Case
            if (!adjacencyList[vertex]) return;
            result.push(vertex);

            for (const neighbor of adjacencyList[vertex]) {
                // 방문하지 않았으면
                if (!visited.includes(neighbor)) {
                    visited.push(neighbor);
                    dfs(neighbor);
                }
            }
        })(start);

        // return result
        return result;
    }

    // [문제 이해하기]
    // 그래프를 너비 우선 탐색으로 탐색하는 BFS 함수 구현하기
    // 입력 : vertex(string), 출력 : [] array
    // 핵심 : 너비 우선 탐색으로 구현하고, Iteration, Queue 활용
    // [문제 세분화하기]
    breadthFirstSearch(start) {
        // visited, result
        let visited = [start];
        let result = [];
        // queue
        let queue = [start];

        // 큐에 값이 없어질 때 까지 반복함.
        while (queue.length) {
            let v = queue.shift();
            result.push(v);

            // 인접 리스트 탐색하기
            for (const neighbor of this.adjacencyList[v]) {
                if (!visited.includes(neighbor)) {
                    visited.push(neighbor);
                    queue.push(neighbor);
                }
            }
        }
        return result;
    }
}

var graph = new Graph();

graph.addVertex('S');
graph.addVertex('P');
graph.addVertex('U');
graph.addVertex('X');
graph.addVertex('Q');
graph.addVertex('Y');
graph.addVertex('V');
graph.addVertex('R');
graph.addVertex('W');
graph.addVertex('T');

graph.addEdge('S','P');
graph.addEdge('S','U');

graph.addEdge('P','X');
graph.addEdge('U','X');

graph.addEdge('P','Q');
graph.addEdge('U','V');

graph.addEdge('X','Q');
graph.addEdge('X','Y');
graph.addEdge('X','V');

graph.addEdge('Q','R');
graph.addEdge('Y','R');

graph.addEdge('Y','W');
graph.addEdge('V','W');

graph.addEdge('R','T');
graph.addEdge('W','T');

console.log(graph.breadthFirstSearch('S'));