// [문제 이해하기]
// 체스판 위에 n개의 퀸이 서로를 공격할 수 없도록 배치하고 싶은데 조건을 만족하는 퀸 배치 수를 반환해라.
//
// [문제 세분화]
// 이때까지 나는 데이터를 다 구하고 조건에 맞는 데이터를 걸렀는데
// 좀 더 효율적인 방법인 백트래킹은 구하면서 반환함
//
// I. DFS
// I. 순열을 구하면서
// I. BASE CASE 작성
// I. 조건을 만족하면 Count
// I. depth => row, i => col
function solution(n) {
  const colSet = new Set();
  const diagonalSet1 = new Set();
  const diagonalSet2 = new Set();

  const DFS = (depth, count) => {
    // I. BASE CASE (depth 4인 경우,)
    if (depth === n) {
      return ++count;
    }

    // I. 종료 조건
    for (let i = 0; i < n; i++) {
      let diago1 = depth + i; // row + i => 오른쪽 위 -> 왼쪽 아래
      let diago2 = depth - i; // row - i => 왼쪽 위 -> 오른쪽 아래

      // I. 가지 치기 대각선, 직선
      if (
        colSet.has(i) ||
        diagonalSet1.has(diago1) ||
        diagonalSet2.has(diago2)
      ) {
        continue;
      }

      colSet.add(i);
      diagonalSet1.add(diago1);
      diagonalSet2.add(diago2);
      count = DFS(depth + 1, count);
      colSet.delete(i);
      diagonalSet1.delete(diago1);
      diagonalSet2.delete(diago2);
    }

    return count;
  };

  return DFS(0, 0);
}

console.log(solution(4));
