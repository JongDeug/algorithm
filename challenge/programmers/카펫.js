// [문제 이해하기]
// 갈색, 노란색 개수를 주고 카펫의 가로, 세로 길이를 구하는 함수를 구현해라.

// 입력: 갈색, 노란색 개수
// 출력: [가로, 세로]

// 조건
// 카펫의 가로 길이는 세로 길이보다 크거나 같음

// 핵심
// 1. 가로 세로 최소길이는 3부터
// 2. x * y = (갈 + 노)
// 3. (x-2) * (y-2) === 노란색 수
// 4. 가로 길이가 크거나 같으므로 작은 세로부터 시작

function solution(brown, yellow) {
    for (let y = 3; y <= (brown + yellow) / y; y++) {
        let x = Math.floor((brown + yellow) / y);
        if (((x - 2) * (y - 2)) === yellow) return [x, y];
    }
}

console.log(solution(10, 2));