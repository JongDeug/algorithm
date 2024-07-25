import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 주어진 연결 선을 서로 꼬이지 않게 가장 많이 연결할 수 있는 수를 알아내는 프로그램을 구현해라.

// 입력: N(포트 수), arrN(각 인덱스에 맞게 연결되어야 할 포트 번호들)
// 출력: int(최대 연결 수)

// 핵심 => **오류가 있음**
// 1. 차례로 배열에 넣는다.
// 2. 만약 배열의 원소보다 작은 경우가 나오면 ?
//      2-1. 배열에 있는 원소 길이보다 arrN에 남아있는 애들이 더 길다? ==> 교체 (그 뒤 인덱스들은 초기화)
//      2-2. 배열에 있는 원소 길이보다 arrN에 남아있는 애들이 같거나 더 짧다? ==> 안바꿈
// 3. 교체 시 배치되어야할 인덱스 위치를 이분 탐색으로 구하면 된다. (어떤 값보다 작으면서 제일 작은 위치를 찾아야 하므로 right 로 다룬다.)

// 내가 간과한 것 **************************************************
// 1. 모두 공평하게 연결되어 있으니, arrN 특정 원소 이후에 있는 길이가 더 길면 당연히 더 길 수 밖에 없다고 생각했음. => 반례를 너무 짧게 해서 분석했어
// 2. 그게 아니였고, 쌍으로 연결되어 있으니 큰 값들이 앞에 나오면 작은 값들로 공평하게 지워져서 가장 긴 증가하는 수열과 로직이 같아짐
// ex)
/**
 * 11
 * 1 11 2 10 3 9 4 8 5 7 6
 * => 6
 */

// [구체적인 예시 찾기]
/**
 * 5
 * 4 5 1 2 3
 * => 3
 *
 * 7
 * 4 5 6 1 2 3 7
 * => 4
 */

// [문제 세분화]
function parseInput(input) {
    let N = Number(input[0]);
    let arrN = input[1].split(" ").map(Number);
    return { N, arrN };
}

function solution() {
    // I. 입력값 받기
    let { N, arrN } = parseInput(input);
    let ans = [];

    // M. 이분 탐색 구현
    const binarySearch = (num) => {
        let [left, right] = [0, ans.length - 1];

        while (left <= right) {
            let middle = Math.floor((left + right) / 2);

            // I. ans[middle] 보다 num 이 작으면 => right 줄여야
            // I. ans[middle] 보다 num 이 같거나 크면 => left 를 늘려야
            if (ans[middle] >= num) right = middle - 1;
            else left = middle + 1;
        }
        return right + 1;
    };

    // I. arrN 을 순서대로 ans 배열에 넣는다
    arrN.forEach((v, i) => {
        if (v < ans[ans.length - 1] && i !== 0) {
            let idx = binarySearch(v);
            ans[idx] = v;
        } else {
            ans.push(v);
        }
        // if (i === 0) ans.push(v);
        // //      i. 만약 arrN 의 원소가 ans 배열의 마지막 원소보다 작으면 ?
        // else if (ans[ans.length - 1] > v) {
        //     let remainLength = N - i;
        //     //          i. ans 배열에 있는 원소 길이보다 arrN 에 남아있는 애들이 더 길다?
        //     //              i. 이분 탐색으로 해당 인덱스 검색 후 넣어 놓고 그 뒤 인덱스 없엠
        //     if (ans.length < remainLength) {
        //         let replaceIdx = binarySearch(v);
        //         ans.splice(replaceIdx);
        //         ans.push(v);
        //     }
        //     //          i. 같거나 더 짧다? 바꾸지 않는다.
        // } else ans.push(v);
    });

    // I. 마지막으로 ans 배열의 길이를 반환한다.
    return ans.length;
}

console.log(solution());