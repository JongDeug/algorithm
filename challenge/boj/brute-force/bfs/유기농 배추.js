import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 배추에 따라 총 지렁이가 몇 마리 필요한지 구하는 함수를 구현해라.

// 입력: T(테스트 케이스 수), M(가로), N(세로), K(y,x 수), arr(배추 배열)
// 출력: int (총 지렁이 수), 여러 개임

// 핵심
// BFS 로 돌면서 count 를 올림. => ans 에 각 케이스에 따라 count 를 붙이면 됨 .

// [문제 세분화]
// I. splice 를 사용하는 것이 더 좋다고 생각합니다.
let t = Number(input.splice(0, 1)[0]);

function solution(t) {
    // M. ans 변수 초기화
    let ans = "";

    for (let tNum = 0; tNum < t; tNum++) {
        // I. 테스트 케이스 마다 m, n, k 받기
        let [m, n, k] = input.splice(0, 1)[0].split(" ").map(Number);

        // I. 기본 arr 초기화, visited
        let arr = Array.from({ length: n }, () => new Array(m).fill(0));
        let visited = Array.from({ length: n }, () => new Array(m).fill(false));
        let item = input.splice(0, k);
        for (let [x, y] of item.map(x => x.split(" ").map(Number))) {
            arr[y][x] = 1; // I. 에잉씨 x, y 잘 맞춰야해
        }

        // M. count 변수
        let count = 0;
        // M. 범위 체킹 해주는 함수
        const dy = [-1, 1, 0, 0];
        const dx = [0, 0, 1, -1];
        const rangeCheck = (x, y) => {
            if (x < 0 || x >= m || y < 0 || y >= n) return false;
            if (arr[y][x] === 0) return false;
            return true;
        };
        // M. BFS 함수
        const BFS = (x, y) => {
            let queue = [[x, y]];
            count++;
            visited[y][x] = true;

            while (queue.length > 0) {
                let [x, y] = queue.shift();

                for (let k = 0; k < 4; k++) {
                    let nx = x + dx[k];
                    let ny = y + dy[k];

                    if (rangeCheck(nx, ny) && !visited[ny][nx]) {
                        visited[ny][nx] = true;
                        queue.push([nx, ny]);
                    }
                }
            }
        };

        // I. row => y, col => x
        for (let row = 0; row < n; row++) {
            for (let col = 0; col < m; col++) {
                // I. visited false 이거나 arr 가 1이면 드가는 거임
                if (!visited[row][col] && arr[row][col] === 1) BFS(col, row);
            }
        }

        ans += `${count}\n`;
    }

    return ans;
}

console.log(solution(t));