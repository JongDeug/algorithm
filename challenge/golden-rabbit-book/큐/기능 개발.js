// [문제 이해하기]
// 진행 프로세스에 맞춰 각 배포마다 몇 개의 기능이 배포되는지를 return 하도록

// 시간 복잡도는 O(N^2)

// [문제 세분화]
function solution(progresses, speeds) {

    // I. days 큐를 생성합시다
    let queue = [];
    for(let i=0; i<progresses.length; i++) {
        let days = Math.ceil((100 - progresses[i]) / speeds[i]);
        queue.push(days);
    }


    let days = queue.shift();
    let count = 1;
    let answer = [];

    while(queue.length) {
        const element = queue.shift();                    /// for 문으로 변경하고 i 로 관리하면 O(N)까지 가능함.

        // i. 나가는 놈 기준 (return 에 넣을 값 count)
        // i-1. 작다면 ++
        if(element <= days) count++;
        // i-2. 크다면 나가는 놈 초기화, 여기서 answer.push(count)
        else {
            days = element;
            answer.push(count);
            count = 1;
        }
    }

    answer.push(count);

    return answer;
}