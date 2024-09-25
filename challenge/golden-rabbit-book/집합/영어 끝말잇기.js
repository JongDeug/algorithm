// [문제 이해하기]
// 끝말잇기를 계속 진행해서 가장 먼저 탈락하는 사람의 번호와 그 사람이 자신의 몇 번째 차례에 탈락하는지 구해라

// [문제 세분화]
// I. words를 n번 훑으면서 끝말잇기를 잘하고 있는지 확인
// i. 만약 다르면 index % length, index / length 로 측정해서 반환
// i. 해시 테이블 만들면서 값이 중복(2) 면 중지 후 반환
function solution(n, words) {
  // I. 해시 테이블 => 맵, 집합으로 변경해서 has 를 사용해도됨
  const checkduplicate = {};
  let prevAlpha = words[0][0]; // 처음은 첫단어의 첫글자

  // I. words 일루와
  for (const [idx, word] of Object.entries(words)) {
    const numIdx = Number(idx);
    checkduplicate[word] = (checkduplicate[word] || 0) + 1;
    // I. 끝말잇기, 해시 테이블 중복 측정
    if (prevAlpha !== word[0] || checkduplicate[word] >= 2) {
      return [(numIdx % n) + 1, Math.floor(numIdx / n) + 1];
    }
    prevAlpha = word[word.length - 1];
  }

  return [0, 0];
}
