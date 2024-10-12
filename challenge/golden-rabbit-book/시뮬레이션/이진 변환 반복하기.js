// [문제 이해하기]
// 어떤 문자열 x에 대해 주어진 방법대로 이진 변환을 하고
// [이진 변환의 횟수, 제거된 0의 개수] 를 반환하는 함수를 작성해라.
//
// 1. x의 0을 제거한다.
// 2. 제거한 문자열의 길이를 2진법으로 표현해라.
// 3. '1'이 될때까지 반복해라.
//
// [시간 복잡도]
// S 길이가 150,000, 다 0이면 splice, slice 이런 함수 사용했을 때 좀 걸리겠다
//
// [문제 세분화]
// I. x를 정렬, 1인 놈을 찾아서 길이 반환
// I. 2진법으로 표현하는 함수 있을텐데 num.toString(2) 와 이거 첨앎;;
// I. 다시 반복
function solution(s) {
  let str = s;
  let changeCount = 0;
  let removeCount = 0;

  while (str !== "1") {
    let arr = [...str].sort().map(Number);

    arr = arr.filter((x) => {
      if (x !== 0) return true;
      else {
        removeCount++;
        return false;
      }
    });

    str = arr.length.toString(2); // 이거 죽이네
    // parseInt => N진법 문자를 10진법 정수로 반환
    // toString => 10진법 숫자를 N진법 문자열로 반환

    changeCount++;
  }

  return [changeCount, removeCount];
}

console.log(solution("01110"));
console.log(solution("110010101001"));
