import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 5곱5 숫자판을 돌면서 서로 다른 6자리 수들의 개수를 구하는 함수를 구현해라.

// 입력: arr(5*5 행렬)
// 출력: int(만들 수 있는 수들의 개수)

// 조건
// 1. 이미 지나온 칸을 다시 한 번 거쳐도 됨.
// 2. 어디서든 시작해도 됨 => for for 안에 로직 함수가 들어가는거지

// [문제 세분화]
let arr = input.map(x => x.split(" ").map(Number));

function solution(arr) {
    // M. 상하좌우
    const dx = [0, 0, 1, -1];
    const dy = [-1, 1, 0, 0];
    // M. 범위 재정렬
    const arrangeCoor = (x, y) => {
        if (x < 0 || x >= arr[0].length || y < 0 || y >= arr.length) return false;
        else return true;
    };
    let ans = [];

    // M. 미로 탐색 로직 함수
    const dfs = (x, y, tmp) => {
        // I. Base Case
        if (tmp.length === 6) {
            // I. 없을 때만 넣기
            let str = [...tmp].join("");
            if (!ans.includes(str)) ans.push(str);
            return;
        }

        tmp.push(arr[y][x]);
        for (let k = 0; k < 4; k++) {
            if (arrangeCoor(x + dx[k], y + dy[k])) dfs(x + dx[k], y + dy[k], tmp);
        }
        tmp.pop();
    };


    // I. 이중 for 문, i => y, j => x
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
            dfs(j, i, []);
        }
    }

    return ans.length;
}

console.log(solution(arr));