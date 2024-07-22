import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 수 찾기와 똑같은 문제, 주어진 수가 있는지 없는지 출력하는 함수를 구현하라.

// 입력: T, N, arrN, M, arrM
// 출력: 0 or 1

function parseInput(input) {
    let N = Number(input.splice(0, 1));
    let arrN = input.splice(0, 1).toString().split(" ").map(Number);
    let M = Number(input.splice(0, 1));
    let arrM = input.splice(0, 1).toString().split(" ").map(Number);
    arrN.sort((a, b) => a - b);
    return { arrN, arrM };
}

function solution() {
    let ans = [];

    // M. 이분 탐색 구현 => 재귀로 구현해보기
    const binarySearch = (arr, start, end, num) => {
        let middle = Math.floor((start + end) / 2);
        // I. Base Case : start, end 넘어서면 종료
        if (start > end) return 0;

        // I. main
        if (arr[middle] === num) return 1;
        else if (arr[middle] > num) return binarySearch(arr, start, middle - 1, num);
        else return binarySearch(arr, middle + 1, end, num);
    };

    // I. main logic
    let T = Number(input.splice(0, 1));
    for (let i = 0; i < T; i++) {
        let { arrN, arrM } = parseInput(input);

        arrM.forEach(x => {
            ans.push(binarySearch(arrN, 0, arrN.length - 1, x));
        });
    }

    return ans.join("\n");
}

console.log(solution());