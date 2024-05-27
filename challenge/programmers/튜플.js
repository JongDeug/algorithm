// [문제 세분화하기]
function solution(s) {
    // I1. 스택에 넣기
    let stack = s.split('').reverse();
    let answer = [];
    let result = [];
    let buffer = '';

    while(stack.length) {
        // I2. pop
        const chr = stack.pop();

        // I3. 대괄호가 닫히면 answer에 넣기, 만약 buffer에 값이 없으면 skip
        if(chr === '}') {
            if(buffer.length) {
                answer.push(buffer.split(',').filter((c) => c !== ''));
                buffer = '';
            }
        } else {
            // I4. 그외 버퍼에 모두 넣기
            if(chr !== '{') buffer += chr;
        }
    }

    // I5. sort
    answer = answer.sort((a,b) => a.length - b.length);

    // I6. 이차원 배열 풀기
    answer.forEach((item) => {
        for (const numString of item) {
            if(!result.includes(numString)) result.push(numString);
        }
    });

    // I7. 문자 to 숫자
    result = result.map((numString) => parseInt(numString));

    return result;
}

// 다른 사람 코드 미쳤다!!
// const tupleFrom = (str) =>
//     str.slice(2, -2).split('},{')
//         .map((it) => toNumbers(it))
//         .sort(accendingByLength)
//         .reduce((acc, cur) =>
//             [...acc, ...cur.filter((it) => !acc.includes(it))], []);
//
// const toNumbers = (str) => str.split(',').map(it => Number(it));
//
// const accendingByLength = (arr1, arr2) => arr1.length - arr2.length;
//
// const solution = (s) => tupleFrom(s);