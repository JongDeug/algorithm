/**
 * 멱집합(for문 x)
 * 
 * @param {*} arr 
 * @returns 멱집합
 */
const subsetV1 = (arr) => {
    const result = [];

    const dfs = (depth = 0, tmp = []) => {
        if (depth === arr.length) {
            result.push(tmp);
            return;
        }

        tmp.push(arr[depth])
        dfs(depth + 1, [...tmp]);
        tmp.pop();

        dfs(depth + 1, [...tmp]);
    }
    dfs();

    return result;
}
console.log(subsetV1([1, 2, 3, 4]));


/**
 * 멱집합(for문 o)
 * 
 * @param {*} arr 
 * @returns 멱집합
 */
const subsetV2 = (arr) => {
    const result = [];

    const dfs = (start = 0, tmp = []) => {
        result.push(tmp);

        for (let i = start; i < arr.length; i++) {
            dfs(i + 1, [...tmp, arr[i]]);
        }
    };
    dfs();

    return result;
};
console.log(subsetV2([1, 2, 3, 4]));