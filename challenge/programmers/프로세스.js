// [문제 이해하기]
// 우선순위에 맞게 큐에 넣고, 해당 location의 프로세스가 몇 번째 실행되는지 출력하는 함수 구현

// 입력: priorities(array of integer), location(int)
// 출력: int

// 핵심
// 1. 주어진 조건대로 실행하면 됨.

function solution(priorities, location) {
    let answer = 0;
    // I. 고유번호 만들기
    let newPriorities = priorities.map((v, i) => [i, v]);

    // I. 로직 실행
    while(true) {
        // I. 대기중인 프로세스를 하나 꺼냄
        let node = newPriorities.shift();
        let isGreaterThan = false;

        // I. 대기중인 프로세스 중 우선순위가 더 높은 프로세스가 있음?
        for(const [index, value] of newPriorities) {
            if(node[1] < value) {
                isGreaterThan = true;
                break;
            }
        }

        // I. 있으면 방금 꺼낸 프로세스를 다시 큐에 넣음
        if(isGreaterThan) newPriorities.push(node);
        // I. 없으면 프로세스 실행 + location이면 종료
        else {
            answer++;
            if(node[0] === location) return answer;
        }
    }
}