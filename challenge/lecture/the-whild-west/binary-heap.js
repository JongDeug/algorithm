const swap = (arr, i, j) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
};

class MaxBinaryHeap {
    constructor() {
        this.values = [];
    }

    // [문제 이해하기]
    // 최대 이진 힙, insert 함수 구현하기
    // 입력 : int, 출력 : x
    // 핵심 : root는 child 보다 커야함.
    insert(value) {
        // 값이 없는 경우.
        if (this.values.length === 0) {
            this.values.push(value);
            return;
        } else {
            this.values.push(value);
        }

        // 인덱스를 담는 변수를 생성
        let currentIdx = this.values.length - 1;

        // 반복문
        while (true) {
            let parentIdx = Math.floor((currentIdx - 1) / 2);
            let currentElement = this.values[currentIdx];
            let parentElement = this.values[parentIdx];
            // current가 크면 끌올, 아니면 그냥 종료
            if (currentElement > parentElement) {
                swap(this.values, currentIdx, parentIdx);
                currentIdx = parentIdx;
            } else break;
        }
    }

    // [문제 이해하기]
    // 최대 이진 힙에서 extractMax 함수 구현하기
    // 입력 : x, 출력 : 제일 상단(최댓값), 문제에선 없어도 됨.
    // 핵심 : 끌어내릴 때, 왼쪽 오른쪽 선택하는 로직을 잘 짜야함.
    // [문제 세분화하기]
    extractMax() {
        if (this.values.length === 0) return undefined;
        swap(this.values, 0, this.values.length - 1);
        let removed = this.values.pop();
        this.bubbleDown();
        return removed;
    }

    bubbleDown() {
        // currentIdx
        let currentIdx = 0;

        // 반복해서 변경
        while (true) {
            // left, right childIdx 설정
            let leftChildIdx = 2 * currentIdx + 1;
            let rightChildIdx = 2 * currentIdx + 2;
            // left, right 둘 중 실제 선택할 node 담을 변수 설정
            let swapChildIdx;
            let currentElement = this.values[currentIdx];
            let leftChildElement;
            let rightChildElement;

            if (leftChildIdx < this.values.length) {
                leftChildElement = this.values[leftChildIdx];
                if (currentElement < leftChildElement) {
                    swapChildIdx = leftChildIdx;
                }
            }

            if (rightChildIdx < this.values.length) {
                rightChildElement = this.values[rightChildIdx];
                // swapIdx가 있을 경우, 없을 경우로 나눠서 조건을 탐색해야함.
                if (
                    (swapChildIdx && this.values[swapChildIdx] < rightChildElement && currentElement < rightChildElement)
                    || (!swapChildIdx && currentElement < rightChildElement)
                ) {
                    swapChildIdx = rightChildIdx;
                }
            }

            // 끌어 내려야 함.
            if (swapChildIdx) {
                swap(this.values, currentIdx, swapChildIdx);
                currentIdx = swapChildIdx;
            } else break;
        }
    }
}

let binaryHeap = new MaxBinaryHeap();
binaryHeap.insert(1);
binaryHeap.insert(2);
binaryHeap.insert(3);
binaryHeap.insert(4);
binaryHeap.insert(5);
binaryHeap.insert(6);

binaryHeap.extractMax();
console.log(binaryHeap.values);
