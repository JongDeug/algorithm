import WeightedGraph from './weightedGraph.js';
import PriorityQueueBasic from './priorityQueueBasic.js';

// 그냥 내 코드는 틀린 코드였어.
function dijkstra(start, end) {
    let graph = new WeightedGraph();
    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addVertex('E');
    graph.addVertex('F');

    graph.addEdge('A', 'B', 3);
    graph.addEdge('A', 'C', 2);
    graph.addEdge('B', 'E', 1);
    graph.addEdge('C', 'D', 2);
    graph.addEdge('C', 'F', 4);
    graph.addEdge('D', 'F', 1);
    graph.addEdge('D', 'E', 3);
    graph.addEdge('F', 'E', 1);

    // visited, priorityQueue, previous
    let visited = [];
    let priorityQueue = new PriorityQueueBasic();
    let previous = {};
    let result = [];

    priorityQueue.enqueue(start, 0);
    previous[start] = null;

    // while (visited.length !== Object.keys(graph.adjacencyList).length) {
    while (priorityQueue.values.length) {
        // 가장 작은 것 선택
        let { val, priority } = priorityQueue.dequeue();


        // if (!visited.includes(val)) {
        // 해당 정점에 인접한 v 찾아서 가중치 큐 업데이트
        for (let neighbor of graph.adjacencyList[val]) {
            // 방문을 하지 않은 노드에 대해서 처리 해줘야 함.
            if (!visited.includes(neighbor.node)) {
                // 가중치를 업데이트할 때 previous 루프를 돌고 업데이트 해줘야겠지?
                if (previous[val]) {
                    // graph.adjacencyList[val].forEach(node => {
                    //     if (node === previous[val]) sum += node.weight;
                    // }); // 우선 순위 큐에서 가장 작은 값을 선택하고 그 전까지의 최솟값을 저장하기 때문에 딱히 상관이 없다?
                    priorityQueue.enqueue(neighbor.node, priority + neighbor.weight);
                } else {
                    priorityQueue.enqueue(neighbor.node, neighbor.weight);
                }
                previous[neighbor.node] = val;

                if (val === end) {
                    while (val) {
                        result.push(val);
                        val = previous[val];
                    }
                    break;
                }
            }
            // }

            visited.push(val);
        }
    }


    return result;
}

console.log(dijkstra('A', 'E').reverse().join(' '));

