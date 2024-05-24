import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const filePath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "/testcase.txt");
const input = fs.readFileSync(filePath).toString().trim().split("\n");

// [문제 이해하기]
// 큐를 만들면 됨.

// 입력: N(명령어 수), arr(명령어)
// 출력: 명령어 수행 결과

// 핵심
// 1. js 배열을 사용하면 shift 하는 과정에서 O(n) 시간 복잡도를 가짐 => 결과적으로 O(n^2)
// 2. 따라서 연결 리스트를 사용해서 큐를 구현해야 함.

// [문제 세분화]
let n = input[0];
let arr = input.slice(1).map(x => x.split(" "));

// 단일 연결 리스트
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    // push, unshift(pop)
    push(value) {
        let node = new Node(value);

        // I. 데이터가 하나도 없을 때
        if (!this.head) {
            this.head = node;
            this.tail = node;
        }
        // I. 데이터가 하나 이상 있을 때
        else {
            this.tail.next = node;
            this.tail = node;
        }
        this.length++;
    }

    unshift() {
        // I. 데이터가 하나도 없을 때
        if (!this.head) return -1;
        let removed = this.head; // 제거될 놈

        // I. 데이터가 하나 있을 때
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        }
        // I. 데이터가 여러개 있을 때
        else {
            this.head = removed.next;
            removed.next = null;
        }
        this.length--;
        return removed.value;
    }

    // size, empty, front, back
    size() {
        return this.length;
    }

    empty() {
        return this.length === 0 ? 1 : 0;
    }

    front() {
        return this.head ? this.head.value : -1;
    }

    back() {
        return this.tail ? this.tail.value : -1;
    }
}

function solution(n, arr) {
    // I. queue 생성
    let queue = new SinglyLinkedList();
    let answer = "";

    // I. 명령어 실행
    for (const [command, chr] of arr) {
        if (command === "push") {
            queue.push(Number(chr));
        } else if (command === "pop") {
            let v = queue.unshift();
            if (v !== -1) answer += `${v}\n`;
            else answer += `-1\n`;
        } else if (command === "size") {
            answer += `${queue.size()}\n`;
        } else if (command === "empty") {
            answer += `${queue.empty()}\n`;
        } else if (command === "front") {
            answer += `${queue.front()}\n`;
        } else if (command === "back") {
            answer += `${queue.back()}\n`;
        }
    }
    return answer;
}

console.log(solution(n, arr));
