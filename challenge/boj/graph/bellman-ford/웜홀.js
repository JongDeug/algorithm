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
// 91퍼에서 시간초과남 => 틀리긴했는데, 아마 로직은 맞는 것 같음. 일단 보류

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
        const bellmanford = (start) => {
            // I. 초기화
            const INF = 1e9;
            let distances = Array.from({ length: N + 1 }, () => INF);
            distances[start] = 0;

            // I. N 만큼 실행
            for (let j = 0; j < N; j++) {
                for (const edge of edges) {
                    let [u, v, w] = edge;

                    // I. 다른점 distances[u] !== Infinity(INF) 가 없음
                    if (distances[u] + w < distances[v]) {
                        distances[v] = distances[u] + w;
                        if (j === N - 1) return true;
                    }
                }
            }

            // console.log(distances)
            return false;
        };

        if (bellmanford(1)) ans.push("YES");
        else ans.push("NO");

    }

    return ans.join("\n");
}

console.log(solution());