/**
 * 큐
 * 
 * 시간 복잡도 O(n)
 */
const queueV1 = [];
queueV1.push(); // enqueue
queueV1.shift(); // dequeue

/**
 * 배열을 활용한 큐
 * 
 * 시간 복잡도 O(1)
 */
class QueueV2 {
    constructor() {
        this.item = [];
        this.front = -1;
        this.rear = -1;
    }

    enqueue(value) {
        this.item.push(value);
        this.rear++;
    }

    dequeue() {
        if (this.isEmpty()) return null;
        return this.item[++this.front];
    }

    isEmpty() {
        return this.front === this.rear;
    }
}
const queueV2 = new QueueV2();
queueV2.enqueue(1);
queueV2.enqueue(2);
queueV2.enqueue(3);
queueV2.enqueue(4);

console.log(queueV2.dequeue());
console.log(queueV2.dequeue());
console.log(queueV2.dequeue());
console.log(queueV2.dequeue());
console.log(queueV2.dequeue());

/**
 * 단일 연결 리스트를 활용한 큐
 */
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class QueueV3 {
    constructor() {
        this.head = null;
        this.tail = null;;
        this.size = 0;
    }

    enqueue(value) {
        const node = new Node(value);

        if (!this.head) {
            this.head = node;
            this.tail = node;
        }
        else {
            this.tail.next = node; // 현재 tail의 next
            this.tail = node; // 앞으로의 tail
        }
        return ++this.size;
    }

    dequeue() {
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
const queueV3 = new QueueV3();
queueV3.enqueue(1);
queueV3.enqueue(2);
queueV3.enqueue(3);
queueV3.enqueue(4);

console.log(queueV3.dequeue());
console.log(queueV3.dequeue());
console.log(queueV3.dequeue());
console.log(queueV3.dequeue());
console.log(queueV3.dequeue());