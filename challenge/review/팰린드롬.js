// [문제 이해하기]
// 회문을 판단하시오

function solution(str) {
    const raw = [...str].filter(v => 'a' <= v.toLowerCase() && v.toLowerCase() <= 'z');
    const reverseRaw = [...raw].reverse();

    for (let i = 0; i < raw.length; i++) {
        if (raw[i] !== reverseRaw[i]) return false;
    }
    return true;
}

console.log(solution('hello!'));
console.log(solution('mom'));

