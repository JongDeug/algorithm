// [문제 이해하기]
// 부분 배낭 문제, 물건을 쪼갤 수 있음.
// 쪼개지 못하면 dp 로 푸는 문제임
//
// [문제 풀이]
// 그리디로 풀면됨
//
// [문제 세분화하기]
function solution(items, weight_limit) {
  let ans = 0;
  // I. 가치 / 무게 를 기준으로 정렬 (DESC)
  items.sort((a, b) => {
    let aW = a[1] / a[0];
    let bW = b[1] / b[0];
    return bW - aW;
  });

  // I. 배낭에서 무게를 뺌.
  for (const [w, v] of items) {
    if (w <= weight_limit) {
      ans += v;
      weight_limit -= w;
    } else if (weight_limit !== 0) {
      // 만약 무게가 넘치면 ?  아이템 가치 / 아이템 무게 측정 후
      // 남은 무게만큼 넣어주면 됨
      ans += (v / w) * weight_limit;
      weight_limit = 0;
    }
  }

  return ans.toFixed(2);
}

console.log(
  solution(
    [
      [10, 19],
      [7, 10],
      [6, 10],
    ],
    15,
  ),
);

console.log(
  solution(
    [
      [10, 60],
      [20, 100],
      [30, 120],
    ],
    50,
  ),
);
