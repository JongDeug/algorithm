// [문제 이해하기]
// 벨만 포드 알고리즘 구현해라.
// 핵심: 우선 순위를 사용하지 않는다 모든 간선을 초기화 함
//
// 출력:
function solution(graph, source) {
  const N = graph.length;
  let flag = false;

  // M. distance 초기화, 직전 노드 predecessor
  const distance = Array.from({ length: N }, () => Infinity);
  const predecessor = Array.from({ length: N }, () => null);

  distance[source] = 0;

  // I. for 문 N 만큼 돌고, N째가 돌면 음의 순환이 있는거임 (매 연산마다 최단 경로가 1개씩 확정이니까 원래는 N-1만큼 도는거임)
  for (let i = 1; i <= N; i++) {
    // I. 간선 수만 큼
    for (let e = 0; e < N; e++) {
      for (const [node, weight] of graph[e]) {
        const candidate = distance[e] + weight; // 현재 노드 + 갈 노드
        if (candidate < distance[node]) {
          distance[node] = candidate;
          predecessor[node] = e;
          // i. 음의 순환 => 왜 안에 있냐? => 밖에 있으면 무조건 돌고, 이 위치에 들어와야 줄어든다는 뜻이거든
          if (i === N) flag = true;
        }
      }
    }
  }

  if (flag) {
    return [-1];
  } else {
    return [distance, predecessor];
  }
}

console.log(
  solution(
    [
      [
        [1, 4],
        [2, 3],
        [4, -6],
      ],
      [[3, 5]],
      [[1, 2]],
      [
        [0, 7],
        [2, 4],
      ],
      [[2, 2]],
    ],
    0,
  ),
);

console.log(
  solution(
    [
      [
        [1, 5],
        [2, -1],
      ],
      [[2, 2]],
      [[3, -2]],
      [
        [0, 2],
        [1, 6],
      ],
    ],
    0,
  ),
);
