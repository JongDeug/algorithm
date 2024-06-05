import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 추의 합을 구해서 1부터 S까지 숫자를 만들 수 있는가. 만약 없다면 그 경우의 수가 몇개인가 출력하기

// 입력: k(추 개수), arr(추 무게들)
// 출력: int(측정 불가능한 경우의 수)

// 핵심
// k 가 13까지라 딱히 시간 복잡도에 대해 고민하지 않아도 될듯함. => 만들어진 놈을 다룰 땐 생각해야 함.

// [문제 세분화]
let k = Number(input[0]);
let arr = input[1].split(" ").map(Number);

function solution(k, arr) {
    let s = arr.reduce((a, b) => a + b, 0);
    let ans = new Set(Array.from({ length: s }, (v, i) => i + 1));

    const dfs = (depth, sum) => {
        if (depth === k) {
            if (sum >= 0 && sum <= s) ans.delete(sum);
            return;
        }

        dfs(depth + 1, sum + arr[depth]); // I. 더하기
        dfs(depth + 1, sum - arr[depth]); // I. 빼기
        dfs(depth + 1, sum); // I. 세 가지 수를 모두 더하고 빼는거 말고도 두 가지, 한 가지 수도 각각 구해야 함.
    };

    dfs(0, 0);
    return ans.size;
}

console.log(solution(k, arr));

// 시간 초과 났음 ㅠㅠ
// function solution(k, arr) {
//     let sum = arr.reduce((acc, value) => acc + value, 0);
//     let ans = new Set(Array.from({ length: sum }, (v, i) => i + 1));
//     let sub = [];
//
//     // I. 부분 집합을 구함.
//     const subCombination = (depth, tmp) => {
//         if (depth === k) {
//             sub.push([...tmp].reduce((acc, value) => acc + value, 0));
//             return;
//         }
//
//         tmp.push(arr[depth]);
//         subCombination(depth + 1, tmp);
//         tmp.pop();
//
//         subCombination(depth + 1, tmp);
//     };
//
//     subCombination(0, []);
//
//     // I. 합 기준으로 내림차순 정렬
//     sub.sort((a, b) => b - a);
//
//     // I. 하나씩 비교해서 제거함. (배열에서 1부터 S까지 넣어둘거임) ==> 여기서 걸렸을 거임
//     for (let i = 0; i < sub.length; i++) {
//         ans.delete(sub[i]);
//         for (let j = i + 1; j < sub.length; j++) {
//             let num = sub[i] - sub[j];
//             ans.delete(num);
//         }
//     }
//
//     return ans.size;
// }
//
// console.log(solution(k, arr));
