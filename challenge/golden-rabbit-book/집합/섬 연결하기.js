// // [문제 이해하기]
// // 섬 사이에 다리를 건설하는 데 최소의 비용으로 모든 섬이 서로 통행 가능하도록 만들 때 필요한 최소 비용 return

// // [문제 핵심]
// // union find 로 풀건데 뭐가 됐든 사이클만 안생기게 연결하면 되는 거 아닌가?

// // [구체적인 예시 찾기]
// // [[1,3,1], [0,2,2], [1,2,2], [0,1,5], [2,3,8]] => 5
// //
// // [문제 세분화] => 이까지는 풀었다잉
// function solution(n, costs) {
//   // M. 집합 배열 [[노드, 코스트]]
//   let arr = Array.from({ length: n }, (_, i) => [i, 0]);
//   const find = (u) => {
//     const node = arr[u];
//     if (node[0] === u) return u;
//     return find(node[0]);
//   };
//   const union = (u, v, cost) => {
//     const rootU = find(u);
//     const rootV = find(v);
//     // I. 같지 않을 때
//     if (rootU !== rootV) {
//       if (rootU < rootV) arr[rootV] = [rootU, cost];
//       else arr[rootU] = [rootV, cost];
//       return true;
//     }
//     // I. 같을 때 사이클이 생성되는거지 ㅇㅇ
//     return false;
//   };

//   // I. 코스트 기준으로 내림차순 정렬
//   costs.sort((a, b) => a[2] - b[2]);
//   // I. 사이클 생성하지 않도록 union
//   let answer = 0;
//   for (const [u, v, cost] of costs) {
//     if (union(u, v, cost)) {
//       answer += cost;
//     }
//   }
//   return answer;
// }

// [문제 이해하기] => 복습 큐
// 최소의 비용으로 모든 섬이 서로 통행 가능하도록.

// [입력]: 이차원 배열 [u, v, cost]
// [출력]: int 최소 비용

// [접근법]
// MST 문제 (union, find)
// Kruskal

// [문제 세분화]
// 가중치 기준으로 정렬
// 순차적으로 탐색해서 union
// 만약 사이클이 있으면 그놈은 제외
// 이 모든걸 노드 - 1 = 간선의 개수만큼 실행
function solution(n, costs) {
  let ans = 0;
  const arr = Array.from({ length: n }, (_, i) => i);
  // 오름차순 정렬
  costs.sort((a, b) => a[2] - b[2]);

  const find = (v) => {
    if (v !== arr[v]) {
      arr[v] = find(arr[v]);
    }
    return arr[v];
  };

  const union = (u, v) => {
    let rU = find(u);
    let rV = find(v);

    // 사이클 판단
    if (rU !== rV) {
      arr[rV] = arr[rU];
      return true;
    }
    return false;
  };

  // 순차, 만약 더 최적화 시키고 싶다 => count 설정
  // let count = 0;
  for (let i = 0; i < costs.length; i++) {
    const [u, v, c] = costs[i];
    // if(count === n - 1) break;
    if (union(u, v)) {
      // count++;
      ans += c;
    }
  }

  return ans;
}
