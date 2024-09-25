// [문제 이해하기]
// 1,2,3 각각 찍는 방식이 다른데 문제가 주어졌을 때 가장 많이 맞추는 사람 출력해라. 오름차순으로 정렬

// [문제 세분화]
function solution(answers) {
  // M. 정답 obj
  let answer = Array.from({ length: 3 }, (_, i) => ({ num: i + 1, count: 0 }));
  // M. 1,2,3 패턴 배열에 담기
  let num1 = [1, 2, 3, 4, 5];
  let num2 = [2, 1, 2, 3, 2, 4, 2, 5];
  let num3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
  // M. 인덱스 넘어가면 찾아주는 함수 작성
  const range = (length, i) => {
    if (i < length) return i;
    return i % length;
  };
  // I. for 문 answers 기준으로. 정답 맞추면 정답 obj 담기
  for (let i = 0; i < answers.length; i++) {
    const num1Idx = range(num1.length, i);
    const num2Idx = range(num2.length, i);
    const num3Idx = range(num3.length, i);
    if (answers[i] === num1[num1Idx]) answer[0].count += 1;
    if (answers[i] === num2[num2Idx]) answer[1].count += 1;
    if (answers[i] === num3[num3Idx]) answer[2].count += 1;
  }

  const max = Math.max(...answer.map((item) => item.count));
  const result = [];
  answer.forEach((item) => {
    if (max === item.count) result.push(item.num);
  });
  return result;
}

// [피드백]
// 많이 맞춘 사람 기준으로 오름차순 정렬해서 반환했음. => X
// 많이 맞춘 사람 => 그 중 동일하게 맞춘 사람이 있다면 오름차순 정렬해서 반환
//

