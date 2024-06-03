const input = Array.from({ length: 10 }, (v, i) => i + 1);
let ans = [];

// M. 조합은 무조건 tmp 로 관리해야 함.
const combinationWithTmp = (depth, tmp) => {
    if (tmp.length === 2) {
        ans.push([...tmp]);
        return;
    }

    for (let i = depth; i < 10; i++) {
        tmp.push(input[i]);
        combinationWithTmp(i, tmp); // I. 여기가 depth 가 아닌 i인 것이 매우 중요함.
        tmp.pop();
    }
};

combinationWithTmp(0, []);
console.log(ans);