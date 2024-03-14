import Node from './node.js';

class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    push(val) {
        const node = new Node(val);
        // special case
        if (!this.head) {
            this.head = node;
            // this.tail = node;
            this.tail = this.head;
        } else {
            // this.tail = node;
            // this.head.next = this.tail; // 내가 작성한 거는 영원히 node가 두개네
            this.tail.next = node;
            this.tail = node;
        }

        this.length++;
        return this;
    }

    pop() {
        if (!this.head) return undefined;

        // prev node 찾기
        let current = this.head;
        let prev = current;
        // 좋네,,
        while (current.next) {
            prev = current;
            current = current.next;
        }

        // length가 1일 때도 처리해야됨.
        if (!prev.next) {
            this.head = null;
            this.tail = null;
        } else {
            // prev.next = null;
            // this.tail = prev;
            this.tail = prev;
            this.tail.next = null;
        }

        this.length--;
        return current;
    }

    shift() {
        if (!this.head) return undefined;
        let node = this.head;
        this.head = this.head.next;
        this.length--;
        return node;
    }

    unshift(val) {
        let node = new Node(val);
        let prevHead = this.head;

        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.head = node;
            this.head.next = prevHead;
        }
        this.length++;
        return this;
    }

    get(idx) {
        // && 아님!
        if (idx < 0 || idx >= this.length) return null;

        let current = this.head;
        let count = 0;

        // 찾기
        while (current) {
            if (count === idx) return current;
            current = current.next;
            count++;
        }
    }

    set(idx, value) {
        let node = this.get(idx);
        if (node) {
            node.val = value;
            return true;
        }
        return false;
    }

    insert(idx, value) {
        if (idx === this.length) this.push(value);
        else if (idx === 0) this.unshift(value);
        // middle
        else {
            let node = new Node(value);
            let current = this.get(idx);
            let prev = this.get(idx - 1);
            if (!current || !prev) return false;
            prev.next = node;
            node.next = current;
            this.length++;
        }
        return true;
    }

    remove(idx) {
        if (idx < 0 || idx >= this.length) return undefined;

        if (idx === 0) return this.shift();
        else if (idx === this.length - 1) return this.pop();
        else {
            let prev = this.get(idx - 1);
            let removed = prev.next;
            prev.next = removed.next;
            this.length--;
            return removed;
        }
    }

    reverse() {
        [this.tail, this.head] = [this.head, this.tail];
        // refactor 코드와 차이점 : 나는 node를 한 칸 이동하고 loop를 돌았음. refactor은 처음부터(this.head) 부터 시작함.
        let current = this.tail.next;
        this.tail.next = null;
        let prev = this.tail;

        while (current) {
            let after = current.next;
            current.next = prev;
            prev = current;
            current = after;
        }
        return this;
    }

    print() {
        let arr = [];
        let current = this.head;
        while (current) {
            arr.push(current.val);
            current = current.next;
        }
        console.log(arr);
    }

    // 순회
    traverse() {
        let current = this.head;
        while (current) {
            console.log(current.val);
            current = current.next;
        }
    }
}

let list = new SinglyLinkedList();
const { log } = console;
list.push(80);
list.push(81);
list.push(85);

// list.traverse();

log(list.reverse());
log(list);