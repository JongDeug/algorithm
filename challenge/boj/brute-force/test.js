function test(n) {
    let result = [];
    let temp = new Array(10).fill(0);

    (function rec(idx, sum) {
        if (idx === 10) {
            if (sum === n) {
                result.push([].concat(temp));
            }
            return;
        }

        for (let i = 0; i <= n; i++) { // 0부터 n까지의 값을 시도
            if (sum + i <= n) { // 합이 n보다 작거나 같은 경우에만 재귀 호출
                temp[idx] = i;
                rec(idx + 1, sum + i);
            }
        }
    })(0, 0);

    return result.reverse();
}

console.log(test(5))