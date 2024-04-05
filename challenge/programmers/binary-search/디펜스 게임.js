// 구현 방법 1) 우선 순위 큐(힙, basic)
// 힙으로 구현하려면 오래 걸림 => 근데 가독성 있음.
// basic으로 구현하면 시간복잡도가 기본 sort O(nlogn)에 O(n) 이니까 O(n^2logn)이 됨. 못풀어
// 구현 방법 2) 이분 탐색
// O(logn) 기본에 정렬이 들어가니까 O(n(logn)^2) 이 될듯?

// 큐가 가독성이 좋긴하지만 구현하는데 드는 시간이 너무 많이 드니까 이분 탐색으로 구현해야 함.
function solution(n, k, enemy) {
    // I1. left, right 정의
    let [left, right] = [0, enemy.length]; // -1이 아닌 이유는 길이를 반환 해야 하므로 끝까지 가야함.
    // I2. left <= right 반복문(같을 때도 검사를 해야함)
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        let kabang = k;
        // I3. 반으로 일단 쪼개서, 내림차순으로 정렬하고(큰 거는 다 까방권으로 막음), 까방권 제외 후 다 더해봐야 함.
        let defendEnemyCount = enemy
            .slice(0, mid)
            .sort((a, b) => b - a)
            .reduce((acc, value) => {
                if (kabang > 0) {
                    kabang--;
                    return acc;
                } else return acc + value;
            }, 0);

        // I4. 막아야할 병사 수가 내 병사 수 보다 크면 window를 줄여야 함. 한도 초과
        if (n < defendEnemyCount) right = mid - 1;
        // I4. 작으면 window를 키워야 함. 더 막을 수 있다는 뜻
        else left = mid + 1;
    }
    return left - 1;
}

// left, right, left <= right, left - 1 구현이 좀 까다로웠음.

console.log(solution(7, 3, [4, 2, 4, 5, 3, 3, 1]));
// console.log(solution(2, 4, [3,3,3,3]));