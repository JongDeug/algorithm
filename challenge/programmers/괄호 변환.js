// [문제 이해하기]
// 균형잡힌 괄호 문자열 (개수가 같은거임)를 올바른 괄호 문자열로 변환하는 함수를 구현하라.

// u : 더 이상 분리될 수 없는 균형잡힌 문자열
// v : 나머지

// 입력: p(균형잡힌 문자열)
// 출력: 올바른 괄호 문자열

// [문제 세분화]
// M. solution은 v에 대해 재귀하는 함수
function solution(p) {
    // Base Case
    if (p === "") return "";

    // M. u,v 분리
    // M. u는 괄호 '(', ')' 개수가 같아야해
    let uvIndex;
    let uvMap = {};
    // I. 분리하기 위해 index 받기
    for (let i = 0; i < p.length; i++) {
        uvMap[p[i]] = (uvMap[p[i]] || 0) + 1;

        if (uvMap["("] === uvMap[")"]) {
            uvIndex = i + 1;
            break;
        }
    }

    let u = p.slice(0, uvIndex);
    let v = p.slice(uvIndex);

    // I. if u가 올바른 괄호라면 v에 대해 재귀
    if (u[0] === "(") {
        return u.concat(solution(v));
    }
    // I. if u가 올바르지 않으면 ?
    else {
        let empty = `(${solution(v)})`;
        u = u.slice(1); // 앞 제거
        u = u.slice(0, u.length - 1); // 뒤 제거
        u = [...u].map(x => x === "(" ? ")" : "(").join(''); // 나머지 뒤집기
        return empty.concat(u); // 붙이기
    }
}

console.log(solution("()))((()"));