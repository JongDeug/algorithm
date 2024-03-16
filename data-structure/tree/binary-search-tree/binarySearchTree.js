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

    // find
    find(value) {
        if (!this.root) return false;

        let current = this.root;
        while (current) {
            if (current.value === value) return current;

            // 크면
            if (current.value < value) {
                if (!current.right) return false;
                current = current.right;
            }
            // 작으면
            else if (current.value > value) {
                if (!current.left) return false;
                current = current.left;
            }
        }
    }

    // find 두 가지 방식으로 구현할 수 있음
    /*   find(value) {
           if (!this.root) return false;

           let current = this.root;
           let found = false;
           while (current && !found) {
               if (value < current.value) {
                   current = current.left;
               } else if (value > current.value) {
                   current = current.right;
               } else {
                   found = true;
               }
           }
           if (!found) return false;
           return current;
       }*/
}