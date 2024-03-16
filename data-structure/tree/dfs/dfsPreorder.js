function dfsPreorder(tree) {
    let visited = [];
    let node = tree.root;

    function preorder(node) {
        // Base Case, 굳이 없어도 되는구나.
        if (!node) return;

        visited.push(node.value);
        if (node.left) preorder(node.left);
        if (node.right) preorder(node.right);
    }

    preorder(node);
    return visited;
}