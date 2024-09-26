// Priority Queue, 우선 순위 큐
// Min Binary Heap 으로 구현할 수 있음

import { swap } from "../../../utility/swap.js";

class Node {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}

export class PriorityQueueHeap {
  constructor() {
    this.values = [];
  }

  // enqueue(bubbleUp)
  // dequeue(bubbleDown)

  enqueue(value, priority) {
    let node = new Node(value, priority);
    this.values.push(node);
    return this.bubbleUp();
  }

  bubbleUp() {
    if (this.values.length === 1) return this.values;
    let currentIndex = this.values.length - 1;

    // 부모와 비교해서 작으면 올라감, 만약 작지 않으면 반복문 끝내기
    while (true) {
      let parentIndex = Math.floor((currentIndex - 1) / 2);

      // Max Binary Heap과 다르게 Index 범위를 체킹해줘야 함.
      // 아니면 undefined.priority property 접근 중 오류가 남.
      if (
        !(currentIndex < this.values.length && currentIndex >= 0) ||
        !(parentIndex < this.values.length && parentIndex >= 0)
      )
        break;

      let currentElement = this.values[currentIndex].priority;
      let parentElement = this.values[parentIndex].priority;

      if (currentElement < parentElement) {
        swap(this.values, currentIndex, parentIndex);
        currentIndex = parentIndex;
      } else break; // 같거나 크면 종료
    }
    return this.values;
  }

  dequeue() {
    if (this.values.length === 0) return null;
    swap(this.values, 0, this.values.length - 1);
    let removed = this.values.pop();
    this.bubbleDown();
    return removed;
  }

  bubbleDown() {
    if (this.values.length === 0) return null;
    // 변수 childIndex, parentIndex
    let currentIndex = 0;

    // 반복, 부모가 자식보다 크면 swap, 작으면 종료
    while (true) {
      let leftChildIndex = 2 * currentIndex + 1;
      let rightChildIndex = 2 * currentIndex + 2;

      let currentElement = this.values[currentIndex].priority;
      let leftChildElement;
      let rightChildElement;
      let swapIndex = null;

      if (leftChildIndex < this.values.length) {
        leftChildElement = this.values[leftChildIndex].priority;
        if (currentElement > leftChildElement) swapIndex = leftChildIndex;
      }

      if (rightChildIndex < this.values.length) {
        rightChildElement = this.values[rightChildIndex].priority;
        if (
          (swapIndex === null && currentElement > rightChildElement) ||
          (swapIndex !== null && rightChildElement < leftChildElement)
        ) {
          swapIndex = rightChildIndex;
        }
      }

      if (!swapIndex) break;
      swap(this.values, currentIndex, swapIndex);
      currentIndex = swapIndex;
    }
  }
}

// let min = new PriorityQueueHeap();
// min.enqueue(41, 10);
// min.enqueue(39, 20);
// min.enqueue(33, 30);
// min.enqueue(18, 40);
// min.enqueue(27, 13);
// min.enqueue(12, 15);
// console.log(min.enqueue(55, 50));
//
// console.log(min.dequeue());
// console.log(min.dequeue());
// console.log(min.dequeue());
// console.log(min.dequeue());
// console.log(min.dequeue());
// console.log(min.dequeue());
// console.log(min.dequeue());
// console.log(min.dequeue());
//
// console.log(min);
