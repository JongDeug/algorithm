// [문제 이해하기]
// 계수 정렬 하시오
//
// [문제 풀이]
// ascii code 를 index 로 counting 해서 보내면됨
//
// [문제 세분화]
function solution(s) {
  let countingArr = new Array(26).fill(0);
  // I. s -> array
  [...s].forEach((v) => countingArr[Math.abs(97 - v.charCodeAt(0))]++);

  // I. 그대로 인덱스 변환해서 출력
  let answer = "";
  countingArr.forEach((v, i) => {
    // for (let t = 0; t < v; t++) {
    //   answer += String.fromCharCode(97 + i);
    // }
    answer += String.fromCharCode(97 + i).repeat(v);
  });
  return answer;
}

console.log(solution("hello"));
console.log(solution("algorithm"));
console.log([..."hello"].sort());
