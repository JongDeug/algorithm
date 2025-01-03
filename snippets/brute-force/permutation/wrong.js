const getPermutationsWithRepetition = (arr, selectNumber) => {
    const result = [];

    const dfs = (depth = 0, tmp = []) => {
        if (tmp.length === selectNumber) {
            result.push(tmp);
            return;
        }

        // i에 depth를 받고 있으면 안됨
        for (let i = depth; i < arr.length; i++) {
            tmp.push(arr[i]);
            dfs(depth + 1, [...tmp]);
            tmp.pop();
        }
    }
    dfs();

    return result;
}
console.log(getPermutationsWithRepetition([1, 2, 3, 4], 2));
