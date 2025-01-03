const getCombinations = (arr, selectNumber) => {
    const result = [];

    const dfs = (depth = 0, tmp = []) => {
        // depth로 관리하면 안됨. tmp.length로 관리해야됨.
        if (depth === selectNumber) {
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
console.log(getCombinations([1, 2, 3, 4], 2));
