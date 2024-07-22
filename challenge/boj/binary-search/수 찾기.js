import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 주어진 수가 배열에 있는지 없는지 찾는 함수를 구현해라.

// 입력: N, arrN, M, arrM
// 출력: arrM 만큼 0 or 1

// 핵심
// 1. 100,000 이 주어지니까 O(n) 으로 풀 수 없음 => O(logN) 이분 탐색으로 풀어야 함.

// [문제 세분화]
function parseInput(input) {
    let [first, second, third, forth] = input;
    let arrN = second.split(" ").map(Number);
    let arrM = forth.split(" ").map(Number);
    arrN.sort((a, b) => a - b);
    return { arrN, arrM };
}

function solution() {
    let ans = [];
    let { arrN, arrM } = parseInput(input);

    // M. 이분 탐색 함수 구현 (반복문으로 구현)
    const binarySearch = (num) => {
        let [left, right] = [0, arrN.length - 1];
        // I. arrN.length - 1 을 하지 않으면 left 랑 right 랑 계속 같아지니까 무한 루프에 걸림, right 는 인덱스를 뜻하는 거임

        while (left <= right) {
            let middle = Math.floor((left + right) / 2);

            if (arrN[middle] === num) return 1;
            else if (arrN[middle] > num) right = middle - 1;
            else if (arrN[middle] < num) left = middle + 1;
        }

        return 0;
    };

    // I. main logic => O(N * logN)
    arrM.forEach(x => {
        ans.push(binarySearch(x));
    });

    return ans.join("\n");
}

console.log(solution());