class Node {
    constructor(val) {
        this.value = val;
    }
}

class Stack {
    constructor(val) {
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    // unshift 로 구현해야 됨.
    push(val) {
        // 새로운 노드 생성
        let node = new Node(val);

        if (!this.first) {
            this.first = node;
            this.last = node;
        } else {
            node.next = this.first;
            this.first = node;
        }
        return ++this.size;
    }

    // shift
    pop() {
        if (!this.first) return;
        let removed = this.first;

        if (this.size === 1) {
            this.first = null;
            this.last = null;
        } else {
            this.first = removed.next;
            removed.next = null;
        }
        this.size--;
        return removed.val;
    }
}