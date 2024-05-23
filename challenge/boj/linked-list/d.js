import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const filePath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "/testcase.txt");
const input = fs.readFileSync(filePath).toString().trim().split("\n");

// [문제 이해하기]
// 주어진 명령어를 수행하고 난 뒤의 문자열을 반환하는 함수를 구현하라.

// 입력: str(문자열), n(명령어 개수), arr(명령어)
// 출력: string

// 조건, 명령어
// L : 커서를 왼쪽으로 => 맨 왼쪽이면 무시
// D : 커서를 오른쪽으로 => 맨 오른쪽이면 무시
// B : 커서 왼쪽에 있는 문자 삭제
// P $ : $ 문자를 커서 오른쪽에 추가

// 핵심
// 틀린 생각)
// 연결리스트로 구현된 stack을 사용해도 되지만 그냥 문자열 함수를 통해서 구현할 것임.
// 올바른 생각)
// 시간 복잡도 때문에 이중 연결리스트, stack 만 사용해야 함.

// [문제 세분화]
let str = input[0];
let n = input[1];
let arr = input.slice(2).map(x => x.split(" "));

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
        this.current = null;
    }

    // push, pop
    // unshift, shift
    // get, set
    // insert, remove

    push(value) {
        let node = new Node(value);
        // I. 데이터가 아예 없을 때
        if (!this.head) {
            this.head = node;
            this.tail = node;
        }
        // I. 데이터가 하나라도 있을 때
        else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
        this.length++;
        this.current = this.tail;
    }

    pop() {
        // I. 데이터가 하나도 없을 때
        if (!this.head) return null;

        let removed = this.tail;
        // I. 데이터가 딱 하나 있을 때
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        }
        // I. 데이터가 2개 이상 있을 때
        else {
            let newTail = removed.prev;
            newTail.next = null;
            removed.prev = null;
            this.tail = newTail;
        }
        this.length--;
        this.current = this.tail;
        return removed;
    }

    unshift(value) {
        let node = new Node(value);

        // I. 데이터가 없을 때
        if (!this.head) {
            this.head = node;
            this.tail = node;
        }
        // I. 데이터가 하나라도 있을 때
        else {
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
        }
        this.length++;
        this.current = this.head;
    }

    shift() {
        if (!this.head) return null;
        let removed = this.head;

        // I. 데이터가 딱 하나 있을 때
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        }
        // I. 데이터가 2개 이상 있을 때
        else {
            this.head = removed.next;
            removed.next = null;
            this.head.prev = null;
        }
        this.length--;
        this.current = this.head;
        return removed;
    }

    insert(value) {
        if (this.current === this.head) this.unshift(value);
        else if (this.current === this.tail) this.push(value);
        else {
            let node = new Node(value);
            let prev = this.current; // 여기 중요
            let next = prev.next;
            next.prev = node;
            prev.next = node;
            node.prev = prev;
            node.next = next;
            this.length++;
            this.current = node; //
        }
        return true;
    }

    remove() {
        if (this.current === this.tail) return this.pop();
        // head 쪽 왼쪽은 암것도 없음
        else {
            let removed = this.current; // 여기
            let prev = removed?.prev;
            let next = removed?.next;
            if (prev?.next) prev.next = next; //
            if (next?.prev) next.prev = prev; //
            if (removed?.prev) removed.prev = null;
            if (removed?.next) removed.next = null;
            this.length--;
            this.current = prev; // 여기
            return removed;
        }
    }

    print() {
        let current = this.head;
        let arr = [];
        while (current) {
            arr.push(current.value);
            current = current.next;
        }
        return arr;
    }
}

function solution(str, n, arr) {
    let linkedList = new DoublyLinkedList();

    // I. 삽입
    [...str].map(x => {
        linkedList.push(x);
    });

    for (const [command, chr] of arr) {
        if (command === "L") { // I. 커서 왼쪽
            linkedList.current = linkedList.current.prev; // 얘는 null 로 만들어도 됨
        } else if (command === "D") { // I. 커서 오른쪽
            if (linkedList.current.next) linkedList.current = linkedList.current.next;
        } else if (command === "B") {
            linkedList.remove();
        } else if (command === "P") {
            linkedList.insert(chr);
        }
    }

    return linkedList.print().join("");
}

console.log(solution(str, n, arr));

