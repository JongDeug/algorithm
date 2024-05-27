// [문제 이해하기]
// 라이언이 어피치를 가장 큰 점수 차이로 이기기 위해서 화살을 어떻게 쏴야 하는지 배열로 반환하는 함수 구현

// 입력 : n(화살의 개수), info(어피치, 점수에 맞는 화살 배열)
// 출력 : 라이언이 가장 큰 점수 차이로 이기기 위한 화살 배열
// 예외 출력 : [-1]

// 조건 : 문제 참고

// 핵심 : 브루투 포스
// Obsidian : 취업 => 코딩 테스트 => 제대로 공부중 => 순열, 조합 참고하면 사진 나와있음!!!
// 젤 밑에 연습 코드도 있음.

// 아주 좋았어!
function solution(n, info) {
    let answer;
    // M. 라이언 배열 생성(info와 비교할 거임)
    let lion = new Array(11).fill(0);
    // M. 라이언이 어피치보다 많은 점수를 가지고 있을 때의 화살 개수
    let result = [];

    (function rec(depth, sum) {
        // I. Base Case
        if (depth === 11) {
            if (sum === n) {
                // I. 점수 계산(info, lion 비교)
                let apeachScore = 0;
                let lionScore = 0;
                for (let i = 0; i < 11; i++) {
                    // I. lion이 많으면 lion 승
                    if (lion[i] > info[i]) lionScore += (10 - i);
                    else if ((lion[i] <= info[i]) && info[i]) apeachScore += (10 - i);
                }

                // I. apeach보다 lion이 점수가 많을 때 + 그 차이를 주입
                if (lionScore > apeachScore) result.push([...lion, lionScore - apeachScore]);
            }
            return;
        }

        // I. 핵심 코드
        for (let i = 0; i <= n; i++) {
            if (sum + i <= n) { // 합이 n보다 작거나 같은 경우에만 재귀 호출
                lion[depth] = i;
                rec(depth + 1, sum + i, lion);
            }
        }
    })(0, 0);

    // I. 예외 조건
    if (!result.length) return [-1];
    else {
        // I. 크기 순으로 sort (오름 차순)
        result = result.sort((a, b) => a[11] - b[11]);
        // I. 가장 많이 차이나는 점수의 화살 개수 추출
        let maxDiff = result[result.length - 1][11];
        result = result.filter(e => e[11] === maxDiff);

        // I. 여러 가지 방법이 나왔을 경우 가장 작은 점수가 많은 놈을 출력 해야함.
        while (result.length) {
            let firstElement = result.pop();
            answer = firstElement;
            if (!result.length) {
                break;
            }
            let secondElement = result.pop();

            for (let i = 10; i >= 0; i--) {
                if (firstElement[i] > secondElement[i]) {
                    answer = firstElement;
                    break;
                } else if (firstElement[i] < secondElement[i]) {
                    answer = secondElement;
                    break;
                }
                // 같은 경우 루프 계속 돌아야 함.
            }
        }
    }
    if (answer.length) answer.pop();
    return answer;
}

console.log(solution(5, [2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]));

// 느낌은 비슷하지만 효율이 똥 코드 : depth 를 5로 두고 for 문을 10까지 뒀음. 매우 비효율적인 코드
// function solution(n, info) {
//     let answer;
//     // M. 라이언 배열 생성(info와 비교할 거임)
//     let lion = new Array(11).fill(0);
//     // M. 라이언이 어피치보다 많은 점수를 가지고 있을 때의 화살 개수
//     let result = [];
//     let checkDuplicate = [];
//
//     (function rec(depth, lion) {
//         // I. Base Case
//         if (depth >= n) {
//             // I. 점수 계산(info, lion 비교)
//             let apeachScore = 0;
//             let lionScore = 0;
//             for (let i = 0; i < 10; i++) {
//                 // I. lion이 많으면 lion 승
//                 if (lion[i] > info[i]) lionScore += (10 - i);
//                 else if ((lion[i] <= info[i]) && info[i]) apeachScore += (10 - i);
//             }
//
//             // I. apeach보다 lion이 점수가 많을 때 + 그 차이를 주입
//             if (lionScore > apeachScore) result.push([...lion, lionScore - apeachScore]);
//             return;
//         }
//
//         for (let i = 0; i < 10; i++) {
//             lion[i] += 1; // lion 에 넣자!
//             if (!checkDuplicate.includes(lion.toString())) {
//                 checkDuplicate.push(lion.toString());
//                 rec(depth + 1, lion);
//             }
//             lion[i] -= 1; // 이게 핵심이다!
//         }
//     })(0, lion);
//
//     if (!result.length) return [-1];
//     else {
//         // I. 크기 순으로 sort (오름 차순)
//         result = result.sort((a, b) => a[11] - b[11]);
//         // I. 가장 많이 차이나는 점수의 화살 개수 추출
//         let maxDiff = result[result.length - 1][11];
//         result = result.filter(e => e[11] === maxDiff);
//
//         // I. 여러 가지 방법이 나왔을 경우 가장 작은 점수가 많은 놈을 출력 해야함.
//         while (result.length) {
//             let firstElement = result.pop();
//             if (!result.length) {
//                 answer = firstElement;
//                 break;
//             }
//             let secondElement = result.pop();
//
//             for (let i = 9; i >= 0; i--) {
//                 if (firstElement[i] > secondElement[i]) {
//                     answer = firstElement;
//                     break;
//                 } else if (firstElement[i] < secondElement[i]) {
//                     answer = secondElement;
//                     break;
//                 }
//                 // 같은 경우 루프 계속 돌아야 함.
//             }
//         }
//     }
//
//     answer.pop();
//     return answer;
// }

//////////////////////////////////////////////////////////////////////////////////////////////////

// function test(n) {
//     let result = [];
//     let temp = new Array(10).fill(0);
//
//     (function rec(idx, sum) {
//         if (idx === 10) {
//             if (sum === n) {
//                 result.push([].concat(temp));
//             }
//             return;
//         }
//
//         for (let i = 0; i <= n; i++) { // 0부터 n까지의 값을 시도
//             if (sum + i <= n) { // 합이 n보다 작거나 같은 경우에만 재귀 호출
//                 temp[idx] = i;
//                 rec(idx + 1, sum + i);
//             }
//         }
//     })(0, 0);
//
//     return result;
// }
//
// console.log(test(5));

//////////////////////////////////////////////////////////////////////////////////////////////////

// function test(n) {
//     let result = [];
//     let temp = new Array(10).fill(0);
//
//     (function rec(idx, sum) {
//         if (idx === 10) {
//             if (sum === n) {
//                 result.push([].concat(temp));
//             }
//             return;
//         }
//
//         if (sum < n) {
//             temp[idx] += 1;
//             rec(idx + 1, sum + 1);
//             temp[idx] -= 1;
//         }
//
//         rec(idx + 1, sum);
//     })(0, 0);
//
//     return result.reverse();
// }
//
// console.log(test(5));
