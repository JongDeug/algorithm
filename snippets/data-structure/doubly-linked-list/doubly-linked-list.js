export class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
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
    // print

    push(value) {
        let node = new Node(value);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
        this.length++;
        return this;
    }

    pop() {
        if (!this.head) return undefined;

        let removed = this.tail;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            let newTail = removed.prev;
            newTail.next = null;
            removed.prev = null;
            this.tail = newTail;
        }
        this.length--;
        return removed;
    }

    unshift(value) {
        let node = new Node(value);

        if (this.length === 0) {
            this.head = node;
            this.tail = node;
        } else {
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
        }
        this.length++;
        return this;
    }

    shift() {
        if (!this.head) return undefined;
        let oldHead = this.head;

        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = oldHead.next;
            oldHead.next = null;
            this.head.prev = null;
        }

        this.length--;
        return oldHead;
    }

    get(idx) {
        if (idx < 0 || idx >= this.length) return null;

        let current, count;
        let mid = Math.floor(this.length / 2);
        
        // idx에 따라 적절한 위치에서 루프를 돌기위함.
        // 시간 복잡도 줄이기
        if (idx > mid) {
            current = this.tail;
            count = this.length - 1;
        } else {
            current = this.head;
            count = 0;
        }

        while (current) {
            if (count === idx) return current;

            if (idx > mid) {
                current = current.prev;
                count--;
            } else {
                current = current.next;
                count++;
            }
        }
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
        // index 범위를 한 번더 제한 하는 이유는 get(idx-1)을 할거기 때문에
        if (idx < 0 || idx > this.length) return false;

        if (idx === 0) return !!this.unshift(value);
        else if (idx === this.length) return !!this.push(value);
        else {
            let node = new Node(value);
            let prevNode = this.get(idx - 1);
            let nextNode = prevNode.next;
            nextNode.prev = node;
            prevNode.next = node;
            node.prev = prevNode;
            node.next = nextNode;
            this.length++;
            return true;
        }
    }

    remove(idx) {
        if (idx < 0 || idx >= this.length) return undefined;

        if (idx === this.length - 1) return this.pop();
        else if (idx === 0) return this.shift();
        else {
            let removed = this.get(idx);
            let prevNode = removed.prev;
            let nextNode = removed.next;
            prevNode.next = nextNode;
            nextNode.prev = prevNode;
            removed.prev = null;
            removed.next = null;
            this.length--;
            return removed;
        }
    }

    print(isForward = true) {
        let current = null;
        if (isForward) current = this.head;
        else current = this.tail;

        let arr = [];
        while (current) {
            arr.push(current.value);
            if (isForward) current = current.next;
            else current = current.prev;
        }
        return arr;
    }
}