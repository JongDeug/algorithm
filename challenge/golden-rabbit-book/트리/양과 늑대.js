// // [문제 이해하기]
// // 양이 늑대에게 먹히지 않으면서 최대한 많은 수의 양을 모아서 루트 노드로 돌아오는 함수를 작성해라

// // 양의 수보다 늑대의 수가 같거나 더 많아지면 양을 잡아 먹음
// //
// // [기록]
// // 우선순위 큐, 전위 순회, 후위 순회 여러 가지로 고민해봤지만
// // 답이 나오지 않았음.
// // 그냥 BFS, DFS가 아니다 => 확장된 문제임
// // 현재 경로에서 인접한 모든 노드들을 방문할 수 있어야 함.
// //
// // [문제 세분화]
// function solution(info, edges) {
//   let maxSheep = 0;
//   // I. 인접 리스트 생성(어드제이썬씨)
//   let adjacencyList = Array.from({ length: info.length }, () => []);
//   for (const [from, to] of edges) {
//     adjacencyList[from].push(to);
//   }

//   // I. (현위치, 양, 늑대, 방문할 탐색 리스트)
//   const queue = [[0, 1, 0, new Set()]];

//   while (queue.length) {
//     const [current, sheep, wolf, nextNodes] = queue.shift();

//     maxSheep = Math.max(maxSheep, sheep);

//     // I. 탐색 리스트에 방문할 노드 추가
//     for (const neighbor of adjacencyList[current]) {
//       nextNodes.add(neighbor);
//     }

//     // I. 탐색하기
//     for (const neighbor of nextNodes) {
//       // I. 내가 현재 neighbor 임마를 탐색하고 조건에 만족하면
//       // 큐에 넣을거니까, 얘를 제외하고 current 노드와 인접한 놈들까지
//       // 넣어줘야 방문한 곳들의 인접한 노드까지 다음에 방문할 수 있게 됨
//       // I. 늑대라면
//       if (info[neighbor]) {
//         if (sheep !== wolf + 1) {
//           const newNextNodes = new Set(nextNodes);
//           newNextNodes.delete(neighbor);
//           queue.push([neighbor, sheep, wolf + 1, newNextNodes]);
//         }
//       } else {
//         const newNextNodes = new Set(nextNodes);
//         newNextNodes.delete(neighbor);
//         queue.push([neighbor, sheep + 1, wolf, newNextNodes]);
//       }
//     }
//   }

//   return maxSheep;
// }

// console.log(
//   solution(
//     [0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
//     [
//       [0, 1],
//       [1, 2],
//       [1, 4],
//       [0, 8],
//       [8, 7],
//       [9, 10],
//       [9, 11],
//       [4, 3],
//       [6, 5],
//       [4, 6],
//       [8, 9],
//     ]
//   )
// );

// [문제 이해하기] => 복습 큐
// 이진 트리에서 모을 수 있는 최대의 양 수 return

// [입력] : 배열(양0, 늑대1), 이차원 배열([부모, 자식])
// [출력] : int

// [접근법]
// 완전탐색(BFS), 모든 경우를 다 따지고 max 값을 return
// 어디로든 점핑할 수 있게 길을 열어둔다.
// 방문한 근처노드를 넣는 것 뿐만 아니라 다른 길도 "또 넣어야 된다"
// 어떻게? 방문한 노드에서 방문한 노드들을 제외한 주변 값들

// [문제 세분화]
// edges를 인접 리스트로 변환
// info는 그대로 사용
// 큐에 시작노드 넣기
// while 돌기
// 큐에 방문한 노드들의 주변 노드(방문 노드 제외)를 모두 넣는다. (원래는 current 주변 노드만 넣음)
// 큐 [다음 노드, sheep, wolf, visited]
// 양 <= 늑대라면 continue
// 결과 값은? 큐에서 노드를 뺄 때 Math.max(result, sheep)
function solution(info, edges) {
  // 인접 리스트 변환
  const adjacency = {};
  for (const [from, to] of edges) {
    if (!adjacency[from]) adjacency[from] = [];
    if (!adjacency[to]) adjacency[to] = [];
    adjacency[from].push(to);
  }

  // [다음 노드, sheep, wolf, visited]
  const queue = [[0, 1, 0, new Set()]];
  let answer = -Infinity;

  while (queue.length) {
    const [current, sheep, wolf, visited] = queue.shift();
    visited.add(current);

    answer = Math.max(answer, sheep);

    if (sheep <= wolf) continue;

    // 큐에 방문한 노드들의 주변 노드(방문 노드 제외)를 모두 넣는다.
    for (const v of visited) {
      for (const neighbor of adjacency[v]) {
        if (!visited.has(neighbor)) {
          if (info[neighbor] === 0)
            // visited만 보내면 참조 때문에 값을 공유하네.
            queue.push([neighbor, sheep + 1, wolf, new Set(visited)]);
          else queue.push([neighbor, sheep, wolf + 1, new Set(visited)]);
        }
      }
    }
  }

  return answer;
}

console.log(
  solution(
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
    ]
  )
);
