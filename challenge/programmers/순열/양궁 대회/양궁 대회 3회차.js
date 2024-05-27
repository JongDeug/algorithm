// [문제 이해하기]
// 라이언이 가장 큰 점수 차이로 어피치를 우승하기 위해 각 점수 순서대로 몇 발을 쏴야하는지 return 하는 함수 구현

// 입력: n(화살 수), info(점수에 몇 발 쐈는지)
// 출력: array(라이언 화살 배열)

// 핵심
// 1. 모든 경우의 수를 다 구함 => 순열 느낌으로
// 2. 그 경우의 수에서 점수를 계산해서 어피치보다 점수가 높은 경우의 수만 뽑음
// 3. 만약 여러 가지일 경우 가장 낮은 점수를 더 많이 맞은 경우를 return

// 솔직히 이게 젤 깔끔하게 푼듯

// [문제 세분화]
function solution(n, info) {
    let answer = [];
    // M. 모든 경우의 수를 구하는 함수
    (function permutation(depth, sum, lion) {
        // Base Case : 어피치보다 점수가 높은 경우의 수를 뽑아야 함.
        if (depth === 11) {
            if (sum === n) {
                // I. 점수 계산, 어피치보다 점수가 높은 경우의 수만 뽑음
                let apeachScore = 0;
                let lionScore = 0;
                for (let i = 0; i <= 10; i++) {
                    if (info[i] < lion[i]) lionScore += (10 - i); // 라이언이 점수가 높은 경우
                    else if (info[i] !== 0) apeachScore += (10 - i); // 어피치 0점이 아니고 어피치가 점수가 높은 경우
                }

                if (apeachScore < lionScore) answer.push([...lion, lionScore - apeachScore]);
            }
            return;
        }

        // I. 최적화
        for (let i = 1; i <= (n - sum); i++) {
            lion[depth] += i;
            permutation(depth + 1, sum + i, lion);
            lion[depth] -= i;
        }

        // I. depth 이동
        permutation(depth + 1, sum, lion);
    })(0, 0, new Array(11).fill(0));

    // I. 마지막으로 점수차로 sort => 같으면 낮은 점수가 많은걸로 sort
    answer.sort((a, b) => {
        if (a[11] > b[11]) {
            return -1;
        } else if (a[11] < b[11]) {
            return 1;
        } else {
            // I. 같은 경우
            for (let i = 10; i >= 0; i--) {
                if (a[i] < b[i]) return 1;
                else if (a[i] > b[i]) return -1;
            }
            return 0;
        }
    });

    // console.log(answer);
    return answer.length ? answer[0].slice(0, 11) : [-1];
}

// console.log(solution(5, [2,1,1,1,0,0,0,0,0,0,0]))
console.log(solution(10, [0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 3]));
