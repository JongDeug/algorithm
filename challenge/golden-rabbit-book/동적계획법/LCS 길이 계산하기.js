// [���� �����ϱ�]
// ���� ���� �κ� ������ ���̸� ���ϴ� �Լ��� �ۼ��ض�.
//
// [���� Ǯ��]
// ��ȭ��
// 1. x !== y
// Max(LCS(i-1, j), LCS(i, j-1))
// 2. x === y
// LCS(i-1, j-1) + 1
// 3. ���� ����
// LCS(0, 0)
//
// [���� ����ȭ] => �̰� ��¥ �����ϱ� �ϴ�..
// M. LCS �迭 �ʱ�ȭ �� ����
// M. LCS �Լ� ���� (i, j) �� ������ ž�ٿ����� ����
// function solution(str1, str2) {
//   // M. �迭 �ʱ�ȭ
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
//   // M. LCS �Լ� ����, i=>y, j=>x
//   const LCS = (i, j) => {
//     // Base Case
//     if (i === 0 || j === 0) return arr[i][j];
//
//     // ��ȭ�� 1
//     if (str2[i - 1] !== str1[j - 1]) {
//       arr[i][j] = Math.max(LCS(i - 1, j), LCS(i, j - 1));
//     }
//     // ��ȭ�� 2
//     else {
//       arr[i][j] = LCS(i - 1, j - 1) + 1;
//     }
//
//     return arr[i][j];
//   };
//
//   return LCS(yLen, xLen);
// }

// [�ǵ��] => ž �ٿ� ��� ���� �ڵ�� ������ ��ȿ������
// function solution(str1, str2) {
//   // M. �迭 �ʱ�ȭ
//   let xLen = str1.length;
//   let yLen = str2.length;
//   let arr = Array.from({ length: yLen + 1 }, () => Array(xLen + 1).fill(0));

//   // I. 1���� ���� good
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

// [���� ť] => �ٵ� ��ͷ� Ǫ�°� ��¥ �����ϱ� �ϴ�
// LCS(Longest Common Subsequence)
// ���� �� ���� �κ� ���� ���ϱ�

// [�Է�]: �� ���ڿ�
// [���]: int(���� �� ���� �κ� ������ ����)

// [��ȭ��]
// 2���� �迭 dp�� ���. ���̴� (str1 * str2)
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
