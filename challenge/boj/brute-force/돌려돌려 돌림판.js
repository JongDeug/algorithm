import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n").map(x => x.split(" "));

// [문제 이해하기]
// 주어진 조건(X,Y)에 대해서 게임을 승리할 수 있는 가지수를 구해라.

// 입력:
// T(테케 개수),
// N(돌림판 n등분), M(X, Y 총 자릿수)
// X(0~9)
// Y(0~9)
// arr(돌림판)
// 출력: 게임을 승리할 수 있는 가지수(단, 같은 수라도 시작 부분이 다르다면 다른 가지수로 셈)

// 핵심
// 시작점에서 M만큼 가져온다. 0 ~ 2 or 2 ~ 4 ... (0에서 n-1까지) => 중복없는 순열
// 순열을 가져와 join해서 X Y 범위 안에 들어가는지?

// [문제 세분화]
let t = input[0];

function solution(input) {
    let ans = [];
    let answer = "";
    // M. 테스트 케이스 수
    let t = input[0];

    // M. 순열 구하는 함수
    const permutation = (n, x, y, arr) => {
        // I. BASE CASE

        // I. Logic
    };

    // I. 테스트 케이스를 받아 돌리기
    for (let i = 0; i < t; i++) {
        let [n, m] = input[i * 4 + 1].map(Number);
        let x = Number(input[i * 4 + 2].join(""));
        let y = Number(input[i * 4 + 3].join(""));
        let arr = input[i * 4 + 4].map(Number);
        // I. 로직 실행
        permutation(n, x, y, arr);
    }

    ans.forEach(x => answer += `${x}\n`);
    return answer;
}

console.log(solution(input));