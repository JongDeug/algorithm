class Node {
    constructor(val, priority) {
        this.val = val;
        this.priority = priority;
    }
}

// 최소 힙!
export default class PriorityQueue {
    constructor() {
        this.values = [];
    }

    // enqueue(bubble up)
    enqueue(val, priority) {
        // node 생성
        let node = new Node(val, priority);
        // 배열에 아무것도 없으면 끝내기
        if (this.values.length === 0) {
            this.values.push(node);
            return this.values;
        } else {
            // push
            this.values.push(node);
            // bubble up 함수
            this.bubbleUp();
            // return values
            return this.values;
        }
    }

    bubbleUp() {
        // 변수 parentIndex((child - 1)/2.floor, childIndex(배열길이 - 1)
        let childIndex = this.values.length - 1;
        let parentIndex;

        // 반복 로직
        // 부모와 비교해서 작으면 올라감, 만약 작지 않으면 반복문 끝내기
        while (true) {
            parentIndex = Math.floor((childIndex - 1) / 2);

            // index 범위 체크
            if (!(childIndex < this.values.length && childIndex >= 0) || !(parentIndex < this.values.length && parentIndex >= 0)) break;

            let childElement = this.values[childIndex].priority;
            let parentElement = this.values[parentIndex].priority;

            if (childElement < parentElement) {
                [this.values[childIndex], this.values[parentIndex]] = [this.values[parentIndex], this.values[childIndex]]; // swap
                childIndex = parentIndex;
            } else break; // 같거나 크면 종료
        }
    }

    // dequeue(bubble down)
    dequeue() {
        if (this.values.length === 0) return null; // 뺄거 없음.
        // 스왑
        [this.values[0], this.values[this.values.length - 1]] = [this.values[this.values.length - 1], this.values[0]];
        // pop, removed
        let removed = this.values.pop();
        if (this.values.length === 0) return null; // 빼고 0이면 굳이 비교할 필요 없음.
        // bubble down
        this.bubbleDown();
        // return removed
        return removed;
    }

    bubbleDown() {
        // 변수 childIndex, parentIndex
        let parentIndex = 0;

        // 반복, 부모가 자식보다 크면 swap, 작으면 종료
        while (true) {
            let leftChildIndex = 2 * parentIndex + 1;
            let rightChildIndex = 2 * parentIndex + 2;
            let parentElement = this.values[parentIndex].priority;
            let swapIndex = null;
            let leftChildElement;
            let rightChildElement;

            if (leftChildIndex < this.values.length) {
                leftChildElement = this.values[leftChildIndex].priority;
                // 요고 중요함!!!, parent가 크면 무조건 설정해줘야한단말야? 아니면 null로 되어서 2번째 right에서 또 null이 됨
                if (parentElement > leftChildElement) swapIndex = leftChildIndex;
            }

            if (rightChildIndex < this.values.length) {
                rightChildElement = this.values[rightChildIndex].priority;

                if ((swapIndex === null && parentElement > rightChildElement) || (swapIndex !== null && rightChildElement < leftChildElement)) {
                    swapIndex = rightChildIndex;
                }
                // if (swapIndex && this.values[swapIndex].priority > rightChildElement && parentElement > rightChildElement) swapIndex = rightChildIndex;
            }

            if (!swapIndex) break;
            [this.values[parentIndex], this.values[swapIndex]] = [this.values[swapIndex], this.values[parentIndex]];
            parentIndex = swapIndex;
        }
    }
}
//
// let priority = new PriorityQueue();
//
// priority.enqueue('common cold', 5);
// priority.enqueue('gunshot wound', 1);
// priority.enqueue('high fever', 4);
// priority.enqueue('test fever', 4);
// priority.enqueue('broken arm', 2);
// priority.enqueue('glass in foot', 3);
//
// console.log(priority.dequeue());
// console.log(priority.dequeue());
// console.log(priority.dequeue());
// console.log(priority.dequeue());
// console.log(priority.dequeue());
// console.log(priority.dequeue());
