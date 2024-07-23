import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 국가 예산을 알아서 잘 배정해라.

// 입력: N(지방 수), arrN(국가 예산들), M(총 예산)
// 출력: int(최댓값 상한선)

// [구체적인 예시 찾기]
/**
 * 4
 * 100, 100, 90, 80
 * 400
 * => 100
 *
 * 4
 * 100, 100, 90, 80
 * 360
 * => 95
 */

// [문제 세분화하기]
function parseInput(input) {
    let arrN = input[1].split(" ").map(Number);
    let M = Number(input[2]);

    return { arrN, M };
}

function solution() {

    // M. 이분 탐색 구현
    const binarySearch = () => {
        // I. 국가 예산 중 가장 큰 값을 골라서 이분 탐색
        let [left, right] = [1, Math.max(...arrN)];

        while (left <= right) {
            let middle = Math.floor((left + right) / 2);

            // I. 고른 값(임시 상한선)
            //      i. 고른 값이 각 예산보다 크면 해당 예산을 총 예산에서 뺌
            //      i. 고른 값이 각 예산보다 작으면 그대로 고른 값을 총 예산에서 뺌
            let remain = arrN.reduce((acc, v) => {
                if (v < middle) acc -= v;
                else if (v >= middle) acc -= middle;
                return acc;
            }, M);

            // I. 이분 탐색
            //      i. 계산 후 총 예산이 0보다 작으면 => 초과한다는 뜻이므로 크기 줄이기
            //      i. 계산 후 총 예산이 0보다 크면 => 남는다는 뜻이므로 크기 늘리기
            //      i. 루프에서 빠져나오면 그 값이 원하는 값
            if (remain >= 0) left = middle + 1;
            else if (remain < 0) right = middle - 1;
        }

        return left - 1;
    };

    // I. 입력 받기
    let { arrN, M } = parseInput(input);

    return binarySearch();
}

console.log(solution());