// [문제 이해하기]
// n 인덱스를 기준으로 문자열 정렬하기
//
// [문제 세분화]
function solution(strings, n) {
  strings.sort((a, b) => {
    const numA = a[n].charCodeAt();
    const numB = b[n].charCodeAt();

    if (numA !== numB) {
      return numA - numB;
    } else {
      // 문자열은 비교 연산자로 !
      if (a < b) return -1;
      else if (a > b) return 1;
      else return 0;
    }
  });
  return strings;
}

// [피드백] ==> 흠?
function solution(strings, n) {
  strings.sort((a, b) => {
    if (a[n] === b[n]) {
      return a > b ? 1 : -1;
    } else {
      return a[n] > b[n] ? 1 : -1;
    }
  });
  return strings;
}
