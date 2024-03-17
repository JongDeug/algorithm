class MaxBinaryHeap {
    constructor() {
        this.values = [];
    }

    // insert
    insert(val) {
        this.values.push(val);
        return this.bubbleUp();
    }

    // bubble up
    bubbleUp() {
        if (this.values.length === 1) return this.values;

        let childIndex = this.values.length - 1;
        let parentIndex = Math.floor((childIndex - 1) / 2);

        while (true) {
            let child = this.values[childIndex];
            let parent = this.values[parentIndex];

            if (child > parent) {
                swap(this.values, childIndex, parentIndex); // swap
                childIndex = parentIndex;
                parentIndex = Math.floor((childIndex - 1) / 2);
            } else break; // 같거나 작으면 그냥 두면 된다.
        }
        return this.values;
    }

    // extract max, remove
    extractMax() {
        if (this.values.length === 0) return null;
        swap(this.values, 0, this.values.length - 1);
        let removed = this.values.pop();
        this.bubbleDown();
        return removed;
    }

    // bubble down
    bubbleDown() {
        let parentIndex = 0;
        let leftChildIndex = parentIndex * 2 + 1;
        let rightChildIndex = parentIndex * 2 + 2;

        while (true) {
            let parent = this.values[parentIndex];
            let leftChild = this.values[leftChildIndex];
            let rightChild = this.values[rightChildIndex];

            if (!leftChild && !rightChild) break;

            // 현재 구조는 하나 밖에 남지 않았을 때 left 랑 바꾸는
            if (leftChildIndex === this.values.length) {
                if (leftChild > parent) {
                    swap(this.values, parentIndex, leftChildIndex);
                    parentIndex = leftChildIndex;
                    leftChildIndex = parentIndex * 2 + 1;
                    rightChildIndex = parentIndex * 2 + 2;
                } else break;
            }

            // 현재 구조는 하나 밖에 남지 않았을 때 rihgt 랑 바꾸는
            if (rightChildIndex === this.values.length) {
                if (rightChild > parent) {
                    swap(this.values, parentIndex, rightChildIndex);
                    parentIndex = rightChildIndex;
                    rightChildIndex = parentIndex * 2 + 2;
                    leftChildIndex = parentIndex * 2 + 1;
                } else break;
            }

            if (leftChild < rightChild) {
                if (rightChild > parent) {
                    swap(this.values, parentIndex, rightChildIndex);
                    parentIndex = rightChildIndex;
                    rightChildIndex = parentIndex * 2 + 2;
                    leftChildIndex = parentIndex * 2 + 1;
                } else break;
            } else if (leftChild > rightChild) {
                if (leftChild > parent) {
                    swap(this.values, parentIndex, leftChildIndex);
                    parentIndex = leftChildIndex;
                    leftChildIndex = parentIndex * 2 + 1;
                    rightChildIndex = parentIndex * 2 + 2;
                } else break;
            }
        }
    }
}

function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
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
