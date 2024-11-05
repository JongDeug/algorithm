// [정답 코드]
// function solution(orders, course) {
//   let answer = [];
//   // I. course와 orders 를 순회하면서 조합을 만들어야 함.
//   course.forEach((num) => {
//     let bucket = [];

//     orders.forEach((order) => {
//       // I. 이놈이 정렬이 안된 놈임
//       let splitOrder = order.split("").sort();
//       // M. 조합 함수 구현
//       const combination = (tmp, depth) => {
//         if (tmp.length === num) {
//           bucket.push([...tmp]);
//           return;
//         }
//         for (let i = depth; i < splitOrder.length; i++) {
//           if (tmp.includes(splitOrder[i])) continue;
//           tmp.push(splitOrder[i]);
//           combination(tmp, i + 1);
//           tmp.pop();
//         }
//       };

//       combination([], 0);
//     });

//     const counter = new Map();
//     bucket.forEach((item) => {
//       const str = item.join("");
//       counter.set(str, (counter.get(str) || 0) + 1);
//     });

//     const max = Math.max(...counter.values());
//     // I. 최소 2명이 선택
//     if (max > 1) {
//       for (const [key, value] of counter) {
//         // I. 최대이지만 같은 경우도 포함함
//         if (value === max) {
//           answer.push(key);
//         }
//       }
//     }
//   });
//
//   return answer.sort();
// }

// [문제 이해하기] => 정답 코드, 이게 더 깔끔한듯?
// 코스 어쩌고 저쩌고,,, 코스 요리 메뉴를 구성하기로 함. 적절한 코스 메뉴는?

// [문제 풀이하기]
// course에 있는 숫자를 가지고 orders에서 조합을 구함
// orders를 돌면서 구한 조합이 있는지 체크+카운팅(해시)
// 해시 카운트 정렬 후 상위 두 놈 뺌. if 카운트가 2이상이 아니거나 조합 자체가 없으면 추가하지 않음
// 결과는 정렬을 한 상태에서 줘야함.
function solution(orders, course) {
  let answer = [];
  // course -> orders 순서로
  course.forEach((num) => {
    const counter = new Map();

    orders.forEach((order) => {
      order = order.split("").sort();

      const combination = (depth, tmp) => {
        if (tmp.length === num) {
          // 이잉씨 여기서 나는 order를 또 돌라했음. 하지만 조합에서 나온 것이 곧 정답임
          const joinTmp = tmp.join("");
          counter.set(joinTmp, (counter.get(joinTmp) || 0) + 1);
          return;
        }

        for (let i = depth; i < order.length; i++) {
          tmp.push(order[i]);
          combination(i + 1, tmp);
          tmp.pop();
        }
      };

      combination(0, []);
    });

    const max = Math.max(...counter.values());
    // 두 명 이상이 뽑았는가?
    if (max >= 2) {
      for (const [key, value] of counter) {
        if (value === max) {
          answer.push(key);
        }
      }
    }
  });

  return answer;
}
