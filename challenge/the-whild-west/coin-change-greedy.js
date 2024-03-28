// [문제 이해하기]
// coins(배열), amount(돈)을 인자로 주고,
// 이 돈을 동전으로 교환할 때 최소의 개수로 거슬러주는 배열을 반환하는 함수를 구현
// greedy algorithms
// 입력 : array of integers, integer, 출력 : array of integers
// 핵심 :
function minCoinChange(coins, amount) {
    let result = [];
    let quotient;
    let remainder = amount;

    for (let i = coins.length - 1; i >= 0; i--) {
        quotient = Math.floor(remainder / coins[i]);
        remainder = remainder % coins[i];

        // 몫, 몫이 0이면 계산이 안되는 거니까 다음 루프로 옮겨야 함.
        if (quotient === 0) continue;
        else result.push(...Array(quotient).fill(coins[i]));

        // 나머지
        if (remainder === 0) break;
    }
    return result;
}

console.log(minCoinChange([1, 5, 10, 25], 30));