import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const filePath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "/testcase.txt");
const input = fs.readFileSync(filePath).toString().trim().split("\n");

function solution(W, K) {
    W.sort((a, b) => Number(b) - Number(a));
    K.sort((a, b) => Number(b) - Number(a));
    let sumW = Number(W[0]) + Number(W[1]) + Number(W[2]);
    let sumK = Number(K[0]) + Number(K[1]) + Number(K[2]);

    console.log(sumW, sumK);
}

solution(input.slice(0, 10), input.slice(10));