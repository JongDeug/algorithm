class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor(val) {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    // [문제 이해하기]
    // 단일 연결 리스트 push 함수 구현하기
    // 입력 : int, 출력 : singlyLinkedList(this)
    // 핵심 : push는 뒤에 값을 넣어주는 것.
    // [구체적인 예시 찾기]
    // 딱히 예시가 필요 없음.
    // [문제를 세분화 하기]
    push(val) {
        // val을 가지고 새로운 node 생성하기
        let node = new Node(val);

        // 연결 리스트에 값이 있을 경우
        if (!this.head) {
            this.head = node;
            this.tail = node;
        }
        // 연결 리스트에 값이 없을 경우
        else {
            // tail의 next에 node 삽입
            this.tail.next = node;
            // 새로운 node를 tail로 변경
            this.tail = node;
        }
        // 연결리스트 길이 up
        this.length++;
        // return this
        return this;
    }

    // [문제 이해하기]
    // 단일 연결 리스트의 pop 함수 구현하기
    // 입력 : x, 출력 : node or undefined
    // 핵심 : 단일 연결 리스트의 pop은 tail로만 처리할 수 없기에 반복문이 필요함.
    // [구체적인 예시 찾기]
    // 딱히 필요 없음
    // [문제 세분화하기]
    pop() {
        // 연결 리스트에 값이 있는지 확인
        if (!this.head) return undefined;
        let removed = this.tail;

        // 연결 리스트에 값이 딱 하나 있는 경우
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        }
        // 그 외
        else {
            // 반복해서 tail 전 값을 찾아야 함.
            let findPrevTail = this.head;
            while (findPrevTail.next !== this.tail) {
                findPrevTail = findPrevTail.next;
            }
            // 찾은 node의 next를 null로
            findPrevTail.next = null;
            // 찾은 node를 tail로 변경
            this.tail = findPrevTail;
        }
        // length 줄이기
        this.length--;
        // return 제거된 노드
        return removed;
    }

    set(idx, value) {
        let node = this.get(idx);
        if (node) {
            node.val = value;
            return true;
        }
        return false;
    }

    // [문제 이해하기]
    // 단일 연결 리스트 get 함수 구현하기
    // 입력 : index(int), 출력 : node or null
    // 핵심 : get은 쉽지. 카운트와 함께 반복문을 돌리면 됨
    // [구체적인 예시]
    // singlyLinkedList.get(0).val // 5
    // singlyLinkedList.get(4) // null
    // [문제 세분화 하기]
    get(idx) {
        // idx 범위 체킹하기, null
        if (idx < 0 || idx >= this.length) return null;

        // count 변수와 단일 연결 리스트 반복문
        let current = this.head;
        let count = 0;
        while (current) {
            if (count === idx) break;
            current = current.next;
            count++;
        }

        // return node
        return current;
    }

    unshift(val) {
        let node = new Node(val);

        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            node.next = this.head;
            this.head = node;
        }
        this.length++;
        return this;
    }

    // [문제 이해하기]
    // 단일 연결 리스트 insert 함수 구현하기
    // 입력 : index(int), value(int), 출력 : boolean
    // 핵심 : get 함수 활용 인지는 index - 1 사용, 끝과 처음은 unshift, push 사용
    // [구체적인 예시찾기]
    // singlyLinkedList.insert(5,25); // true
    // [문제 세분화하기]
    insert(idx, val) {
        // index 범위 유효성 검사, false
        if (idx < 0 || idx > this.length) return false;

        if (idx === this.length) return !!this.push(val);
        else if (idx === 0) return !!this.unshift(val);
        else {
            // 새로운 노드 생성
            const node = new Node(val);
            // get 함수 사용, idx - 1
            // 찾은 노드 저장(next 사용할거임)
            const foundNode = this.get(idx - 1); // 유효성 검사를 했으니 괜찮아!
            // 찾은 노드의 next를 새로운 노드 next에 주입
            // 찾은 노드의 next에 새로운 노드 주입
            node.next = foundNode.next;
            foundNode.next = node;
            // length 증가
            this.length++;
            return true;
        }
    }
}
