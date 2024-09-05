
// 입력: string 괄호 문자열
// 출력: int 올바른 괄호 문자열이 나오는 수

// 0 <= x
// x < s 길이

// 시간 복잡도 O(N^2)

// [문제 세분화] ==> checkMethod 이상하게 품, flag 가 필요없고 마지막에 스택에 뭐가 남았는지 확인했어야 ...
// function solution(s) {
//     let stack = s.split('');
//     let answer = 0;
//
//     // 	M. 올바른 문자열인지 체킹 (n번) : '[' '(' '{' 나눠서 체킹하기
//     const checkMethod = (stack) => {
//         let check = [];
//         let flag = false;
//
//         for(const str of stack) {
//             if(str === ']' || str === ')' || str === '}') {
//                 const element = check.pop();
//                 if(str === ']' && element === '[') flag = true;
//                 else if(str === ')' && element === '(') flag = true;
//                 else if(str === '}' && element === '{') flag = true;
//                 else {
//                     flag = false;
//                     break;
//                 }
//             } else {
//                 check.push(str);
//                 flag=false;
//             }
//         }
//
//         return flag;
//     }
//
//     // I. s 길이 번 왼쪽으로 이동 (n번)
//     for(let i=0; i<s.length; i++) {
//         //	i. 왼쪽으로 이동 (n번)
//         if(i !== 0) stack.push(stack.shift());
//
//         const flag = checkMethod(stack);
//         if(flag) answer++;
//     }
//
//     return answer;
// }

// [문제 세분화]
function solution(s) {
    let stack = s.split('');
    let answer = 0;

    // 	M. 올바른 문자열인지 체킹 (n번) : '[' '(' '{' 나눠서 체킹하기
    const checkMethod = (stack) => {
        let check = [];

        for(const str of stack) {
            if(str === ']' || str === ')' || str === '}') {
                const element = check.pop();
                if(str === ']' && element === '[') continue;
                else if(str === ')' && element === '(') continue;
                else if(str === '}' && element === '{') continue;
                else return false;
            } else check.push(str);
        }

        return check.length === 0; // 아니 스택에 값이 남아 있는지 없는지 확인했어야 ...
    }

    // I. s 길이 번 왼쪽으로 이동 (n번)
    for(let i=0; i<s.length; i++) {
        //	i. 왼쪽으로 이동 (n번)
        if(i !== 0) stack.push(stack.shift());

        const flag = checkMethod(stack);
        if(flag) answer++;
    }

    return answer;
}