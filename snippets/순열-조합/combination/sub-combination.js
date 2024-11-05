const input = Array.from({ length: 10 }, (v, i) => i + 1);
let ans = [];

// M. 부분 조합을 구하는 함수
// [1,2,3,4] 중 부분 조합을 구하는 코드임
const subCombination = (depth, tmp) => {
    if (depth === 4) {
        ans.push([...tmp]);
        return;
    }

    tmp.push(input[depth]);
    subCombination(depth + 1, tmp);
    tmp.pop();

    subCombination(depth + 1, tmp);
};

subCombination(0, []);
console.log(ans);
