// [문제 이해하기]
// 주어진 데이터베이스에서 후보키의 개수를 반환하는 함수를 구현해라.

// 입력: relation (데이터베이스 2차원 문자열 배열)
// 출력: 후보키 개수 (int)

// 의문)
// ["이름", "전공", "학년"] 은 왜 최소성을 만족하지 못하는가?
// 해결)
// ["이름", "전공"] 으로 튜플을 식별할 수 있기 때문임.

// 핵심
// 1. 각 속성에서 중복되는 값이 있는지 찾아야 함. 
// 2. 중복되는 값이 없다면 +1
// 3. 중복되는 값이 있다면, 중복되는 값이 없는 속성끼리 조합해서 봐야함.
// 4. 그럼 조합 문제?

// 풀었는데 테스트 케이스 일부가 맞지 않음 why?
// solution([['a',1,'aaa','c','ng'],['b',1,'bbb','c','g'],['c',1,'aaa','d','ng'],['d',2,'bbb','d','ng']])
//
// 정답: 3
// 코드의 답: 2
//
// 위 테스트 케이스로 실행하면 (0),(2,3),(1,3,4)가 후보키가 되야 하는데 저의 경우는 (2,3)을 처리 할 때 3을 앞으로 배제시켜서 (1,3,4)를 후보키로 카운트하지 못하는 문제가 있었습니다.

// [문제 세분화]
function solution(relation) {
    // M. 후보키 개수 담는 배열
    let candidateKeys = [];
    // M. row col length
    let [rowLen, colLen] = [relation.length, relation[0].length];
    // M. 인덱스 담는 배열
    let indexArr = Array.from({ length: colLen }, (_, i) => i);
    // M. 조합 결과를 담는 배열
    let combinations = [];
    // M. 조합구하는 함수 (n개 중 r개)
    const combination = (start, r, temp) => {
        // I. Base Case
        if (temp.length === r) {
            combinations.push([...temp]);
            return;
        }

        for (let i = start; i < indexArr.length; i++) {
            temp.push(indexArr[i]);
            combination(i + 1, r, temp);
            temp.pop();
        }
    };

    // I. 유일성을 만족하는 후보키 찾기
    for (let i = 1; i <= indexArr.length; i++) {
        combination(0, i, []);

        // I. indexArr 가지고 조합을 얻어낸다. => 조합을 통해 중복확인을 한다.
        for (const com of combinations) {
            let checkDuplicate = new Set();
            for (let row = 0; row < rowLen; row++) {
                let str = "";
                com.forEach(col => str += `${relation[row][col]}|`);
                checkDuplicate.add(str);
            }
            // console.log(checkDuplicate, rowLen);
            // I. 중복되지 않으면 후보키로 넣음 + 최소성을 만족하기 위해 중복된 값 제거해서 삽입
            if (checkDuplicate.size === rowLen) {
                // I. 예외: 배열에 아무것도 없으면 넣기
                if (!candidateKeys.length) {
                    candidateKeys.push(com);
                } else {
                    let isAllIn = false;
                    for (const key of candidateKeys) {
                        for (let i = 0; i < key.length; i++) {
                            // 모두 포함이 되면!! => 하나라도 안되면 break;
                            if (!com.includes(key[i])) {
                                isAllIn = false;
                                break;
                            } else isAllIn = true;
                        }
                        if (isAllIn) break;
                    }
                    if (!isAllIn) candidateKeys.push(com);
                }
            }
        }
        combinations = []; // 꼭 초기화 바람.
    }

    // console.log(candidateKeys);
    return candidateKeys.length;
}


// 테스트 케이스 일부 통과하지 못한 코드
// function solution(relation) {
//     // M. 후보키 개수 담는 변수
//     let answer = 0;
//     // M. row col length
//     let [rowLen, colLen] = [relation.length, relation[0].length];
//     // M. 중복되지 않는 인덱스를 담는 배열
//     let notDuplication = [];
//     // M. 중복되지 않는 인덱스들의 조합을 담는 배열
//     let notDuplicationCombination = [];
//     // M. 조합구하는 함수 (n개 중 r개)
//     const combination = (start, depth, r, temp) => {
//         // I. Base Case
//         if (depth === r) {
//             notDuplicationCombination.push([...temp]);
//             return;
//         }
//
//         for (let i = start; i < notDuplication.length; i++) {
//             temp.push(notDuplication[i]);
//             combination(i + 1, depth + 1, r, temp);
//             temp.pop();
//         }
//     };
//
//     let test = [];
//
//     // I. 먼저 각 속성에 대하여 중복되는 인덱스를 구한다.
//     for (let col = 0; col < colLen; col++) {
//         let s = new Set();
//         for (let row = 0; row < rowLen; row++) {
//             s.add(relation[row][col]);
//         }
//         if (s.size !== rowLen) notDuplication.push(col);
//         else {
//             test.push([col]);
//             answer++;
//         }
//     }
//
//     // console.log(notDuplication);
//     // combination(0, 0, 4, []);
//     // console.log(notDuplicationCombination)
//
//     let num = 1;
//     // I. 중복되지 않는 인덱스를 가지고 조합해서 또 다른 후보키가 없는지 확인한다.
//     while (num <= notDuplication.length) {
//         let notDuplicationSet = new Set(notDuplication);
//         // I. 인덱스들을 가지고 조합을 찾아낸다.
//         combination(0, 0, num, []);
//         // I. 조합을 통해서 중복확인을 한다.
//         for (const c of notDuplicationCombination) {
//             let s = new Set();
//             for (let row = 0; row < rowLen; row++) {
//                 let str = "";
//                 for (let col of c) {
//                     str += relation[row][col];
//                 }
//                 s.add(str);
//             }
//             // I. 후보키 찾음
//             if (s.size === rowLen) {
//                 c.map(v => notDuplicationSet.delete(v)); // 제거
//                 // console.log(c)
//                 test.push(c);
//                 answer++;
//             }
//         }
//         notDuplication = Array.from(notDuplicationSet);
//         notDuplicationCombination = [];
//         num++;
//     }
//
//     console.log(test);
//     return answer;
// }

// console.log(solution([["100", "ryan", "music", "2"], ["200", "apeach", "math", "2"], ["300", "tube", "computer", "3"], ["400", "con", "computer", "4"], ["500", "muzi", "music", "3"], ["600", "apeach", "music", "2"]]));
// console.log(solution([["a", "1", "aaa", "c", "ng"],
//     ["a", "1", "bbb", "e", "g"],
//     ["c", "1", "aaa", "d", "ng"],
//     ["d", "2", "bbb", "d", "ng"]]));
// console.log(solution([['a','1','aaa','c','ng'],['b','1','bbb','c','g'],['c','1','aaa','d','ng'],['d','2','bbb','d','ng']]));
console.log(solution([["a", "aa"], ["aa", "a"], ["a", "a"]]));