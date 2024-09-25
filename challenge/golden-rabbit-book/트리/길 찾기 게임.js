// [문제 이해하기]
// 이진 트리를 전위, 후위 순회해서 배열로 반환하는 로직을 구현해라 .
//
// [문제 세분화]
// nodeinfo.sort() y기준으로 정렬 O(NlogN) => 이진 트리 변환 x기준으로 O(N)
// 주어진 배열 i+1 을 노드 값으로 설정
// 순회 => O(N)
// 시간 초과남 어디서 문제일까
// class Node {
//   constructor(value, x) {
//     this.value = value;
//     this.x = x;
//   }
// }
// class BinararyTree {
//   constructor() {
//     this.values = [];
//   }
//
//   // I. insert
//   // I. preorder
//   // I. postorder
//
//   insert(node) {
//     // I. 배열에 값이 없을 때
//     if (!this.values.length) {
//       this.values.push(node);
//       return;
//     }
//
//     let currentIdx = 0;
//
//     while (true) {
//       let current = this.values[currentIdx];
//       let leftIdx = currentIdx * 2 + 1;
//       let rightIdx = currentIdx * 2 + 2;
//
//       // I. 값이 없으면 종료
//       if (!current) {
//         this.values[currentIdx] = node;
//         break;
//       }
//
//       // I. 값이 작냐
//       if (node.x < current.x) {
//         currentIdx = leftIdx;
//       } else if (node.x > current.x) {
//         currentIdx = rightIdx;
//       } else break;
//     }
//   }
//
//   preorder(tmp, i, n) {
//     if (!this.values[i]) return;
//
//     tmp.push(this.values[i].value);
//     this.preorder(tmp, i * 2 + 1, n);
//     this.preorder(tmp, i * 2 + 2, n);
//     return tmp;
//   }
//
//   postorder(tmp, i, n) {
//     if (!this.values[i]) return;
//
//     this.postorder(tmp, i * 2 + 1, n);
//     this.postorder(tmp, i * 2 + 2, n);
//     tmp.push(this.values[i].value);
//     return tmp;
//   }
// }
// function solution(nodeinfo) {
//   // I. nodeinfo index 정보 추가
//   nodeinfo = nodeinfo.map((v, i) => [...v, i + 1]);
//   // I. nodeinfo 정렬
//   nodeinfo.sort((a, b) => b[1] - a[1]);
//   console.log(nodeinfo);
//   // I. binararyTree 생성
//   const btree = new BinararyTree();
//   for (const item of nodeinfo) {
//     let node = new Node(item[2], item[0]);
//     btree.insert(node);
//   }
//
//   // I. 순회
//   return [
//     btree.preorder([], 0, nodeinfo.length),
//     btree.postorder([], 0, nodeinfo.length),
//   ];
// }
//
//
// [피드백] 왜 시간 초과가 났던 걸까?
// 맞아요, 배열의 인덱스 접근 자체는 O(1) 시간이 소요됩니다.
// 하지만 이진 트리에서 삽입 과정은 단순히 배열 인덱스 접근뿐만 아니라,
// 노드의 위치를 찾아가면서 비교하고 이동해야 하는 과정이 있기 때문에
// 시간이 더 걸릴 수 있습니다.
// ==> 배열을 또 늘려야 하니까 시간이 더 걸리는듯?
//
// javascript 배열은 크기를 굳이 설정하지 않잖아. 크기를 늘릴때 시간이 많이 걸리는건가?

// JavaScript의 배열은 고정된 크기를 가지지 않고,
// 필요에 따라 자동으로 크기가 늘어납니다.
// 동적으로 크기가 커지면서 데이터를 추가할 수 있습니다.
// 하지만 배열의 크기가 커질 때 발생할 수 있는 성능 문제는
// 배열 크기가 커질 때의 메모리 재할당 때문일 수 있습니다.

class Node {
  constructor(value, x) {
    this.value = value;
    this.x = x;
    this.left = null;
    this.right = null;
  }
}
class BinararyTree {
  constructor() {
    this.root = null;
  }

  // I. insert
  // I. preorder
  // I. postorder

  insert(node) {
    // I. 배열에 값이 없을 때
    if (!this.root) {
      this.root = node;
      return;
    }

    let current = this.root;

    while (true) {
      // I. 값이 작냐
      if (node.x < current.x) {
        if (!current.left) {
          current.left = node;
          break;
        }
        current = current.left;
      } else if (node.x > current.x) {
        if (!current.right) {
          current.right = node;
          break;
        }
        current = current.right;
      }
    }
  }

  preorder(tmp, current) {
    if (!current) return;

    tmp.push(current.value);
    this.preorder(tmp, current.left);
    this.preorder(tmp, current.right);

    return tmp;
  }

  postorder(tmp, current) {
    if (!current) return;

    this.postorder(tmp, current.left);
    this.postorder(tmp, current.right);
    tmp.push(current.value);

    return tmp;
  }
}
function solution(nodeinfo) {
  // I. nodeinfo index 정보 추가
  nodeinfo = nodeinfo.map((v, i) => [...v, i + 1]);
  // I. nodeinfo 정렬
  nodeinfo.sort((a, b) => b[1] - a[1]);
  console.log(nodeinfo);
  // I. binararyTree 생성
  const btree = new BinararyTree();
  // O(N^2)
  for (const item of nodeinfo) {
    let node = new Node(item[2], item[0]);
    btree.insert(node);
  }

  // I. 순회
  return [btree.preorder([], btree.root), btree.postorder([], btree.root)];
}

console.log(
  solution([
    [5, 3],
    [11, 5],
    [13, 3],
    [3, 5],
    [6, 1],
    [1, 3],
    [8, 6],
    [7, 2],
    [2, 2],
  ]),
);
