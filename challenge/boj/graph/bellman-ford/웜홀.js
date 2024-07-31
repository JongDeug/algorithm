import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 시간이 되돌아가는 경우가 있는지 없는지 확인하는 프로그램을 구현해라.

// 입력: T(테스트 케이스), [N, M, W](도시수, 도로수, 웜홀수), arrM(도시 정보), arrW(웜홀 정보)
// 출력: YES or NO

// 조건
// 도로 방향 X
// 웜홀 방향 O

// 핵심
// 1. 원래 최단 경로를 구하려면 N-1 에서 모든 노드가 적절하게 초기화 되어야 함.
// 2. 근데 시간이 되돌아가는 경우가 있는지 없는지 확인하라고 하니까 => 음의 순환이 있는지 없는지 확인하라는 뜻.
// 3. N번째에도 distances가 초기화 되는지 벨만포드를 통해 확인하면 됨.

// 로그
// 91퍼에서 시간초과남 => 틀리긴했는데, 아마 로직은 맞는 것 같음. 일단 보류 => 해결

// 문제점: distances[u] !== INF 사용 시  => 이거 왜 사용하는지 이해가 안갔는데 해결
// 정리: 문제 자체에서 시작 노드를 정해주지 않았고, 그냥 음의 순환이 있는지 판별하는거임
// 1. 시작노드를 정하고 돌린다면 당연히 지금 갈 수 없는 노드는 distances[u] !== INF 로 걸러야되는 것이 맞음.
// 2. 하지만 이 문제는 시작노드를 정하는 것이 중점이 아님. 단지 음의 순환만 판별하는 문제.
// 3. 즉, 시작노드를 정하지 않고, 아직 도달할 수 없는 노드"도" 다 초기화 해야한다는 의미.

// CHAT GPT 답변]
// 초기화된 큰 숫자(INF)의 문제:
//     알고리즘에서 distances[u]가 INF로 초기화되어 있으면, distances[u]가 INF인 경우는 아직 도달할 수 없는 노드를 의미합니다.
//     그러나, 벨만-포드 알고리즘의 경우, 특정 노드까지의 경로가 없다고 해서 바로 무시해 버리면, 음의 사이클의 영향을 제대로 확인할 수 없습니다. 예를 들어, 만약 노드 u가 다른 노드로부터 갱신되기 전에 이미 INF로 설정되어 있는 경우, 그 노드가 음의 사이클의 일부일 수 있음을 놓칠 수 있습니다.
//     경로 업데이트의 중요성:
//     distances[u] !== INF를 조건으로 사용하면, INF로 초기화된 노드는 업데이트되지 않을 가능성이 높습니다.
//     음의 사이클을 탐지하기 위해서는 모든 간선을 반복적으로 검사하여 거리 값을 갱신하고, 만약 거리 값이 계속해서 업데이트 된다면 음의 사이클이 존재한다고 판단할 수 있습니다. 이때 INF 체크는 필요 없습니다.
//     올바른 접근 방식
// 모든 간선의 검토: distances[u]가 INF인지 확인하지 않고, 모든 간선을 검사하여 distances[u]와 distances[v]를 비교하여 갱신을 시도해야 합니다.
//     음의 사이클 탐지: N번째 반복에서 거리 값이 갱신되는지 확인하여 음의 사이클이 존재하는지 여부를 판단합니다.

// [문제 세분화]
function solution() {
    // I. 입력 받기
    let T = Number(input.splice(0, 1).toString());
    let ans = [];

    for (let i = 0; i < T; i++) {
        let [N, M, W] = input.splice(0, 1).toString().split(" ").map(Number);
        let edges = [];
        // I. arrM, 도로 양방향
        input.splice(0, M).forEach(edge => {
            let [u, v, w] = edge.split(" ").map(Number);
            edges.push([u, v, w]);
            edges.push([v, u, w]);
        });
        // I. arrW, 웜홀 단방향
        input.splice(0, W).forEach(edge => {
            let [u, v, w] = edge.split(" ").map(Number);
            edges.push([u, v, -w]);
        });

        // I. 벨만포드 구현
        const bellmanford = () => {
            // I. 초기화
            const INF = 1e9;
            let distances = Array.from({ length: N + 1 }, () => INF);

            // I. N 만큼 실행
            for (let j = 0; j < N; j++) {
                for (const edge of edges) {
                    let [u, v, w] = edge;

                    // I. 다른점 distances[u] !== Infinity(INF) 가 없음
                    // Q. 근데 위 구문이 있었을 때 왜 틀린건지 잘모르겠음
                    if (distances[u] + w < distances[v]) {
                        distances[v] = distances[u] + w;
                        if (j === N - 1) return true;
                    }
                }
            }

            return false;
        };

        if (bellmanford()) ans.push("YES");
        else ans.push("NO");

    }

    return ans.join("\n");
}

console.log(solution());