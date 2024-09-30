// [문제 이해하기]
// 유저가 최대한 많은 던전을 탐험할 수 있도록 return 해라.

// [문제 파악]
// 정렬 문제는 아님. 모든 경우를 탐색해야 함 => 완탐
// 8^8 => 16,777,216 시간 복잡도 OK
// 모든 순열을 구하고 거기에 맞게 던전 수를 구해서 가장 큰 던전 수를 반환하면 될듯

// [문제 세분화] => 내가 풀었던 방식
// function solution(k, dungeons) {
//   const bucket = [];
//   let answer = [];
//   const permutation = (tmp, depth) => {
//     if (tmp.length === dungeons.length) {
//       bucket.push([...tmp]);
//       return;
//     }
//
//     for (let i = depth; i < dungeons.length; i++) {
//       if (tmp.includes(i)) continue;
//       tmp.push(i);
//       permutation(tmp, depth);
//       tmp.pop();
//     }
//   };
//   permutation([], 0);
//
//   for (const item of bucket) {
//     let copyK = k;
//     // I. item 배열대로 던전을 돈다.
//     const count = item.reduce((acc, value) => {
//       const [minPirodo, burnPirodo] = dungeons[value];
//       if (copyK >= minPirodo) {
//         copyK -= burnPirodo;
//         return ++acc;
//       }
//       return acc;
//     }, 0);
//
//     answer.push(count);
//   }
//   return Math.max(...answer);
// }

// [피드백] => 백트래킹 적용
function solution(k, dungeons) {
  const visited = new Set();
  // DFS 는 중첩 반복문이라 생각하면 편함
  const dfs = (K, count) => {
    let maxCount = count;

    for (let i = 0; i < dungeons.length; i++) {
      const [minPirodo, burnPirodo] = dungeons[i];
      if (K >= minPirodo && !visited.has(i)) {
        visited.add(i);
        // I. 지렸다
        maxCount = Math.max(maxCount, dfs(K - burnPirodo, count + 1));
        visited.delete(i);
      }
    }

    return maxCount;
  };
  return dfs(k, 0);
}
