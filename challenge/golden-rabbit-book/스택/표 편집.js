// [문제 풀이 기록]
// 이거 C, Z 명령어 때문에 스택을 연결리스트로 만들어야 한다.
// 원하는 인덱스를 push, pop 하려면 O(1)으로 만들어야 함.

// 1.
// ==> 이중 연결 리스트로 풀어보려 했으나
// ==> 예상 못한 시간 복잡도가 있었음. 1,000,000 - 1 인덱스에서 연속해서 C로 삭제했다고 쳐보자
// ==> 연결리스트 remove 의 get 때문에 1,000,000 - 1 까지 찾을 수 밖에 없음

// 2. 복습 큐
// ==> 표를 stack으로 만들고 이걸로 관리하면 시간초과
// ==> 안빼고 인덱스로 관리하면 됨, 삭제했을 때는 stack에 담는다
// ==> 그럼 인덱스는 어떻게 관리?
// ==> while 문

// 2-1. [코드] => 효율성에서 틀림
// function solution(n, k, cmd) {
//     // M. stack
//     const stack = [0, n+1];
//     let answer = "";
//     k += 1;

//     const move = (direction, x) => {
//         let i = k, j = k;
//         // i는 범위, x는 이동 횟수
//         while(x > 0 && i >= 1 && i <= n) {
//             if(direction === "U") i--;
//             else if(direction === "D") i++;

//             if(stack.includes(i)) continue; // 0, n+1 이 포함되어 있기에 continue
//             j = i;
//             x--;
//         }
//         return j;
//     }

// 	for(const str of cmd) {
//         const [c, x] = str.split(" ");
//         if(c === "U" || c === "D") {
//         	k = move(c, +x);
//         }else if(c === "Z") {
//             stack.pop();
//         }else if(c === "C") {
//             let tmp = k;
//             stack.push(k);
//             k = move("D", 1);
//             // k가 그대로면 마지막행이라는 뜻
//             if(tmp === k) k = move("U", 1);
//         }
//     }

//     for(let i=1; i<=n; i++) {
//         if(stack.includes(i)) answer += "X";
//         else answer += "O";
//     }
//     return answer;
// }

// 3. 정답 코드
// [코드]
// function solution(n, k, cmd) {
//     let stack = [];
//     let startIdx = k;
//     let origin = Array.from({length: n}, (_, i) => ({value: i, next: i+1, prev: i-1}));
//     let change = Array.from({length: n}, (_, i) => ({value: i, next: i+1, prev: i-1}));
//
//     // I. cmd 명령어 돌기
//     for(const command of cmd){
//         if(command.startsWith("U")) {
//             let x = Number(command.split(" ")[1]);
//             startIdx = Math.max(0, startIdx - x);
//         }else if(command.startsWith("D")) {
//             let x = Number(command.split(" ")[1]);
//             startIdx = Math.min(n-1, startIdx + x);
//         }else if(command.startsWith("C")){ // 삭제
//             const removed = change[startIdx];
//             delete change[startIdx];
//
//             if(startIdx === n-1) {
//                 change[removed.prev].next = null;
//             }  else if(startIdx === 0) {
//                 change[removed.next].prev = null;
//             }
//             else {
//                 change[removed.prev].next = removed.next;
//                 change[removed.next].prev = removed.prev;
//             }
//             stack.push([startIdx, removed])
//         }else {
//             const restore = stack.pop();
//             const restoreIdx = restore[0];
//             const restoreData = restore[1];
//             change[restoreIdx] = restoreData;
//             if(restoreIdx === n - 1) {
//                 change[restoreData.prev].next = restoreIdx;
//             } else if(restoreIdx === 0) {
//                 change[restoreData.next].prev = restoreIdx;
//             }
//             else {
//                 change[restoreData.prev].next = restoreIdx;
//                 change[restoreData.next].prev = restoreIdx;
//             }
//         }
//     }
//
//     let answer = '';
//
//     for(let i=0; i<n; i++) {
//         const item = change[i];
//         if(!item) answer += "X";
//         else answer += "O";
//     }
//
//     return answer;
// }

// function solution(n, k, cmd) {
//     let stack = [];
//     let startIdx = k;
//     let change = Array.from({ length: n }, (_, i) => {
//         if (i === 0) return { prev: null, next: i + 1 };
//         else if (i === n - 1) return { prev: i - 1, next: null };
//         return { prev: i - 1, next: i + 1 };
//     });
//     let deleted = Array.from({ length: n }, () => false);
//
//     // I. cmd 명령어 돌기
//     for (const command of cmd) {
//         if (command.startsWith("U")) {
//             let x = Number(command.split(" ")[1]);
//             for (let i = 0; i < x && change[startIdx].prev !== null; i++) {
//                 startIdx = change[startIdx].prev;
//             }
//         } else if (command.startsWith("D")) {
//             let x = Number(command.split(" ")[1]);
//             for (let i = 0; i < x && change[startIdx].next !== null; i++) {
//                 startIdx = change[startIdx].next;
//             }
//         } else if (command.startsWith("C")) { // 삭제
//             const removed = change[startIdx];
//             deleted[startIdx] = true;
//             stack.push(startIdx);
//
//             // 케이스 1: 현재 노드가 리스트의 중간에 있는 경우
//             if (removed.prev !== null && removed.next !== null) {
//                 change[removed.prev].next = removed.next;
//                 change[removed.next].prev = removed.prev;
//                 startIdx = removed.next;
//             }
//             // 케이스 2: 현재 노드가 리스트의 첫 번째 노드인 경우
//             else if (removed.prev === null && removed.next !== null) {
//                 change[removed.next].prev = null;
//                 startIdx = removed.next;
//             }
//             // 케이스 3: 현재 노드가 리스트의 마지막 노드인 경우
//             else if (removed.prev !== null && removed.next === null) {
//                 change[removed.prev].next = null;
//                 startIdx = removed.prev;
//             }
//
//         } else {
//             const restoredIdx = stack.pop();
//             const restored = change[restoredIdx];
//             deleted[restoredIdx] = false;
//
//             // I. 이전 값이 null 이 아니면 초기화
//             if (restored.prev !== null) {
//                 change[restored.prev].next = restoredIdx;
//             }
//
//             // I. 이후 값이 null 이 아니면 초기화
//             if (restored.next !== null) {
//                 change[restored.next].prev = restoredIdx;
//             }
//
//             // if (restoredIdx === n - 1) {
//             //     change[restored.prev].next = restoredIdx;
//             // } else if (restoredIdx === 0) {
//             //     change[restored.next].prev = restoredIdx;
//             // } else {
//             //     change[restored.prev].next = restoredIdx;
//             //     change[restored.next].prev = restoredIdx;
//             // }
//
//         }
//     }
//
//     return deleted.map(e => e === true ? "X" : "O").join("");
// }
//
// const a = solution(8, 2, ["D 2", "C", "U 3", "C", "D 4", "C", "U 2", "Z", "Z"]);
// console.log(a);

// [피드백]
// while 문 이동은 아무래도 O(n) 이동 시간이 걸리므로 무리가 있음
// => O(1) 로 개선하기 위해서 up down 인덱스를 저장하면 됨
// => while 문 작성 중 stack에 [0, n+1] 을 넣어 처리했듯이 direction을 n+2 로 관리
function solution(n, k, cmd) {
  let stack = [];
  let cursor = k + 1;
  let direction = Array.from({ length: n + 2 }, (_, i) => [i - 1, i + 1]);

  for (const str of cmd) {
    const [c, x] = str.split(" ");
    if (c === "U" || c === "D") {
      const times = +x;
      for (let i = 0; i < times; i++) {
        if (c === "U") cursor = direction[cursor][0];
        else cursor = direction[cursor][1];
      }
    } else if (c === "Z") {
      let restoreIdx = stack.pop();
      let [restoreUp, restoreDown] = direction[restoreIdx];

      // 복구
      direction[restoreUp][1] = restoreIdx;
      direction[restoreDown][0] = restoreIdx;
    } else if (c === "C") {
      stack.push(cursor);
      const [currentUp, currentDown] = direction[cursor];
      // 수정
      direction[currentUp][1] = currentDown; // 위(의)[아래]
      direction[currentDown][0] = currentUp; // 아래(의)[위]

      // i. 현재 인덱스 조정 (마지막 요소 지울 때만 위로감)
      // 마지막 행이면 currentUp, 그게 아니면 아래 행 선택
      cursor = n < currentDown ? currentUp : currentDown;
    }
  }
}
