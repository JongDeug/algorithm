// [문제 이해하기]
// 조건을 만족하는 가장 큰 양의 정수를 return 하는 함수를 구현해라.

// 입력: array of integer, array of integer
// 출력: int (가장 큰 양의 정수)

// 핵심:
// 1. 두 배열의 최대공약수를 구한다.
// 2. A의 최대공약수는 B를 나눌 수 없어야 한다.
// 3. B의 최대공약수는 A를 나눌 수 없어야 한다.
// 4. 최대공약수를 구하는 유클리드 호제법으로 구현한다. gcd(greatest common divisor)

function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
}

function gcdArr(arr) {
    let a = arr[0];
    for (let i = 1; i < arr.length; i++) {
        a = gcd(a, arr[i]); // I. 여기 좀 핵심 2개 수의 최대공약수 구해서 또 반복
    }
    return a;
}

function solution(arrayA, arrayB) {
    // I. 두 배열의 최대공약수를 구한다.
    const gcdA = gcdArr(arrayA);
    const gcdB = gcdArr(arrayB);

    console.log(gcdA, gcdB);

    // I. 각 최대공약수가 다른 놈을 나눌 수 있는지 봐야한다.
    const canGcdADivideB = arrayB.some(num => (num % gcdA) === 0);
    const canGcdBDivideA = arrayA.some(num => (num % gcdB) === 0);

    console.log(canGcdADivideB, canGcdBDivideA);

    // I. 둘 다 나눌 수 없다면 => 큰거 선택
    if (!canGcdADivideB && !canGcdBDivideA) return Math.max(gcdA, gcdB);
    // I. 둘 다 나눌 수 있다면 => 잘못된거임
    else if (canGcdADivideB && canGcdBDivideA) return 0;
    // I. 하나만 나눌 수 없다면 => 그놈을 줘야함
    else if (!canGcdADivideB) return gcdA;
    else if (!canGcdBDivideA) return gcdB;
}