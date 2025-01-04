const graph = {
    1: [2, 3],
    2: [1, 4, 5],
    3: [1],
    4: [2],
    5: [2],
};
const start = 1;

/**
 * DFS(while)
 * 
 * @param {*} graph 
 * @param {*} start 
 * @returns LIFO 특성 때문에 같은 레벨이면 마지막에 들어간 놈이 먼저 표시됨
 */
const dfsV1 = (graph, start) => {
    const visited = new Set();
    const stack = [start];
    const result = [];

    while (stack.length) {
        const node = stack.pop();

        if (!visited.has(node)) {
            visited.add(node);
            result.push(node);

            for (const neighbor of graph[node]) {
                if (!visited.has(neighbor)) {
                    stack.push(neighbor);
                }
            }
        }
    }

    return result;
}
console.log(dfsV1(graph, start));


/**
 * DFS(재귀)
 * 
 * @param {*} graph 
 * @param {*} start 
 * @returns 재귀 특성 때문에 먼저 진입한 놈이 먼저 표시됨
 */
const dfsV2 = (graph, start) => {
    const result = [];
    const visited = new Set();

    const dfsHelper = (node) => {
        if (visited.size === graph.length) return;

        if (!visited.has(node)) {
            visited.add(node);
            result.push(node);

            for (const neighbor of graph[node]) {
                if (!visited.has(neighbor)) {
                    dfsHelper(neighbor);
                }
            }
        }

    }
    dfsHelper(start);

    return result;
}
console.log(dfsV2(graph, start)); 