import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 중량이 500 이상이 되도록하는 경우의 수 구하는 함수를 구현해라.

// 입력: N(운동키트수), K(중량감소량), arr(중량 증가량)
// 출력: int(경우의 수)

// 핵심
// 1. N이 8이하이므로 8*8 => 시간복잡도로 중복이 없는 순열을 구해야하네
// 2. . 이 때 몇몇 운동 키트들의 중량 증가량이 같을 수 있으나, 서로 다른 운동 키트로 간주한다. => 인덱스로 관리해야된다는 뜻

// [문제 세분화]
let [n, k] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);

function solution(n, k, arr) {
    let count = 0;
    // M. 중복없는 순열을 구하는 함수
    const permutation = (tmp) => {
        if (tmp.length === n) {
            // I. 500 중량 check => 순서대로 가다가 500 이하가 되면 x
            let start = 500;
            let countUp = true;

            for (const idx of [...tmp]) {
                start += (arr[idx] - k);
                if (start < 500) {
                    countUp = false;
                    break;
                }
            }

            if (countUp) count++;
            return;
        }

        for (let i = 0; i < n; i++) {
            if (tmp.includes(i)) continue;
            tmp.push(i);
            permutation(tmp);
            tmp.pop();
        }
    };

    permutation([]);
    return count;
}

console.log(solution(n, k, arr));