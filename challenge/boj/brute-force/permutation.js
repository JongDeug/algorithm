// // 이거 순열임 combination x => permutation
// let input = Array.from({ length: 10 }, (v, i) => i + 1);
// let check = new Array(10).fill(false);
// let ans = [];
//
// const permutation = (tmp) => {
//     if (tmp.length === 2) {
//         ans.push([...tmp]);
//         return;
//     }
//
//     for (let i = 0; i < 10; i++) {
//         if (!check[i]) {
//             check[i] = true;
//             tmp.push(input[i]);
//
//             permutation(tmp);
//
//             check[i] = false;
//             tmp.pop();
//         }
//     }
// };
//
// permutation([]);
// console.log(ans);
//

let input = Array.from({ length: 10 }, (v, i) => i + 1);
let ans = [];

const permutation = (tmp) => {
    if (tmp.length === 2) {
        ans.push([...tmp]);
        return;
    }

    for (let i = 0; i < 10; i++) {
        tmp.push(input[i]);
        permutation(tmp);
        tmp.pop();
    }
};

permutation([]);
console.log(ans);


// depth 로 관리하는 거 하나 더 작성하기
// 그리고 combination 하나 더 작성!

