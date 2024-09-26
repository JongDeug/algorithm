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
