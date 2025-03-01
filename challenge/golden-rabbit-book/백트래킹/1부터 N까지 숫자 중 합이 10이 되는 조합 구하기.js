// [문제 이해하기]
// 1 ~ N 까지 숫자 중 합이 10이 되는 조합을 배열로 반환하라.
//
//
// [문제 세분화]
// 중복 없는 조합 구현하면 됨 => 순열 X
// function solution(N) {
//   let answer = [];
//   let visited = new Array(N).fill(false);
//   let numArr = Array.from({ length: N }, (_, i) => i + 1);

//   const combination = (tmp, depth, sum) => {
//     // Base Case => promising function
//     if (sum >= 10) {
//       if (sum === 10) answer.push([...tmp]);
//       return;
//     }

//     for (let i = depth; i < N; i++) {
//       if (!visited[i]) {
//         visited[i] = true;
//         tmp.push(numArr[i]);
//         combination(tmp, i + 1, sum + numArr[i]); // depth + 1 하면 depth 가 현재 인덱스 기준으로 커지지 않음
//         tmp.pop();
//         visited[i] = false;
//       }
//     }
//   };

//   combination([], 0, 0);
//   return answer;
// }

// console.log(solution(5));
// console.log(solution(7));
// console.log(solution(2));

// [문제 이해하기]
// 1 ~ N 까지 숫자 중 합이 10이 되는 조합을 배열로 반환하라.

// [접근법]
// 오브젝트 해시로 해결하는 방법
// 중복없는 조합으로 해결하는 방법 V

// [문제 세분화]
function solution(n) {
  const ans = [];
  const combination = (tmp, depth) => {
    // base case
    if (tmp.reduce((acc, value) => acc + value, 0) === 10) {
      ans.push([...tmp]);
      return;
    }

    for (let i = depth; i <= n; i++) {
      tmp.push(i);
      combination(tmp, i + 1);
      tmp.pop();
    }
  };
  combination([], 1);
  return ans;
}

console.log(solution(5));
console.log(solution(7));
