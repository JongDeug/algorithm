// [문제 이해하기]
// k개의 귤을 고름. 결과적으로 구매한 서로 다른 종류의 수의 최솟값을 반환.

// [문제 풀이하기]
// 1. 각 종류의 개수대로 정렬 (내림차순) => map => sort => map
// 2. k개 개수에 맞게 제거

// [문제 세분화]
// 귤을 map => sort => map
// k개 개수에 맞게 귤을 제거 => answer.push => answer.length 반환
function solution(k, tangerine) {
  let answer = new Set();
  let tangerineMap = new Map();
  for (const t of tangerine) {
    tangerineMap.set(t, (tangerineMap.get(t) || 0) + 1);
  }
  let tangerineSort = [...tangerineMap.entries()].sort((a, b) => b[1] - a[1]);

  // for (let i = 0; i < tangerineSort.length; i++) {
  //   for (let j = 0; j < tangerineSort[i][1]; j++) {
  //     if (k > 0) {
  //       k--;
  //       answer.add(tangerineSort[i][0]);
  //     } else break;
  //   }
  // }

  // 더 편하게 작성할 수 있음!
  let sum = 0;
  for (const [t, count] of tangerineSort) {
    answer.add(t);
    sum += count;

    if (sum >= k) break;
  }

  return answer.size;
}

console.log(solution(6, [1, 3, 2, 5, 4, 5, 2, 3]));
