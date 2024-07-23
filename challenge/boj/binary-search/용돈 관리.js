import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 생활비 하루하루 쓰는데 정해진 인출 횟수에 맞게 뽑을 수 있는 최소 용돈 금액을 반환해라.

// 입력: N(일수), M(인출 횟수), arrN(일수에 맞는 생활비 배열)
// 출력: int(인출 횟수에 맞는 최소 용돈 금액)

// 고민했던 것
// 1. 일부러 M번 맞추기 위해 하루 생활비를 쓸 수 있는 남은 금액이 있더라도 저금통에 넣고 뽑을 수 있다.
// ==> 이것 때문에 많이 고민했음
// ==> 해결 : 일부러 M번 맞추기 위해 저금통에 넣어도 그보다 작은 최소가 존재하기 때문에 걱정할 필요 없음.

// [구체적인 예시]
/**
 * 7 6
 * 100
 * 400
 * 300
 * 100
 * 499
 * 101
 * 400
 * => 499, (500 으로도 되지만 최소 x)
 */

// [문제 세분화]
function parseInput(input) {
    let [first, ...arrN] = input;
    let [N, M] = first.split(" ").map(Number);
    arrN = arrN.map(Number);

    return { M, arrN };
}

function solution() {
    // I. 입력 받기
    let { M, arrN } = parseInput(input);

    // M. 이분 탐색 구현
    const binarySearch = () => {
        // I. 1 ~ 생활비 다 더한 값 까지 이분 탐색 돌리기
        let [left, right] = [1, arrN.reduce((acc, v) => acc + v, 0)];

        while (left <= right) {
            let middle = Math.floor((left + right) / 2);

            //  I. 임의 값(middle)으로 인출 count 구하기
            let withdrawal = middle;
            let count = arrN.reduce((acc, v) => {
                if (v > middle) return NaN; // 크기 늘려야 함

                if (withdrawal < v) {
                    withdrawal = middle;
                    acc++;
                }
                withdrawal -= v;
                return acc;
            }, 1);
            //      i. count 가 M 보다 작으면 => 금액이 크다는 뜻, 크기를 줄여야 (right)
            if (count < M) right = middle - 1;
            //      i. count 가 M 보다 크거나 같으면 => 금액이 작다는 뜻, 크기를 늘려야 (left)
            else left = middle + 1;
        }
        return left - 1;
    };

    return binarySearch();
}

console.log(solution());