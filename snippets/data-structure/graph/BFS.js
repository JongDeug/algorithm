// 반복
function BFS(graph, start){
    let queue = [start];
    let result = [];
    let visited = {};

    visited[start] = true;

    while (queue.length) {
        let v = queue.pop();
        result.push(v);

        for (let neighbor of graph.adjacencyList[v]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.unshift(neighbor);
            }
        }
    }
    return result;
}