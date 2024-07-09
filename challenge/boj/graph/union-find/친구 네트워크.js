import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
// ------------------------------------------------------------------------

const path = require("path");
const fs = require("fs");
const filepath = process.env.USERNAME !== "jongdeug" ? "/dev/stdin" : path.join(__dirname, "testcase.txt");
const input = fs.readFileSync(filepath).toString().trim().split("\n");

// [문제 이해하기]
// 두 사람의 친구 네트워크에 몇 명이 있는지 출력해라.

// 입력: T(테스트 케이스 개수), F(친구 관계수), arr(정보)
// 출력: integers(친구 관계 수 마다 네트워크에 있는 친구 수)

// 핵심
// 1. union-find
// 2. arr 가 아닌 object, map 으로 구현하기 => hash 로 구현해야됨

// [문제 세분화하기]
let t = Number(input.splice(0, 1)[0]);

function parseInput(input) {
    let f = Number(input.splice(0, 1)[0]);
    let friends = input.splice(0, f);

    return { friends };
}

function solution() {
    let ans = [];

    // M. union
    const union = (a, b, hashMap) => {
        let rootA = find(a, hashMap);
        let rootB = find(b, hashMap);
        if (rootA !== rootB) { // I. 개선 : 친구 네트워크 개수를 매번 세는 것이 아니라, count 를 설정해서
            hashMap.get(rootB).root = rootA;
            hashMap.get(rootA).count += hashMap.get(rootB).count;
        }
        return hashMap.get(find(a, hashMap)).count;
        // hashMap.set(rootB, rootA);
        // // I. rootA 를 가진 key 의 개수를 구하면 되는거다. =========> 친구를 매번 세는 과정에서 O(n) 시간이 걸림
        // let count = 0;
        // for (const key of hashMap.keys()) {
        //     // I. 경로 압축이 되지 않은 놈들이 있을 수 있으니 find 로 해결한다.
        //     if (find(hashMap.get(key), hashMap) === rootA) count++;
        // }
        // return count;
    };

    // M. find
    const find = (x, hashMap) => {
        if (x !== hashMap.get(x).root) {
            hashMap.get(x).root = find(hashMap.get(x).root, hashMap); // 경로 압축
        }
        return hashMap.get(x).root;
    };

    for (let i = 0; i < t; i++) {
        let { friends } = parseInput(input);
        let hashMap = new Map();

        friends.forEach(friend => {
            let [a, b] = friend.split(" ");
            if (!hashMap.has(a)) hashMap.set(a, { root: a, count: 1 });
            if (!hashMap.has(b)) hashMap.set(b, { root: b, count: 1 });
            ans.push(union(a, b, hashMap));
        });
    }

    return ans.join("\n");
}

console.log(solution());