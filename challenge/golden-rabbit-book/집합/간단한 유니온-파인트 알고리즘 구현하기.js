// [문제 이해하기]
// operations에 있는 연산을 모두 수행한 후의 집합의 개수를 반환하는 함수를 구현해라.
//
// [구체적인 예시]
// 3, [['u', 0, 1], ['u', 1, 2], ['f', 2]] => 1
// 4, [['u', 0, 1], ['u', 2, 3], ['f', 0]] => 2
//
// [문제 세분화]
// find 연산은 경로 압축하라고 준건가 ?
function solution(k, operations) {
  // I. 주어진 k를 활용해 배열 만들기!
  const arr = Array.from({ length: k }, (_, i) => i);

  const union = (u, v) => {
    const rootU = find(u);
    const rootV = find(v);

    // I. 더 작은 노드가 자식이 되게끔
    if (rootU < rootV) arr[rootU] = rootV;
    else arr[rootV] = rootU;
  };

  const find = (u) => {
    // I. key === value 가 같으면 반환
    // if (arr[u] === u) return u;
    // return arr[u] = find(arr[u]);
    // I. 경로 압축은 어떻게 하더라??  ==> 핵심!!
    if (arr[u] !== u) {
      arr[u] = find(arr[u]);
    }
    return arr[u]; // 얘는 key, value가 같을 때, 마지막에 실행되구만
  };

  // I. operations 수행
  for (const operation of operations) {
    const [command, u, v] = operation;
    if (command === "u") union(u, v);
    else if (command === "f") find(u);
  }

  // console.log(arr);
  // return new Set(arr).size; => 개선
  return new Set(Array.from({ length: k }, (_, i) => find(i))).size;
}

// console.log(
//   solution(4, [
//     ["u", 0, 1],
//     ["u", 2, 3],
//     ["f", 0],
//   ]),
// );

console.log(
  solution(3, [
    ["u", 0, 1],
    ["u", 1, 2],
    ["f", 2],
  ]),
);
