// [문제 이해하기]
// 주문 목록을 보고 단품세트를 만드는 로직을 짜라.
//
// [조건]
// 주문할 때 가장 많이 함께 주문한 단품메뉴들을 코스요리 메뉴로 구성하기로 했다.
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

// [문제 세분화] => 아니 ...
function solution(orders, course) {
  let answer = [];
  // I. course와 orders 를 순회하면서 조합을 만들어야 함.
  course.forEach((num) => {
    let bucket = [];

    orders.forEach((order) => {
      // I. 이놈이 정렬이 안된 놈임
      let splitOrder = order.split("").sort();
      // M. 조합 함수 구현
      const combination = (tmp, depth) => {
        if (tmp.length === num) {
          bucket.push([...tmp]);
          return;
        }
        for (let i = depth; i < splitOrder.length; i++) {
          if (tmp.includes(splitOrder[i])) continue;
          tmp.push(splitOrder[i]);
          combination(tmp, i + 1);
          tmp.pop();
        }
      };

      combination([], 0);
    });

    const counter = new Map();
    bucket.forEach((item) => {
      const str = item.join("");
      counter.set(str, (counter.get(str) || 0) + 1);
    });

    const max = Math.max(...counter.values());
    // I. 최소 2명이 선택
    if (max > 1) {
      for (const [key, value] of counter) {
        // I. 최대이지만 같은 경우도 포함함
        if (value === max) {
          answer.push(key);
        }
      }
    }
  });

  return answer.sort();
}
