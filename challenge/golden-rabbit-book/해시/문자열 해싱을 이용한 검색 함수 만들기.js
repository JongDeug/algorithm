// [문제 이해하기]
// 문자열 해싱을 이용해서 해당 문자열이 있는지 검색하는 로직 구현하기
//
// 입력: stringList, queryList
// 출력: boolean
//
// [문제 세분화]
function hashString(str) {
    let p = 31;
    let m = 1000000007;
    let sum = 0;

    for (let i = 0; i < str.length; i++) {
        sum += str[i].charCodeAt(0) * Math.pow(p, i);
    }

    return sum % m;
}

function solution(stringList, queryList) {
    // I. stringList 해싱
    let stringListHash = stringList.map((element) => hashString(element));
    // I. queryList 해싱
    let queryListHash = queryList.map((element) => hashString(element));

    // I. 한 번에 출력
    return queryListHash.map((item) => stringListHash.includes(item));
}

const ans = solution(
    ["apple", "banana", "cherry"],
    ["banana", "kiwi", "melon", "apple"]
);
console.log(ans);
