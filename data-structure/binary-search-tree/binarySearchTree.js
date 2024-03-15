class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        let node = new Node(value);

        if (!this.root) {
            this.root = node;
            return this;
        }
        let current = this.root;
        // node가 있을 때 반복
        while (true) {
            if (node.value === current.value) return undefined;

            if (node.value < current.value) {
                if (!current.left) {
                    current.left = node;
                    return this;
                }
                current = current.left;
            } else if (node.value > current.value) {
                if (!current.right) {
                    current.right = node;
                    return this;
                }
                current = current.right;
            }
        }
    }
}

let b = new BinarySearchTree();
b.insert(10);
b.insert(20);
b.insert(30);
b.insert(9);

let current = b.root;
while (current) {
    // left
    console.log(current.value);
    current = current.left;
}

current = b.root;
while (current) {
    // right
    console.log(current.value);
    current = current.right;
}