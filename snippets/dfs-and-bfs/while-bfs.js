// 백준 1260
// 조건: 정점 번호가 작은 순서대로

// BFS with queue
function bfs(graph, start) {
    let visited = new Array(graph.length).fill(false);
    let queue = [start];
    let result = [];

    while (queue.length > 0) {
        let node = queue.shift();

        // I. 이 순서를 이해하고 외우자.
        if (!visited[node]) { // ####################################
            visited[node] = true;
            result.push(node);

            for (let neighbor of graph[node]) {
                if (!visited[neighbor]) {
                    // I. visited[neighbor] = true 을 여기서 설정하고, 상단에 # if 문을 제거해도 됨. => 이거는 큐만 가능함.
                    queue.push(neighbor);
                }
            }
        }
    }

    return result;
}