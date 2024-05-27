import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const filePath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "/testcase.txt");
const input = fs.readFileSync(filePath).toString().trim().split("\n");

// [문제 이해하기]
// 주어진 조건에 맞게 단어 정렬하기

// 입력: int(단어 개수), array of string(단어)
// 출력: 정렬된 단어

// 조건
// 1. 길이가 짧은 것 부터
// 2. 길이가 같으면 사전 순으로
// 3. 중복된 단어는 하나만 남기고 제거

// [문제 세분화]
function solution(n, arr) {
    let bucket = [];

    arr.sort((a, b) => {
        if (a.length < b.length) return -1;
        else if (a.length > b.length) return 1;
        else {
            // I. 길이가 같으면 사전 순으로
            if (a < b) return -1;
            else if (a < b) return 1;
            return 0;
        }
    });

    arr.forEach(e => {
        // I. 중복 제거
        if (!bucket.includes(e)) {
            bucket.push(e);
            console.log(e);
        }
    });
}

solution(input[0], input.slice(1));