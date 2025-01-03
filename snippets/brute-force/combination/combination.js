/**
 * 조합(for문 o)
 * 
 * @param {*} arr 
 * @param {*} selectNumber 
 * @returns 조합
 */
const getCombinationsV1 = (arr, selectNumber) => {
  const result = [];

  const dfs = (depth = 0, tmp = []) => {
    if (tmp.length === selectNumber) {
      result.push(tmp);
      return;
    }

    for (let i = depth; i < arr.length; i++) {
      tmp.push(arr[i]);
      dfs(i + 1, [...tmp]);
      tmp.pop();
    }
  }
  dfs();

  return result;
}
console.log(getCombinationsV1([1, 2, 3, 4], 2));

/**
 * 조합(for문 x)
 * 
 * @param {*} arr 
 * @param {*} selectNumber 
 * @returns 조합
 */
const getCombinationsV2 = (arr, selectNumber) => {
  const result = [];

  const dfs = (depth = 0, tmp = []) => {
    if (tmp.length === selectNumber) {
      result.push(tmp);
      return;
    }

    if (depth === arr.length) return;

    tmp.push(arr[depth]);
    dfs(depth + 1, [...tmp]);
    tmp.pop();

    dfs(depth + 1, [...tmp]);
  }
  dfs();

  return result;
}
console.log(getCombinationsV2([1, 2, 3, 4], 2));

/**
 * 중복 조합(for문 o)
 * 
 * @param {*} arr 
 * @param {*} selectNumber 
 * @returns 조합 + [1,1], [2,2], [3,3], [4,4]
 */
const getCombinationsWithRepetitionV1 = (arr, selectNumber) => {
  const result = [];

  const dfs = (depth = 0, tmp = []) => {
    if (tmp.length === selectNumber) {
      result.push(tmp);
      return;
    }

    for (let i = depth; i < arr.length; i++) {
      tmp.push(arr[i]);
      dfs(i, [...tmp]);
      tmp.pop();
    }
  }
  dfs();

  return result;
}
// console.log(getCombinationsWithRepetitionV1([1, 2, 3, 4], 2));

/**
 * 중복 조합(for문 x)
 * 
 * @param {*} arr 
 * @param {*} selectNumber 
 * @returns 조합
 */
const getCombinationsWithRepetitionV2 = (arr, selectNumber) => {
  const result = [];

  const dfs = (depth = 0, tmp = []) => {
    if (tmp.length === selectNumber) {
      result.push(tmp);
      return;
    }

    if (depth === arr.length) return;

    tmp.push(arr[depth]);
    // 중복 조합이므로 현재 요소 포함
    dfs(depth, [...tmp]);
    tmp.pop();

    dfs(depth + 1, [...tmp]);
  }
  dfs();

  return result;
}
// console.log(getCombinationsWithRepetitionV2([1, 2, 3, 4], 2));