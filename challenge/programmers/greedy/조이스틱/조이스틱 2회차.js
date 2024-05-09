// [문제 이해하기]
// 조이스틱으로 알파벳 이름을 완성하는데 필요한 최소 조작 횟수를 반환하는 함수를 구현해라.

// 입력: string
// 출력: int (조작 횟수)

// 핵심
// 1. 탐욕 알고리즘을 사용한다.
// 2. 알파벳을 입력하고 커서를 이동하면 A로 초기화된다.

// [문제 세분화]
// I. 모두 A로 이뤄져있다. JAZ => AAA
// I. 3가지 경로 중 가장 짧은 놈을 비교한다.

function solution(name) {
    // I. 알파벳 A에서 가까운 이동 횟수를 구한다.
    const near = (chr) => {
        const numA = 'A'.charCodeAt(0);
        const numZ = 'Z'.charCodeAt(0) + 1;
        const numChr = chr.charCodeAt(0);
        return Math.min(numChr - numA, numZ - numChr);
    }

    // I. name 순회
    let cursor = name.length - 1; // I. 오른쪽으로 쭉
    let alphabet = 0;
    for(let i=0; i<name.length; i++) {
        alphabet += near(name[i]);
        // I. A 뒤에 있는 인덱스를 구한다.
        let afterAIndex = i + 1;

        while(name[afterAIndex] === 'A' && afterAIndex < name.length) afterAIndex++;

        cursor = Math.min(
            cursor, // I. 오른쪽 쭉
            (i * 2) + (name.length - afterAIndex), // I. 오른쪽 갔다가 A 만나면 백
            i + 2 * (name.length - afterAIndex) // I. 왼쪽 쭉 갔다가 A 만나면 백
        );

        console.log(name[i], alphabet, cursor, afterAIndex)
    }

    return cursor + alphabet;
}