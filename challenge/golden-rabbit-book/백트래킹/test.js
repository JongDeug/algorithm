// // [문제 이해하기] => 내 코드는 방문한 취약 지점을 제대로 추적하지 못하고, 모든 경우의 수를 구하지 않는게 문제다.
// // 외벽의 취약 지점을 점검하기 위해 보내야 하는 최소 친구 수 return

// // [입력]: int(n, 외벽 길이), arr(weak, 취약 지점), arr(dist, 친구 이동 가능 거리)
// // [출력]: int(최소 친구 수)
// // - 만약 전부 점검할 수 없는 경우 -1 return

// // [접근법]
// // 각 취약 지점 + n 해서 한 바퀴 돌 수 있는 긴 배열을 만든다.
// // dist를 내림차순으로 정렬한 뒤 천천히 돌아본다.

// // [문제 세분화]
// // min값 정의
// // weak 길이 만큼 for문 (i, 기준점)
// // 	while i를 기준점으로 사용, j를 count로 사용, j는 dist의 idx
// // 		arr[i] + dist[j] < arr[i+1]
// //			=> i += 1, 다음 취약점으로
// //		arr[i] + dist[j] >= arr[i+1]
// //			=> 다른 취약점으로
// //		j += 1;
// //	min = Math.min(min, j);
// // 만약 min이 weak 배열 길이면 return -1
// function solution(n, weak, dist) {
//   // min 값
//   let answer = Infinity;
//   // 긴 배열 생성
//   const arr = [...weak];
//   weak.forEach((v) => arr.push(v + n));
//   // 내림차순으로 정렬
//   dist = dist.sort((a, b) => b - a);

//   // weak 길이만큼 반복
//   for (let i = 0; i < weak.length; i++) {
//     let startIdx = i;
//     let j = 0; // count로 사용, dist idx로 사용
//     const visited = new Set();

//     while (
//       startIdx < arr.length &&
//       j < dist.length &&
//       visited.size < weak.length
//     ) {
//       const sum = arr[startIdx] + dist[j];
//       visited.add(startIdx);
//       if (sum < arr[startIdx + 1]) startIdx++;
//       else {
//         // sum이 큰 경우 적절한 위치(idx)로 이동해야
//         for (let k = startIdx + 1; k < arr.length; k++) {
//           visited.add(k);
//           if (sum < arr[k]) {
//             startIdx = k;
//             break;
//           }
//         }
//       }
//       j++; // count up
//     }
//     answer = Math.min(answer, j);
//   }

//   return answer > dist.length ? -1 : answer;
// }

// [한 번 개선] => 여기에 모든 경우의 수를 주면 (중복없는 순열) 해결된다
function solution(n, weak, dist) {
  // min 값
  let answer = dist.length + 1;
  // 긴 배열 생성
  const newWeak = [...weak, ...weak.map((x) => x + n)];
  // 내림차순으로 정렬
  dist = dist.sort((a, b) => b - a);

  // weak 길이만큼 반복
  for (let i = 0; i < weak.length; i++) {
    let j = i;
    let count = 1; // idx로 사용, 이미 1을 정한 시점이잖아.
    let position = newWeak[j] + dist[count - 1]; // 다음 위치

    // j < i + weak.length가 핵심임. ******************************
    while (j < i + weak.length && count <= dist.length) {
      // 적절한 다음 위치를 찾을 때까지
      if (position < newWeak[j]) {
        count++;
        position = newWeak[j] + dist[count - 1]; // 다음 위치 새롭게 구함
      }
      j++;
    }
    answer = Math.min(answer, count);
  }

  return answer > dist.length ? -1 : answer;
}

console.log(solution(12, [1, 3, 4, 9, 10], [3, 5, 7]));
console.log(solution(12, [1, 5, 6, 10], [1, 2, 3, 4]));
