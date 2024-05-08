// [문제 이해하기]
// 준호가 주어진 값을 가지고 최대 몇 라운드까지 막을 수 있는지를 구하는 함수를 구현해라.

// 입력 : n(준호가 가지고 있는 병사 수), k(무적권 횟수), enemy(순서대로 담긴 정수 배열)
// 출력 : int(최대로 막은 라운드 수)

// 조건
// 1. 남은 병사의 수보다 현재 라운드의 적의 수가 더 많으면 게임 종료

// 핵심
// n번 돌면서 데이터를 정렬(nlogn) 하게 되면 최종적으로 n^2logn 복잡도를 가짐.
// enemy.length 가 최대 1,000,000 이기 때문에 시간 복잡도에서 Cut.

// 효율적인 방법을 찾아야 함.
// 1. 이분 탐색 (500,000 순회 그리고 정렬하므로 O(500,000 * log1,000,000) => 10,000,000 복잡도가 나옴
// 2. 우선 순위 큐 (정렬할 때 logn이므로 O(nlogn))
// 결과적으로 우선 순위 큐가 훨씬 빠르긴 함.

// [문제 세분화] : 우선 순위 큐(heap)

// I. 최소 힙으로 가야함.
class PriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(v) {
        this.values.push(v);
        this.bubbleUp();
    }

    bubbleUp() {
        let currentIndex = this.values.length - 1;

        while(true) {
            let parentIndex = Math.floor((currentIndex - 1) / 2);
            let currentElement = this.values[currentIndex];
            let parentElement = this.values[parentIndex];
            // 원래는 index 체크 필요

            if(currentElement < parentElement) {
                this.swap(this.values, currentIndex, parentIndex);
                currentIndex = parentIndex;
            } else break;
        }
    }

    dequeue() {
        this.swap(this.values, 0, this.values.length - 1);
        const removed = this.values.pop();
        this.bubbleDown();
        return removed;
    }

    bubbleDown() {
        let currentIndex = 0;

        while(true) {
            let leftIndex = currentIndex * 2 + 1;
            let rightIndex = currentIndex * 2 + 2;

            let currentElement = this.values[currentIndex];
            let leftElement;
            let rightElement;
            let swapIndex;

            if(leftIndex < this.values.length) {
                leftElement = this.values[leftIndex];
                if(leftElement < currentElement) swapIndex = leftIndex;
            }

            if(rightIndex < this.values.length) {
                rightElement = this.values[rightIndex];
                if((swapIndex && rightElement < leftElement) || (!swapIndex && rightElement < currentElement)) swapIndex = rightIndex;
            }

            if(swapIndex) {
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
    // M. queue, 병사 카운트
    let q = new PriorityQueue();
    let count = 0;

    // I. 무적권만큼 삽입
    enemy.slice(0, k).forEach(v => q.enqueue(v));
    for(let i=k; i<enemy.length; i++) {
        q.enqueue(enemy[i]);
        count += q.dequeue();

        // I. 카운트가 내 병사보다 많다면 break;
        if(count > n) return i;
    }

    return enemy.length;
}
