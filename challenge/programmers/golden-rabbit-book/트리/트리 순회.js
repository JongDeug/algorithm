// [문제 이해하기]
// 이진 트리에 대하여 전위, 중위, 후위 순회 결과를 반환하는 solution 함수를 구현해라.
//
function solution(nodes) {
  // I. 전위 순회
  const preorder = (tmp, i) => {
    if (nodes.length <= i) return;

    tmp.push(nodes[i]);
    preorder(tmp, i * 2 + 1);
    preorder(tmp, i * 2 + 2);

    return tmp;
  };
  // I. 중위 순회
  const inorder = (tmp, i) => {
    if (nodes.length <= i) return;

    inorder(tmp, i * 2 + 1);
    tmp.push(nodes[i]);
    inorder(tmp, i * 2 + 2);

    return tmp;
  };
  // I. 후위 순회
  const postorder = (tmp, i) => {
    if (nodes.length <= i) return;

    postorder(tmp, i * 2 + 1);
    postorder(tmp, i * 2 + 2);
    tmp.push(nodes[i]);

    return tmp;
  };

  const preoderArr = preorder([], 0);
  const inorderArr = inorder([], 0);
  const postorderArr = postorder([], 0);

  return [preoderArr.join(" "), inorderArr.join(" "), postorderArr.join(" ")];
}

console.log(solution([1, 2, 3, 4, 5, 6, 7]));
