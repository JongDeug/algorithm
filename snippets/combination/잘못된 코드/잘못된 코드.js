const input = Array.from({ length: 10 }, (v, i) => i + 1);
let ans = [];

const combination = (depth, tmp) => {
    if (depth === 2) { // I. depth 로 관리하면 이상해져
        ans.push([...tmp]);
        return;
    }

    for (let i = depth; i < 10; i++) {
        tmp.push(input[i]);
        combination(i + 1, tmp);
        tmp.pop();
    }
};

combination(0, []);
console.log(ans);