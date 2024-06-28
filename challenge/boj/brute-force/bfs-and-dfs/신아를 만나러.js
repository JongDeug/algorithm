import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 주인공이 웅덩이를 밟지 않고 도착지까지 갈 수 있는 최소 거리를 구하는 함수를 구현해라.

// 입력: X, Y(도착 위치) , N(웅덩이 개수) , arr(웅덩이 위치)
// 출력: int(최소 거리)

// 조건
// 1. 시작 위치 (0, 0)

// 핵심
// 1. 최소 거리 => BFS
// 2. 지도 좌표 계산 500 => 1000

/** 다 틀렸어 ;;;;
 //  2-1. 받은 웅덩이 가장 작은 x,y | 가장 큰 x,y ++++ 한 칸 띄워줘야 함.
 //  2-2. 만약 가장 작은 x,y 가 0보다 크면 0 기준
 //  2-3, 만약 가장 큰 x,y 가 0보다 작으면 0 기준
 // 3. 다 구했으면 arr 를 만들어야 함.
 //  3-1. x 길이가 만약 8이라 가정하면 -2는 2-2=0, 5는 2+5=7
 */

// [문제 세분화]
let [first, ...pools] = input;
let [x, y, n] = first.split(" ").map(Number);
let arr = Array.from({ length: 1001 }, () => new Array(1001).fill("."));
pools.forEach(coord => {
    let [x, y] = coord.split(" ").map(Number);
    arr[500 - y][500 + x] = "P";
});
arr[500 - y][500 + x] = "E";

function solution() {
    // M. dy, dx, 범위 체크
    const dx = [0, 0, -1, 1];
    const dy = [-1, 1, 0, 0];
    const checkRange = (x, y) => {
        if (x < 0 || x >= 1001 || y < 0 || y >= 1001) return false;
        return arr[y][x] !== "P";
    };
    // M. BFS 구현
    const BFS = (x, y) => {
        let queue = [[x, y]];
        let visited = Array.from({ length: 1001 }, () => new Array(1001).fill(0));
        visited[y][x] = 1;

        while (queue.length) {
            let [x, y] = queue.shift();

            // I. 멈추기
            if (arr[y][x] === "E") {
                return visited[y][x] - 1;
            }

            for (let k = 0; k < 4; k++) {
                let nx = x + dx[k];
                let ny = y + dy[k];
                if (checkRange(nx, ny) && !visited[ny][nx]) {
                    visited[ny][nx] = 1 + visited[y][x]; // 이렇게 구현해야 넣을 수 ㅣㅇㅆ음
                    queue.push([nx, ny]);
                }
            }
        }
    };

    // I. 최소거리 반환
    return BFS(500, 500);
}

console.log(solution());
