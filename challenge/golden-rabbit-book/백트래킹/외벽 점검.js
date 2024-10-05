// [문제 이해하기]
// 취약 지점을 모두 점검할 수 있는 최소한의 친구 수를 반환해라.
//
// [문제 풀이]
// 왼쪽, 오른쪽 이동 방향은 상관없다.
// weak 에 n 을 더하여 24시간 시계처럼 만든다.
// weak 길이가 2배로 늘어남
// dist 중복 없는 순열로 해결
// 투입 가능한 친구 수를 초과하는 경우 -1 반환
//
// [문제 세분화] => 어렵긴하네
// function solution(n, weak, dist) {
//   let answer = dist.length + 1; //
//
//   const permutationWithFunctionalProgramming = (arr, n) => {
//     if (n === 0) return [[]]; // n이 depth 역할을 하는 구만
//     const result = [];
//
//     arr.forEach((fixed, idx) => {
//       // 현재 요소를 제외한 나머지 요소들을 복사
//       const rest = [...arr];
//       rest.splice(idx, 1);
//
//       const perms = permutationWithFunctionalProgramming(rest, n - 1);
//
//       const combine = perms.map((p) => [fixed, ...p]);
//
//       result.push(...combine);
//     });
//
//     return result;
//   };
//
//   const permutations = [];
//   const check = new Array(dist.length).fill(false);
//   // I. dist로 순열 구하기
//   const permutation = (tmp) => {
//     if (tmp.length === dist.length) {
//       permutations.push([...tmp]);
//       return;
//     }
//
//     for (let i = 0; i < dist.length; i++) {
//       if (!check[i]) {
//         // if (tmp.includes(dist[i])) continue; // [1, 1] 이면 될 수가 없구나...
//         check[i] = true;
//         tmp.push(dist[i]);
//         permutation(tmp);
//         tmp.pop();
//         check[i] = false;
//       }
//     }
//   };
//   permutation([]);
//
//   // I. 주어진 weak 길이가 2배 (24시간 시계처럼 만든다)
//   const originLength = weak.length;
//   for (let i = 0; i < originLength; i++) {
//     weak.push(weak[i] + n);
//   }
//
//   // I. weak 지점을 시작으로 탐색 시작
//   for (let i = 0; i < originLength; i++) {
//     for (const friends of permutations) {
//       let count = 1;
//       let position = weak[i] + friends[count - 1];
//
//       // 여기가 이해가 잘 안됐음
//       for (let j = i; j < i + originLength; j++) {
//         if (position < weak[j]) {
//           count++;
//           if (count > dist.length) break; // 투입 가능한 친구 수 초과하면 break; , >= 아님
//           position = weak[j] + friends[count - 1];
//         }
//       }
//
//       answer = Math.min(answer, count);
//     }
//   }
//   // console.log(permutationWithFunctionalProgramming(dist, dist.length));
//   // console.log(permutations);
//   return answer <= dist.length ? answer : -1;
// }

// [피드백]
// 복잡한 문제일 수록 단순화 해라.
//
// [문제 풀이]
// 시계 방향만 고려해도 반시계 방향의 취약 지점을 커버할 수 있음
// weak + n => 24시간 시계가 되도록 만든다.
// dist(친구 거리) 를 가지고 순열을 구한다, 그리고 weak 0부터 다 돌려본다.
// 조합도 되는지 판단해보자! => 투입 순서도 중요해서 순열이 맞다고 판단함
function solution(n, weak, dist) {
  // // I. 순열
  const check = new Array(dist.length).fill(false);
  const cases = [];
  const permutation = (tmp) => {
    if (tmp.length === dist.length) {
      cases.push([...tmp]);
      return;
    }

    for (let i = 0; i < dist.length; i++) {
      if (!check[i]) {
        check[i] = true;
        tmp.push(dist[i]);
        permutation(tmp);
        check[i] = false;
        tmp.pop();
      }
    }
  };
  permutation([]);

  // I. weak 초기화
  const originWeakLength = weak.length;
  for (let i = 0; i < originWeakLength; i++) {
    weak.push(weak[i] + n);
  }

  // I. 정답
  let answer = dist.length + 1;

  // I. weak 0부터 모든 경우를 다 구해보는거, 생성된 친구 거리 순열에 따라
  for (let i = 0; i < originWeakLength; i++) {
    for (const distItem of cases) {
      let count = 1; // count, idx 겸
      let position = weak[i] + distItem[count - 1];

      for (let j = i + 1; j < i + originWeakLength; j++) {
        // 다음 취약지점 까지 못갔다면
        if (position < weak[j]) {
          count++;
          // 친구를 다써도 모든 취약 지점을 커버하지 못했다면 count 는 dist.length 를 넘을거임
          if (count > dist.length) break;
          position = weak[j] + distItem[count - 1];
        }
      }

      answer = Math.min(answer, count); // 인덱스 겸
    }
  }

  return answer > dist.length ? -1 : answer;
}

console.log(solution(12, [1, 5, 6, 10], [1, 2, 3, 4]));
console.log(solution(12, [1, 5, 8, 10], [1, 1, 1, 1])); // 이렇게 길이가 안되면 count 에서 길이를 넘어버리고 answer 가 처음 그대로 유지되는거임
