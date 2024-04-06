// 일단 참고 : https://han-joon-hyeok.github.io/posts/programmers-hanoi/
// 남은 원판이 N개 이면
// 1번 기둥에 남은 N개 중 N-1개를 2번 기둥에 옮긴다. (3번 기둥을 보조 기둥으로 사용)
// 1번 기둥에 남은 가장 큰 원판을 3번 기둥에 옮긴다.
// 2번 기둥에 남은 N-1개의 원판들을 3번 기둥에 옮긴다. (1번 기둥을 보조 기둥으로 사용)

// 이게 재귀가 가능한 이유가 (n-1)이 가능한 이유가
// 가장 큰 원판이 3번에 가게 되면, 결과적으로 n-1은 모든 원판을 쓸 수 있게된다는 점임!!!!!!!!!!!!!!!!!!!!!!!!!
// 그래서 쉽게 원판 2개로 생각하고 재귀를 돌리면 풀 수 있어!!!!!!!!
// 내일 해보자.
function solution(n) {
    const answer = [];
    const hanoi = (n, from, to, by) => {
        if (n === 1) {
            answer.push([from, to]);
            return;
        }
        hanoi(n - 1, from, by, to);
        answer.push([from, to]);
        hanoi(n - 1, by, to, from);
    };
    hanoi(n, 1, 3, 2);
    return answer;
}