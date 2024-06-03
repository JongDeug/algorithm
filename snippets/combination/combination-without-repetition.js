const input = Array.from({ length: 10 }, (v, i) => i + 1);
let ans = [];

const combinationWithTmp = (depth, tmp) => {
    if (tmp.length === 2) {
        ans.push([...tmp]);
        return;
    }

    for (let i = depth; i < 10; i++) {
        tmp.push(input[i]);
        combinationWithTmp(i + 1, tmp);
        tmp.pop();
    }
};

combinationWithTmp(0, []);
console.log(ans);