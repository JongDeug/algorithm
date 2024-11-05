// [문제 이해하기]
// 정현이가 원하는 물건을 다 살 수 있는 날들을 구해서 반환해라.

// [시간 복잡도]
// obj로 만들어 뿌면 O(N * 10) => O(N) 으로 만들 수 있음

// [문제 세분화]
function solution(want, number, discount) {
  let answer = 0;

  // I. discout.length - 9 => 값 이전 까지 탐색
  for (let i = 0; i < discount.length - 9; i++) {
    // I. want, number 합친 obj 생성
    let dataObj = {};
    for (let i = 0; i < want.length; i++) {
      dataObj[want[i]] = number[i];
    }

    // i. obj에서 값을 뺀다.
    discount.slice(i, i + 10).forEach((item) => {
      if (dataObj[item]) dataObj[item] -= 1;
    });
    // i. obj 값이 0이 아닌 놈이 있으면 answer x
    let flag = true;
    for (const key in dataObj) {
      if (dataObj[key] !== 0) flag = false;
    }
    // i. 다 0이면 answer ++
    if (flag) answer++;
  }

  return answer;
}
