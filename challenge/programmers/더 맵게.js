// 힙 구현해서 풀었는데 시간 초과 났음.
// => 왜 났냐? solution while문이 문제 였음. queue는 절대로 0이 될 수 없음. while에서 enqueue를 하기 때문에.
// => 그래서 1이상으로 바꾸고, 다른 조건 하나를 추가해줬음.

// 그래도 안되네?
// => 조건을 제대로 보자, 모든 음식의 스코빌 지수를 K 이상으로 만들 수 없는 경우에는 -1을 return 합니다.
// => 따라서 우선 순위 큐 index 0인 놈이 K 보다 작은지 확인하고 조건에 맞게 반환해야 함.

function solution(scoville, K) {
    var answer = 0;
    let queue = new PriorityQueue();

    for (const s of scoville) {
        queue.enqueue(s);
    }

    while(queue.values.length > 1 && queue.values[0] < K) {
        let first = queue.dequeue();
        let second = queue.dequeue();
        let newElement = first + (second * 2);
        queue.enqueue(newElement);
        answer++; // 아하 [1,2] 라고 가정하면 3이 queue에 있을거임
    }

    return queue.values[0] < K ? -1 : answer;
}

// 틀린 구현
// function solution(scoville, K) {
//     var answer = 0;
//     let queue = new PriorityQueue();
//
//     for (const s of scoville) {
//         queue.enqueue(s);
//     }
//
//     // 7이상
//     while(queue.values.length) {
//         let first = queue.dequeue();
//         let second = queue.dequeue();
//
//         // Base Case
//         if(first >= K) {
//             break;
//         } else answer++;
//
//         let newElement = first + (second * 2);
//         queue.enqueue(newElement);
//     }
//
//     return answer;
// }

// 우선 순위 큐 힙 구현 O(logn)
class PriorityQueue {
    constructor () {
        this.values = [];
    }

    swap(values, i, j) {
        [values[i], values[j]] = [values[j], values[i]];
    }

    // enqueue
    enqueue(value) {
        this.values.push(value);
        return this.bubbleUp();
    }

    bubbleUp() {
        if(this.values.length === 1) return this.values;
        let currentIndex = this.values.length - 1;

        // 부모와 비교해서 작으면 올라감.
        while(true) {
            let parentIndex = Math.floor((currentIndex - 1) / 2);

            let currentElement = this.values[currentIndex];
            let parentElement = this.values[parentIndex];

            if(currentElement < parentElement) {
                this.swap(this.values, currentIndex, parentIndex);
                currentIndex = parentIndex;
            } else break;
        }
    }

    // dequeue
    dequeue() {
        if(this.values.length === 0) return null;
        this.swap(this.values, 0, this.values.length - 1);
        let removed = this.values.pop();
        this.bubbleDown();
        return removed;
    }

    bubbleDown() {
        if(this.values.length === 0) return null;
        let currentIndex = 0;

        while(true) {
            let rightIndex = 2 * currentIndex + 2;
            let leftIndex = 2 * currentIndex + 1;

            let currentElement = this.values[currentIndex];
            let rightElement;
            let leftElement;
            let swapIndex = null;

            if(leftIndex < this.values.length) {
                leftElement = this.values[leftIndex];
                if(currentElement > leftElement) swapIndex = leftIndex;
            }

            if(rightIndex < this.values.length) {
                rightElement = this.values[rightIndex];
                if((swapIndex && leftElement > rightElement)
                    || (!swapIndex && rightElement < currentElement)
                ) {
                    swapIndex = rightIndex;
                }
            }

            if(!swapIndex) break;
            this.swap(this.values, swapIndex, currentIndex);
            currentIndex = swapIndex;
        }
    }
}