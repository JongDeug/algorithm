import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath =
  process.env.USERNAME !== "jongdeug"
    ? "/dev/stdin"
    : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 1번 도시에서부터 나머지 도시로 가는 최단 시간을 구해라. 음의 시간이 존재할 수 있다.

// 입력: N(도시 수), M(버스 노선의 수), arrM[A, B, C](시작, 도착, 시간)
// 출력: int(1에서 N까지 가는 가장 빠른 시간), 음의 순환이 있다면 -1, 해당 도시로 가는 경로가 없다면 -1

// 핵심
// 1. 음의 가중치 => 벨만포드가 잘 구할 수 있음. (다익도 구할 수 있음 1-1)
//  1-1. [다익스트라] 무조건 음의 가중치가 있다고해서 다익스트라가 작동하지 않는 것이 아님 => 음수 간선의 순환이 있으면 작동 X, 판별 X
//  1-2. [벨만포드] 음수 간선 순환이 있으면 최단 경로를 구하지 못하지만, 음수 간선 순환이 있는지 없는지는 판별할 수 있음.
// 2. 그래프에 음의 순환이 있을 때, 어떤 알고리즘도 최단 경로를 구할 수 없다.
// 3. 벨만포드 시간 복잡도 O(V*E)

// [문제 세분화]
function parseInput(input) {
  let [first, ...edges] = input;
  let [N, M] = first.split(" ").map(Number);
  edges = edges.map((edge) => edge.split(" ").map(Number));
  return { N, edges };
}

function solution() {
  // I. 입력 받기
  let { N, edges } = parseInput(input);
  let distances = Array.from({ length: N + 1 }, () => Infinity);
  let ans = [];

  // M. 벨만포드 알고리즘 구현
  const bellmanford = () => {
    // I. 초기화
    distances[1] = 0;

    // I. N번 실행(노드 개수만큼 실행)
    for (let i = 0; i < N; i++) {
      // I. 모든 간선의 가중치 확인
      for (const edge of edges) {
        let [u, v, w] = edge;
        // Q. 의문점 : distances[u] !== Infinity 이게 과연 필요할까? => 사실상 필요없지
        if (distances[u] !== Infinity && distances[u] + w < distances[v]) {
          distances[v] = distances[u] + w;
          // I. 만약 N번 실행되면 음의 순환이 있는 것임. (0부터 시작이니까 N-1이 N번 실행된거임)
          if (i === N - 1) return true;
        }
      }
    }
    return false;
  };

  let flag = bellmanford();
  if (flag) {
    ans.push(-1);
  } else {
    distances.forEach((value, index) => {
      if (index > 1) {
        if (value !== Infinity) ans.push(value);
        else ans.push(-1);
      }
    });
  }

  // console.log(distances)
  return ans.join("\n");
}

console.log(solution());

