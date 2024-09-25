// [문제 이해하기]
// 이진 탐색 트리 생성하고 searchList 값이 있는지 없는지 반환하는 함수를 작성해라.
//
//
// [시간 복잡도]
// BST 생성: 최악의 경우 O(N)
// 검색: 최악의 경우 O(N)
//
//
// [문제 세분화]
//
class BST {
  constructor() {
    this.values = [];
  }

  push(value) {
    // i. 빈 값이면 그냥 넣음
    if (!this.values.length) return this.values.push(value);

    let currentIdx = 0;

    while (true) {
      const current = this.values[currentIdx];
      // i. 작으면 왼쪽
      if (value < current) {
        currentIdx = currentIdx * 2 + 1;
      } else if (value >= current) {
        currentIdx = currentIdx * 2 + 2;
      } else break;
    }

    this.values[currentIdx] = value;
  }

  search(value) {
    if (!this.values.length) return false;

    let currentIdx = 0;

    while (true) {
      const current = this.values[currentIdx];
      if (current === value) return true;

      if (value < current) currentIdx = currentIdx * 2 + 1;
      else if (value >= current) currentIdx = currentIdx * 2 + 2;
      else return false;
    }
  }
}
function solution(lst, searchList) {
  let answer = [];
  let bst = new BST();
  // I. BST 로 만들기
  for (const item of lst) {
    bst.push(item);
  }

  // I. searchList 돌면서 검색!
  for (const item of searchList) {
    answer.push(bst.search(item));
  }

  return answer;
}

console.log(solution([5, 3, 8, 4, 2, 1, 7, 10], [1, 2, 5, 6]));
console.log(solution([1, 3, 5, 7, 9], [2, 4, 6, 8, 10]));
