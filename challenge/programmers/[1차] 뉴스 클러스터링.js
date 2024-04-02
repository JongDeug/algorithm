// [문제 이해하기]
// 문자 2개 사이의 자카드 유사도를 구해, 65536을 곱한 후 소수점을 버린 정수만 출력하는 함수

// 입력 : string, string
// 출력 : int

// 조건 1. 쌍으로 묶어 집합을 만든다.
// 조건 2. 만약 공집합이면 1 반환
// 조건 3. 영문자로 된 글자만 쌍만 유효하다. (특수 문자 버린다)
// 조건 4. 대문자 소문자 차이 없다.
// 조건 5. *********************** 다중 집합도 됨 ****************************

// function solution(str1, str2) {
//     var answer = 0;
//
//     // I1. 대문자 -> 소문자 -> split -> reduce
//     let s1 = operation(str1);
//     let s2 = operation(str2);
//
//     console.log(s1);
//     console.log(s2);
//
//     if (!s1.size && !s2.size) return 1 * 65536;
//
//     // I5. 집합을 합 / 교 해서 자카드 유사도 구하기
//     let union = new Set([...s1, ...s2]);
//     let intersection = new Set([...s1].filter(x => s2.has(x)));
//
//     return Math.floor((intersection.size / union.size) * 65536);
// }
//
// const operation = (str) => {
//     let buffer = '';
//
//     return str
//         .toLowerCase()
//         .split('')
//         .reduce((set, value) => {
//             // I2. 알파벳만 유효함.
//             if ('a' <= value && 'z' >= value) {
//                 // I3. 버퍼가 필요함.
//                 buffer += value;
//
//                 // I4. 버퍼의 길이가 2일 때만 ㄱㄱ씽임
//                 if (buffer.length === 2) {
//                     set.add(buffer);
//                     buffer = buffer.slice(1);
//                 }
//             } else buffer = '';
//
//             return set;
//         }, new Set());
// };
//


function solution(str1, str2) {
    var answer = 0;

    // I1. 대문자 -> 소문자 -> split -> reduce
    let s1 = operation(str1);
    let s2 = operation(str2);

    console.log(s1)
    console.log(s2)

    if(!s1.length && !s2.length) return 65536;

    // I5. 집합을 합 / 교 해서 자카드 유사도 구하기
    let union = new Set([...s1, ...s2]);
    let intersection = new Set(s1.filter(x => s2.includes(x)));

    // console.log(union)
    // console.log(intersection)

    let unionSize = union.size;
    let intersectionSize = intersection.size;

    if(s1.length < s2.length) {
        let count = -1;
        // union 처리(큰놈 기준)
        [...union].forEach(x => {
            for(const item of s2) {
                if(item === x) count++;

            }
        });
        unionSize += count;
        count = -1;
        // intersection 처리(작은놈 기준)
        [...intersection].forEach(x => {
            for(const item of s1) {
                if(item === x) count++;
            }
        });
        intersectionSize += count;
    } else {
        let count = -1;
        // union 처리(큰놈 기준)
        [...union].forEach(x => {
            for(const item of s1) {
                if(item === x) count++;
            }
        });
        unionSize += count;
        count = -1;
        // intersection 처리(작은놈 기준)
        [...intersection].forEach(x => {
            for(const item of s2) {
                if(item === x) count++;
            }
        });
        intersectionSize += count;
    }

    // console.log(intersectionSize, unionSize)

    return Math.floor((intersectionSize/unionSize) * 65536);
}

const operation = (str) => {
    let buffer = '';

    return str
        .toLowerCase()
        .split('')
        .reduce((arr, value) => {
            // I2. 알파벳만 유효함.
            if ('a' <= value && 'z' >= value) {
                // I3. 버퍼가 필요함.
                buffer += value;

                // I4. 버퍼의 길이가 2일 때만 ㄱㄱ씽임
                if (buffer.length === 2) {
                    arr.push(buffer);
                    buffer = buffer.slice(1);
                }
            } else buffer = '';

            return arr;
        }, []);
};