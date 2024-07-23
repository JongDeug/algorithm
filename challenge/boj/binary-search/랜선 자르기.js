import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 만들 수 있는 최대 랜선의 길이를 구하는 프로그램을 작성해라.

// 입력: K(주어진 랜선 개수), N(필요한 랜선 수), arrK(랜선들)
// 출력: int 만족하는 최대 랜선 길이

// 핵심[오답]
// 1. 최대 랜선의 길이를 구해야 하므로, 주어진 랜선 중 가장 짧은 길이를 기준으로 이분탐색 해야함.
// 틀림 => 가장 긴 길이를 기준으로 이분 탐색 해야함 ㅇㅇ
// 2. 최대 랜선의 길이를 구하는 거기 때문에 middle 이 딱히 의미 없음, left 가 중요

// 틀린 부분 정리
// 1. 가장 긴 길이 기준으로 이분 탐색
// 2. [메모리 초과] => 가장 긴 길이 기준으로 하되, 굳이 배열을 만들 필요 없음.

// [문제 세분화]
function parseInput(input) {
    let [first, ...arrK] = input;
    let [K, N] = first.split(" ").map(Number);
    arrK = arrK.map(Number).sort((a, b) => a - b);
    return { K, N, arrK };
}

function solution() {
    // M. 이분 탐색 + 최대 길이 리턴할 함수 구현, 반복문으로 구현
    const binarySearch = () => {
        let [left, right] = [1, arrK[arrK.length - 1]];

        while (left <= right) {
            let middle = Math.floor((left + right) / 2);

            // I. arrB[middle] 로 뭔가를 해야해
            let remain = arrK.reduce((acc, value) => acc - Math.floor(value / middle), N);
            // I. 만들어야 하는 랜선이 남으면 => 크기를 줄여야 함
            if (remain > 0) right = middle - 1;
            // I. 만들어야 하는 랜선이 충족하면 => 크기를 늘려야 봐야함
            else left = middle + 1;
        }

        return left - 1;
    };

    let { K, N, arrK } = parseInput(input);

    return binarySearch();
}

console.log(solution());