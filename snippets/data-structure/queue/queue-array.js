class Queue {
  constructor() {
    this.item = [];
    this.front = -1;
    this.rear = -1;
  }

  push(value) {
    this.item.push(value);
    this.rear++;
  }

  pop() {
    if (this.isEmpty()) return null;
    return this.item[++this.front];
  }

  isEmpty() {
    return this.rear === this.front;
  }
}

const q = new Queue();
q.push(1);
q.push(2);
q.push(3);
q.push(4);
console.log(q.pop());
console.log(q.pop());
console.log(q.pop());
console.log(q.pop());
console.log(q.pop());
console.log(q.pop());
