// 1. javascript 배열 사용 (enqueue: push, dequeue : shift)
// 2. Singly Linked List 사용

// 2번 구현

import { Node } from '../singly-linked-list/singly-linked-list.js';

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    // enqueue (단일 연결 리스트 push)
    // dequeue (단일 연결 리스트 shift)

    enqueue(value) {
        let node = new Node(value);

        if (!this.first) {
            this.first = node;
            this.last = node;
        } else {
            this.last.next = node;
            this.last = node;
        }
        return ++this.size;
    }

    dequeue() {
        if (!this.first) return null;

        let removed = this.first;

        if (this.size === 1) this.first = this.last = null;
        else {
            this.first = removed.next;
            removed.next = null;
        }
        this.size--;
        return removed.val;
    }
}