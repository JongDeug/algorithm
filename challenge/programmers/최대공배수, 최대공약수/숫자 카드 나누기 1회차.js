// [문제 이해하기]
// 조건 1 or 2를 만족하는 가장 큰 양의 정수 a 값 구하는 함수를 구현

// 입력: 숫자 배열 2개
// 출력: int (조건을 만족하는 가장 큰 양의 정수 a)

// 조건
// 모두 나누기 O, 모두 나누기 X

// 핵심
// 최대공약수 구하기 => 유클리드 호제법
// 큰 수를 작은 수로 나눈 나머지를 반복적으로 취하여 나머지가 0이 될때까지 작동하여 최대공약수를 구하는 방식
// 작은 수를 큰 수로 나눴을 때 나눠지지 않으므로 자연스럽게 a, b가 역전돼서 정상적인 값이 나옴.

// [문제 세분화]
function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
}

function gcdArray(arr) {
    let result = arr[0];
    for (let i = 1; i < arr.length; i++) {
        result = gcd(result, arr[i]);
    }
    return result;
}

function solution(arrayA, arrayB) {
    // I. A, B 각각 최대 공약수를 구한다.
    const A = gcdArray(arrayA);
    const B = gcdArray(arrayB);

    // I. 구한 값을 통해서 some 함수로 확인한다. 조건을 만족하는 값이 있으면 바로 return true
    const ABoolean = arrayB.some(e => e % A === 0);
    const BBoolean = arrayA.some(e => e % B === 0);

    // I. true, false 해서 반환한다.
    if (ABoolean === true && BBoolean === true) {
        return 0;
    } else if (ABoolean === true && BBoolean === false) {
        return B;
    } else if (ABoolean === false && BBoolean === true) {
        return A;
    } else if (ABoolean === false && BBoolean === false) {
        return Math.max(A, B);
    }
}