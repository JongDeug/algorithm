// [문제 이해하기]
// 다단계 레퍼럴 구조인데 각 enroll 의 최종 수익을 배열로 반환하는 함수를 구현해라.
//
// [입력]
// enroll: 모든 판매원
// referral: 각 판매원에 대한 추천인
// seller: 판매원
// amount: 판매원의 판매량
//
// [문제 세분화] ==> 아주 틀린 방법으로 접근하고 있었음
// class Node {
//   constructor(name) {
//     this.name = name;
//     this.value = 0;
//     this.parent = null;
//     this.child = new Map(); // I. obj 으로 가자
//   }
// }
// class Tree {
//   constructor() {
//     this.root = new Node("-");
//     this.current = this.root;
//   }
//
//   // i. insert
//   // i. update
//   // i. print
//
//   insert(childNode, ref) {
//     this.current.child.set(childNode.name, childNode);
//     // I. 레벨이 내려가면 current 변경
//     if(this.current.name !== ref) {
//       this.current = this.current.child.get(ref);
//     }
//   }
//
//   update(seller, amount) {}
//
//   print() {}
// }
// function solution(enroll, referral, seller, amount) {
//   const tree = new Tree();
//   const sales = new Map();
//   // I. enroll, referral 으로 트리를 생성한다.
//   for (let i = 0; i < enroll.length; i++) {
//     let childNode = new Node(enroll[i]);
//     tree.insert(childNode, referral[i]);
//   }
//   // I. seller, amount 로 데이터를 판매 데이터를 생성한다.
//   for (let i = 0; i < seller.length; i++) {
//     sales.set(seller[i], amount[i]);
//   }
//   // I. 판매 데이터를 순회하며 트리의 값을 변화 시킨다. (down => up)
//   for (const [seller, amount] of sales) {
//     tree.update(seller, amount);
//   }
//
//   // I. 출력!
//   return tree.print();
// }
// [피드백] => 트리 접근이 아니였네 그냥 obj로 참조 가능해!
function solution(enroll, referral, seller, amount) {
  // I. 부모를 만들자
  let parent = {}; // 배열안에 옵젝이 아님
  for (let i = 0; i < enroll.length; i++) {
    parent[enroll[i]] = referral[i];
  }

  // I. 돈 기록하는 옵젝
  let total = {};
  for (const name of enroll) {
    total[name] = 0;
  }

  // I. seller, amount 가지고 기록시작
  for (let i = 0; i < seller.length; i++) {
    let money = amount[i] * 100; // 100원 * 수량
    let currentKey = seller[i];

    while (currentKey !== "-" && money > 0) {
      total[currentKey] += money - Math.floor(money / 10);
      currentKey = parent[currentKey]; // 부모로 이동

      money = Math.floor(money / 10); // 다음으로 넘겨야 함
    }
  }

  return enroll.map((name) => total[name]);
}
