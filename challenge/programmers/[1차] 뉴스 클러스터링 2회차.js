// [문제 이해하기]
// 자카드 유사도 구하는 함수를 구현해라.

// 입력: str1(string), str2(string)
// 출력: int (자카드 유사도 * 65536 => 소수점 아래 버리기)

// 핵심
// 1. 다중 집합이 가능하므로 Set 자료구조는 사용할 수 없음.
// 2. intersection, union을 직접 구현해야 함.

// 조건
// 1. 자카드 유사도 = 교집합 개수 / 합집합 개수
// 2. 모두 공집합일 경우 자카드 유사도는 1로 정의
// 3. 문자열을 다중집합 원소로 만들 때 영문자로된 글자 쌍만 유효함
// 4. 다중집합 원소 사이를 비교할 때, 대문자 소문자 차이는 무시함

// [문제 세분화]
function solution(str1, str2) {
    // M. 각 문자열 1,2를 다중집합으로 만듦.
    let multiset1 = makeMultiset(str1);
    let multiset2 = makeMultiset(str2);

    // I. 모두 공집합일 경우 자카드 유사도 1
    if (!multiset1.length && !multiset2.length) return 65536;

    let intersection = [];
    let union = [];

    // console.log(multiset1, multiset2)

    // I. 교집합, 합집합을 구한다.
    multiset1.map(x => {
        let index = multiset2.indexOf(x);
        if (index >= 0) {
            multiset2.splice(index, 1);
            intersection.push(x); // 교집합 : B에도 있으면 삭제하고 삽입
        }
        union.push(x); // 합집합: 일단 있든 없든 다 넣기, B에 있으면 그 요소 제거
    });
    union = union.concat(multiset2); // 합집합: 나머지 있는 값 다 넣기


    // console.log(intersection, union)
    return Math.trunc((intersection.length / union.length) * 65536);
}

function makeMultiset(str) {
    let result = [];
    let buffer = "";
    [...str].forEach(v => {
        const chr = v.toLowerCase();

        if (chr <= "z" && chr >= "a") buffer += chr;
        else buffer = ""; // 다른거면 버퍼 초기화

        if (buffer.length === 2) {
            result.push(buffer);
            buffer = buffer.slice(1);
        }
    });
    return result;
}