// const input = Array.from({ length: 10 }, (v, i) => i + 1);
// let ans = [];
// let check = new Array(10).fill(false);
//
// const func = (depth, tmp) => {
//     if (depth === 4) {
//         ans.push([...tmp]);
//         return;
//     }
//
//
//     tmp.push(input[depth]);
//     func(depth + 1, tmp);
//     tmp.pop();
//
//     func(depth + 1, tmp);
// };
//
// func(0, []);
// console.log(ans);

// const input = Array.from({ length: 10 }, (v, i) => i + 1);
// let ans = [];
//
// const combination = (depth, tmp) => {
//     if (tmp.length === 2) {  // 원하는 조합의 길이
//         ans.push([...tmp]);
//         return;
//     }
//
//     if (depth === input.length) {  // 더 이상 선택할 요소가 없을 때
//         return;
//     }
//
//     tmp.push(input[depth]);
//     combination(depth + 1, tmp);  // 현재 요소를 포함하는 경우
//     tmp.pop();
//
//     combination(depth + 1, tmp);  // 현재 요소를 포함하지 않는 경우
// };
//
// combination(0, []);
// console.log(ans);
