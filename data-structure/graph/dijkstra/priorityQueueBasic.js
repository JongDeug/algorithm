export default class PriorityQueueBasic {
    constructor() {
        this.values = [];
    }

    // enqueue
    enqueue(val, priority) {
        this.values.push({ val, priority });
        this.sort();
    }

    // dequeue
    dequeue() {
        return this.values.shift();
    }

    // sort
    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }
}