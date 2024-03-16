function dfsPostorder(tree) {
    let visited = [];
    let node = tree.root;

    function postorder(node) {
        if (node.left) postorder(node.left);
        if (node.right) postorder(node.right);
        visited.push(node.value);
    }

    postorder(node);
    return visited;
}