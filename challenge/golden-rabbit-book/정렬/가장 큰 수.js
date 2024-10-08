// [문제 이해하기]
// 정수를 이어 붙였을 때 가장 큰 수를 return

// [문제 풀이]
// 순열을 생각했는데 numbers 길이가 100,000임
// 정렬로 풀어야 하는 문제

// [구체적인 예시 찾기]
// 문자 그대로 정렬해서 붙이면 된다고 생각했는데
// [3, 30, 34, 5, 9] => 정렬
// [9, 5, 34, 30, 3] => but, 9534330 이 더큼
// ㅋㅋㅋ 다 0인 경우도 있네

// [문제 세분화]
// I. 비교 정렬할 때 a, b를 붙여서 누가 더 큰지 비교 해야함.
function solution(numbers) {
  let answer = numbers
    .map(String)
    .sort((a, b) => {
      const str1 = a + b;
      const str2 = b + a;
      // 사전식 정렬
      // 문자열 길이 고려: 짧은 문자열이 긴 문자열보다 앞에 위치
      return str1 < str2 ? 1 : -1; // 붙였을 때 뒤가 크면 사전식 정렬, 앞이 크면 사전 반대
    })
    .join("");

  return Number(answer) === 0 ? "0" : answer;
}
