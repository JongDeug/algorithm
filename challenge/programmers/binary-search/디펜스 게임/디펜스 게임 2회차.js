// [문제 이해하기]
// 디펜스 게임에서 주어진 값을 가지고 막을 수 있는 최대 라운드 수를 반환하는 함수

// 입력
// n : 병사, k: 무적권, enemy: 적 배열
// 출력: int

// 핵심
// 그냥 구현해도 되지만 시간 복잡도에서 걸림, enemy 길이가 1,000,000
// 우선 순위 큐, 이분 탐색으로 구현해야 함.

function solution(n, k, enemy) {
    let left = 0;
    let right = enemy.length;

    // I. 반복문으로 이분 탐색 구현
    while (left <= right) {
        let middle = Math.floor((left + right) / 2);
        let card = k;
        // I. slice 는 (middle - 1) 까지 담기니까, right 를 index 기준이 아니라 한 칸 뒤인 length 기준으로 설정해야함
        let willDefend = enemy.slice(0, middle).sort((a, b) => b - a).reduce((acc, value) => {
            // I. 카드로 막을 수 있는 거 제외
            if (card > 0) {
                card--;
                return acc;
            } else {
                return acc + value;
            }
        }, 0);

        // I. 내 병사 < 막아야할 병사 => right를 줄여야, window를 줄여야함
        if (n < willDefend) right = middle - 1; // 결과적으로 middle이 줄어듦
        // I. 내 병사 > 막아야할 병사 => left를 늘려야, window를 키워야함
        else left = middle + 1; // 결과적으로 middle이 늘어남
    }

    return left - 1;
}

// console.log(solution(7, 3, [4, 2, 4, 5, 3, 3, 1]));
// console.log(solution(2, 4, [3, 3, 3, 3]));
