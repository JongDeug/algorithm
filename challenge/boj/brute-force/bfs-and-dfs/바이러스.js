import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 네트워크가 있는데 1번 컴퓨터를 통해 감염될 수 있는 컴퓨터의 수를 구해라.

// 입력: N(컴퓨터수), S(직접 연결되어 있는 쌍의 수), MAP(그 쌍들에 대한 정보)
// 출력: int(1번을 통해 감염될 수 있는 컴퓨터 수)

// 핵심
// BFS 를 통해서 visited 에 count 를 올릴 거야

// [문제 세분화] => 틀림
let n = Number(input[0]);
let s = Number(input[1]);
let map = {};

for (const item of input.slice(2).map(x => x.split(" ").map(Number))) {
    const fromNode = item[0];
    const toNode = item[1];
    // Improve. 양방향으로 만들어야 함.
    if (!map[fromNode]) map[fromNode] = [];
    if (!map[toNode]) map[toNode] = [];
    map[fromNode].push(toNode);
    map[toNode].push(fromNode);
}

function solution(n, s, map) {
    // M. visited map
    let visited = {};
    for (let i = 1; i <= n; i++) {
        visited[i] = false;
    }

    // M. BFS 함수 구현
    const BFS = (startNode) => {
        let queue = [startNode];
        visited[startNode] = true;

        while (queue.length > 0) {
            let nextNode = queue.shift();

            // I. nextNode 방문 처리 후 돌면서 여기서 바로 true로 처리
            if (map[nextNode]) { // Improve. 런타임 에러 뜰 수 있어서 조심
                for (const item of map[nextNode]) {
                    if (!visited[item]) {
                        visited[item] = true;
                        queue.push(item);
                    }
                }
            }
        }
    };

    BFS(1);

    let ans = 0;
    for (const key in visited) {
        if (visited[key]) ans++;
    }
    return ans - 1;
}

console.log(solution(n, s, map));