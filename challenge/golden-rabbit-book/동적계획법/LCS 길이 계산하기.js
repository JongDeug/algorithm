// [문제 이해하기]
// 최장 공통 부분 수열의 길이를 구하는 함수를 작성해라.
//
// [문제 풀이]
// 점화식
// 1. x !== y
// Max(LCS(i-1, j), LCS(i, j-1))
// 2. x === y
// LCS(i-1, j-1) + 1
// 3. 종료 조건
// LCS(0, 0)
//
// [문제 세분화] => 이건 진짜 복잡하긴 하다..
// M. LCS 배열 초기화 및 선언
// M. LCS 함수 구현 (i, j) 를 넣으면 탑다운으로 실행
// function solution(str1, str2) {
//   // M. 배열 초기화
//   let xLen = str1.length;
//   let yLen = str2.length;
//   let arr = Array.from({ length: yLen + 1 }, () => Array(xLen + 1));
//   for (let j = 0; j < xLen + 1; j++) {
//     arr[0][j] = 0;
//   }
//   for (let i = 0; i < yLen + 1; i++) {
//     arr[i][0] = 0;
//   }
//
//   // M. LCS 함수 구현, i=>y, j=>x
//   const LCS = (i, j) => {
//     // Base Case
//     if (i === 0 || j === 0) return arr[i][j];
//
//     // 점화식 1
//     if (str2[i - 1] !== str1[j - 1]) {
//       arr[i][j] = Math.max(LCS(i - 1, j), LCS(i, j - 1));
//     }
//     // 점화식 2
//     else {
//       arr[i][j] = LCS(i - 1, j - 1) + 1;
//     }
//
//     return arr[i][j];
//   };
//
//   return LCS(yLen, xLen);
// }

// [피드백] => 탑 다운 재귀 구현 코드는 맞지만 비효율적임
// function solution(str1, str2) {
//   // M. 배열 초기화
//   let xLen = str1.length;
//   let yLen = str2.length;
//   let arr = Array.from({ length: yLen + 1 }, () => Array(xLen + 1).fill(0));

//   // I. 1부터 시작 good
//   for (let i = 1; i <= yLen; i++) {
//     for (let j = 1; j <= xLen; j++) {
//       if (str2[i - 1] === str1[j - 1]) arr[i][j] = arr[i - 1][j - 1] + 1;
//       else arr[i][j] = Math.max(arr[i - 1][j], arr[i][j - 1]);
//     }
//   }

//   return arr[yLen][xLen];
// }

// console.log(solution("ABDFEGACB", "BXDEGK"));
// console.log(solution("ABCBDAB", "BDCAB"));
// console.log(solution("AGGTAB", "GXTXAYB"));
// console.log(solution("ABCDEFGH", "ADDICTEF"));
// console.log(solution("ABCDGH", "AEDFHR"));
// console.log(solution("ABCDEFG", "BCDGFEG"));

// [복습 큐] => 근데 재귀로 푸는건 진짜 복잡하긴 하다
// LCS(Longest Common Subsequence)
// 가장 긴 공통 부분 수열 구하기

// [입력]: 두 문자열
// [출력]: int(가장 긴 공통 부분 수열의 길이)

// [점화식]
// 2차원 배열 dp를 사용. 길이는 (str1 * str2)
// x === y: dp[i][j] = dp[i-1][j-1] + 1;
// x !== y: dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
function solution(str1, str2) {
  const dp = Array.from({ length: str1.length + 1 }, () =>
    Array(str2.length + 1).fill(0)
  );

  for (let y = 1; y <= str1.length; y++) {
    for (let x = 1; x <= str2.length; x++) {
      if (str1[y - 1] === str2[x - 1]) dp[y][x] = dp[y - 1][x - 1] + 1;
      else dp[y][x] = Math.max(dp[y - 1][x], dp[y][x - 1]);
    }
  }

  return dp[str1.length][str2.length];
}

// console.log(solution("ACDBE", "ABCDE"));
