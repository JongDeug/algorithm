// [문제 이해하기]
// 각 배열의 요소를 곱하고 더해서 최소가 되는 값을 return 하는 함수 구현

// 입력: A, B (숫자가 담긴 배열)
// 출력: 최소 int

// 핵심:
// 1. A는 내림, B는 오름
// 2. 처음에는 투 포인터 패턴 사용하려고 했는데 굳이?

function solution(A,B){
    var answer = 0;
    // M. A(내림), B(오름)
    let sortA = A.sort((a,b) => b - a);
    let sortB = B.sort((a,b) => a - b);

    // I. 반복
    for(let i = 0; i < A.length; i++) {
        answer += (sortA[i] * sortB[i])
    }

    return answer;
}