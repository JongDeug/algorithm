import {swap} from '../../../utility/swap.js';

class MaxBinaryHeap {
    constructor() {
        this.values = [];
    }

    // insert(bubbleUp)
    // extractMax(bubbleDown)

    insert(value) {
        this.values.push(value);
        return this.bubbleUp();
    }

    bubbleUp() {
        if (this.values.length === 1) return this.values;
        let currentIndex = this.values.length - 1;

        while (true) {
            let parentIndex = Math.floor((currentIndex - 1) / 2);
            let current = this.values[currentIndex];
            let parent = this.values[parentIndex];

            if (current > parent) {
                swap(this.values, currentIndex, parentIndex); // swap
                currentIndex = parentIndex;
            } else break; // 같거나 작으면 그냥 두면 된다.
        }
        return this.values;
    }

    extractMax() {
        if (this.values.length === 0) return null;
        swap(this.values, 0, this.values.length - 1);
        let removed = this.values.pop();
        this.bubbleDown();
        return removed;
    }

    bubbleDown() {
        if (this.values.length === 0) return null; // 1개 남았을 때 뺐음.
        let currentIndex = 0;

        while (true) {
            let leftChildIndex = currentIndex * 2 + 1;
            let rightChildIndex = currentIndex * 2 + 2;

            let current = this.values[currentIndex];
            let leftChild;
            let rightChild;
            let swapIndex = null; // maxChild

            // swapIndex 정하기, 중요한 건 left, right가 undefined이 나오지 않게 만들어야 함.
            if (leftChildIndex < this.values.length) {
                leftChild = this.values[leftChildIndex];
                if (leftChild > current) {
                    swapIndex = leftChildIndex;
                }
            }

            if (rightChildIndex < this.values.length) {
                rightChild = this.values[rightChildIndex];
                // swapIdx가 있을 경우, 없을 경우로 나눠서 조건을 탐색해야함.
                if ((swapIndex === null && current < rightChild) || (swapIndex !== null && rightChild > leftChild)) {
                    swapIndex = rightChildIndex;
                }
            }

            // swap이 null이면 break
            if (!swapIndex) break;
            swap(this.values, currentIndex, swapIndex);
            currentIndex = swapIndex;
        }
    }
}

let max = new MaxBinaryHeap();
max.insert(41);
max.insert(39);
max.insert(33);
max.insert(18);
max.insert(27);
max.insert(12);
console.log(max.insert(55));

console.log(max.extractMax());
console.log(max.extractMax());
console.log(max.extractMax());
console.log(max.extractMax());
console.log(max.extractMax());
console.log(max.extractMax());
console.log(max.extractMax());
console.log(max.extractMax());

console.log(max);
