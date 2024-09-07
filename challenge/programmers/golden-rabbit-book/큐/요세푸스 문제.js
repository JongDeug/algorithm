// [문제 이해하기]
// N, K가 주어질 때 마지막에 살아있는 사람의 번호를 반환하는 로직을 구현해라.


function solution(n, k) {
    // M. n 기준으로 데이터 생성
    const queue = [...Array.from({ length: n }, (_, i) => i + 1)];

    // I. 큐 루프
    // i. length === 1 이면 return
    while (queue.length > 1) {
        for (let i = 1; i <= k; i++) {
            const element = queue.shift();                      // O(N^2 * K) 가 되어버림 -> index를 이용한 큐를 사용하면 O(N*K)로 변환 가능
            // i. count 가 k 일 때 그 친구는 버림
            if (i !== k) {
                // i. 다시 집어넣어
                queue.push(element);
            }
        }
    }

    return queue[0];
}

const result = solution(5, 2);
console.log(result);