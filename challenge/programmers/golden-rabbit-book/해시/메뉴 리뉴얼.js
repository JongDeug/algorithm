// [문제 이해하기]
// 주문 목록을 보고 단품세트를 만드는 로직을 짜라.
//
// [문제 세분화]
// function solution(orders, course) {
//   let answer = new Set();
//
//   // I. 알파벳 카운트
//   const alphabetCount = new Map();
//   orders.forEach((str) => {
//     [...str].forEach((chr) => {
//       alphabetCount.set(chr, (alphabetCount.get(chr) || 0) + 1);
//     });
//   });
//
//   // M. subSet 구하는 함수
//   const subSet = (depth, tmp, bucket) => {
//     if (depth === bucket.length) {
//       if (tmp.length > 0) {
//         answer.add(tmp.join(""));
//       }
//       return;
//     }
//
//     tmp.push(bucket[depth]);
//     subSet(depth + 1, tmp, bucket);
//     tmp.pop();
//
//     subSet(depth + 1, tmp, bucket);
//   };
//
//   // I. course 기준 알파벳 뽑음 => 뽑은 알파벳으로 조합
//   course.forEach((num) => {
//     let bucket = [];
//     for (const item of alphabetCount) {
//       const [key, value] = item;
//       if (value >= num) bucket.push(key);
//     }
//     subSet(0, [], bucket);
//   });
//
//   console.log(answer);
// }

function solution(orders, course) {
  // I. course와 orders 를 순회하면서 조합을 만들어야 함.
  course.forEach((num) => {
    let bucket = [];

    orders.forEach((order) => {
      let splitOrder = order.split(" ");
      // M. 조합 함수 구현
      const combination = (tmp, depth) => {
        if (tmp.length === n) {
          bucket.push([...tmp]);
          return;
        }
        for (let i = depth; i < splitOrder.length; i++) {
          if (tmp.includes(splitOrder[i])) continue;
          tmp.push(splitOrder[i]);
          combination(tmp, depth + 1);
          tmp.pop();
        }
      };

      combination(splitOrder, num, []);
    });
  });
}
