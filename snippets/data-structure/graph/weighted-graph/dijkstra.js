// 우선 순위 큐를 사용해서 구현
// 1. 이진 힙으로 구현한 우선 순위 큐
// 2. 그냥 배열로 구현한 우선 순위 큐

import { WeightedGraph } from "./weighted-graph.js";
import { PriorityQueueHeap } from "../../queue/priority-queue/priority-queue-heap.js";
import { PriorityQueueBasic } from "../../queue/priority-queue/priority-queue-basic.js";


function dijkstra(graph, start, end) {
    let distances = {};
    let previous = {};
    let queue = new PriorityQueueHeap();
    // let queue = new PriorityQueueBasic();
    let visited = []; // 필요함.
    let result = [];

    // initial set
    for (let v in graph.adjacencyList) {
        if (v === start) {
            distances[v] = 0;
            visited.push(v);
            queue.enqueue(v, 0);
        } else {
            distances[v] = Infinity;
            queue.enqueue(v, Infinity);
        }
        previous[v] = null;
    }

    while (queue.values.length) {
        let smallest = queue.dequeue().value;

        if (smallest === end) {
            while (end) {
                result.push(end);
                end = previous[end];
            }
            break;
        }
        if (smallest || distances[smallest] !== Infinity) {
            for (let neighbor of graph.adjacencyList[smallest]) {
                // if (!visited.includes(neighbor.node)) {
                // calculate
                let candidate = distances[smallest] + neighbor.weight;
                if (candidate < distances[neighbor.node]) {
                    // updating new distance
                    distances[neighbor.node] = candidate;
                    // updating previous
                    previous[neighbor.node] = smallest;
                    // enqueue new priority
                    queue.enqueue(neighbor.node, candidate);
                    // }
                }
            }
            // visited.push(smallest); // 방문한 노드 => 이거 잘 못 사용하고 있는 것 같은데 .. 애초에 이게 없었는데
        }
    }
    // console.log(distances) // test
    return result.reverse().join(" ");
}

let graph = new WeightedGraph();
// graph.addVertex("A");
// graph.addVertex("B");
// graph.addVertex("C");
// graph.addVertex("D");
// graph.addVertex("E");
// graph.addVertex("F");
//
// graph.addEdge("A", "B", 4);
// graph.addEdge("A", "C", 2);
// graph.addEdge("B", "E", 3);
// graph.addEdge("C", "D", 2);
// graph.addEdge("C", "F", 4);
// graph.addEdge("D", "F", 1);
// graph.addEdge("D", "E", 3);
// graph.addEdge("F", "E", 1);

// graph.addEdge('A', 'B', 3);
// graph.addEdge('A', 'C', 2);
// graph.addEdge('B', 'E', 1);
// graph.addEdge('C', 'D', 2);
// graph.addEdge('C', 'F', 4);
// graph.addEdge('D', 'F', 1);
// graph.addEdge('D', 'E', 3);
// graph.addEdge('F', 'E', 1);

graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");

graph.addEdge("A", "C", 3);
graph.addEdge("A", "B", 1);
graph.addEdge("B", "D", 1);
graph.addEdge("C", "D", -5);
console.log(dijkstra(graph, "A", "D"));