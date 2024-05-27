import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const filePath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "/testcase.txt");
const input = fs.readFileSync(filePath).toString().trim().split("\n");

// [문제 이해하기]
// 비밀번호를 알아내는 프로그램을 구현해라.

// 입력: N(테스트 케이스 수), array of strings(입력된 키 값)
// 출력: 진자 비밀번호

// 조건
// 1. <, > : 커서 이동
// 2. - : 백스페이스, 문자 지움(커서 앞에 문자가 있다면)

// 핵심
// 1. 커서 이동이므로 이중 연결 리스트로 구현해야 함.
// 2. head, tail 로 구현하고 마지막 출력은 그냥 null값 까지 출력하면 될듯함.
// 3. 제한 시간 1초, 테케를 100개라고 가정하면 O(n)이면 가능
// 4. 커서 때문에 가상의 노드를 만들어야 함. * => 1 => 2 => 3 => 4 이런 식으로 커서가 왼쪽 끝까지 도달할 수 있게 만들어야 함.


// [문제 세분화]
let n = input[0];
let arr = input.slice(1);

// M. 이중 연결 리스트 구현
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

// M. 기존과 조금은 다른 노드로
// ? => 1 => 2 => 3 => 4 이런 식으로 커서가 끝에 도달할 수 있게 만들어야 함.
class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.init();
    }

    // init
    init() {
        let node = new Node(null);
        this.head = node;
        this.tail = node;
    }

    // next, prev
    next() {
        if (!this.tail.next) return;
        this.tail = this.tail.next;
    }

    prev() {
        if (!this.tail.prev) return;
        this.tail = this.tail.prev;
    }

    // insert, remove
    insert(value) {
        let node = new Node(value);
        let prevNode = this.tail; // I. 커서 이전 노드

        // I. 커서 이후 노드가 없으면 ? => 그냥 추가
        if (!this.tail.next) {
            this.tail.next = node;
            node.prev = this.tail;
        }
        // I. 커서 이후 노드가 있다면 ? => 둘 다 이어줘야 함.
        else {
            let nextNode = prevNode.next;
            prevNode.next = node;
            nextNode.prev = node;
            node.prev = prevNode;
            node.next = nextNode;
        }
        this.tail = node; // I. 추가하고 tail도 변경해야 함.
    }

    remove() {
        if (!this.tail.value) return null; // 가상의 노드면 제거 못하니까 return
        let removed = this.tail;

        // I. 커서 이후 노드가 없으면 ? => 그냥 제거
        if (!this.tail.next) {
            let newTail = removed.prev;
            newTail.next = null;
            removed.prev = null;
            this.tail = newTail; // I. 제거하고 tail도 변경해야 함.
        }
        // I. 커서 이후 노드가 있으면 ? => 둘 다 이어서 처리
        else {
            let prevNode = removed.prev;
            let nextNode = removed.next;
            prevNode.next = nextNode;
            nextNode.prev = prevNode;
            removed.next = null;
            removed.prev = null;
            this.tail = prevNode; // I. 제거하고 tail도 변경해야 함.
        }
    }
}

function solution(n, arr) {
    let answer = "";

    // I. 주어진 문자열에 맞게 비밀번호 찾기
    for (const str of arr) {
        // M. 이중 연결 리스트 생성
        let linkedList = new DoublyLinkedList();

        [...str].forEach(chr => {
            if (chr === "<") {
                linkedList.prev();
            } else if (chr === ">") {
                linkedList.next();
            } else if (chr === "-") {
                linkedList.remove();
            }
            // I. 그외 알파벳 혹은 숫자
            else {
                linkedList.insert(chr);
            }
        });

        let current = linkedList.head.next;
        while (current) {
            answer += current.value;
            current = current.next;
        }
        answer += "\n";
    }

    return answer;
}

console.log(solution(n, arr));