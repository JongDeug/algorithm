// let input = Array.from({ length: 10 }, (v, i) => i + 1);
// let check = new Array(10).fill(false);
// let ans = [];
//
// const combination = (tmp) => {
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
//             combination(tmp);
//
//             check[i] = false;
//             tmp.pop();
//         }
//     }
// };
//
// combination([]);
//
// console.log(ans);

function combinationRecursion(list, choiceNum) {
    const result = [];

    function helper(items, index) {
        if (items.length === choiceNum) {
            result.push(items);
            return;
        }

        // I. i = index 여기가 핵심이라고 생각함!
        for (let i = index; i < list.length; i++) {
            helper([...items, list[i]], i + 1);
        }
    }
    helper([], 0);

    return result;
}

console.log(combinationRecursion([1,2,3,4,5,6,7,8,9,10], 2))