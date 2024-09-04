// [문제 이해하기]
// 스테이지의 실패율을 구해서 내림차순으로 나타내는 로직을 구현해라.

// [문제 세분화]
function solution(N, stages) {
    // M. 사람 수를 구한다. stageN
    let human = stages.length;
    // M. 중간 답
    let obj = Array.from({length: N}, (_, i) => ({stage: i, fail: 0}));

    // I. N번 반복하는 for 문
    for(let i=1; i<=N; i++){
        // 	i. N스테이지에 남아 있는 사람을 구한다.
        let remain = 0;
        stages.forEach(item => {
            if(item === i) remain++;
        })
        // 	i. 실패율을 구한다.
        obj[i-1].fail = remain / human;
        //  i. 사람 수를 뺌
        human -= remain;
    }

    // I. 실패율로 정렬 -> 스테이지로 정렬
    obj.sort((a, b) => {
        const failA = a.fail;
        const failB = b.fail;
        const stageA = a.stage;
        const stageB = b.stage;

        if(failA - failB < 0) return 1;
        else if(failA - failB > 0) return -1;
        else {
            // i. 스테이지로 정렬(오름차순임)
            return stageA - stageB;
        }
    });

    return obj.map(el => el.stage + 1);
}