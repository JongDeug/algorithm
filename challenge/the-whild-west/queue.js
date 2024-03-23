class Node {
    constructor(val) {
        this.value = val;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    enqueue(val) {
        let node = new Node(val);

        if (!this.first) {
            this.first = node;
            this.last = node;
        } else {
            this.last.next = node;
            this.last = node;
        }
        return ++this.size;
    }
}

let queue = new Queue()
console.log(queue.enqueue(10))
queue.enqueue(100) // 2
queue.enqueue(1000) // 3
console.log(queue.last.val)
console.log(queue.first.val)
