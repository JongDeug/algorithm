class Stack {
    constructor() {
        this.queue1 = new Queue();
        this.queue2 = new Queue();
    }

    push(val) {
        this.queue1.enqueue(val);
        return this;
    }

    pop() {
        while(this.queue1.size >= 2) {
            this.queue2.enqueue(this.queue1.dequeue());
        }
        let removed = this.queue1.dequeue();
        while(this.queue2.size){
            this.queue1.enqueue(this.queue2.dequeue());
        }
        return removed;
    }
}

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    enqueue(data) {
        var node = new Node(data);

        if (!this.first) {
            this.first = node;
            this.last = node;
        } else {
            this.last.next = node;
            this.last = node;
        }
        return ++this.size;
    }

    dequeue() {
        if (!this.first) return null;

        var temp = this.first;
        if (this.first == this.last) {
            this.last = null;
        }
        this.first = this.first.next;
        this.size--;
        return temp.value;
    }
}

let s = new Stack();
// console.log(s.push(10))
s.push(10).push(20).push(30);
console.log(s.pop());
console.log(s.pop());
console.log(s.pop());
console.log(s.pop());
