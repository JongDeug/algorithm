// [문제 이해하기]
// 어피치에게 어드벤티지가 있고, 라이언이 가장 큰 점수 차이로 우승하기 위한 n발의 화살을 구해라.

// [조건]
// 1. 라이언이 우승할 방법이 없으면 [-1] return
// 2. 방법이 여러 가지일 경우, 가장 낮은 점수를 더 많이 맞힌 경우를 return (가장 오른쪽부터 많은 순)

// [문제 분석]
// I. 백트래킹으로 푼다. => 하지만 도중에 가지를 못치므로 라이언 배열을 다 구하고 게산해야함
// I. N을 기준으로 라이언의 순열(점수)를 구함
// i. BASE CASE (순열을 다 구하면 stop => 계산)
// i. max 를 넣음 만약 값이 같다면 ? => 더 많이 맞힌 경우를 return, 값이 없다면? [-1]
function solution(n, info) {
  const lionInfo = new Array(11).fill(0);
  let maxScoreDiff = -Infinity;
  let result = [-1];

  const search = (depth, sum) => {
    // I. Base Case
    if (depth === 11) {
      if (sum === n) {
        let [lionScore, apeachScore] = [0, 0];
        // I. 누가 누가 더 크냐
        for (let i = 0; i <= 10; i++) {
          const score = 10 - i;
          const [lionN, apeachN] = [lionInfo[i], info[i]];
          // I. 0 제외
          if (apeachN && apeachN >= lionN) apeachScore += score;
          else if (apeachN < lionN) lionScore += score;
        }

        if (apeachScore < lionScore) {
          const scoreDiff = lionScore - apeachScore;

          if (maxScoreDiff <= scoreDiff) {
            if (maxScoreDiff === scoreDiff) {
              for (let i = 10; i >= 0; i--) {
                // I. 와..습니ㅏㅇ렁ㄴㄹ result가 커도 종료해줘야지
                if (result[i] > lionInfo[i]) break; // 와... 이걸 처리안해줬네

                if (result[i] < lionInfo[i]) {
                  result = [...lionInfo];
                  break;
                }
              }
            } else {
              maxScoreDiff = scoreDiff;
              result = [...lionInfo];
            }
          }
        }
        return;
      }
      return;
    }

    // I. N을 기준으로 순열을 구한다
    for (let i = 1; i <= n; i++) {
      if (sum + i > n) break;
      lionInfo[depth] = i;
      search(depth + 1, sum + i);
      lionInfo[depth] = 0; // sum 은 원상태이므로 빼지 않아도 됨
    }

    search(depth + 1, sum);
  };

  search(0, 0);
  console.log(maxScoreDiff);
  return result;
}

// console.log(solution(5, [2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]));
// console.log(solution(9, [0, 0, 1, 2, 0, 1, 1, 1, 1, 1, 1]));
console.log(solution(10, [0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 3]));
