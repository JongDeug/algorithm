const input = Array.from({ length: 10 }, (v, i) => i + 1);
let ans = [];

const wrongPermutation = (depth, tmp) => {
    if (tmp.length === 2) {
        ans.push([...tmp]);
    }

    for (let i = depth; i < 10; i++) {
        tmp.push(input[i]);
        wrongPermutation(depth + 1, tmp); // depth를 받고 있다는 것에 주목
        tmp.pop();
    }
};

wrongPermutation(0, []);
console.log(ans);