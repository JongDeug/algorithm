const getPermutations = (arr, selectNumber) => {
    // if (selectNumber > arr.length) return [];
    if (selectNumber === 1) return arr.map(value => [value]);

    const result = [];

    arr.forEach((fixed, index) => {
        // 전체 배열 중 fixed 요소를 제외한 나머지
        const rest = [...arr.slice(0, index), ...arr.slice(index + 1)];

        // 나머지 요소들로 순열을 구하고, fixed 요소를 앞에 붙임
        const permutations = getPermutations(rest, selectNumber - 1);
        const attached = permutations.map(perm => [fixed, ...perm])

        result.push(...attached);
    });

    return result;
}

console.log(getPermutations([1, 2, 3], 4));

const getCombinations = (arr, selectNumber) => {
    if (selectNumber === 1) return arr.map(value => [value]);

    const result = [];

    arr.forEach((fixed, index) => {
        // 전체 배열 중 fixed 이하 요소들을 제외한 나머지 
        const rest = arr.slice(index + 1);

        // 나머지 요소들에서 selectNumber - 1개를 선택하는 조합을 구하고, fixed 요소를 앞에 붙임
        const combinations = getCombinations(rest, selectNumber - 1);
        const attached = combinations.map(combo => [fixed, ...combo]);

        result.push(...attached);
    })

    return result;
}

// console.log(getCombinations([1, 2, 3, 4], 3));
// console.log(getCombinations([1, 2], 3));