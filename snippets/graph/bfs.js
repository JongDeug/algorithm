const graph = {
    1: [2, 3],
    2: [1, 4, 5],
    3: [1],
    4: [2],
    5: [2],
};
const start = 1;

/**
 * BFS(while)
 * 
 * @param {*} graph 
 * @param {*} start 
 * @returns 
 */
const bfs = (graph, start) => {
    const queue = [start];
    const result = [];
    const visited = new Set([start]);

    while (queue.length) {
        const node = queue.shift();
        result.push(node);

        for (const neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor)
            }
        }
    }

    return result;
}
console.log(bfs(graph, start));