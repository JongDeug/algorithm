// [문제 이해하기]
// 첫글자 카운트, 다른 글자 카운트를 진행하고 만약 이 카운트가 같으면 문자열을 분리한다. 이를 반복해서 분리된 문자열의 개수를 반환하는 함수를 구현해라.
// 입력 : string, 출력 : int
// [구체적인 예시]
// 'banana' => ba na na => 3
// [문제 세분화]
// function solution(s) {
//     let xCount = 0;
//     let yCount = 0;
//     let result = [];
//     let start = 0;
//
//     for (let i = 0; i<s.length; i++) {
//         const chr = s[start];
//         if(s[i] !== chr) yCount++;
//         else xCount++;
//
//         if(xCount === yCount) {
//             result.push(s.substring(start, xCount + yCount + start));
//             start += xCount + yCount;
//             xCount = yCount = 0;
//         }
//     }
//     if(start < s.length) result.push(s.substring(start))
//     console.log(result)
//     return result.length;
// }

// 리펙토링
function solution(s) {
    let xCount = 0;
    let yCount = 0;
    let result = [];
    let start = 0;

    for (let i = 0; i < s.length; i++) {
        const chr = s[start];
        if (s[i] !== chr) yCount++;
        else xCount++;

        if (xCount === yCount) {
            let end = xCount + yCount + start;
            result.push(s.substring(start, end));
            start = end;
            xCount = yCount = 0;
        }
    }
    // 마지막 남은 것들 주입
    if (start < s.length) result.push(s.substring(start));
    console.log(result);
    return result.length;
}