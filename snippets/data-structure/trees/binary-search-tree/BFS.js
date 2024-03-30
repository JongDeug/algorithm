function BFS(tree) {
    let q = []; // queue
    let visited = []; // array
    q.push(tree.root); // queue 초기화

    while (q.length) {
        let node = q.shift();
        visited.push(node.value);

        if (node.left) q.push(node.left);
        if (node.right) q.push(node.right);
    }

    return visited;
}