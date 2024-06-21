// 백준 1260
// 조건: 정점 번호가 작은 순서대로

// DFS with stack
function dfs(graph, start) {
    let visited = new Array(graph.length).fill(false);
    let stack = [start];
    let result = [];

    while (stack.length > 0) {
        let node = stack.pop();

        // I. 이 순서를 이해하고 외우자.
        if (!visited[node]) {
            visited[node] = true;
            result.push(node);

            // I. graph 정렬되어 있다 가정하고 뒤부터 돌아야 큰거부터 작은거를 넣을 수 있음. stack 특성 살리기
            for (let i = graph[node].length - 1; i >= 0; i--) {
                let neighbor = graph[node][i];
                if (!visited[neighbor]) {
                    stack.push(neighbor);
                }
            }
        }
    }

    return result;
}