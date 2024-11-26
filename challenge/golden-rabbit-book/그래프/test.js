// [문제 이해하기]
// 벨만-포드 알고리즘 구현

// [입력]: 3차원 배열 [[0번 노드 정보], [1번 노드 정보], [3번 노드 정보]], int(시작노드)
// [출력]: 최단 거리를 담은 distance 배열, 최단 거리와 함께 관리할 직전 노드 predecessor 배열
// 음의 사이클이 있으면 [-1] 반환

// [접근법]
// 다익스트라, 벨만-포드: 시작 노드에서 모든 노드의 최단 경로를 구하는 알고리즘
// 다익스트라: 시작 노드에서 인접 노드의 간선을 우선 순위 큐에 넣어 해결
// 벨만-포드: 시작 노드를 0으로 초기화 하고 노드 길이를 기준으로 모든 간선을 체킹해 해결함

// [고민했던거]
// 뭘 기준으로 도냐? -> 노드 기준 x -> 노드의 길이 기준 o, 인덱스 기준
// 돌긴 도는데 시작 기준의 인접한 간선만 체킹해? 아니면 진짜 모든 간선을 체킹해? => 모든 간선, 그러기 위해서 distance를
// INFINITY로 초기화하는 과정을 거쳐야 함.

// [문제 세분화]
// distance, predecessor 초기화
// for문 노드의 길이만큼 돈다.
//  모든 간선을 돌면서
//      (distance[목표지점] > distance[출발지점] + 가중치) 라면
//      distance, predecessor 초기화
//      노드의 마지막 길이에 도달했는데도 초기화가 된다면 음의 사이클이 있음 [-1] 반환
function solution(graph, source) {
  const n = graph.length;
  const distance = Array.from({ length: n }, () => Infinity);
  const predecessor = Array.from({ length: n }, () => null);
  // 간선 예쁘게 만들기
  const edges = graph.map((x, i) => x.map((y) => [i, ...y])).flat();

  distance[0] = 0;

  const bell = () => {
    // n-1, n
    for (let i = 1; i <= n; i++) {
      // 모든 간선을 돈다
      for (const [from, to, weight] of edges) {
        const candidate = distance[from] + weight;
        if (candidate < distance[to]) {
          if (i === n) return false;
          distance[to] = candidate;
          predecessor[to] = from;
        }
      }
    }

    return true;
  };

  return bell() ? [distance, predecessor] : [-1];
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
    0
  )
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
    0
  )
);
