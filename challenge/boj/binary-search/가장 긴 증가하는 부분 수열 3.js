import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기] : 못품 **********
// 주어진 수열에서 가장 긴 증가하는 부분 수열의 길이를 반환해라.

// 입력: N(수열 크기), arrN(수열 정보)
// 출력: int(가장 긴 증가하는 부분 수열)

// 핵심
// 1. DP 로는 시간 복잡도 때문에 풀 수 없음
// 2. 이분 탐색으로 풀어야 함
// 3. 이분 탐색에서 주어진 값이 임의의 어떤 배열에 있는 값보다 작아야 하므로(최소 느낌이지) right 를 통해 다뤄야 함.

// [참고 사이트]
// https://velog.io/@junttang/BOJ-12015-%EA%B0%80%EC%9E%A5-%EA%B8%B4-%EC%A6%9D%EA%B0%80%ED%95%98%EB%8A%94-%EB%B6%80%EB%B6%84-%EC%88%98%EC%97%B4-2-%ED%95%B4%EA%B2%B0-%EC%A0%84%EB%9E%B5-C

// [문제 해결 절차]
// ex) 10 20 30 15 20 25 50 45 55 60
// 1. 10, 20, 30 => 처럼 쭉 넣다가 15 차례임. 가장 마지막 원소보다 작기 때문에 "원소 중 가장 차이가 나지 않으면서 더 큰 놈" 에 넣어야 함.
// 2. 10, 15, 30
// 3. 10, 15, 20
// 3. 10, 15, 20, 25 ...

// [문제 세분화]
function parseInput(input) {
    let N = Number(input[0]);
    let arrN = input[1].split(" ").map(Number);
    return { arrN, N };
}

function solution() {
    // I. 입력 받기
    let { arrN, N } = parseInput(input);
    let ans = [];

    // M. 이진 탐색
    const binarySearch = (num) => {
        let [left, right] = [0, ans.length - 1];

        while (left <= right) {
            let middle = Math.floor((left + right) / 2);

            if (ans[middle] === num) return middle;
            // I. 만약 middle 보다 작으면 크기 줄이기
            if (ans[middle] > num) right = middle - 1;
            // I. 크면 left 늘리기
            else left = middle + 1;
        }
        return right + 1;
    };

    // I. 루프
    for (const [index, item] of Object.entries(arrN)) {
        if (index === "0") ans.push(item);
        //      i. 만약 이전 값보다 크면 ans 배열에 넣기
        else if (item > ans[ans.length - 1]) ans.push(item);
        //      i. 만약 이전 값보다 작으면 이진 탐색을 통해서 넣어야할 인덱스 구하기
        else {
            let i = binarySearch(item);
            ans[i] = item;
        }
    }

    // I. ans 배열 반환
    return ans.length;
}

console.log(solution());