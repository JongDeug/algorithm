// [문제 이해하기]
// 정수를 받고 내림차순으로 정렬해 return 해줘!
function solution(n) {
  // I. n -> string, string -> string[], string[] -> number[], -> sort
  let answer = [...n.toString()].map((chr) => parseInt(chr));
  answer.sort((a, b) => b - a);
  return parseInt(answer.join(""));
}
