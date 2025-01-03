/**
 * 조합(forEach 버전)
 * 
 * @param {*} arr 
 * @param {*} selectNumber 
 * @returns 조합
 */
const getCombinationsV1 = (arr, selectNumber) => {
    if (selectNumber === 1) return arr.map(value => [value]);

    const result = [];

    arr.forEach((fixed, index) => {
        // 전체 배열 중 fixed 이하 요소들을 제외한 나머지 
        const rest = arr.slice(index + 1);

        // 나머지 요소들에서 selectNumber - 1개를 선택하는 조합을 구하고, fixed 요소를 앞에 붙임
        const combinations = getCombinationsV1(rest, selectNumber - 1);
        const attached = combinations.map(comb => [fixed, ...comb]);

        result.push(...attached);
    })

    return result;
}
console.log(getCombinationsV1([1, 2, 3, 4], 3));

/**
 * 조합(flatMap 버전) 
 * 
 * @param {*} arr 
 * @param {*} selectNumber 
 * @returns 조합
 */
const getCombinationsV2 = (arr, selectNumber) => {
    if (selectNumber === 1) return arr.map(value => [value]);

    return arr.flatMap((fixed, index) => {
        const rest = arr.slice(index + 1);

        return getCombinationsV2(rest, selectNumber - 1)
            .map(comb => [fixed, ...comb]);
    })
}
console.log(getCombinationsV2([1, 2, 3, 4], 3));
console.log(getCombinationsV2([1, 2, 3], 2));

/**
 * 중복 조합
 * 
 * @param {*} arr 
 * @param {*} selectNumber 
 * @returns 조합 + [1,1], [2,2], [3,3]
 */
const getCombinationsWithRepetition = (arr, selectNumber) => {
    if (selectNumber === 1) return arr.map(value => [value]);

    return arr.flatMap((fixed, index) => {
        // 전체 배열 중 fixed 미만 요소들을 제외한 나머지
        const rest = arr.slice(index);

        return getCombinationsWithRepetition(rest, selectNumber - 1)
            .map(comb => [fixed, ...comb]);
    })
}
console.log(getCombinationsWithRepetition([1, 2, 3, 4], 2));
// console.log(getCombinationsWithRepetition([1, 2, 3], 2));