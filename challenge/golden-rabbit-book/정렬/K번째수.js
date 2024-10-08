// [문제 이해하기]
// i ~ j 자르고 정렬 후, k번째 있는 수를 구해라
function solution(array, commands) {
  let answer = [];

  for (const [i, j, k] of commands) {
    answer.push(array.slice(i - 1, j).sort((a, b) => a - b)[k - 1]);
  }

  return answer;
}
