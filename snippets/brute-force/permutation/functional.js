/**
 * 순열(forEach 버전)
 * 
 * @param {*} arr 
 * @param {*} selectNumber 
 * @returns 순열
 */
const getPermutationsV1 = (arr, selectNumber) => {
    // if (selectNumber > arr.length) return [];
    if (selectNumber === 1) return arr.map(value => [value]);

    const result = [];

    arr.forEach((fixed, index) => {
        // 전체 배열 중 fixed 요소를 제외한 나머지
        const rest = [...arr.slice(0, index), ...arr.slice(index + 1)];

        // 나머지 요소들로 순열을 구하고, fixed 요소를 앞에 붙임
        const permutations = getPermutationsV1(rest, selectNumber - 1);
        const attached = permutations.map(perm => [fixed, ...perm])

        result.push(...attached);
    });

    return result;
}
// console.log(getPermutationsV1([1, 2, 3, 4], 2));

/**
 * 순열(flatMap 버전)
 * 
 * flatMap은 arr.map(...args).flat()과 동일
 * @param {*} arr 
 * @param {*} selectNumber 
 * @returns 순열
 */
const getPermutationsV2 = (arr, selectNumber) => {
    if (selectNumber === 1) return arr.map(value => [value]);

    return arr.flatMap((fixed, index) => {
        // 현재 요소를 제외한 나머지
        const rest = [...arr.slice(0, index), ...arr.slice(index + 1)];

        // 나머지 요소들로 순열을 만들고 현재 요소를 앞에 붙임
        return getPermutationsV2(rest, selectNumber - 1)
            .map(perm => [fixed, ...perm]);
    })
}
console.log(getPermutationsV2([1, 2, 3, 4], 2));

/**
 * 중복 순열 
 * 
 * @param {*} arr 
 * @param {*} selectNumber 
 * @returns 순열 + [1,1], [2,2], [3,3]
 */
const getPermutationsWithRepetition = (arr, selectNumber) => {
    if (selectNumber === 1) return arr.map(value => [value]);

    return arr.flatMap((fixed) => {
        return getPermutationsWithRepetition(arr, selectNumber - 1)
            .map(perm => [fixed, ...perm]);
    })
}
console.log(getPermutationsWithRepetition([1, 2, 3, 4], 3));
