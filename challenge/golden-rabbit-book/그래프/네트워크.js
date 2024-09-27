// [문제 이해하기]
// 네트워크 개수 파악하기

// [문제 풀이]
// 1. union, find
// 2. BFS, DFS

// [문제 세분화] => 1. union, find
// M. union find 구현
// I. 인접 행렬 돌면서 묶이는 게 있으면
// function solution(n, computers) {
//   const arr = Array.from({ length: n }, (_, i) => i);
//
//   const union = (u, v) => {
//     const rootU = find(u);
//     const rootV = find(v);
//
//     if (rootU !== rootV) {
//       arr[rootU] = rootV; // rootV 가 부모임
//     }
//   };
//
//   const find = (u) => {
//     if (u !== arr[u]) {
//       arr[u] = find(arr[u]); // 경로 압축
//     }
//     return arr[u];
//   };
//
//   // Matrix 상단만 돌면서 union 해주면 됨
//   for (let i = 0; i < n; i++) {
//     for (let j = i + 1; j < n; j++) {
//       if (computers[i][j] === 1) union(i, j);
//     }
//   }
//
//   // 압축
//   Array.from({ length: n }, (_, i) => find(i));
//   const newSet = new Set(arr);
//   return newSet.size;
// }

// [문제 세분화] => 1. DFS
function solution(n, computers) {
  let answer = 0;
  const visited = new Array(n).fill(false);

  const DFS = (node) => {
    visited[node] = true;

    for (let i = 0; i < n; i++) {
      if (!visited[i] && computers[node][i]) {
        // 방문 x && 1인경우
        DFS(i);
      }
    }
  };

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      // 이걸로 컨트롤하는구나
      DFS(i);
      answer++;
    }
  }

  return answer;
}

console.log(
  solution(3, [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 1],
  ]),
);

console.log(
  solution(3, [
    [1, 1, 0],
    [1, 1, 1],
    [0, 1, 1],
  ]),
);
