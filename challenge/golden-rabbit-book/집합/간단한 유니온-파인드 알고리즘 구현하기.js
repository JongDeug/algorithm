// // [문제 이해하기]
// // operations에 있는 연산을 모두 수행한 후의 집합의 개수를 반환하는 함수를 구현해라.
// //
// // [구체적인 예시]
// // 3, [['u', 0, 1], ['u', 1, 2], ['f', 2]] => 1
// // 4, [['u', 0, 1], ['u', 2, 3], ['f', 0]] => 2
// //
// // [문제 세분화]
// // find 연산은 경로 압축하라고 준건가 ?
// function solution(k, operations) {
//   // I. 주어진 k를 활용해 배열 만들기!
//   const arr = Array.from({ length: k }, (_, i) => i);

//   const union = (u, v) => {
//     const rootU = find(u);
//     const rootV = find(v);

//     // I. 더 작은 노드가 자식이 되게끔
//     if (rootU < rootV) arr[rootU] = rootV;
//     else arr[rootV] = rootU;
//   };

//   const find = (u) => {
//     I. 둘 다 경로 압축 됨 ~~
//     if (arr[u] === u) return u;
//     return arr[u] = find(arr[u]);

//     if (arr[u] !== u) {
//       arr[u] = find(arr[u]);
//     }
//     return arr[u];
//   };

//   // I. operations 수행
//   for (const operation of operations) {
//     const [command, u, v] = operation;
//     if (command === "u") union(u, v);
//     else if (command === "f") find(u);
//   }

//   // console.log(arr);
//   // return new Set(arr).size; => 개선
//   return new Set(Array.from({ length: k }, (_, i) => find(i))).size;
// }

// [문제 이해하기] => 복습 큐
// operations에 있는 연산을 모두 수행한 후의 집합의 개수를 반환하는 함수를 구현해라.

// [입력]: 배열 길이, 이차원 배열([u, 자식, 부모])
// [출력]: int 집합의 개수

// [구체적인 예시]
// 3, [['u', 0, 1], ['u', 1, 2], ['f', 2]] => 1
// 4, [['u', 0, 1], ['u', 2, 3], ['f', 0]] => 2

// [접근법]
// 서로소 집합 => 유니온 파인드 함수 구현
// 루트 끼리만 union 한다.

// [문제 세분화]
// 유니온 구현: [자식] = 부모
// 파인드 구현: 경로 압축
// for문 operations 실행
// 모두 실행 후 파인드를 n번 돌아 경로압축
// set 해서 결과 출력
function solution(k, operations) {
  const array = Array.from({ length: k }, (_, i) => i);

  const union = (child, parent) => {
    const rootChild = find(array[child]);
    const rootParent = find(array[parent]);

    // 부모가 같으면 사이클
    if (rootChild !== rootParent) {
      // 풀면서 궁금
      // 1. array[child] = parent가 맞아?
      //  틀림, union은 최상단 루트끼리 합치는거임
      // 2. array[child] = rootParent가 맞아?
      //  틀림, 위에서 말했듯 두 노드의 최상단 루트끼리 합치는거임
      array[rootChild] = rootParent;
    }
  };

  const find = (idx) => {
    if (idx !== array[idx]) {
      array[idx] = find(array[idx]);
    }
    return array[idx];
  };

  for (const op of operations) {
    if (op[0] === "u") {
      union(op[1], op[2]);
    } else {
      find(op[1]);
    }
  }

  // 압축 왜?
  // 아래 예외 케이스 1 참고
  array.forEach((v, i) => {
    find(i);
  });

  // console.log(array);
  return new Set(array).size;
}

// 예외 케이스 1
console.log(
  solution(5, [
    ["u", 1, 2],
    ["u", 0, 1],
    ["u", 3, 1],
    ["u", 2, 4],
  ])
);

// 예외 케이스 2
console.log(
  solution(4, [
    ["u", 2, 1],
    ["u", 0, 1],
    ["u", 2, 3],
  ])
);

// console.log(
//   solution(3, [
//     ["u", 0, 1],
//     ["u", 1, 2],
//     ["f", 2],
//   ])
// );

// console.log(
//   solution(4, [
//     ["u", 0, 1],
//     ["u", 2, 3],
//     ["f", 0],
//   ])
// );
