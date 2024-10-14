// [문제 이해하기]
// 아이언 슈트를 가지고 N까지 이동할 때 건전지 사용량의 최솟값을 return 하시오

// [문제 풀이]
// K 이동은 건전지 값이 듦
// K * 2 순간이동은 건전지 값이 들지 않음
// N을 넘기고 다시 back 할 수 있는 문제면 다른 방식으로 접근해야 하는데 오직 앞으로만 가므로
// 짝수면 /2 홀수면 -1 해서 구하면 끝

// [문제 세분화]
// function solution(n) {
//   let num = n;
//   let answer = 0;
//   // I. 0이 아닐 때 까지
//   while (num) {
//     if (num % 2 === 0) num /= 2;
//     else {
//       num -= 1;
//       answer++;
//     }
//   }
//   return answer;
// }

// [피드백], 이진수로 변경했을 때 나머지가 1이면 K 점프한거임
function solution(n) {
  return n
    .toString(2)
    .split("")
    .filter((x) => x === "1").length;
}

console.log(solution(5));
