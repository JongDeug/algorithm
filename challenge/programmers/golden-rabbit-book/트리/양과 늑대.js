// [문제 이해하기]
// 양이 늑대에게 먹히지 않으면서 최대한 많은 수의 양을 모아서 루트 노드로 돌아오는 함수를 작성해라

// 양의 수보다 늑대의 수가 같거나 더 많아지면 양을 잡아 먹음

// 그냥 BFS가 아니다 어렵넹
//
// [문제 세분화]
function solution(info, edges) {
  let maxSheep = 0;
  // I. 인접 리스트 생성(어드제이썬씨)
  let adjacencyList = Array.from({ length: info.length }, () => []);
  for (const [from, to] of edges) {
    adjacencyList[from].push(to);
  }

  console.log(adjacencyList);
  // I. (현위치, 양, 늑대, 방문할 탐색 리스트)
  const queue = [[0, 1, 0, new Set()]];

  while (queue.length) {
    const [current, sheep, wolf, nextNodes] = queue.shift();

    maxSheep = Math.max(maxSheep, sheep);

    // I. 탐색 리스트에 방문할 노드 추가
    for (const neighbor of adjacencyList[current]) {
      nextNodes.add(neighbor);
    }

    // I. 탐색하기
    for (const neighbor of nextNodes) {
      // I. 내가 현재 neighbor 임마를 탐색하고 조건에 만족하면
      // 큐에 넣을거니까, 얘를 제외하고 current 노드와 인접한 놈들까지
      // 넣어줘야 방문한 곳들의 인접한 노드까지 다음에 방문할 수 있게 됨
      // I. 늑대라면
      if (info[neighbor]) {
        if (sheep !== wolf + 1) {
          const newNextNodes = new Set(nextNodes);
          newNextNodes.delete(neighbor);
          queue.push([neighbor, sheep, wolf + 1, newNextNodes]);
        }
      } else {
        const newNextNodes = new Set(nextNodes);
        newNextNodes.delete(neighbor);
        queue.push([neighbor, sheep + 1, wolf, newNextNodes]);
      }
    }
  }

  return maxSheep;
}

console.log(
  solution(
    [0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
    [
      [0, 1],
      [1, 2],
      [1, 4],
      [0, 8],
      [8, 7],
      [9, 10],
      [9, 11],
      [4, 3],
      [6, 5],
      [4, 6],
      [8, 9],
    ],
  ),
);
