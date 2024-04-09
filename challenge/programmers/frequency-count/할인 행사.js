// [문제 이해하기]
// 원하는 제품과 수량이 일치하는 날짜의 총 일수를 반환하는 함수 작성

// input : (want, number), discount
// output : 0 or int

// 핵심 : 빈도수 카운트, 그냥 for문 돌려도 문제 없음
function solution(want, number, discount) {
    var answer = 0;
    let frequencyCount = {};

    // M. want, number를 객체 형태로 변경.
    for (let i = 0; i < want.length; i++) {
        frequencyCount[`${want[i]}`] = number[i];
    }

    // console.log(frequencyCount)

    // discount n번 순회
    for (let i = 0; i < discount.length; i++) {
        let discountFrequency = {};

        // discount 빈도수 만들기
        discount.slice(i, i + 10).forEach(item => {
            discountFrequency[`${item}`] = (discountFrequency[`${item}`] || 0) + 1;
        });

        let check = false;
        // discount 객체, I1에서 만든 객체랑 같거나 넘으면 +1
        for (let key in frequencyCount) {
            if (!discountFrequency[key] || frequencyCount[key] > discountFrequency[key]) {
                check = false;
                break;
            }
            check = true;
        }

        if (check) answer++;

        // console.log(discountFrequency, answer)
    }
    return answer;
}