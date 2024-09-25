class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    // [문제 이해하기]
    // 이진 탐색 트리에서 삽입 함수 구현하기
    // 입력 : int, 출력 : this
    // 핵심 : 이진 탐색 트리는 루트 왼쪽이 작은 값, 오른쪽이 큰값이 들어감.
    // [문제 세분화 하기]
    insert(value) {
        // node 생성
        let node = new Node(value);
        // 값이 없을 때 로직
        if (!this.root) {
            this.root = node;
        }
        // 값이 있으면 비교해서 교환(자식 노드가 있는지 없는지 확인해야함.)
        else {
            // 반복문
            let current = this.root;
            while (true) {
                // (같은 건 어떻게 처리할건지?)
                if (node.value === current.value) return undefined;

                // 왼(있으면 왼쪽으로 이동, 없으면 node 삽입)
                if (node.value < current.value) {
                    if (current.left) current = current.left;
                    else {
                        current.left = node;
                        break;
                    }
                }
                // 오른
                else {
                    if (current.right) current = current.right;
                    else {
                        current.right = node;
                        break;
                    }
                }
            }
        }
        return this;
    }

    // [문제 이해하기]
    // 이진 탐색 트리에서 find 함수 구현, 반복(iteration)으로 구현
    // 입력 : find value(int), 출력 : node or undefined(not found)
    // 핵심 : 반복으로 구현 하자!
    // [문제 세분화 하기]
    find(value) {
        // 트리에 암것도 없을 때
        if (!this.root) return undefined;
        // root node를 받아서 value와 함께 검사.
        let current = this.root;
        while (current) {
            // 같으면
            if (value === current.value) return current;

            // 작으면 왼
            if (value < current.value) {
                if (!current.left) return undefined;
                current = current.left;
            } else {
                if (!current.right) return undefined;
                current = current.right;
            }
        }
    }

    // [문제 이해하기]
    // BST DFS 구현 하기 (재귀로 해보자), pre, in, post order 모두 구현
    // 입력 : x, 출력 : array (없으면 빈 배열)
    // 핵심 : 재귀로 구현, call stack도 stack이라 재귀로 구현해도 무방함.
    // [문제 세분화 하기]
    depthFirstSearchPreOrder() {
        let result = [];

        (function preOrder(current) {
            if (!current) return;

            result.push(current.value);
            preOrder(current.left);
            preOrder(current.right);
        })(this.root);

        return result;
    }

    depthFirstSearchInOrder() {
        let result = [];

        (function inOrder(current) {
            if (!current) return;

            inOrder(current.left);
            result.push(current.value);
            inOrder(current.right);
        })(this.root);

        return result;
    }

    depthFirstSearchPostOrder() {
        let result = [];

        (function postOrder(current) {
            if (!current) return;

            postOrder(current.left);
            postOrder(current.right);
            result.push(current.value);
        })(this.root);

        return result;
    }

    // [문제 이해하기]
    // BST BFS 함수 구현하기
    // 입력: x, 출력 : array (없으면 빈 배열)
    // 핵심 : Iteration, 큐로 구현하기!, 시간 복잡도가 달리 없으니 그냥 array로 구현하기
    // [문제 세분화하기]
    breadthFirstSearch() {
        if (!this.root) return [];
        let current = this.root;
        // result
        let result = [];
        // 큐 생성, 초기화
        let queue = [current];

        // 반복문
        while (queue.length) {
            let node = queue.shift();
            result.push(node.value);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        return result;
    }

    // [문제 이해하기]
    // BST에서 가장 두 번째로 큰 값을 찾아서 반환
    // 입력 : x, 출력 : int
    // 핵심 : 오른쪽이 가장 큰 값이므로, 그 위 노드가 두 번째로 큰 값임.
    // [문제 세분화하기]
    findSecondLargest() {
        // 값이 없을 경우
        if (!this.root) return undefined;

        // 값이 있는 경우
        // previous에 저장한 다음 반환 해야함.
        // current
        let current = this.root;
        let previous;

        while (current.right) {
            previous = current;
            current = current.right;
        }
        return previous ? previous.value : previous;
    }

    // [문제 이해하기]
    // BST remove 함수 구현하기
    // 입력 : int, 출력 : x
    // 핵심 :
    // 1) 삭제할 노드가 단말 노드인 경우
    // 2) 삭제할 노드가 하나의 자식을 갖는 경우
    // 3) 삭제할 노드가 2개 자식을 모두 갖는 경우 => 적절한 후계자 ? 왼쪽 서브트리의 가장 큰값 or 오른쪽 서브트리의 가장 작은 값
    // 3) => search-min-bst() 함수 구현 해야함.
    // 재귀로 구현 할거임.
    // [문제 세분화하기]
    remove(key) {
        const searchMinBST = this.searchMinBST;
        // 헬퍼 함수 (key, node)를 인자로
        (function helper(key, current) {
            // Base Case 공백이면 return;
            if (!current) return null;

            // key를 찾는거니깐 left, right, 찾기
            if (key === current.value) {
                // Case 1, Case(오른쪽 자식만 있는 경우) : 단말 노드인 경우, 자식이 하나인 경우
                if (!current.left) return current.right;
                // Case 2(왼쪽 자식만 있는 경우) : 자식이 하나인 노드인 경우
                if (!current.right) return current.left;
                // Case 3 : 자식이 두 개인 노드(서브트리 오른쪽 선택할거임)
                // searchMinBST 사용
                let successor = searchMinBST(current.right);
                current.value = successor.value;
                current.right = helper(successor.value, current.right);
            } else if (key < current.value) {
                current.left = helper(key, current.left);
            } else if (key > current.value) {
                current.right = helper(key, current.right);
            }

            return current;
        })(key, this.root);
        // return 은 없음.
    }

    searchMinBST(current) {
        while (current.left) {
            current = current.left;
        }
        return current;
    }

    // [문제 이해하기]
    // BST 에서 균형 트리를 유지하고 있는지 확인하는 함수 구현
    // 입력 : x, 출력 : boolean
    // 핵심 : 모든 leaf 노드 또는 단일 자식이 있는 노드의 깊이가 하나 이하인 경우만 true 반환
    // 핵심 : AVL 트리를 말하는 건지 잘 모르겠음. AVL 트리는 왼쪽 오른쪽 높이 차가 1이 넘으면 안되는 거거든. 즉 1이하 여야 함.
    // [문제 세분화하기]
    // calculateHeightDiff
    // calculateHeight 이 두 함수 구현
    isBalanced() {
        let diff = this.calculateHeightDiff(this.root);
        return diff <= 1;
    }

    calculateHeightDiff(root) {
        if (!root) return 0;
        return Math.abs(this.calculateHeight(root.left) - this.calculateHeight(root.right));
    }

    calculateHeight(current) {
        // Base case
        if(!current) return 0;
        return this.calculateHeight(current.left) + this.calculateHeight(current.right) + 1;
    }
}

var binarySearchTree2 = new BinarySearchTree();
binarySearchTree2.insert(10);
binarySearchTree2.insert(5);
binarySearchTree2.insert(20);
binarySearchTree2.insert(3);
binarySearchTree2.insert(7);
binarySearchTree2.insert(2);
console.log(binarySearchTree2.isBalanced());