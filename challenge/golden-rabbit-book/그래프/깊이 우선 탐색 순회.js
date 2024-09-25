// [문제 이해하기]
// 그래프가 주어지면 DFS 로 순환한 결과를 출력해라.
//
// [문제 세분화]
// I. 재귀로 구현
// I. 꺼낼 때 방문으로 체킹
//
// 핵심 => DFS 는 노드들을 언제 방문할지 모르니까 꺼낼 때 방문, BFS는 아니까 바로바로 방문처리
function solution(graph, start) {
  const ans = [];
  // I. graph => adjacency 초기화
  const adjacencyList = {};
  const visited = {};
  for (const [from, to] of graph) {
    if (!adjacencyList[from]) adjacencyList[from] = [];
    if (!adjacencyList[to]) adjacencyList[to] = [];
    if (!visited[from]) visited[from] = false;
    if (!visited[to]) visited[to] = false;

    adjacencyList[from].push(to);
  }

  const DFS = (node) => {
    visited[node] = true; // 꺼낼 때 방문
    ans.push(node);

    for (const neigbor of adjacencyList[node]) {
      if (!visited[neigbor]) DFS(neigbor);
    }
  };

  DFS(start);

  return ans;
}

console.log(
  solution(
    [
      ["A", "B"],
      ["A", "C"],
      ["B", "D"],
      ["B", "E"],
      ["C", "F"],
      ["E", "F"],
    ],
    "A",
  ),
);

console.log(
  solution(
    [
      ["A", "B"],
      ["B", "C"],
      ["C", "D"],
      ["D", "E"],
    ],
    "A",
  ),
);
