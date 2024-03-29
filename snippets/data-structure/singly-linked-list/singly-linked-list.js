export class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    // push
    // pop
    // unshift
    // shift
    // get
    // set
    // insert
    // remove
    // reverse
    // print

    push(value) {
        let node = new Node(value);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
        this.length++;
        return this;
    }

    pop() {
        if (!this.head) return undefined;
        let current = this.head;
        let newTail = current;

        // 단일 연결 리스트이므로 뒤로 갈 수 없음 tail 이전 값을 찾아야함.
        while (current.next) {
            newTail = current;
            current = current.next;
        }
        this.tail = newTail;
        this.tail.next = null;
        this.length--;

        if (this.length === 0) {
            this.head = null;
            this.tail = null;
        }
        return current;
    }

    unshift(value) {
        let node = new Node(value);

        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            node.next = this.head;
            this.head = node;
        }
        this.length++;
        return this;
    }

    shift() {
        if (!this.head) return undefined;
        let currentHead = this.head;
        this.head = currentHead.next;
        this.length--;
        if (this.length === 0) this.tail = null;
        return currentHead;
    }


    get(idx) {
        if (idx < 0 || idx >= this.length) return null;

        let current = this.head;
        let count = 0;

        while (current !== idx) {
            current = current.next;
            count++;
        }
        return current;
    }

    set(idx, value) {
        let node = this.get(idx);
        if (node) {
            node.value = value;
            return true;
        }
        return false;
    }

    insert(idx, value) {
        if (idx < 0 || idx >= this.length) return false;

        if (idx === this.length) return !!this.push(value); else if (idx === 0) return !!this.unshift(value); else {
            let node = new Node(value);
            let prev = this.get(idx - 1);
            let temp = prev.next;
            prev.next = node;
            node.next = temp;
            this.length++;
            return true;
        }
    }

    remove(idx) {
        if (idx < 0 || idx >= this.length) return undefined;

        if (idx === 0) return this.shift(); else if (idx === this.length - 1) return this.pop(); else {
            let prev = this.get(idx - 1);
            let removed = prev.next;
            prev.next = removed.next;
            this.length--;
            return removed;
        }
    }

    reverse() {
        [this.tail, this.head] = [this.head, this.tail];
        let current = this.tail;
        let next = null;
        let prev = null; // this.tail.next

        while (current) {
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        return this;
    }

    print() {
        let arr = [];
        let current = this.head;
        while (current) {
            arr.push(current.value);
            current = current.next;
        }
        console.log(arr);
    }
}

