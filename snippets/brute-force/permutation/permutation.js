/**
 * 순열
 * 
 * @param {*} arr 
 * @param {*} selectNumber 
 * @returns 순열
 */
const getPermutations = (arr, selectNumber) => {
  const result = [];
  const check = Array.from({ length: arr.length }, () => false);

  const dfs = (depth = 0, tmp = []) => {
    if (tmp.length === selectNumber) {
      result.push(tmp);
      return;
    }

    for (let i = 0; i < arr.length; i++) {
      if (!check[i]) {
        check[i] = true;
        tmp.push(arr[i]);
        dfs(depth + 1, [...tmp]);
        check[i] = false;
        tmp.pop();
      }
    }
  }
  dfs();

  return result;
}
console.log(getPermutations([1, 2, 3, 4], 2));

/**
 * 중복 순열
 * 
 * @param {*} arr 
 * @param {*} selectNumber 
 * @returns 순열 + [1,1], [2,2], [3,3], [4,4]
 */
const getPermutationsWithRepetition = (arr, selectNumber) => {
  const result = [];

  const dfs = (depth = 0, tmp = []) => {
    if (tmp.length === selectNumber) {
      result.push(tmp);
      return;
    }

    // i = 0부터가 포인트
    for (let i = 0; i < arr.length; i++) {
      tmp.push(arr[i]);
      dfs(depth + 1, [...tmp]);
      tmp.pop();
    }
  }
  dfs();

  return result;
}
console.log(getPermutationsWithRepetition([1, 2, 3, 4], 2));
