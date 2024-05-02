// [문제 이해하기]
// 디펜스 게임에서 주어진 값을 가지고 막을 수 있는 최대 라운드 수를 반환하는 함수

// 입력
// n : 병사, k: 무적권, enemy: 적 배열
// 출력: int

// 핵심
// 우선 순위 큐로 구현 => O(n) * O(logn) => O(nlogn)
// 그냥 구현하면 ? O(n) * O(nlogn) => O(n^2logn) 1억번 넘음

class PriorityQueueMin {
    constructor() {
        this.values = [];
    }

    enqueue(value) {
        this.values.push(value);
        this.bubbleUp();
    }

    bubbleUp() {
        let currentIndex = this.values.length - 1;

        while (true) {
            let parentIndex = Math.floor((currentIndex - 1) / 2);

            // Index check : 확인하자 index 0에서 접근하는지 ?

            let currentElement = this.values[currentIndex];
            let parentElement = this.values[parentIndex];

            // 작으면 up
            if (currentElement < parentElement) {
                this.swap(this.values, currentIndex, parentIndex);
                currentIndex = parentIndex;
            } else break;
        }
    }

    dequeue() {
        this.swap(this.values, 0, this.values.length - 1);
        let removed = this.values.pop(); // 먼저 빼고 bubbleDown 해야함.
        this.bubbleDown();
        return removed;
    }

    bubbleDown() {
        let currentIndex = 0;

        while (true) {
            let currentElement = this.values[currentIndex];
            let rightIndex = 2 * currentIndex + 2;
            let leftIndex = 2 * currentIndex + 1;
            let swapIndex;

            // Index Check
            if (leftIndex < this.values.length) {
                let leftElement = this.values[leftIndex];
                if (leftElement < currentElement) swapIndex = leftIndex;
            }

            // Index Check
            if (rightIndex < this.values.length) {
                let rightElement = this.values[rightIndex];
                // swapIndex 있는 경우 || 없는 경우
                if (swapIndex && rightElement < this.values[swapIndex] || !swapIndex && rightElement < currentElement) {
                    swapIndex = rightIndex;
                }
            }

            if (swapIndex) {
                this.swap(this.values, currentIndex, swapIndex);
                currentIndex = swapIndex;
            } else break;
        }
    }

    swap(arr, i, j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function solution(n, k, enemy) {
    // I. k가 enemy.length 보다 같거나 크면 바로 return
    if (k >= enemy.length) return enemy.length;

    // M. 최소 힙
    let q = new PriorityQueueMin();
    // I. queue에 k까지 넣기
    enemy.slice(0, k).forEach(v => q.enqueue(v));
    // I. k부터 enemy.length 까지 for loop
    for (let i = k; i < enemy.length; i++) {
        // I. 루프를 돌면서 큐에 값을 넣기
        q.enqueue(enemy[i]);
        // I. 큐에서 최솟값을 빼서 n을 줄임
        let defendNum = q.dequeue();
        n -= defendNum;
        // I. 만약 n이 0보다 작으면 return i
        if (n < 0) return i;
    }

    // case : 10, 1, [2,2,2,2,2] 일 때 return 이 없으면 아무것도 return 되지 않음
    // 즉 여기서의 return 은 다 막았다는 뜻
    return enemy.length;
}

// console.log(solution(7, 3, [4, 2, 4, 5, 3, 3, 1]));
// console.log(solution(10, 1, [2,2,2,2,2]));
console.log(solution(2, 4, [3, 3, 3, 3]));