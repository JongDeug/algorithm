// [문제 이해하기]
// 밑과 지수를 받아서 계산 해주는 power함수 구현
// 입력 : 밑(positive int), 지수(positive int)
// 출력 : positive int
// 가장 중요한 것 ?
// : 재귀를 사용해서 문제를 푸는 것이 중요함.

// [구체적인 예제 찾기]
// power(2,0) // 1
// power(2,2) // 4
// power(2,4) // 16
// 무효한 값?
// power(0,0) => 0

// [문제 세분화하기]
// 밑과 지수를 받아 결과를 출력해주는 power함수 구현
function power(base, exponent) {
    // base case : exponent가 1이 되면 그냥 base return!
    if (exponent < 1) return 1; // => 2^0 승을 1로 해야 ㅇㅇ,

    // return 계산
    return base * power(base, --exponent);
}

console.log(power(2, 0))