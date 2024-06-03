const input = Array.from({ length: 10 }, (v, i) => i + 1);
let ans = [];

// M. tmp 로 관리
const permutationWithTmp = (tmp) => {
    if (tmp.length === 2) {
        ans.push([...tmp]);
        return;
    }

    for (let i = 0; i < 10; i++) {
        tmp.push(input[i]);
        permutationWithTmp(tmp);
        tmp.pop();
    }
};


// M. depth 로 관리
const permutationWithDepth = (depth, tmp) => {
    if (depth === 2) {
        ans.push([...tmp]);
        return;
    }

    for (let i = 0; i < 10; i++) {
        tmp.push(input[i]);
        permutationWithDepth(depth + 1, tmp);
        tmp.pop();
    }
};

// permutationWithTmp([]);
permutationWithDepth(0, []);
console.log(ans);