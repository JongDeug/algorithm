// 재귀
function DFSRecursion(graph, start) {
    let result = [];
    let visited = {};

    (function recursive(v) {
        // Base Case
        if (!graph.adjacencyList[v]) return;
        visited[v] = true;
        result.push(v);

        for (let neighbor of graph.adjacencyList[v]) {
            if (!visited[neighbor]) {
                recursive(neighbor);
            }
        }
    })(start);
    return result;
}

// 반복
function DFSIteration(graph, start) {
    let stack = [start];
    let result = [];
    let visited = [];

    visited.push(start);

    while (stack.length) {
        let v = stack.pop();
        result.push(v);

        for (let neighbor of graph.adjacencyList[v]) {
            if (!visited.includes(neighbor)) {
                visited.push(neighbor);
                stack.push(neighbor);
            }
        }
    }
    return result;
}