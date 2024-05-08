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

// [문제 세분화] : 이분 탐색
function solution(n, k, enemy) {
    // M. left, right, middle
    let [left, right] = [0, enemy.length]; // slice 써야돼서.

    // I. 이분 탐색 반복문
    while(left <= right) {
        let middle = Math.floor((right + left) / 2);
        let card = k;

        // M. enemy window 를 생성하고 무적권을 빼고 내가 막아야할 병사 수
        let willDefendNum = enemy.slice(0, middle)
            .sort((a, b) => b - a) // 내림 차순 정렬
            .reduce((acc, v) => {
                if(card) {
                    card--;
                    return acc;
                }
                else return acc + v;
            }, 0);

        // I. 내가 막아야할 병사가 현재 내 병사보다 적다 => window 크기 늘림
        // I. 중요 : 같을 경우도 처리해야 함.
        if(willDefendNum <= n) left = middle + 1;
        // I. 내가 막아야할 병사가 현재 내 병사보다 크다 => window 크기 줄임
        else right = middle - 1;
    }
    return left ? left - 1 : 0;
}