// [문제 이해하기]
// 피보나치 수열 구현하기

// 입력 : n (int)
// 출력 : 해당 값 (int)

// 핵심 : 재귀로 풀면 시간 복잡도가 걸림
// 다이내믹으로 풀거임 : bottom up

// 문제 설명이 좀..

function solution(n) {
    let memo = [0, 1];

    for(let i = 2; i <= n; i++){
        memo.push((memo[i-1] + memo[i-2]) % 1234567);
    }

    return memo[n]
}