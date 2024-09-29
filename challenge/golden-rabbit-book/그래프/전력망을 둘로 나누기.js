// [문제 이해하기]
// 송전탑(노드), 전선(간선) 이 주어지는데 전선을 한 개 끊어서
// 송전탑이ㅡ 개수를 최대한 비슷하게 맞췄을 때 그 차이를 반환하는 함수를 구현해라.
//
//
// [문제 세분화]
function solution(n, wires) {
  let answer = [];

  // I. 간선을 모두 끊는다.
  for (let i = 0; i < wires.length; i++) {
    // I. 끊은 간선을 저장하고
    const [u, v] = wires[i];
    const copyWires = [...wires];
    copyWires.splice(i, 1);
    // I. 인접 리스트 초기화
    const adjacencyList = Array.from({ length: n + 1 }, () => []);
    for (const [from, to] of copyWires) {
      adjacencyList[from].push(to);
      adjacencyList[to].push(from);
    }

    // I. DFS 로 돌리면 된다.
    const DFS = (node, visited) => {
      visited.add(node);

      for (const neighbor of adjacencyList[node]) {
        if (!visited.has(neighbor)) {
          DFS(neighbor, visited);
        }
      }

      return visited.size;
    };

    const size1 = DFS(u, new Set());
    const size2 = DFS(v, new Set());

    answer.push(Math.abs(size1 - size2));
  }

  return Math.min(...answer);
}

console.log(
  solution(9, [
    [1, 3],
    [2, 3],
    [3, 4],
    [4, 5],
    [4, 6],
    [4, 7],
    [7, 8],
    [7, 9],
  ]),
);
