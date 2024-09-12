// [문제 이해하기]
// 부전승 없는 토너먼트를 하는데 a, b가 만날 라운드를 반환하는 함수를 작성해라.
//
// [문제 세분화]
function solution(n, a, b) {
  let answer = 1;
  let c = Math.min(a, b);
  let d = Math.max(a, b);

  while (true) {
    if (Math.abs(c - d) === 1 && c % 2 === 1 && d % 2 === 0) {
      break;
    } else {
      answer++;
      c = Math.ceil(c / 2);
      d = Math.ceil(d / 2);
    }
  }

  return answer;
}
// console.log(solution(8, 3, 4));
// [피드백]
function solution(n, a, b) {
  let answer = 0;

  // 이렇게 같을 때를 체킹하는 것도 좋네 ㄷㄷ
  while (a !== b) {
    a = Math.ceil(a / 2);
    b = Math.ceil(b / 2);
    answer++;
  }

  return answer;
}
