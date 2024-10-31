// [문제 이해하기]
// '두 수의' 합이 target이 되는 수가 arr에 있는지 찾아라

// [문제 풀이하기]
// 무작정 원소끼리 더해보는 것은 O(N^2) 복잡도를 가짐
// 1 ~ target 이하 해시를 만들고, target - key 값이 있는지 없는지 확인하면 됨

function solution(arr, k) {
  // arr -> map
  const hashTable = new Map();
  for (const num of arr) {
    if (num <= k) {
      hashTable.set(num, true);
    }
  }

  for (const [key, _] of hashTable) {
    const result = k - key;
    // 6 - 3 = 3일 경우를 제거
    if (result !== key && hashTable.has(result)) return true;
  }
  return false;
}
console.log(solution([1, 2, 3, 4, 8], 6));
console.log(solution([1, 2, 4], 7));
console.log(solution([2, 3, 5, 9], 10));
console.log(solution([1, 3, 2024, 1000], 6));
