/**
 * 단일 연결 리스트를 활용한 스택
 * 
 * 시간 복잡도 O(1)
 */
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Stack {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    push(value) {
        const node = new Node(value);

        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            node.next = this.head;
            this.head = node;
        }
        this.size++;
    }

    // tail에서 pop은 양방향 연결 리스트로 구현해야 돼서 복잡해짐
    pop() {
        if (!this.head) return null;

        const removed = this.head;

        if (this.size === 1) this.head = this.tail = null;
        else {
            this.head = removed.next;
            removed.next = null;
        }
        this.size--;
        return removed.value;
    }
}
const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);

console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());