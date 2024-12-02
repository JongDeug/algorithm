// // [문제 이해하기]
// // 어피치에게 어드벤티지가 있고, 라이언이 가장 큰 점수 차이로 우승하기 위한 n발의 화살을 구해라.

// // [조건]
// // 1. 라이언이 우승할 방법이 없으면 [-1] return
// // 2. 방법이 여러 가지일 경우, 가장 낮은 점수를 더 많이 맞힌 경우를 return (가장 오른쪽부터 많은 순)

// // [문제 분석]
// // I. 백트래킹으로 푼다. => 하지만 도중에 가지를 못치므로 라이언 배열을 다 구하고 게산해야함
// // I. N을 기준으로 라이언의 순열(점수)를 구함
// // i. BASE CASE (순열을 다 구하면 stop => 계산)
// // i. max 를 넣음 만약 값이 같다면 ? => 더 많이 맞힌 경우를 return, 값이 없다면? [-1]
// // function solution(n, info) {
// //   const lionInfo = new Array(11).fill(0);
// //   let maxScoreDiff = -Infinity;
// //   let result = [-1];
// //
// //   const search = (depth, sum) => {
// //     // I. Base Case
// //     if (depth === 11) {
// //       if (sum === n) {
// //         let [lionScore, apeachScore] = [0, 0];
// //         // I. 누가 누가 더 크냐
// //         for (let i = 0; i <= 10; i++) {
// //           const score = 10 - i;
// //           const [lionN, apeachN] = [lionInfo[i], info[i]];
// //           // I. 0 제외
// //           if (apeachN && apeachN >= lionN) apeachScore += score;
// //           else if (apeachN < lionN) lionScore += score;
// //         }
// //
// //         if (apeachScore < lionScore) {
// //           const scoreDiff = lionScore - apeachScore;
// //
// //           if (maxScoreDiff <= scoreDiff) {
// //             if (maxScoreDiff === scoreDiff) {
// //               for (let i = 10; i >= 0; i--) {
// //                 // I. 와..습니ㅏㅇ렁ㄴㄹ result가 커도 종료해줘야지
// //                 if (result[i] > lionInfo[i]) break; // 와... 이걸 처리안해줬네
// //
// //                 if (result[i] < lionInfo[i]) {
// //                   result = [...lionInfo];
// //                   break;
// //                 }
// //               }
// //             } else {
// //               maxScoreDiff = scoreDiff;
// //               result = [...lionInfo];
// //             }
// //           }
// //         }
// //         return;
// //       }
// //       return;
// //     }
// //
// //     // I. N을 기준으로 순열을 구한다
// //     for (let i = 1; i <= n; i++) {
// //       if (sum + i > n) break;
// //       lionInfo[depth] = i;
// //       search(depth + 1, sum + i);
// //       lionInfo[depth] = 0; // sum 은 원상태이므로 빼지 않아도 됨
// //     }
// //
// //     search(depth + 1, sum);
// //   };
// //
// //   search(0, 0);
// //   console.log(maxScoreDiff);
// //   return result;
// // }

// // [피드백]
// function solution(n, info) {
//   const lionInfo = new Array(11).fill(0);
//   let maxScoreDiff = -Infinity;
//   let result = [-1];

//   const calculateScore = (lion, apeach) => {
//     let [lionScore, apeachScore] = [0, 0];

//     for (let i = 0; i <= 10; i++) {
//       const score = 10 - i;
//       // I. 0 제외
//       if (!apeach[i] && !lion[i]) continue;
//       if (apeach[i] >= lion[i]) apeachScore += score;
//       else lionScore += score;
//     }

//     return [lionScore, apeachScore];
//   };

//   const search = (depth, sum) => {
//     // I. Base Case
//     if (depth === 11) {
//       if (sum === n) {
//         // I. 점수 계산
//         let [lionScore, apeachScore] = calculateScore(lionInfo, info);

//         // I. 변수에 넣기
//         if (apeachScore < lionScore) {
//           const scoreDiff = lionScore - apeachScore;

//           if (maxScoreDiff < scoreDiff) {
//             console.log(lionInfo);
//             maxScoreDiff = scoreDiff;
//             result = [...lionInfo]; // 참조 값
//           } else if (maxScoreDiff === scoreDiff) {
//             for (let i = 10; i >= 0; i--) {
//               // I. 중요 : result 가 커도 종료, 같을 경우만 루프를 돔
//               if (result[i] > lionInfo[i]) break;
//               if (result[i] < lionInfo[i]) {
//                 result = [...lionInfo]; // 참조 값
//                 break;
//               }
//             }
//           }
//         }
//         return;
//       }
//       return;
//     }

//     // I. N을 기준으로 순열을 구한다
//     for (let i = 1; i <= n; i++) {
//       if (sum + i > n) break;
//       lionInfo[depth] = i;
//       search(depth + 1, sum + i);
//       lionInfo[depth] = 0;
//     }

//     search(depth + 1, sum);
//   };

//   search(0, 0);
//   return result;
// }

// [문제 이해하기]
// 라이언이 어떻게 쏴야 어피치를 가장 큰 점수차로 이기는지 구해라
// 아씨뻘 그냥 라이언 점수가 젤 큰걸 고르는게 아님

// [입력]: int(n, 화살 개수), 배열(10~0점, 11개),
// [출력]: 배열(10~0점, 11개, 각 점수에 화살 개수), 여러개일 경우 낮은 점수를 더 많이 맞힌 경우 return
// - 만약 지거나 비기는 경우 [-1]

// [접근법]
// 화살 개수를 적절하게 분배해서 적절한지 판단 => 순열

// [문제 세분화]
// 순열을 구하는 함수, DFS 구현
// sum이 화살의 개수와 같을 때 비교
// 	라이언, 어피치 비교해서 점수를 가진다.
// 	라이언이 이겼으면 정답에 들어있는 점수차보다 크면 넣는다.
// 		만약 점수차가 같으면 가장 낮은 점수를 더 많이 맞힌 경우를 넣는다
function solution(n, info) {
  const length = info.length;
  const lion = Array(length).fill(0);
  let answer = [-1];
  let maxScoreDiff = -Infinity;

  const dfs = (sum, depth) => {
    if (depth === length) {
      if (sum === n) {
        // 라이언, 어피치 비교해서 점수를 계산한다
        let lionScore = 0;
        let apeachScore = 0;
        for (let i = length - 1; i >= 0; i--) {
          // a = b = 0
          if (lion[i] === 0 && info[i] === 0) continue;
          if (lion[i] <= info[i]) apeachScore += 10 - i;
          else if (lion[i] > info[i]) lionScore += 10 - i;
        }

        if (lionScore > apeachScore) {
          const scoreDiff = lionScore - apeachScore;
          // 만약 점수차가 같으면 가장 낮은 점수를 더 많이 맞힌 경우를 넣는다
          if (maxScoreDiff === scoreDiff) {
            for (let i = length - 1; i >= 0; i--) {
              if (answer[i] !== lion[i]) {
                if (answer[i] < lion[i]) {
                  answer = [...lion];
                  return;
                } else return; // lion이 작아도 종료, 다음으로 넘어갈 수 없음
              }
            }
          } else if (maxScoreDiff < scoreDiff) {
            answer = [...lion];
            maxScoreDiff = scoreDiff;
          }
        }
      }
      return;
    }

    for (let i = 0; i <= n - sum; i++) {
      lion[depth] = i;
      dfs(sum + i, depth + 1);
      lion[depth] = 0;
    }
  };

  dfs(0, 0);

  return answer;
}

// console.log(solution(5, [2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]));
// console.log(solution(9, [0, 0, 1, 2, 0, 1, 1, 1, 1, 1, 1]));
console.log(solution(10, [0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 3]));
