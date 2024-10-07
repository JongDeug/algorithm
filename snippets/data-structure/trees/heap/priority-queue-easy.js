class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  push(value, priority) {
    this.queue.push({ value, priority });
    this.sort(); // 가장 작은
  }

  pop() {
    return this.queue.shift().value;
  }

  sort() {
    this.queue.sort((a, b) => a.priority - b.priority);
  }
}
