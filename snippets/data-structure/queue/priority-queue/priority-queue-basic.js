export class PriorityQueueBasic {
    constructor() {
        this.values = [];
    }

    // enqueue
    // dequeue
    // sort

    enqueue(val, priority) {
        this.values.push({ val, priority });
        this.sort();
    }

    dequeue() {
        return this.values.shift();
    }

    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }
}