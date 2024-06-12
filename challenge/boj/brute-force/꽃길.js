import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 세 씨앗을 모두 꽃피게 하면서 가장 싼 가격에 화단을 대여할건데 가장 싼 대여 가격을 구해라.

// 입력: N(행,열 길이), arr(지점당 가격)
// 출력: int(가장 싼 대여 가격)

// 조건:
// 1. 꽃이 닿여 있으면 죽음. 죽지 않게 씨앗을 심어야 함

// 핵심:
// 1. 0(x), N-1(x)인 숫자 2개를 중복된 순열로 뽑아서 배열에 저장한다.
// 2. 0 ~ 배열의 크기 - 1까지의 인덱스를 중복이 없는 조합으로 3개 뽑는다.
// 2-1. 결과물의 좌표를 각 4방향으로 더한 중복이 없으면 대여 값을 구한다.
// 3. 최소 대여값을 구한다.

// [문제 세분화] : 리팩토링 했음
let n = Number(input[0]);
let arr = input.slice(1).map(x => x.split(" ").map(Number));

function solution(n, arr) {
    let ans = [];
    // M. 중복 없는 순열을 구한다. [[1,1], [1,2], [1,3] ...]
    let coor = [];
    const permutation = (tmp) => {
        if (tmp.length === 2) {
            coor.push([...tmp]);
            return;
        }

        for (let i = 1; i < n - 1; i++) {
            tmp.push(i);
            permutation(tmp);
            tmp.pop();
        }
    };
    // M. 2. coor에서 중복이 없는 조합으로 3개 요소를 뽑는다. (인덱스 활용)
    const combination = (depth, tmp) => {
        if (tmp.length === 3) {
            let bucket = [];
            // I. 2-1. 결과물의 좌표를 각 4방향으로 더한다.
            [...tmp].forEach(index => {
                const dy = [-1, 1, 0, 0];
                const dx = [0, 0, -1, 1];
                let [y, x] = [coor[index][0], coor[index][1]];
                bucket.push(`${y} ${x}`);

                for(let k=0; k<4; k++){
                    let ny = y + dy[k];
                    let nx = x + dx[k];
                    bucket.push(`${ny} ${nx}`);
                }
            });

            // I. 2-1. 중복이 없으면 대여 값을 구한다.
            if(bucket.length === new Set(bucket).size) {
                let sum = 0;
                for (const element of bucket) {
                    let y = Number(element.split(" ")[0]);
                    let x = Number(element.split(" ")[1]);
                    sum += arr[y][x];
                }
                ans.push(sum);
            }
            return;
        }

        for (let i = depth; i < coor.length; i++) {
            tmp.push(i);
            combination(i + 1, tmp);
            tmp.pop();
        }
    };

    permutation([]);
    combination(0, []);

    // I. 3. 최소 대여 값을 구한다.
    return Math.min(...ans);
}

console.log(solution(n, arr));