// [문제 이해하기]
// 예산에 맞게 각 부서가 신청한 금액만큼 모두 지원했다면 최대 몇 개의 부서에 물품을 지원했는지 return

// [문제 풀이하기]
// 최대한 많은 부서에 지원해야 하므로 오름차순으로 정렬 후 그리디 사용

// [문제 세분화하기]
// I. 오름차순 정렬
// I. reduce 함수 활용?!
function solution(d, budget) {
  return d
    .sort((a, b) => a - b)
    .reduce(
      (acc, value) => {
        if (acc.sum + value <= budget) {
          acc.sum += value;
          acc.answer++;
          return acc;
        }
        return acc;
      },
      { sum: 0, answer: 0 },
    ).answer;
}
