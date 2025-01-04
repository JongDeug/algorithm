// 느므 느므 중요해요

class MinHeap {
  constructor() {
    this.values = [];
  }

  size() {
    return this.values.length;
  }

  // enqueue
  // dequeue
  // bubbleUp
  // bubbleDown
  // swap

  enqueue(value, priority) {
    // 말단으로 넣고 올림
    this.values.push({ value, priority });
    this.bubbleUp();
  }

  dequeue() {
    // 상단에 있는 놈 뺄거임. 상단 하단 swap 후 내림
    if (this.size() === 0) return null;
    this.swap(0, this.size() - 1);
    const removed = this.values.pop();
    this.bubbleDown();
    return removed;
  }

  swap(a, b) {
    [this.values[a], this.values[b]] = [this.values[b], this.values[a]];
  }

  bubbleUp() {
    let currentIdx = this.size() - 1;

    while (currentIdx > 0) {
      let parentIdx = Math.floor((currentIdx - 1) / 2); // 주의

      if (this.values[parentIdx].priority <= this.values[currentIdx].priority)
        break; // 홀리 몰리
      this.swap(currentIdx, parentIdx);
      currentIdx = parentIdx;
    }
  }

  bubbleDown() {
    let currentIdx = 0;

    // I. 왼쪽 자식 체크
    while (currentIdx * 2 + 1 < this.size()) {
      let leftIdx = currentIdx * 2 + 1;
      let rightIdx = currentIdx * 2 + 2;
      let swapIdx =
        rightIdx < this.size() && // I. 오른쪽 자식 체크, 없으면 왼쪽이 들어가도록 그 다음 로직 구현
        this.values[rightIdx].priority < this.values[leftIdx].priority
          ? rightIdx
          : leftIdx; // false

      if (this.values[currentIdx].priority <= this.values[swapIdx].priority)
        break;
      this.swap(currentIdx, swapIdx);
      currentIdx = swapIdx;
    }
  }
}

// let heap = new MinHeap();

// heap.enqueue(1, 100);
// heap.enqueue(1, 40);
// heap.enqueue(1, 50);
// heap.enqueue(1, 60);

// console.log(heap.dequeue());
// console.log(heap.dequeue());
// console.log(heap.dequeue());
// console.log(heap.dequeue());

// class Node {
//   constructor(value, priority) {
//     this.value = value;
//     this.priority = priority;
//   }
// }

// // 최소 힙(왼쪽, 오른쪽 자식 비교는 없음)
// class MinHeap {
//   constructor() {
//     this.values = [];
//   }

//   // swap
//   swap(i, j) {
//     [this.values[i], this.values[j]] = [this.values[j], this.values[i]];
//   }

//   // size
//   size() {
//     return this.values.length;
//   }

//   // enqueue (bubbleUp)
//   enqueue(value, priority) {
//     // 배열 마지막에 넣는다.
//     // bubbleUp 올린다.
//     let node = new Node(value, priority);
//     this.values.push(node);
//     this.bubbleUp();
//   }

//   bubbleUp() {
//     let currentIdx = this.size() - 1;

//     // 0보다 클 때만 진행함
//     while (currentIdx > 0) {
//       let parentIdx = Math.floor((currentIdx - 1) / 2);

//       // 부모보다 작으면 올라감, 크면 가만히 현상 유지 break
//       if (this.values[currentIdx].priority >= this.values[parentIdx].priority)
//         break;

//       this.swap(parentIdx, currentIdx);
//       currentIdx = parentIdx;
//     }
//   }

//   // dequeue (bubbleDown)
//   dequeue() {
//     // 위아래 변경 후 pop
//     // bubbleDown
//     // 제거된거 반환
//     if (this.size() === 0) return null;
//     this.swap(this.size() - 1, 0);
//     let removed = this.values.pop();
//     this.bubbleDown();
//     return removed;
//   }

//   bubbleDown() {
//     let currentIdx = 0;

//     // 왼쪽 자식이 있나 없나 확인
//     // 왼쪽 자식이 있으면 루프를 돔 + 오른쪽 자식 인덱스까지 확인한다.
//     // swapIdx에 이제 rightIdx가 있는지 없는지에 따라 넣어지는게 달라질거임.
//     while (currentIdx * 2 + 1 < this.size()) {
//       let leftIdx = currentIdx * 2 + 1;
//       let rightIdx = currentIdx * 2 + 2;

//       // rightIdx가 있고, leftIdx보다 작으면?
//       // ******************************************* this.size() - 1이 아니라 < 임을 인지해라!
//       let swapIdx =
//         rightIdx < this.size() &&
//         this.values[rightIdx].priority < this.values[leftIdx].priority
//           ? rightIdx
//           : leftIdx;

//       // 현재 인덱스가 자식들보다 더 작으면 종료
//       if (this.values[currentIdx].priority <= this.values[swapIdx].priority)
//         break;

//       this.swap(currentIdx, swapIdx);
//       currentIdx = swapIdx;
//     }
//   }
// }

// let heap = new MinHeap();

// heap.enqueue(1, 100);
// heap.enqueue(1, 40);
// heap.enqueue(1, 50);
// heap.enqueue(1, 60);

// console.log(heap.dequeue());
// console.log(heap.dequeue());
// console.log(heap.dequeue());
// console.log(heap.dequeue());
