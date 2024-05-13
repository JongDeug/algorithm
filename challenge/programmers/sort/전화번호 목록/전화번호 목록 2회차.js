// [문제 이해하기]
// 한 번호가 다른 번호의 접두어인 경우가 있는지 확인하는 함수를 구현해라.

// 입력: array of string
// 출력: boolean

// 핵심
// 1. 접두어: 어떤 단어(어근)의 앞에 붙은 것
// 2. phone_book 길이 1,000,000
// 3. sort를 하면 시간 복잡도 해결할 수 있음
// 4. some 함수 사용 : 주어진 조건을 만족하면 true 반환 후 종료

function solution(phone_book) {
    // return !phone_book.sort().some((e, i, arr) => {
    //     // index 가 유효한지 확인하는 문법! 으로 길이를 줄일 수 있음.
    //     if(i+1 < arr.length) {
    //         if(arr[i+1].startsWith(e)) {
    //             return true;
    //         }
    //     }
    //     return false;
    // });
    return !phone_book.sort().some((e,i,arr) => arr[i+1]?.startsWith(e));
}