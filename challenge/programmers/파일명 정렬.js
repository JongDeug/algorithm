// [문제 이해하기]
// 파일명에 포함된 숫자를 반영할 sort 기능을 구현해라

// 입력: files(array of strings)
// 1. 대소문자, 숫자, 공백, 마침표, 빼기
// 출력: sorted array(조건에 맞게 정렬된 배열)

// 조건
// 1. HEAD 사전순으로 sort, 대소문자 구분 X
// 2. HEAD가 같을 경우 NUMBER 기준으로 sort
// 3. HEAD, NUMBER 가 같은 경우, 원래 입력에 주어진 순서를 유지

// 핵심
// 그냥 sort 함수를 잘 쓰면 되는거 아닌감?

// 틀린 문제 => 걍 쓰레기 문제인듯;;
//     // 이 코드가 맞긴한데 테스트기에서 인식을 못함.
//     return newFiles.map(v => {
//         const str = v.join('');
//         const newStr = str.substring(0, str.length-1);
//         return newStr;
//     });

// number 가 최대 다섯 글자래 img12345678.png => 이것도 사실상 처리 안함 ㅋㅋ
// img | 12345 | 678.png 가 나옴

// 알게된 사실
// 1. javascript 의 sort는 chrome 70 이후 부터 안정 정렬을 보장한다.
// 2. 안정 정렬을 보장하는 알고리즘 : 버블, 삽입, 합병 sort
// 3. 보장하지 않는 알고리즘 : 선택, 퀵 sort
// 4. 따라서 sort를 쓸 때 그냥 정렬해도 안정 정렬이 된다.


function solution(files) {
    // M. files를 분리한다. 이차원 배열 [[HEAD, NUMBER, TAIL, index]] 로 재구성한다.
    const newFiles = files.map((name, index) => {
        let HEAD = '';
        let NUMBER = '';
        let TAIL = '';

        for(let i=0; i<name.length; i++) {
            const chr = name[i];

            if(chr >= '0' && chr <= '9') {
                if(NUMBER.length < 5) NUMBER += chr;
                else { // 최대 5글자 이므로 그 뒤는 TAIL임
                    TAIL = name.slice(i);
                    break;
                }
            }
            else {
                if(!NUMBER.length) HEAD += chr; // NUMBER에 값이 없으면, HEAD
                else { // 값이 있다면 TAIL
                    TAIL = name.slice(i);
                    break;
                }
            }
        }

        return [HEAD, NUMBER, TAIL];
    });

    const compareFunction = (a, b) => {
        let [c1, n1] = [a[0].toLowerCase(), b[0].toLowerCase()];
        let [c2, n2] = [Number(a[1]), Number(b[1])];

        if(c1 < n1) return -1;
        else if(c1 > n1) return 1;
        else { // HEAD 같을 경우, NUMBER 로 sort
            if(c2 < n2) return -1;
            else if(c2 > n2) return 1;
        }
        return 0;
    }

    // console.log(newFiles);

    // I. sort
    newFiles.sort(compareFunction);
    console.log(newFiles);

    return newFiles.map(v => v.join(''));
}


// function solution(files) {
//     // M. files를 분리한다. 이차원 배열 [[HEAD, NUMBER, TAIL, index]] 로 재구성한다.
//     const newFiles = files.map((name, index) => {
//         let HEAD = '';
//         let NUMBER = '';
//         let TAIL = '';
//
//         for(let i=0; i<name.length; i++) {
//             const chr = name[i];
//
//             if(isNaN(parseInt(chr)) && !NUMBER.length) HEAD += chr;
//             else if(!isNaN(parseInt(chr)) && !TAIL.length) NUMBER += chr;
//             else TAIL += chr;
//         }
//
//         return [HEAD, NUMBER, TAIL];
//     });
//
//     // I. sort
//     newFiles.sort((a, b) => {
//         let [c1, n1] = [a[0].toLowerCase(), b[0].toLowerCase()];
//         let [c2, n2] = [Number(a[1]), Number(b[1])];
//
//         if(c1 < n1) return -1;
//         else if(c1 > n1) return 1;
//         else { // HEAD 같을 경우, NUMBER 로 sort
//             if(c2 < n2) return -1;
//             else if(c2 > n2) return 1;
//             else { // HEAD, NUMBER 같을 경우, 원래 순서로
//                 if(a[3] < b[3]) return -1;
//                 else if(a[3] > b[3]) return 1;
//             }
//         }
//         return 0;
//     });
//
//     console.log(newFiles);
//     // const answer = newFiles.map(v => {
//     //     const str = v.join('');
//     //     return str.substring(0, str.length-1);
//     // });
//
//     return newFiles.map(v => v.join(''))
// }



// function solution(files) {
//     // M. files를 분리한다. 이차원 배열 [[HEAD, NUMBER, TAIL, index]] 로 재구성한다.
//     const newFiles = files.map((name, index) => {
//         let HEAD = '';
//         let NUMBER = '';
//         let TAIL = '';
//
//
//         for(let i=0; i<name.length; i++) {
//             const chr = name[i];
//
//             if(chr >= '0' && chr <= '9') {
//                 if(NUMBER.length < 5) NUMBER += chr;
//                 else { // 최대 5글자 이므로 그 뒤는 TAIL임
//                     TAIL = name.slice(i);
//                     break;
//                 }
//             }
//             else {
//                 if(!NUMBER.length) HEAD += chr; // NUMBER에 값이 없으면, HEAD
//                 else { // 값이 있다면 TAIL
//                     TAIL = name.slice(i);
//                     break;
//                 }
//             }
//         }
//
//         return [HEAD, NUMBER, TAIL, index];
//     });
//
//     const compareFunction = (a, b) => {
//         let [c1, n1] = [a[0].toLowerCase(), b[0].toLowerCase()];
//         let [c2, n2] = [Number(a[1]), Number(b[1])];
//         let [c3, n3] = [a[3], b[3]];
//
//         if(c1 < n1) return -1;
//         else if(c1 > n1) return 1;
//         else { // HEAD 같을 경우, NUMBER 로 sort
//             if(c2 < n2) return -1;
//             else if(c2 > n2) return 1;
//             // else { // HEAD, NUMBER 같으면 index로 sort
//             //     if(c3 < n3) return -1;
//             //     else if(c3 > n3) return 1;
//             // }
//         }
//         return 0;
//     }
//
//     // I. sort
//     newFiles.sort(compareFunction);
//
//     console.log(newFiles);
//
//     // 이 코드가 맞긴한데 테스트기에서 인식을 못하는 것 같은데?
//     return newFiles.map(v => {
//         const str = v.join('');
//         const newStr = str.substring(0, str.length-1);
//         return newStr;
//     });
// }