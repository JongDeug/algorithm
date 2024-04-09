// 일단 참고 : https://han-joon-hyeok.github.io/posts/programmers-hanoi/
// 남은 원판이 N개 이면
// 1번 기둥에 남은 N개 중 N-1개를 2번 기둥에 옮긴다. (3번 기둥을 보조 기둥으로 사용)
// 1번 기둥에 남은 가장 큰 원판을 3번 기둥에 옮긴다.
// 2번 기둥에 남은 N-1개의 원판들을 3번 기둥에 옮긴다. (1번 기둥을 보조 기둥으로 사용)

// 재귀가 가능한 이유가, (n-1)로 재귀를 돌릴 수 있는 이유가
// 1. 가장 큰 원판을 고정 시켜놓고, 이동하니까 (n-1)은 모든 기둥을 쓸 수 있음.
// 2. 재귀적으로 (n-1) 을 어떤 기둥으로 모두 옮기고 또 다른 기둥으로 모두 옮기면 된다.
function solution(n) {
    const answer = [];

    (function hanoi(n, from, by, to) {
        if (n === 1) { // 남은 원판이 1개라면, 가장 큰거니까 바로 옮겨도 상관 없다.
            answer.push([from, to]);
            return;
        }

        hanoi(n-1, from, to, by);
        answer.push([from, to]);
        hanoi(n-1, by, from, to)
    })(n, 1, 2, 3);

    return answer;
}
console.log(solution(2))

// function solution(n) {
//     const answer = [];
//     const hanoi = (n, from, to, by) => {
//         if (n === 1) {
//             answer.push([from, to]);
//             return;
//         }
//         hanoi(n - 1, from, by, to);
//         answer.push([from, to]);
//         hanoi(n - 1, by, to, from);
//     };
//     hanoi(n, 1, 3, 2);
//     return answer;
// }