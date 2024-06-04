import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "/testcase.txt");
const input = fs.readFileSync(filepath).toString().trim();

// [문제 이해하기]
// 주어진 화학식을 균형있는 화학식으로 만들어 버리는 계수를 구하는 함수를 구현해라.

// 입력: string('C', 'H', 'O', '+', '='와 '2'∼'9') 50을 넘지 않음
// 출력: int int int (해가 여러개면 수열로 구성했을 때 사전순으로 가장 앞에 있는 것을 출력)

// 핵심
// 1. 10개 중 3개를 중복해서 뽑는 조합을 구현하는 것이 핵심

// [문제 세분화]
function solution(str) {
    let ans = [];
    // M. 조합 구하는 함수 작성
    const combination = (n, r, tmp) => {
        if (tmp.length === r) {
            // I. 식을 +, = 로 나누기
            let plusIndex = [...str].findIndex(v => v === "+");
            let equalIndex = [...str].findIndex(v => v === "=");

            // I. map 으로 변환시켜주는 함수
            const convertMap = (start, end, order) => {
                let len = [...str].slice(start, end).length - 1;
                return [...str].slice(start, end).reduce((map, value, index) => {
                    // I. 숫자인 경우
                    if (value >= "2" && value <= "9") {
                        if (map["prev"] !== "") {
                            let key = map["prev"];
                            map[key] += (Number(value) - 1); // I. 이미 한개를 넣었으므로 -1
                            map["prev"] = "";
                        }
                    }
                    // I. 문자인 경우
                    else if (value === "C" || value === "H" || value === "O") {
                        map[value] += 1;
                        map["prev"] = value;
                    }

                    // I. 마지막이면
                    if (index === len) {
                        map["C"] *= tmp[order];
                        map["H"] *= tmp[order];
                        map["O"] *= tmp[order];
                    }
                    return map;
                }, { "C": 0, "H": 0, "O": 0, "prev": "" });
            };

            // I. map 으로 변환
            let first = convertMap(0, plusIndex + 1, 0);
            let second = convertMap(plusIndex, equalIndex + 1, 1);
            let third = convertMap(equalIndex, str.length, 2);

            // I. first + second === third 면 tmp에 넣기
            let sum = {
                "C": first["C"] + second["C"],
                "H": first["H"] + second["H"],
                "O": first["O"] + second["O"],
            };

            // console.log(sum);
            if (sum["C"] === third["C"] && sum["O"] === third["O"] && sum["H"] === third["H"]) {
                ans.push([...tmp]);
            }
            return;
        }

        for (let i = 1; i <= n; i++) {
            tmp.push(i);
            combination(n, r, tmp);
            tmp.pop();
        }
    };

    combination(10, 3, []);
    // console.log(ans); // 10 * 10 * 10 경우의 수

    return ans[0].join(' ');
}

console.log(solution(input));

