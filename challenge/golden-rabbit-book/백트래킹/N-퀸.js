// // [문제 이해하기]
// // 체스판 위에 n개의 퀸이 서로를 공격할 수 없도록 배치하고 싶은데 조건을 만족하는 퀸 배치 수를 반환해라.
// //
// // [문제 세분화]
// // 이때까지 나는 데이터를 다 구하고 조건에 맞는 데이터를 걸렀는데
// // 좀 더 효율적인 방법인 백트래킹은 구하면서 반환함
// //
// // I. DFS
// // I. 순열을 구하면서
// // I. BASE CASE 작성
// // I. 조건을 만족하면 Count
// // I. depth => row, i => col
// function solution(n) {
//   const colSet = new Set();
//   const diagonalSet1 = new Set();
//   const diagonalSet2 = new Set();

//   const DFS = (depth, count) => {
//     // I. BASE CASE (depth 4인 경우,)
//     if (depth === n) {
//       return ++count;
//     }

//     // I. 종료 조건
//     for (let i = 0; i < n; i++) {
//       let diago1 = depth + i; // row + i => 오른쪽 위 -> 왼쪽 아래
//       let diago2 = depth - i; // row - i => 왼쪽 위 -> 오른쪽 아래

//       // I. 가지 치기 대각선, 직선
//       if (
//         colSet.has(i) ||
//         diagonalSet1.has(diago1) ||
//         diagonalSet2.has(diago2)
//       ) {
//         continue;
//       }

//       colSet.add(i);
//       diagonalSet1.add(diago1);
//       diagonalSet2.add(diago2);
//       count = DFS(depth + 1, count);
//       colSet.delete(i);
//       diagonalSet1.delete(diago1);
//       diagonalSet2.delete(diago2);
//     }

//     return count;
//   };

//   return DFS(0, 0);
// }

// console.log(solution(4));

// [문제 이해하기] => 와씨 풀었땅~!~!~
// N-Queen 문제, 조건에 만족 하도록 배치된 수

// [입력]: int(가로, 세로, 퀸)
// [출력]: int(배치 수)

// [접근법]
// 순열, 백트래킹

// [문제 세분화]
// 가로, 세로, 대각선 true, false 관리
// dfs 구현 (for문 섞어서)
// 인자로 count + 1
// Base case:  count가 n이면 answer++
// true, false 로 Set 관리
function solution(n) {
  let answer = 0;
  let vertical = Array.from({ length: n }, () => false);
  let horizontal = Array.from({ length: n }, () => false);
  let diagonalFirst = Array.from({ length: 2 * n - 1 }, () => false);
  let diagonalSecond = Array.from({ length: 2 * n - 1 }, () => false);

  const calIdx = (i, j) => {
    let calIdx = i - j;
    if (calIdx < 0) calIdx = 2 * n - 1 + calIdx;
    return calIdx;
  };

  const isValid = (i, j) => {
    return (
      !vertical[i] &&
      !horizontal[j] &&
      !diagonalSecond[i + j] &&
      !diagonalFirst[calIdx(i, j)]
    );
  };

  const dfs = (count) => {
    if (count === n) {
      answer++;
      return;
    }

    // 이중 포문 말고 depth로 개선할 수 있음!
    for (let i = count; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (isValid(i, j)) {
          vertical[i] = true;
          horizontal[j] = true;
          diagonalSecond[i + j] = true;
          diagonalFirst[calIdx(i, j)] = true;

          //   if (dfs(count + 1, i + 1)) return true; => 모든 가능성을 찾아야 되기 때문에. => 한 번만 찾는게 아님
          dfs(count + 1);

          vertical[i] = false;
          horizontal[j] = false;
          diagonalSecond[i + j] = false;
          diagonalFirst[calIdx(i, j)] = false;
        }
      }
      return; // 여기서 못찾았으면 바로 백쳐야지
    }
  };

  dfs(0);

  return answer;
}
