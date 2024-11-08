// [첫 번째 문제 풀이]
// - 트리 형태를 구현하려 했음 => 틀린 접근 방법

// [피드백] => 트리 접근이 아니였네 그냥 obj로 참조 가능해!
// function solution(enroll, referral, seller, amount) {
//   // I. 부모를 만들자
//   let parent = {}; // 배열안에 옵젝이 아님
//   for (let i = 0; i < enroll.length; i++) {
//     parent[enroll[i]] = referral[i];
//   }

//   // I. 돈 기록하는 옵젝
//   let total = {};
//   for (const name of enroll) {
//     total[name] = 0;
//   }

//   // I. seller, amount 가지고 기록시작
//   for (let i = 0; i < seller.length; i++) {
//     let money = amount[i] * 100; // 100원 * 수량
//     let currentKey = seller[i];

//     while (currentKey !== "-" && money > 0) {
//       total[currentKey] += money - Math.floor(money / 10);
//       currentKey = parent[currentKey]; // 부모로 이동

//       money = Math.floor(money / 10); // 다음으로 넘겨야 함
//     }
//   }

//   return enroll.map((name) => total[name]);
// }

// ########################################################################################33

// [문제 이해하기]
// 다단계 구조인데 판매량을 보고 결과를 반환해라.

// 입력: 자식, 부모, 판매자, 판매량
// 출력: 소득 결과 반환

// [제약 조건]
// 발생하는 이익에서 10%을 추천인에게 배분, 반복
// 단, 10% 계산할 때는 원 단위로 절사 + 1원 미만인 경우 이득 분배 x

// [문제 세분화, 접근법]
// # 표(enroll, referral)를 해시로 만들어서 바로 접근가능하게 만듦
// # amount * 100 해서 이익금 산출
// # 총 소득을 담는 result map (center는 계산하지 않아도 됨)

// 1. 해시로 변환
// 2. amount 돌면서 표를 사용해 부모참조, 하나씩 해결

// [문제]
// 테스트 11, 12, 13 => 시간 초과
// 아! income이 0인 경우 center까지 갈 필요가 없음 => while에 조건 추가해서 해결
function solution(enroll, referral, seller, amount) {
  const result = new Map();
  const map = new Map();

  for (let i = 0; i < enroll.length; i++) {
    map.set(enroll[i], referral[i]);
    result.set(enroll[i], 0);
  }

  for (let i = 0; i < amount.length; i++) {
    let income = amount[i] * 100;
    let who = seller[i];

    // who, income이 계속 변경될거임
    while (who !== "-" && income !== 0) {
      // 1원 단위 절삭, 1원 미만 X
      let fee = income * 0.1 < 1 ? 0 : Math.trunc(income * 0.1);
      let mine = income - fee;
      income = fee;
      result.set(who, result.get(who) + mine);
      who = map.get(who);
    }
  }

  return [...result.values()];
}
