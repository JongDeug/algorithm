// [문제 이해하기]
// 최소한의 화폐수로 거스름돈을 받는 방법
function solution(amount) {
  let ans = [];
  let returnMoney = [100, 50, 10, 1];

  const rec = (amount, idx) => {
    if (amount === 0) return;

    let count = Math.floor(amount / returnMoney[idx]);
    let remain = amount % returnMoney[idx];
    for (let i = 0; i < count; i++) {
      ans.push(returnMoney[idx]);
    }
    rec(remain, idx + 1);
  };

  rec(amount, 0);

  return ans;
}

console.log(solution(123));
console.log(solution(350));
