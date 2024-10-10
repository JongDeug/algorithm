// [문제 이해하기]
// 중복되는 원소가 없는 집합이 주어질 때 원소를 찾아 반환하라.

// [문제 풀이]
// 양옆 {{}} 을 제거하고 },{ 로 분리 후 길이 순서대로 set에 집어넣으면 해결되겠다.
// 시간 복잡도 O(NlogN), 길이 순서대로 정렬해야하니깐

// [문제 세분화]
function solution(s) {
  // I. 분리 후 정렬
  let splitArr = s
    .slice(2, -2)
    .split("},{")
    .map((v) => v.split(",").map(Number));
  splitArr.sort((a, b) => a.length - b.length);

  // I. 집합에 넣기
  let newSet = new Set();
  splitArr.map((element) => element.map((v) => newSet.add(v)));
  return [...newSet];
}
