import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const filePath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "/testcase.txt");
const input = fs.readFileSync(filePath).toString().trim().split("\n");

function solution(n, arr) {
    let answer = "";
    arr.sort((a, b) => Number(a) - Number(b));
    arr.forEach((item, i) => {
        if (i !== arr.length - 1) {
            answer += `${item}\n`;
        } else {
            answer += item;
        }
    });
    return answer;
}

console.log(solution(input[0], input.slice(1)));