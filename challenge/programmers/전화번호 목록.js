// [문제 이해하기]
// 어떤 번호가 다른 번호의 접두어인 경우 false, 아니면 true를 반환하는 함수를 구현하라

// 입력: phone_book(문자열 배열)
// 출력: boolean

// 핵심(틀렸을 때 작성한거임)
// 1. 입력 배열 길이가 1,000,000 이니까 시간 복잡도를 줄여야 함.
// 2. k = 20이라 하면 최대 20,000,000 ㄱㅊ
// 3. k(문자열 비교)는 걱정하지 말고 문자열 i, j만 신경쓰면됨. => 투 포인터

// 오답 노트
// 일단 처음 작성한 코드는 시간 복잡도 효율성에서 out 됨 => 흠!!
// while 이 1,000,000 처럼 보이지만 사실 O(n^2)이네
// 정렬하는 이유를 몰랐는데 정렬해야 제일 앞 문자부터 뒤 문자들이 차례로 정렬됨 => 바로 뒤 문자만 비교하면됨, 애초에 앞 문자부터 다르면 끝난거임

// [문제 세분화하기]

function solution(phone_book) {
    let answer = phone_book.sort().some((v, i, arr) => {
        return arr[i+1]?.startsWith(v); // some은 배열을 모두 루핑하는데 함수 조건이 맞으면 true 반환하고 끝남, 아니면 false면 계속 루핑
    });
    return !answer;
}

// console.log(solution(['123', '456', '789']));
console.log(solution(["119", "97674223", "1195524421"]));

// 효율성 테스트에서 통과되지 못한 코드 => 정렬하고 코드만 살짝 수정하면 해결될듯. 지금은 O(n^2)임
// function solution(phone_book) {
//     let answer = true;
//     // M. i, j two pointers 사용
//     let [i, j] = [0, 1];
//     phone_book.sort();
//
//     // I. while i, answer control
//     while (i < phone_book.length && answer) {
//         // I. 문자열 비교에도 two 포인터 사용
//         let [n, m] = [0, 0];
//         while (n < phone_book[i].length && m < phone_book[j].length) {
//             // I. 같지 않으면 true, 같으면 false
//             answer = phone_book[i][n++] !== phone_book[j][m++];
//             if (answer) break; // I. 같지 않으면 바로 종료
//         }
//
//         j++;
//         // I. j와 i가 같으면 안되니까 1 더 증가
//         if (i === j) j++;
//         // I. j가 끝까지 가면 다시 0, i는 1증가
//         if (j >= phone_book.length) {
//             i++;
//             j = 0;
//         }
//     }
//     return answer;
// }

//
