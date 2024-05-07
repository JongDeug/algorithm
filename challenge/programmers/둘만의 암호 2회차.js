// [문제 이해하기]
// 조건에 맞는 암호를 만들어주는 함수 구현

// 입력: s(string), skip(string), index(int)
// 출력: 만들어진 암호 string

// 조건
// 1. 문자열 각 알파벳을 index 만큼 뒤의 알파벳으로 바꾼다.
// 2. z로 넘어갈 경우 a로 다시 돌아간다.
// 3. skip에 있는 알파벳은 제외한다.

// 핵심
// 1. Set to Array or String

// 리펙토링
function solution(s, skip, index) {
    let answer = "";
    // M. 알파벳 Set 생성
    let set = new Set("abcdefghijklmnopqrstuvwxyz");
    // M. 인덱스 범위 재구성
    const arrange = (num, length) => {
        if (num < length) return num;
        else return num % length;
    };

    // I. skip 제거
    // for(let i=0; i<skip.length; i++) {
    //     set.delete(skip[i]);
    // }
    [...skip].forEach(v => set.delete(v));

    // I. Set을 Array로 변경
    let arr = Array.from(set);
    console.log(arr);


    // I. 암호 만들기
    for (let i = 0; i < s.length; i++) {
        let num = index + arr.indexOf(s[i]);
        let idx = arrange(num, arr.length);
        answer += arr[idx];
    }

    return answer;
}