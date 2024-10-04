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
  if (depth === 3) {
    ans.push([...tmp]);
    return;
  }

  for (let i = 0; i < 10; i++) {
    tmp.push(input[i]);
    permutationWithDepth(depth + 1, tmp);
    tmp.pop();
  }
};

// M. 함수형 프로그래밍
const permutationWithFunctionalProgramming = (arr, n) => {
  if (n === 0) return [[]]; // n이 depth 역할을 하는 구만
  const result = [];

  arr.forEach((fixed, idx) => {
    // 현재 요소를 제외한 나머지 요소들을 복사
    const rest = [...arr];
    rest.splice(idx, 1);

    const perms = permutationWithFunctionalProgramming(rest, n - 1);

    const combine = perms.map((p) => [fixed, ...p]);

    result.push(...combine);
  });

  return result;
};

// console.log(permutationWithFunctionalProgramming(input, 2));

permutationWithTmp([]);
// permutationWithDepth(0, []);
console.log(ans);

