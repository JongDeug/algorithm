import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const filePath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "/testcase.txt");
const input = fs.readFileSync(filePath).toString().trim().split("\n");

// [문제 이해하기]
// 조건에 맞게 등수를 정렬하고 특정 국가의 등수를 반환하는 함수를 구현해라.

// 입력: N(국가 수), K(특정 국가 번호), 나머지 arr
// 출력: int(특정 국가의 등수)

// 조건
// 1. 금메달 -> 은메달 -> 동메달 순으로 정렬
// 2. 국가 수가 4라 가정하고 1등 1명, 2등이 2명일 경우 3등은 없음 바로 4등임

// 자꾸 틀렸는데
// 문자로 정렬해서 그럼 ㅎㅎ 1 2 10 이면 1 10 2로 정렬됨

// [문제 세분화하기]
function solution(n, k, arr) {
    let answer = 0;
    // I. arr 정렬하기 -> 금 은 동 순으로 (내림차순)
    // arr.sort((a, b) => {
    //     if (a[1] < b[1]) return 1;
    //     else if (a[1] > b[1]) return -1;
    //     else {
    //         if (a[2] < b[2]) return 1;
    //         else if (a[2] > b[2]) return -1;
    //         else {
    //             if (a[3] < b[3]) return 1;
    //             else if (a[3] > b[3]) return -1;
    //         }
    //         return 0;
    //     }
    // });
    // I. 리펙토링 이렇게도 할 수 있음
    arr.sort((a, b) => {
        if (a[1] !== b[1]) return b[1] - a[1]; // 금메달
        if (a[2] !== b[2]) return b[2] - a[2]; // 은메달
        return b[3] - a[3]; // 동메달
    });

    // console.log(arr)
    // I. 동일한 경우 순회하면서 처리
    arr.forEach((item, index) => {
        if (item[0] === Number(k)) {
            // I. 동일한 놈을 찾아서 빼줌 (0부터 index범위 까지만 체킹해줌)
            let duplicateCount = -1;
            arr.slice(0, index + 1).forEach(e => {
                if (e.slice(1).join("") === item.slice(1).join("")) duplicateCount++;
            });
            answer = index + 1 - duplicateCount;
        }
    });

    return answer;
}

console.log(solution(input[0].split(" ")[0], input[0].split(" ")[1], input.slice(1).map(x => x.split(" ").map(Number))));