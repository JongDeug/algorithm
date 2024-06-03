const input = Array.from({ length: 10 }, (v, i) => i + 1);
let ans = [];
let check = new Array(10).fill(false);

// M. tmp 로 관리
const permutationWithTmp = (tmp) => {
    if (tmp.length === 2) {
        ans.push([...tmp]);
        return;
    }

    for (let i = 0; i < 10; i++) {
        if (!check[i]) {
            check[i] = true;
            tmp.push(input[i]);
            permutationWithTmp(tmp);

            check[i] = false;
            tmp.pop();
        }
    }
};

// M. depth 로 관리
const permutationWithDepth = (depth, tmp) => {
    if (depth === 2) {
        ans.push([...tmp]);
        return;
    }

    for (let i = 0; i < 10; i++) { // 조합과 큰 차이가 이 부분에서 남
        if (!check[i]) {
            check[i] = true;
            tmp.push(input[i]);
            permutationWithDepth(depth + 1, tmp); // 조합과 큰 차이가 이 부분에서 남. 조합은 i를 받음
            check[i] = false;
            tmp.pop();
        }
    }
};

// M. check 배열을 사용하지 않는 방법
const permutationWithoutCheck = (list, tmp) => {
    if (tmp.length === 2) {
        ans.push([...tmp]);
        return;
    }

    for (let i = 0; i < list.length; i++) {
        tmp.push(list[i]);
        // I. slice concat 사용
        // const remain = list.slice(0, i).concat(list.slice(i + 1)); // list.slice(0,0) => [] 임
        // I. filter 사용 => 이게 더 괜찮네
        const remain = list.filter((v, idx) => idx !== i);
        permutationWithoutCheck(remain, tmp);
        tmp.pop();
    }
};

// permutationWithTmp([]);
// permutationWithDepth(0, []);
permutationWithoutCheck(input, []);
console.log(ans);