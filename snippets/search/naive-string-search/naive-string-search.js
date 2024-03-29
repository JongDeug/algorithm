// 문자열을 one by one 검색하는 간단한 검색 알고리즘.
function naiveStringSearch(longer, shorter) {
    let count = 0;

    // longer loop
    for (let i = 0; i < longer.length; i++) {
        // shorter loop
        for (let j = 0; j < shorter.length; j++) {
            if ((i + j) >= longer.length) break;
            // longer, shorter 단일 요소가 다르면,
            if (longer[i + j] !== shorter[j]) break;
            // 비교했을 때 모두 같다면 count 증가
            if (j === shorter.length - 1) count++;
        }
    }
    return count;
}

// 내가 예전에 작성했던 코드
// function naiveStringSearch(longer, shorter) {
//     let count = 0;
//
//     // longer loop
//     for (let i = 0; i < longer.length; i++) {
//         let newI = i;
//         // shorter loop
//         for (let j = 0; j < shorter.length; j++) {
//             // newI 인덱스가 넘어가면 종료
//             if (newI > longer.length - 1) break;
//
//             // longer, shorter 단일 요소가 다르면 break out => 첨부터 다시
//             if (longer[newI] !== shorter[j]) break;
//             // longer, shorter 단일 요소가 같으면 => shorter, longer 인덱스 한칸씩 이동,
//             else {
//                 newI++; // longer index
//
//                 // 모두 다 같다는 것이 증명이 되면 count 증가.
//                 if (j === shorter.length - 1) count++;
//             }
//         }
//     }
//     // return count
//     return count;
// }


console.log(naiveStringSearch('wowomgzomg', 'omg'));