import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 세 가지 치킨 종류를 시킬건데 이 중 가장 높은 만족도를 구해라.

// 입력: N(회원수), M(치킨 종류수), arr(회원들의 만족도)
// 출력: int(가장 높은 만족도)

// 핵심
// 0 ~ M-1 까지의 인덱스 중 3가지를 뽑는거 => 중복된 순열

// 틀림 why? 시간 초과
// 일단 최대 input 50에 깊이 50이니까 불필요한 연산이 많이 일어남 O(50^50)

// [문제 세분화]
let [n, m] = input[0].split(" ").map(Number);
let arr = input.slice(1).map(x => x.split(" ").map(Number));

function solution(n, m, arr) {
    let ans = [];
    // M. m 중 3 개의 중복된 순열을 뽑는 함수
    const permutation = (tmp) => {
        if (tmp.length === 3) {
            // I. 모든 배열에서 이 3개 중 가장 큰걸 선택한다. => 왜 이생각을 못했지
            let sum = 0;
            for (let i = 0; i < arr.length; i++) {
                sum += Math.max(arr[i][tmp[0]], arr[i][tmp[1]], arr[i][tmp[2]]);
            }
            ans.push(sum)
            return;
        }

        for (let i = 0; i < m; i++) {
            if (tmp.includes(i)) continue;
            tmp.push(i);
            permutation(tmp);
            tmp.pop();
        }
    };

    permutation([]);
    return Math.max(...ans);
}


console.log(solution(n, m, arr));