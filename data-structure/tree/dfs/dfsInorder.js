function dfsInorder(tree) {
    let visited = [];
    let node = tree.root;

    function inorder(node) {
        if (node.left) inorder(node.left);
        visited.push(node.value);
        if (node.right) inorder(node.right);
    }

    inorder(node);
    return visited;
}