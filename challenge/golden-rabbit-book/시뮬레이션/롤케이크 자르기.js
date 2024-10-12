// [문제 이해하기]
// 토핑을 기준으로 롤케이클르 공평하게 자르는 방법의 수를 return 하는 함수를 구현해라.

// [문제 풀이]
// (틀린 풀이)
// 배열의 크기만큼 잘라서
// 집합으로 변환 후 길이 체킹
// 배열을 순환하면서 스플릿해서 집합으로 변경 => O(N^2)
//
// (맞는 풀이)
// 카운터(map)로 만들어 놓고, n번 돌면서 넣으면 됨 => O(N)
//
// [시간 복잡도]
// N * N, N^2 => 1,000,000 * 1,000,000 이면 시간 복잡도 초과임
// 반복이 안되면 어떻게 구현하지 ??? 이상한데
//
// 어떤 방법이 있는거지?
// 먼저 카운트 해놓고, n번 돌리면 됨
//
// [문제 세분화]
function solution(topping) {
  let answer = 0;
  // I. map or object 생성, set 생성
  const brother = new Map();
  const me = new Set();

  for (const t of topping) {
    brother.set(t, (brother.get(t) || 0) + 1);
  }

  for (const t of topping) {
    me.add(t); // 내꺼에 추가
    brother.set(t, brother.get(t) - 1); // 형꺼 빼기

    // count 0되면 map에서 삭제
    if (brother.get(t) === 0) brother.delete(t);

    // 형이랑 내꺼랑 같으면 공평
    if (me.size === brother.size) answer++;
  }

  return answer;
}

console.log(solution([1, 2, 1, 3, 1, 4, 1, 2]));
console.log(solution([1, 2, 3, 1, 4]));
