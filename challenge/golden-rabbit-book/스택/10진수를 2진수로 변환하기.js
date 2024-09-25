// [문제 이해하기]
// 10진수 -> 2진수 변환

// 입력: 10억 미만
// 따라서 O(logN) 으로 계산되잖아. 상관없지

function solution(num) {
    let stack = [];

    const helper = (number) => {
        stack.push(number % 2); // 나머지

        if (number === 0) return;
        return helper(Math.floor(number / 2)); // 몫
    };

    helper(num);
    if (stack[stack.length - 1] === 0) stack.pop();
    stack.reverse();
    return stack.join("");
}

console.log(solution(12345));
