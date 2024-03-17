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
        if (this.values.length === 0) return null; // 더 이상 못빼게
        swap(this.values, 0, this.values.length - 1);
        let removed = this.values.pop();
        this.bubbleDown();
        return removed;
    }

    // bubble down
    bubbleDown() {
        if (this.values.length === 0) return null; // 1개 남았을 때 뺐음.
        let parentIndex = 0;

        while (true) {
            let leftChildIndex = parentIndex * 2 + 1;
            let rightChildIndex = parentIndex * 2 + 2;

            let parent = this.values[parentIndex];
            let leftChild;
            let rightChild;
            let swapIndex = null; // maxChild

            // swapIndex 정하기, 중요한 건 left, right가 undefined이 나오지 않게 만들어야 함.
            if (leftChildIndex < this.values.length) {
                leftChild = this.values[leftChildIndex];
                if (leftChild > parent) {
                    swapIndex = leftChildIndex;
                }
            }

            if (rightChildIndex < this.values.length) {
                rightChild = this.values[rightChildIndex];
                if ((swapIndex === null && parent < rightChild) || (swapIndex !== null && rightChild > leftChild)) {
                    swapIndex = rightChildIndex;
                }
                // if (swapIndex && this.values[swapIndex] < rightChild && parent < rightChild) {
                //     swapIndex = rightChildIndex;
                // }
            }

            // swap이 null이면 break
            if (!swapIndex) break;
            swap(this.values, parentIndex, swapIndex);
            parentIndex = swapIndex;
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

