import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "/testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 문서와 검색 단어가 주어졌을 때, 중복되지 않게 검색할 수 있는 "최대" 횟수를 구하는 함수를 구현해라.

// 입력: string, string (문서, 검색 단어) => 알파벳(2500자), 소문자(50자)
// 출력: 중복되지 않게 검색할 수 있는 "최대" 횟수

// 핵심
// 1. 이중 반복문 사용해도 2500 * 50 자라 시간 복잡도 문제는 없음
// 2. 퇴사 문제랑 비슷한 것 같음. => X 아님
// => 이렇게 했다가 틀림... 결이 살짝 다른데 최대라 앞 인덱스가 맞으면 그걸 선택하는게 맞음, 애초에 뒤를 선택했다 해서 더 큰 횟수가 나오는 것이 아님

// [문제 세분화] : 틀렸던 문제, 퇴사 문제랑 결이 다름 => 앞, 뒤 인덱스 중 누구를 선택해야 더 큰지의 문제가 아님!!
let doc = input[0];
let word = input[1];

function solution(doc, word) {
    let count = 0;
    let docArr = [...doc];

    for (let i = 0; i < docArr.length; i++) {
        let compare = docArr.slice(i, i + word.length).join("");

        if (compare === word) {
            count++;
            docArr.splice(i, word.length);
            i -= 1; // I. 지워지면 다시 세팅해야함. while문으로 구현하는게 더 가독성 좋을듯
        }
    }

    return count;
}

console.log(solution(doc, word));


// function solution(doc, word) {
//     let ans = 0;
//     let docArr = Array.from(doc);
//
//     const search = (depth, count) => {
//         if (depth >= docArr.length) {
//             if (depth === docArr.length) ans = Math.max(ans, count);
//             else ans = Math.max(ans, count - 1);
//             return;
//         }
//
//         for (let i = depth; i < docArr.length; i++) {
//             let compare = docArr.slice(depth, depth + word.length).join("");
//
//             if (compare === word) {
//                 docArr.splice(depth, word.length);
//                 search(depth, count + 1); // 잘랐으니까 depth 는 그대로
//             } else {
//                 search(depth + 1, count);
//             }
//         }
//     };
//
//     search(0, 0);
//     return ans;
// }
//
// console.log(solution(doc, word));


// function solution(doc, word) {
//     let ans = 0;
//
//     // M. 반복문을 재귀 함수로 구현
//     const search = (depth, count) => {
//         // I. BASE CASE : depth 가 doc의 인덱스를 넘지 않아야 함.
//         if (depth >= doc.length) {
//             if (depth === doc.length) ans = Math.max(ans, count);
//             else ans = Math.max(ans, count - 1);
//             return;
//         }
//
//         let compare = doc.substring(depth, depth + word.length); // 여기서 시간 초과 난듯함
//
//         // I. 기본 로직
//         for (let i = depth; i < doc.length; i++) {
//             if (i + word.length <= doc.length) {
//                 // I. 비교문이랑 검색어가 같다면
//                 if (compare === word) {
//                     search(i + word.length, count + 1);
//                 } else {
//                     search(i + 1, count);
//                 }
//             }
//         }
//     };
//
//     search(0, 0);
//
//     return ans;
// }
//
// console.log(solution(doc, word));
