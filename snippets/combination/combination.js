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

// M. for 문 없이 조합을 만드는 법
const combinationWithoutFor = (depth, tmp) => {
    if (tmp.length === 2) { // I. 원하는 조합 길이
        ans.push([...tmp]);
        return;
    }

    if (depth === input.length) { // I. 더 이상 선택할 요소가 없을 때
        return;
    }

    tmp.push(input[depth]);
    combinationWithoutFor(depth, tmp); // I. 중복 포함이므로 depth 만 넘김
    tmp.pop();

    // I. depth 올리는 용도 (for 문 대체)
    combinationWithoutFor(depth + 1, tmp);
};

// combinationWithTmp(0, []);
combinationWithoutFor(0, []);
console.log(ans);