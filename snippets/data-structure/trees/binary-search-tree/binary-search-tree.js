class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// BST
class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    // insert
    // find
    // remove (조금 어려웠음!)

    insert(value) {
        let node = new Node(value);

        if (!this.root) {
            this.root = node;
            return this;
        }

        let current = this.root;
        while (true) {
            if (node.value === current.value) return undefined;

            if (node.value < current.value) {
                // left가 없으면 넣고 종료
                if (!current.left) {
                    current.left = node;
                    return this;
                }
                current = current.left;
            } else if (node.value > current.value) {
                // right가 없으면 넣고 종료
                if (!current.right) {
                    current.right = node;
                    return this;
                }
                current = current.right;
            }
        }
    }

    find(value) {
        if (!this.root) return false;

        let current = this.root;
        while (current) {
            if (current.value === value) return current;

            // 크면
            if (current.value < value) {
                if (!current.right) return false;
                current = current.right;
            }
            // 작으면
            else if (current.value > value) {
                if (!current.left) return false;
                current = current.left;
            }
        }
    }

    // find의 다른 방식
    /*find(value) {
        if (!this.root) return false;

        let current = this.root;
        let found = false;
        while (current && !found) {
            if (value < current.value) {
                current = current.left;
            } else if (value > current.value) {
                current = current.right;
            } else {
                found = true;
            }
        }
        if (!found) return false;
        return current;
    }*/

    // [문제 이해하기]
    // BST remove 함수 구현
    // 입력 : int, 출력 : x
    // 핵심 :
    // 1) 삭제할 노드가 단말 노드인 경우
    // 2) 삭제할 노드가 하나의 자식을 갖는 경우
    // 3) 삭제할 노드가 2개 자식을 모두 갖는 경우
    //  3-1) 적절한 후계자 : 왼쪽 서브트리의 가장 큰값 or 오른쪽 서브트리의 가장 작은 값
    //  3-2) searchSuccessor 적절한 후계자를 찾는 함수
    // 4) recursion 재귀로 구현.
    // [문제 세분화하기]
    remove(key) {
        const searchSuccessor = this.searchSuccessor;
        // 헬퍼 함수 (key, node)를 인자로
        (function helper(key, current) {
            // Base Case 공백이면 return;
            if (!current) return null;

            // key 찾기
            if (key === current.value) {
                // Case 1, Case(오른쪽 자식만 있는 경우) : 단말 노드인 경우, 자식이 하나인 경우
                if (!current.left) return current.right;
                // Case 2(왼쪽 자식만 있는 경우) : 자식이 하나인 노드인 경우
                if (!current.right) return current.left;
                // Case 3 : 자식이 두 개인 노드
                // 적절한 후계자 : 서브 트리 오른쪽 선택(오른쪽에서 가장 왼쪽이 후계자)
                let successor = searchSuccessor(current.right);
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

    searchSuccessor(current) {
        while (current.left) {
            current = current.left;
        }
        return current;
    }
}