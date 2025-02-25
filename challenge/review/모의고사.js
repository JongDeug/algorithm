// [문제 이해하기]
// 수포자 삼인방이 수학 문제를 전부 찍으려하는데 가장 많이 맞힌 사람이 누구인지 오름차순으로 정렬해서 반환

// [제약 조건]
// 1번 수포자: 1,2,3,4,5 반복
// 2번 수포자: 2,1,2,3,2,4,2,5 반복
// 3번 수포자: 3,3,1,1,2,2,4,4,5,5 반복
// 맞춘 사람이 없으면 배열에 포함 x, 있는 경우 가장 높은 사람 선택해서 오름차순으로 정렬

// [문제 세분화]
function solution(answers) {
    // count map 필요, 수포자 필요
    const countMap = new Map([[1, 0], [2, 0], [3, 0]]);
    const first = [1, 2, 3, 4, 5];
    const second = [2, 1, 2, 3, 2, 4, 2, 5];
    const third = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

    // 주어진 인덱스가 배열의 길이를 넘어가면 다시 조정해주는 함수 작성
    const reArrange = (arr, idx) => {
        if (idx >= arr.length) return idx % arr.length;
        return idx;
    };

    // for문을 돌려서 수포자랑 맞으면 카운트 업!
    for (let i = 0; i < answers.length; i++) {
        if (first[reArrange(first, i)] === answers[i]) countMap.set(1, countMap.get(1) + 1);
        if (second[reArrange(second, i)] === answers[i]) countMap.set(2, countMap.get(2) + 1);
        if (third[reArrange(third, i)] === answers[i]) countMap.set(3, countMap.get(3) + 1);
    }

    // count map을 참고해서 배열 반환
    const result = [];
    const max = Math.max(...countMap.values());
    countMap.forEach((v, k) => {
        if (v === max) result.push(k);
    });

    return result.sort();
}

console.log(solution([1, 2, 3, 4, 5]));
console.log(solution([1, 3, 2, 4, 2]));