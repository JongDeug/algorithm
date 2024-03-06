// 문제 이해하기
// 내 방식대로 정리
// 인자를 받아서 이 중 중복이 있는지 확인하는 areThereDuplicates 함수 구현

// 입 출력 값 분석
// 입력 : number, character
// 인수가 가변적인 인수! 수로 받아들여야 하나?
// 출력 : boolean

// 문제에서 핵심이 무엇인가?
// 기본 제약 : O(n) | O(n)
// 보너스는 O(nlogn) | O(1)
// n log n 은 더 느린데 ? , 공간 복잡도는 O(1)로 만드는 게 중요한건가?

// 구체적인 예시
// 간단한 예시
// 1,2,3 => false
// 1,2,2 => true
// 좀 더 복잡한 예시
// 'a', 'b', 'c', 'a' => true
// 빈 입출력 값
// '' => false

// 문제 세분화 하기
// 여러 인자를 받아서 동일하면 true, 그렇지 않다면 false를 반환하는 함수 작성

function areThereDuplicates(...args) {
    // ...args를 object로 변환
    let myList = args
    let myListFrequency = {}


    for (const key of myList) {
        myListFrequency[key] = (myListFrequency[key] || 0) + 1
    }

    // 빈 입력 값
    if ('' in myListFrequency) return false

    // loop에서 2이상 이면 true 반환
    for (const key in myListFrequency){
        if (myListFrequency[key] >= 2) return true
    }

    return false
}

console.log(areThereDuplicates(1,2,2))
console.log(areThereDuplicates('', ''))
console.log(areThereDuplicates('a', 'b', 'c', 'a'))
