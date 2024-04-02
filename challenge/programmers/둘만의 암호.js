// [문제 이해하기]
// 문자를 암호화 하기
// 핵심 : skip에 있는 것은 모조리 무시해야 됨...
// 오답 : 내가 구현한 것은 부분 skip만 한 것임.
// function solution(s, skip, index) {
//     var answer = '';
//     // 문자열 반복
//     for (let i = 0; i<s.length; i++) {
//         let asciiNum = s[i].charCodeAt(0);
//         let bucket = [];

//         // index만큼 이동하면서 bucket에 담기
//         for (let count = 1; count <= index; count++){
//             asciiNum++;
//             // 만약 'z'를 넘으면?
//             if(asciiNum > 'z'.charCodeAt(0)) asciiNum = 'a'.charCodeAt(0);
//             bucket.push(String.fromCharCode(asciiNum));
//         }

//         console.log(bucket)
//         // skip을 돌면서 filtering
//         for(const skipChr of skip) {
//             bucket = bucket.filter(c => c !== skipChr);
//         }
//         let plus = index - bucket.length;
//         asciiNum = bucket[bucket.length - 1].charCodeAt(0);
//         for(let count = 1; count <= plus; count++) {
//             // 또 skip을 포함할 수 있기 때문에
//             if(skip.includes(String.fromCharCode(asciiNum + 1))) {
//                 --count;
//                 continue;
//             }
//             asciiNum++;
//             if(asciiNum > 'z'.charCodeAt(0)) asciiNum = 'a'.charCodeAt(0);
//             bucket.push(String.fromCharCode(asciiNum));
//         }

//         console.log(bucket)
//         // 암호 생성
//         answer += bucket[bucket.length - 1];
//     }
//     return answer;
// }

function solution(s, skip, index) {
    var answer = ''
    let alphabet = new Set('abcdefghijklmnopqrstuvwxyz');

    [...skip].forEach(s => alphabet.delete(s))

    // console.log(alphabet)
    let arr = [...alphabet];

    for (const chr of s) {
        let idx = index + arr.indexOf(chr);
        answer += arr[idx % arr.length]; // 쩐다 쩔어!
    }
    return answer;
}