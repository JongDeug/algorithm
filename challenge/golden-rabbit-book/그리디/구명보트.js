// [문제 이해하기]
// 최대한 적은 구명 보트로 모든 사람을 구출해라.

// [문제 풀이하기]
// 최대한 적은 => 보트에 꽉꽉 채워야함.
// 정렬 후 그리디

// [문제 세분화] => 틀린 구현.. 그리디를 잘못 적용함
// I. people 오름차순 정렬
// I. 만약 합이 remain 이하라면 remain = limit - 합
// I. 만약 remain 초과했다면 remain = limit, answer++
// => 이렇게 구현하면 answer이 제대로 안나옴
// => 투포인터로 구현하면 편할듯함
// function solution(people, limit) {
//   people.sort((a, b) => a - b);
//   let answer = 0;
//   let sum = 0;
//   let [i, j] = [0, 0];
//   while (j < people.length) {
//     sum += people[j];
//     // 넘으면
//     if (sum > limit) {
//       answer++;
//       sum = 0;
//       i = j;
//     } else {
//       j++;
//     }
//   }
//   return answer + 1;
// }

// 예외 케이스 찾음
// 2로 처리할 수 있는데 정렬하고 작은 것부터
// 처리하면 3으로 나옴..
// console.log(solution([20, 30, 70, 80], 100)); //

function solution(people, limit) {
  let answer = 0;
  let [i, j] = [0, people.length - 1];
  people.sort((a, b) => a - b);
  while (i <= j) {
    if (people[i] + people[j] <= limit) {
      i++;
    }
    // 짝 맞춰서 결과나온거 아닌 이상 마지막 요소(0인덱스)에서 +1 해줘야됨
    answer++;
    j--;
  }
  return answer;
}

// console.log(solution([20, 30, 70, 80], 100)); //
console.log(solution([60, 70, 80], 100)); //
