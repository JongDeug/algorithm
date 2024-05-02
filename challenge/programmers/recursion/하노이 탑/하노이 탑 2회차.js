// [문제 이해하기]
// 하노이탑 구현, 어디서 어디로 옮겨가는지 !

// 입력 : 원판의 개수 n
// 출력 : 2차원 배열 [[from, to], [], ...]

// 핵심
// 1. 재귀로 구현
// 2. from, by, to

// 과정
// 원판이 3개라 치면 나머지 2개를 from에서 by로 옮겨야 함.
// 재귀 과정을 거치면서

function solution(n) {
    let answer = [];

    (function hanoi(from, by, to, num) {
        // Base Case : // form -> by 기록하는 놈 + 추가 기능
        if (num === 1) {
            answer.push([from, to]);
            return;
        }

        // from -> by (n-1)
        hanoi(from, to, by, num - 1);
        // from -> to, 현재 다루는 원판 중 가장 큰 원판
        answer.push([from, to]);
        // by -> to (n-1)
        hanoi(by, from, to, num - 1);

    })(1, 2, 3, n);

    return answer;
}

console.log(solution(2));