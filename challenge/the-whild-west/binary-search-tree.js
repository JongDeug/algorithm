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
}

let b = new BinarySearchTree();
b.insert(10);
b.insert(20);
b.insert(30);
console.log(b.find(20).right);
