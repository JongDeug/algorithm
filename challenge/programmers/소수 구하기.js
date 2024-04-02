// [문제 이해하기]
// 소수의 개수를 반환하는 함수(1은 소수가 아님)
// 입력 : int(2 ~ 1000000), 출력 : int (개수)
// 핵심 : 자기 자신으로만 나눌 수 있는 수

// 방법 1) X가 소수인지 판별하려면 X-1 까지 숫자들로 모두 나눠보면 됨.
// 시간 복잡도 이슈
function solution1(n) {
    let result = [];
    for (let i = n; i >= 2; i--){
        let isSosu = true;
        for (let j = 2; j < i; j++) {
            if (i % j === 0) {
                isSosu = false;
                break;
            }
        }
        if(isSosu) result.push(i)
    }
    return result.length;
}

// 방법 2) 에라토스테네스의 체
// 시간 복잡도 O(n^(1/2))
// https://ko.wikipedia.org/wiki/%EC%97%90%EB%9D%BC%ED%86%A0%EC%8A%A4%ED%85%8C%EB%84%A4%EC%8A%A4%EC%9D%98_%EC%B2%B4
// 링크 GIF 참고!!
// Outer loop를 제곱근까지 돌리면됨.
// Inner loop는 배수만큼 올리면서 하나씩 지우기.
function solution2(n) {
    let arr = new Array(n+1).fill(true);
    arr[0] = arr[1] = false;
    let sqrt = Math.sqrt(n);

    for (let i = 2; i < sqrt; i++) {
        // arr[i]가 false가 아니면(소수가 아니면)
        if(arr[i]) {
            for (let j = 2; i * j <= n; j++) {
                arr[i * j] = false;
            }
        }
    }

    // 소수인 친구들만 filtering (true인 놈들만)
    return arr.filter(num => num).length
}