import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 상근이가 적어도 필요한 만큼 나무를 가져가려한다. 이때 설정한 절단기 높이를 반환하는 함수를 구현해라.

// 입력: N(나무 수), M(필요한 나무 길이), arrN(나무 길이 정보들)
// 출력: int(절단기 높이)

// [구체적인 예시 찾기]
/**
 * 4 9
 * 20 15 10 17
 * => 14
 */

// [문제 세분화]
function parseInput(input) {
    let [N, M] = input[0].split(" ").map(Number);
    let arrN = input[1].split(" ").map(Number);

    return { M, arrN };
}

function solution() {
    // I. 입력 받기
    let { M, arrN } = parseInput(input);

    // I. 가장 긴 나무 길이 기준으로 이분 탐색
    // M. 이분 탐색 구현
    const binarySearch = () => {
        let [left, right] = [1, Math.max(...arrN)];

        while (left <= right) {
            let middle = Math.floor((left + right) / 2);

            let sum = arrN.reduce((acc, v) => {
                // I. 절단기보다 짧으면 pass
                // I. 절단기보다 길면 자르기
                if (v > middle) acc += (v - middle);
                return acc;
            }, 0);
            // console.log(middle, sum)

            //  I. 절단기로 자른 나무의 길이 합이 M 보다 크면 => 충족하므로 크기를 늘려야 함 (left, 절단기 길이를 높여야, 적어도 필요한 만큼 가져갈 수 있음)
            //  I. 절단기로 자른 나무의 길이 합이 M 보다 작으면 => 충족하지 못하니까 크기를 줄여서 충족하게 만들어야 (right)
            if (sum >= M) left = middle + 1;
            else if (sum < M) right = middle - 1;
        }
        return left - 1;
    };

    return binarySearch();
}

console.log(solution());