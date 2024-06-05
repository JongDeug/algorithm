import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 주어진 수열의 부분 수열 중 합이 S가 되는 경우의 수를 출력해라.

// 입력: N(숫자 개수), S(합의 정수), arr(주어진 숫자들)
// 출력: int(더해서 S가 되는 경우의 수)

// 핵심:
// 부분 수열을 구하는 로직을 구현해야 함. => 부분 집합 구할 때 사용했었지?!

let [n, s] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);

function solution(n, s, arr) {
    let ans = 0;
    const subPermutation = (depth, tmp) => {
        if (depth === n) {
            // console.log([...tmp])
            // console.log([...tmp].reduce((acc, value) => acc + value, 0));
            if ([...tmp].reduce((acc, value) => acc + value, 0) === s) ans += 1;
            return;
        }

        tmp.push(arr[depth]);
        subPermutation(depth + 1, tmp);
        tmp.pop();

        // depth 올리는 용도
        subPermutation(depth + 1, tmp);
    };

    subPermutation(0, []);
    return ans - (s === 0 ? 1 : 0);
}


console.log(solution(n, s, arr));