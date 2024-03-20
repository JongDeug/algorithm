import WeightedGraph from './weightedGraph.js';
// import PriorityQueueBasic from './priorityQueueBasic.js';
import PriorityQueue from '../../tree/binary-heap/priority-queue/priorityQueue.js';

// 이건 이진힙

function dijkstra(start, end) {
    let graph = new WeightedGraph();
    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addVertex('E');
    graph.addVertex('F');

    graph.addEdge('A', 'B', 4);
    graph.addEdge('A', 'C', 2);
    graph.addEdge('B', 'E', 3);
    graph.addEdge('C', 'D', 2);
    graph.addEdge('C', 'F', 4);
    graph.addEdge('D', 'F', 1);
    graph.addEdge('D', 'E', 3);
    graph.addEdge('F', 'E', 1);

    // graph.addEdge('A', 'B', 3);
    // graph.addEdge('A', 'C', 2);
    // graph.addEdge('B', 'E', 1);
    // graph.addEdge('C', 'D', 2);
    // graph.addEdge('C', 'F', 4);
    // graph.addEdge('D', 'F', 1);
    // graph.addEdge('D', 'E', 3);
    // graph.addEdge('F', 'E', 1);

    // let queue = new PriorityQueueBasic();
    let queue = new PriorityQueue();
    let distances = {};
    let previous = {};
    // 만약 visited 넣어주고 싶으면
    let visited = [];
    let result = [];

    // initial set
    for (let v in graph.adjacencyList) {
        if (v === start) {
            distances[v] = 0;
            queue.enqueue(v, 0);
        } else {
            distances[v] = Infinity;
            queue.enqueue(v, Infinity);
        }
        previous[v] = null;
    }

    while (queue.values.length) {
        let smallest = queue.dequeue().val;
        // let { val, priority } = queue.dequeue();
        // let smallest = val;
        // let p = priority;

        if (smallest === end) {
            // WE ARE DONE
            // console.log(distances);
            while (smallest) {
                result.push(smallest);
                smallest = previous[smallest];
            }
            break;
        }
        if (smallest || distances[smallest] !== Infinity) {
            for (let neighbor of graph.adjacencyList[smallest]) {
                if (!visited.includes(neighbor.node)) {
                    // calculate
                    let candidate = distances[smallest] + neighbor.weight;
                    // let candidate = p + neighbor.weight;
                    if (candidate < distances[neighbor.node]) {
                        // updating new distance
                        distances[neighbor.node] = candidate;
                        // updating previous
                        previous[neighbor.node] = smallest;
                        // enqueue new priority
                        queue.enqueue(neighbor.node, candidate);
                    }
                }
            }
        }
        visited.push(smallest);
    }

    return result.reverse().join(' ');
}

console.log(dijkstra('A', 'E'));