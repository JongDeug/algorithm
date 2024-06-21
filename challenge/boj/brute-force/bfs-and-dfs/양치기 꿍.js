import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 빈공간 '.', 울타리 '#', 늑대 'v', 양 'k' 라고 했을 때 몇 마리의 양과 늑대가 살아남을지 계산해라.

// 입력: R,C(행 길이, 열 길이), arr
// 출력: int int(양, 늑대)

// 조건
// 1. 울타리로 막히지 않은 영역에는 양과 늑대가 없다.
// 2. 양과 늑대는 대각선으로 이동할 수 없다.
// 3. 울타리 안의 양들의 숫자가 늑대보다 많으면 이김

// 막힌 지점
// 1. 막힌 울타리 영역을 어떻게 구하지 ??
// 2. BFS 로 구현했는데 방문했다고 체킨하는 구문을 어디에 위치 시켜야 하지?

// [문제 세분화]
let [r, c] = input[0].split(" ").map(Number);
let arr = input.slice(1).map(x => x.split(""));

function solution(r, c, arr) {
    // M. answer
    let [sheepNum, wolfNum] = [0, 0];
    // M. 4방향 상하좌우
    const dy = [-1, 1, 0, 0];
    const dx = [0, 0, -1, 1];
    // M. visited
    let visited = Array.from({ length: r }, (v, i) => new Array(c).fill(false));
    // M. 좌표가 유효한지 체크하는 함수
    const validCoordinate = (y, x) => {
        // 벽과 벗어난 좌표가 아니라면 true
        if (x < 0 || x >= c || y < 0 || y >= r) return false;
        if (arr[y][x] === "#") return false;
        return true;
    };
    // M. BFS 함수 구현(반복문)
    const bfs = (y, x) => {
        // I. queue 에 좌표 삽입
        let queue = [[y, x]];
        let [sheep, wolf] = [0, 0];
        visited[y][x] = true;

        while (queue.length > 0) {
            // I. 좌표 Get
            let [y, x] = queue.shift();

            if (arr[y][x] === "v") wolf++;
            else if (arr[y][x] === "k") sheep++;

            for (let k = 0; k < 4; k++) {
                let [ny, nx] = [y + dy[k], x + dx[k]];
                // I. 다음 좌표가 유효하면, 방문하지 않았다면
                // I. 와우.. 여기 조심!
                // # . #
                // # k .
                // # . v  => 이 예제를 유심히 보셈
                if (validCoordinate(ny, nx) && !visited[ny][nx]) {
                    // I. 여기서 꼭 방문했다고 표시해줘야함.
                    visited[ny][nx] = true;
                    queue.push([ny, nx]);
                }
            }
        }

        // I. 양이 늑대보다 더 많으면 wolf 없엠, 그게 아니면(늑대가 양이랑 같거나 많으면) sheep 없엠
        if (sheep > wolf) wolf = 0;
        else sheep = 0;

        return [sheep, wolf];
    };

    // I. 양, 늑대를 찾아서 BFS, DFS 로 돌려뿌면됨, row => y, col => x
    for (let row = 0; row < r; row++) {
        for (let col = 0; col < c; col++) {
            // I. 양, 늑대, 방문하지 않았을 때
            if ((arr[row][col] === "v" || arr[row][col] === "k") && !visited[row][col]) {
                let [sheep, wolf] = bfs(row, col);
                sheepNum += sheep;
                wolfNum += wolf;
            }
        }
    }

    return `${sheepNum} ${wolfNum}`;
}

console.log(solution(r, c, arr));