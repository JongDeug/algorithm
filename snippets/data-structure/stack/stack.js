// 1. javascript 배열 사용
// 2. Singly Linked List 사용

// 2번 구현

import { Node } from '../singly-linked-list/singly-linked-list.js';

class Stack {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    // push (단일 연결 리스트 unshift)
    // pop (단일 연결 리스트 shift)

    push(value) {
        let node = new Node(value);

        if (!this.first) {
            this.first = node;
            this.last = node;
        } else {
            // 직관적으로 구현하는 것이 맞다고 생각해. 추상적인 개념에 따라
            node.next = this.first;
            this.first = node;
        }
        return ++this.size;
    }

    pop() {
        if (!this.first) return undefined;
        const removed = this.first;

        if (this.size === 1) {
            this.first = null;
            this.last = null;
        } else {
            this.first = removed.next;
            removed.next = null;
        }
        this.size--;
        return removed.val;
    }
}