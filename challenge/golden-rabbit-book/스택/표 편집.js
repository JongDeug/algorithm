// [문제 이해하기]
// 모든 명령어를 수행한 후 표의 상태와 처음 주어진 표의 상태를 비교해서 삭제되지 않은 행 O, X 표시 해서 문자열로 return

// [시간 복잡도 예상]
// 이거 C, Z 명령어 때문에 스택을 연결리스트로 만들어야 한다.
// 원하는 인덱스를 push, pop 하려면 O(1)으로 만들어야 함.

// [문제 세분화] ==> 이중 연결 리스트로 풀어보려 했으나
// ==> 예상 못한 시간 복잡도가 있었음. 1,000,000 - 1 인덱스에서 연속해서 C로 삭제했다고 처보자 remove 의 get 때문에 1,000,000 - 1 까지
// 찾을 수 밖에 없음 망한다..

// // I. 이중 연결 리스트 구현해보자!
// class Node {
//     constructor(value) {
//         this.prev = null;
//         this.next = null;
//         this.value = value;
//     }
// }
//
// class DoublyLinkedList {
//     constructor() {
//         this.head = null;
//         this.tail = null;
//         this.length = 0;
//     }
//
//     // Abstract Data Type
//     // - push
//     // - pop
//     // - shift
//     // - unshift
//     // - get
//     // - set
//     // - insert ??
//     // - remove ??
//     push(value) {
//         let node = new Node(value);
//         // I. 노드가 없을 때
//         if(!this.head) {
//             this.head = node;
//             this.tail = node;
//         }
//         // I. 노드가 있을 때
//         else {
//             node.prev = this.tail;
//             this.tail.next = node;
//             this.tail = node;
//         }
//         this.length++;
//     }
//
//     pop() {
//         let removed = null;
//         // I. 비어 있을 때
//         if(this.length <= 0) return removed;
//         // I. 한 개 있을 때
//         if(this.length === 1) {
//             removed = this.head;
//             removed.next = null;
//             removed.prev = null;
//             this.head = null;
//             this.tail = null;
//         }
//         // I. 여러 개 있을 때
//         else {
//             removed = this.tail;
//             this.tail = removed.prev;
//             this.tail.next = null;
//             removed.prev = null;
//         }
//         this.length--;
//         return removed;
//     }
//
//     unshift(value) {
//         let node = new Node(value);
//         // I. 노드가 없을 때
//         if(!this.head) {
//             this.head = node;
//             this.tail = node;
//         }
//         // I. 노드가 여러 개 있을 때
//         else {
//             node.next = this.head;
//             this.head.prev = node;
//             this.head = node;
//         }
//         this.length++;
//     }
//
//     shift() {
//         let removed = null;
//         // I. 노드가 비어 있을 때
//         if(!this.head) return removed;
//         // I. 노드가 한 개 있을 때
//         if(this.length === 1) {
//             removed = this.head;
//             this.head = null;
//             this.tail = null;
//             removed.prev = null;
//             removed.next = null;
//         }
//         // I. 노드가 여러 개 있을 때
//         else {
//             removed = this.head;
//             this.head = removed.next;
//             this.head.prev = null;
//             removed.next = null;
//             removed.prev = null;
//         }
//         this.length--;
//         return removed;
//     }
//
//     get(idx) {
//         if(idx < 0 || idx >= this.length) return null;
//
//         // I. 최적화 가능하지만 일단 head에서 시작
//         let current = this.head;
//         let count = 0;
//
//         while(current) {
//             if(count === idx) return current;
//             current = current.next;
//             count++;
//         }
//     }
//
//     insert(idx, value){
//         // I. 끝, 시작 둘 다 넣을 수도 있음
//         if(idx < 0 || idx > this.length) return null;
//         // I. 끝, 시작
//         if(idx === 0) this.unshift(value);
//         else if(idx === this.length) this.push(value);
//         // I. 중간
//         else {
//             let node = new Node(value);
//             let prev = this.get(idx - 1);
//             let next = prev.next;
//             node.prev = prev;
//             prev.next = node;
//             node.next = next;
//             next.prev = node;
//             this.length++;
//         }
//     }
//
//     remove(idx) {
//         // I. insert 랑 다름, 빼는거니까
//         if(idx < 0 || idx >= this.length) return null;
//
//         if(idx === 0) return this.shift();
//         else if(idx === this.length - 1) return this.pop();
//         else {
//             let removed = this.get(idx);
//             let prev = removed.prev;
//             let next = removed.next;
//             prev.next = next;
//             next.prev = prev;
//             removed.next = null;
//             removed.prev = null;
//             this.length--;
//             return removed;
//         }
//     }
//
// }
// function solution(n, k, cmd) {
//     let startIdx = k;
//     let stack = [];
//     let list = new DoublyLinkedList();
//     let origin = new DoublyLinkedList();
//
//     // I. 연결 리스트 생성
//     for(let i=0; i<n; i++) {
//         list.push(i); // 인덱스 번호가 이름으로 침
//         origin.push(i);
//     }
//
//     // I. cmd 돌자~
//     for(const command of cmd){
//         if(command.startsWith("U")) {
//             let x = Number(command.split(" ")[1]);
//             startIdx = Math.max(0, startIdx - x);
//             // startIdx = startIdx - x;
//             // if(startIdx < 0) startIdx = 0;
//         }else if(command.startsWith("D")) {
//             let x = Number(command.split(" ")[1]);
//             startIdx = Math.min(list.length - 1, startIdx + x);
//             // startIdx = startIdx + x;
//             // if(startIdx >= n) startIdx = n - 1;
//         }else if(command.startsWith("C")){
//             const node = list.remove(startIdx)
//             if(!node) continue;
//             stack.push([startIdx, node]);
//             if(startIdx === list.length) startIdx--;
//             // stack.push([startIdx, node]);
//             // if(startIdx === n-1) startIdx--;
//             // else startIdx++;
//         }else {
//             const removed = stack.pop();
//             if(!removed) continue;
//             list.insert(removed[0], removed[1].value);
//             if(removed[0] <= startIdx) startIdx++;
//         }
//     }
//
//     let answer = "";
//     let currentOrigin = origin.head;
//     let currentList = list.head;
//     while(currentOrigin) {
//         if(currentList && currentOrigin.value === currentList.value) {
//             answer += "O";
//             currentList = currentList.next;
//         }else {
//             answer += "X";
//         }
//         currentOrigin = currentOrigin.next;
//     }
//
//
//     return answer;
// }
//
// const a = solution(8, 2, ["D 2", "C", "U 3", "C", "D 4", "C", "U 2", "Z", "Z"])
// console.log(a)

// [문제 세분화]
// [문제 이해하기]
// 모든 명령어를 수행한 후 표의 상태와 처음 주어진 표의 상태를 비교해서 삭제되지 않은 행 O, X 표시 해서 문자열로 return

// [시간 복잡도 예상]
// 이거 C, Z 명령어 때문에 스택을 연결리스트로 만들어야 한다.
// 원하는 인덱스를 push, pop 하려면 O(1)으로 만들어야 함.

// // [문제 세분화]
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

// [문제 이해하기]
// 모든 명령어를 수행한 후 표의 상태와 처음 주어진 표의 상태를 비교해서 삭제되지 않은 행 O, X 표시 해서 문자열로 return

// [시간 복잡도 예상]
// 이거 C, Z 명령어 때문에 스택을 연결리스트로 만들어야 한다.
// 원하는 인덱스를 push, pop 하려면 O(1)으로 만들어야 함.

// [문제 세분화]
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

// [문제 세분화] => 이게 젤 깔끔하다. n+2 로 배열을 만드는 이유는 해당 인덱스에 진입했을 때 해당 인덱스가 없다고 에러 뜨는거 방지하기 위해서임
function solution(n, k, cmd) {
    let stack = [];
    let current = k+1;
    let direction = Array.from({length: n+2}, (_, i) => [i-1, i+1]);

    // I. cmd
    for(const command of cmd) {
        if(command.startsWith("D") || command.startsWith("U")) {
            let [chr, times] = command.split(' ');
            times = parseInt(times);

            // I. down
            if(chr === "D") {
                for(let i=0; i<times; i++){
                    current = direction[current][1];
                }
            }
            // I. up
            else {
                for(let i=0; i<times; i++) {
                    current = direction[current][0];
                }
            }
        } else if(command.startsWith("C")) {
            stack.push(current);
            const [up,down] = direction[current];
            direction[up][1] = down; // current.up의 down에 current.down;
            direction[down][0] = up; // current.down의 up에 current.up;

            // i. 현재 인덱스 조정 (마지막 요소 지울 때만 위로감)
            // i. 0은 왜 처리안해? 가상 배열을 쓰면 0 쪽으로는 갈 일이 없음
            current = n < down ? up : down;
        } else if(command.startsWith("Z")) {
            const restored = stack.pop();
            const [up, down] = direction[restored];
            direction[up][1] = restored;
            direction[down][0] = restored;
        }
    }

    const answer = new Array(n).fill("O");
    for(const item of stack) {
        answer[item - 1] = "X"; // 가상 요소 사용했으니까 item - 1
    }
    return answer.join("");
}
