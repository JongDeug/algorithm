// [문제 이해하기]
// 전화번호가 주어지는데 어떤 번호가 다른 번호의 접두어인 경우가 있으면 false, 아니면 true 반환

// [문제 풀이 방법]
// 1. 문자열 그대로 정렬(NlogN) 후 N번 돌면서 이놈으로 시작하면 false
function solution(phone_book) {
  // I. 이놈으로 시작하는 놈이 하나라도 있으면 true가 반환이 됨 => 역으로 변환해야함.
  return !phone_book.sort().some((v, i, arr) => arr[i + 1]?.startsWith(v));
}
