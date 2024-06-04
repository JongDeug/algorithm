import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 공식에 맞춰 탱커, 딜러 각각 몇 명씩 고용하면 되는지 알려주는 함수 구현

// 입력: N(돈, int), [A, B(전투력, int), Pa, Pb(고용비, int)] => arr
// 출력: int, int(각 몇 명)

// 핵심:
// 돈: 10,000,000 | 전투력: 1, 1 | 고용비: 1, 1 이라 했을 때
// 고용인원 10,000,000, 0 이라 가정하면 n은 최대 10,000,000 => 순열로 구현하면 시간 복잡도 초과

// 일단 틀렸음 => 반복문 하나로 가능하구나...

// [문제 세분화]
let n = Number(input[0]);
let arr = input[1].split(" ").map(Number);

function solution(n, arr) {
    let [a, pa, b, pb] = arr;
    let max = 0;
    let answer;

    for (let i = 0; i <= n; i++) {
        let numA = Math.floor((n - i) / pa);
        let numB = Math.floor(i / pb);
        let compare = (a * numA) + (b * numB);

        if (compare >= max) {
            max = compare;
            answer = [numA, numB];
        }
    }

    return answer.join(" ");
}

console.log(solution(n, arr));

// 틀린 코드
// GPT 답변) 아하!!!!!
// 주어진 코드에서 가장 큰 문제는 단순히 n을 pa 또는 pb로 나누어서 탱커와 딜러를 고용하는 방식으로 접근하고 있다는 점입니다.
// 이렇게 하면 최대 전투력을 보장할 수 없습니다. 최적화된 방법으로 접근하려면 모든 가능한 탱커와 딜러의 조합을 탐색하여 최대 전투력을 계산해야 합니다.
// 문제점
// 1. compareA와 compareB를 단순히 계산하는 방식은 최적화된 결과를 보장하지 않습니다.
// 2. n을 pa 또는 pb로 나눈 후 남은 돈으로 다른 유형의 고용 비용을 계산하는 방식도 최적화된 결과를 보장하지 않습니다.
// function solution(n, arr) {
//     let answer;
//     let [a, pa, b, pb] = arr;
//     // I. 현재 돈에 각각의 고용 비용을 나눠서 누가 더 큰지 비교 => 이게 더했을 때 어떻게 달라질지 몰라서 틀린 것 같음 *******************8
//     let compareA = Math.floor(n / pa) * a;
//     let compareB = Math.floor(n / pb) * b;
//     // I. 큰 값의 몫을 가져와 쓰고
//     // I. 나머지 값을 더 쓸 수 있으면 나머지 값을 나눔
//     if (compareA >= compareB) {
//         answer = [Math.floor(n / pa), n % pa >= pb ? Math.floor(n % pa / pb) : 0];
//     } else {
//         answer = [n % pb >= pa ? Math.floor(n % pb / pa) : 0,  Math.floor(n / pb)];
//     }
//
//     return answer.join(" ");
// }
//
// console.log(solution(n, arr));