// 1. 문제 이해하기
// 문제를 내 방식대로 다시 생각해보고 정리하기
// 두 개의 숫자를 받고, 자릿수의 빈도가 같은지 확인하는 sameFrequency 구현

// 입/출력값 분석하기
// 입력 : int
// 출력 : boolean

// 문제에서 핵심이 무엇인가 생각해보고 정리하기
// 시간 복잡도가 O(N)으로 구현해야 하므로 빈도수 비교하는 알고리즘을 사용해야 함.

// 2. 구체적인 예시 찾기
// 간단한 예제 찾기
// 182, 281 => true
// 34, 14 => false
// 좀 더 복잡한 예제 찾기
// 3589578, 5879385 => true

// 빈 입력 값 또는 잘못된 입력 값 예제 찾기
// '' => ?

"use strict"
// 3. 문제를 세분화 하기
// num1, num2를 비교해서 빈도수가 같은지 확인하는 sameFrequency 구현
function sameFrequency(num1, num2) {
    if (!Number.isInteger(num1) && !Number.isInteger(num2)) return false

    // num을 숫자로 나눠도 되지만 toString => object로 변환해야함.
    let num1String = num1.toString()
    let num2String = num2.toString()

    let num1Frequency = {}
    // let num2Frequency = {}

    for (const key of num1String) {
        num1Frequency[key] = (num1Frequency[key] || 0) + 1
    }

    // console.log(num1Frequency)

    // 한 번의 루프로 비교하면 됨.
    for (const key of num2String){
        // 0도 true로
        if (!num1Frequency[key]) return false
        else {
            num1Frequency[key] -= 1
        }
    }

    // 0이어야 true 반환 할 수 있음.
    for (const key of num1String) {
        if (num1Frequency[key] !== 0) return false
    }

    return true
}

console.log(sameFrequency(0o101, 0o00))
// console.log(sameFrequency(3589578, 5879385))