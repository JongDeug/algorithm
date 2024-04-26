// [문제 이해하기]
// 라이언이 가장 큰 점수 차이로 우승하기 위한 n발 화살 배열을 반환하는 함수를 구현하라 (10 to 0)

// 입력: n (화살 개수), info (어피치가 맞힌 과녁 점수의 개수 10 to 0)
// 출력: array of integer, 만약 라이언이 우승할 수 없으면 [-1]

// 조건:
// 1. 가장 큰 점수 차이로 우승할 수 있는 방법이 여러 가지 => 가장 낮은 점수를 더 많이 맞힌 경우를 return
// 2. n은 1부터10, info는 11길이

// 핵심: 순열?
// 1. 시간 복잡도는 생각하지 않아도 됨.

// 2회차 느낀점.
// 푸는 순서는 제대로 짰는데 구현에 시간이 너무 많이 듦. 연습을 해야겠다!

function solution(n, info) {
    // M. 모든 경우의 수를 가진 점수판을 담는 배열
    let store = [];
    let storeDiff = -Infinity;
    // M. n발을 점수판에 분배하는 함수
    const distribute = (depth, sum, arr) => {
        // I. Base Case
        if (depth === 11) {
            if (sum === n) {
                // I. 어피치, 라이언 점수 계산
                let apeachScore = info.reduce((acc, val, i) => val >= arr[i] && val !== 0 ? acc + (10 - i) : acc);
                let lionScore = info.reduce((acc, val, i) => val < arr[i] ? acc + (10 - i) : acc, 0);
                let diff = lionScore - apeachScore;
                // I. 가장 큰 점수 차이만 담아야 함.
                if (diff >= 1) {
                    if (storeDiff <= diff) {
                        // I. 가장 큰 점수 차이가 같은 경우, 가장 낮은 점수가 많은 놈
                        if (storeDiff === diff) {
                            for (let i = 10; i >= 0; i--) {
                                if (store[i] < arr[i]) {
                                    store = [].concat(arr);
                                    storeDiff = diff;
                                    break;
                                } else if (store[i] > arr[i]) break;
                            }
                        } else {
                            // 당연히 크니까 담고
                            store = [].concat(arr);
                            storeDiff = diff;
                        }
                    }
                }
            }
            return;
        }

        // I. n발을 알맞게 분배
        for (let i = 1; i <= (n - sum); i++) {
            arr[depth] = i;
            distribute(depth + 1, sum + i, arr);
            arr[depth] -= i;
        }

        // I. 쏠 화살이 없으면 depth까지 가야지
        distribute(depth + 1, sum, arr);
    };
    distribute(0, 0, new Array(11).fill(0));

    return store.length ? store : [-1];
}

// console.log(solution(5, [2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]));
// console.log(solution(9, [0, 0, 1, 2, 0, 1, 1, 1, 1, 1, 1]));
console.log(solution(10, [0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 3]));