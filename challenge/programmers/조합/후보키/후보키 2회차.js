// [문제 이해하기]
// 유일성, 최소성을 만족하는 후보키 개수 구하기

// 입력: relation(nested array)
// 출력: int(후보키 개수)

// 핵심
// 1. 조합 N개중 R개(1 ~ relation의 컬럼 개수만큼)를 모두 구함
// 2. 포함되어 있으면 제거하면됨 ex) BC -> BDC 라면 제거

// 캬 1회차 보다 더 깔끔해졌음.
// 2번 로직이 참 까다롭지만 좋다.

// [문제 세분화]
function solution(relation) {
    // M. rowlen, collen
    const [rowLen, colLen] = [relation.length, relation[0].length];
    // M. 조합 구한거 담기
    let arr = [];
    let answer = [];
    // M. 조합 N개 중 R개 구하는 함수
    const combination = (k, n, r, temp) => {
        // Base Case
        if (temp.length === r) { // [0, 1], [0, 2], [0, 3] ....
            // I. 유일성을 만족하는 조합을 구한다.
            const set = new Set();
            let str = '';
            for(let row=0; row<rowLen; row++) { // row
                for(const col of temp) { // col : // [0, 1]
                    str += relation[row][col];
                }
                set.add(str);
                str = ''
            }
            // I. 만약 유일성을 만족한다면
            if(set.size === rowLen) arr.push([...temp]);
            return;
        }

        // I. 조합 로직(k로 중복 조합 방지)
        for (let i = k; i < n; i++) {
            temp.push(i);
            combination(i + 1, n, r, temp);
            temp.pop();
        }
    };

    // I. 조합 N개 중 R개의 모든 경우의 수를 구한다.
    for (let i=1; i<=colLen; i++) {
        combination(0, colLen, i, []);
    }

    // I. 다 구했다면 포함되어 있는 놈만 제거하면 됨. BC => BDC 제거
    for(let i=arr.length-1; i>=0; i--) {
        let isInclude = false;
        for(let j=i-1; j>=0; j--) {
            // I. 뒤에서부터 돌면서 이자식이 너의 요소를 모두 포함하냐?
            if(arr[j].every(num => arr[i].includes(num))) isInclude = true;
        }

        // I. 포함되지 않는 놈은 filter
        if(!isInclude) answer.push(arr[i]);
    }

    return answer.length;
}