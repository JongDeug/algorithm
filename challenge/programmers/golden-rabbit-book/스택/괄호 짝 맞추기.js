// [문제 이해하기]
// 괄호가 잘 닫히면 true, 아니면 false 반환

// [구체적인 예시]
// (())() => true
// ((())() => false

// [문제 세분화]
// I. 재귀로 풀면 안되려나
// I. 여기선 스택이니까 배열로 풀어보자.
function solution(str) {
    const stack = [];
    // I. ( 는 스택에 넣고, ) 가 오면 스택에 있는걸 뺌
    //  i. 만약 스택에 값이 없으면 false
    for (const item of [...str]) {
        if (item === "(") stack.push(item);
        else {
            if (!stack.pop()) return false;
        }
    }

    return !stack.length;
}

console.log(solution("((())()"));
console.log(solution("(())()"));
