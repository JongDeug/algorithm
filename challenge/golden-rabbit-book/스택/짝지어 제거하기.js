// [문제 이해하기]
// 2개 붙어 있는 짝을 찾아서 제거, 주어진 문자열을 모두 제거할 수 있으면 1반환하는 로직 구현하기

// 시간복잡도
// 이중 for 문 생각해봤음 => X, 문자열 길이 1,000,000
// "배열"을 사용해서 O(N) 으로 해결 가능

// [문제 세분화] => 캬!
function solution(s){
    // M. 배열, 스택
    let check = [];

    // I. s 돌기
    [...s].forEach((item, i) => {
        // I. 이렇게 짧게도 가능하네 ㄷㄷ
        const top = check[check.length - 1];
        if(check.length > 0 && top === item) check.pop();
        else check.push(item);
        // if(i===0) check.push(item);
        // else {
        //     // 	i. 스택 top 과 현재 문자 비교
        //     const top = check[check.length - 1];
        //     if(top === item) check.pop();
        //     else check.push(item);
        // }
    })

    return check.length === 0 ? 1 : 0;
}