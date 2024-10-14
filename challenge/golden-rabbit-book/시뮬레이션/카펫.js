// [문제 이해하기]
// 주어진 갈색, 노란색 격자 수를 보고 격자의 가로 세로 크기를 배열에 담에 return 하는 함수를 작성해라.

// [문제 세분화]
// 1. brown + yellow = width * height;
// 2. h = (b + 4) / 4, 이하이다. ((b-4) / 4) + 2 = h 를 정리한거임
//
// 정확한 계산 w-2 * h-2 === yellow
// I. 이중 for문으로 구현
//
//
// [피드백]
// 카펫의 가로 길이는 세로 길이와 같거나, 세로 길이보다 깁니다.
// 이 조건을 못봤네, 이래서 height는 작은 숫자부터 시작해야겠다
function solution(brown, yellow) {
  // I. height 부터 해야지
  let total = brown + yellow;

  // for (let h = Math.ceil((brown + 4) / 4); h >= 3; h--) {
  for (let h = 3; h <= brown + yellow; h++) {
    let w = Math.floor(total / h);
    if ((w - 2) * (h - 2) === yellow) return [w, h];
  }
}

console.log(solution(8, 1));
console.log(solution(10, 2));
console.log(solution(24, 24));
