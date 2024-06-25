import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "./testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 섬의 개수를 구하는 함수를 구현해라.

// 입력: w,h(너비 col, 높이 row), arr(지도), 마지막줄은 0,0
// 출력: int(각 테스트 케이스의 섬의 개수)

// 핵심
// 1. DFS, BFS 중 BFS 선택!
// 2. 테스트 케이스마다 입출력 관리
// 3. 지도에 섬을 루프, visited 에 섬 개수를 출력하면 될듯함!

// 풀었는데 좀 정리가 필요함.
// 앞으로 풀 때 좌표가 나온다면 ??

// [문제 세분화] : 리팩토링
function parseInput(input) {
    let [colLen, rowLen] = input.splice(0, 1)[0].split(" ").map(Number);
    let arr = input.splice(0, rowLen).map(x => x.split(" ").map(Number));
    return { colLen, rowLen, arr };
}

function solution() {
    let ans = "";

    // M. 8방향 dy, dx 상 하 좌 우 왼위 왼아 오위 오아
    const dy = [-1, 1, 0, 0, -1, 1, -1, 1];
    const dx = [0, 0, -1, 1, -1, -1, 1, 1];
    // M. range check
    const checkRange = (arr, x, y) => {
        if (x < 0 || x >= arr[0].length || y < 0 || y >= arr.length) return false;
        if (arr[y][x] === 0) return false;
        return true;
    };
    // M. BFS 함수
    const BFS = (arr, visited, x, y) => {
        const queue = [[x, y]];
        visited[y][x] = true;

        while (queue.length > 0) {
            const [x, y] = queue.shift();

            // I. 8방향
            for (let i = 0; i < 8; i++) {
                const nx = x + dx[i];
                const ny = y + dy[i];
                // I. 방문하지 않았고 return true 일 경우
                if (checkRange(arr, nx, ny) && !visited[ny][nx]) {
                    visited[ny][nx] = true;
                    queue.push([nx, ny]);
                }
            }
        }
    };

    while (true) {
        let { colLen, rowLen, arr } = parseInput(input);
        let visited = Array.from({ length: rowLen }, () => new Array(colLen).fill(false));
        let count = 0;
        // I. 0,0 이면 종료
        if (colLen === 0 && rowLen === 0) break;

        // I. 중첩 for, 1(land) 이면 BFS
        for (let row = 0; row < rowLen; row++) { // y
            for (let col = 0; col < colLen; col++) { // x
                if (arr[row][col] === 1 && !visited[row][col]) {
                    BFS(arr, visited, col, row);
                    count++;
                }
            }
        }

        // I. ans 에 추가
        ans += `${count}\n`;
    }
    return ans;
}

console.log(solution());