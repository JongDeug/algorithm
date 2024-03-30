// DFS Preorder 전위 순회
// DFS Inorder 중위 순회
// DFS Postorder 후위 순회

function DFSPreorder(tree) {
    let visited = [];
    let node = tree.root;

    (function preorder(node) {
        // Base Case, 굳이 없어도 되는구나.
        // if (!node) return;

        visited.push(node.value);
        if (node.left) preorder(node.left);
        if (node.right) preorder(node.right);
    })(node);

    return visited;
}

function DFSInorder(tree) {
    let visited = [];
    let node = tree.root;

    (function inorder(node) {
        if (node.left) inorder(node.left);
        visited.push(node.value);
        if (node.right) inorder(node.right);
    })(node);

    return visited;
}

function DFSPostorder(tree) {
    let visited = [];
    let node = tree.root;

    (function postorder(node) {
        if (node.left) postorder(node.left);
        if (node.right) postorder(node.right);
        visited.push(node.value);
    })(node);

    return visited;
}