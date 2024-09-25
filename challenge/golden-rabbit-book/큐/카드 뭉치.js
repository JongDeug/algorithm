// [문제 이해하기]
// cards1, cards2 가 큐인데 이걸 활용해서 goal 을 만들 수 있는지 확인해라.

// [문제 세분화]
function solution(cards1, cards2, goal) {
    let flag = true
    // I. goal 기준으로 빼서 cards1, cards2 확인하면 되겠다!!
    while(goal.length && flag) {
        const element = goal.shift();

        if(element === cards1[0] || element === cards2[0]) {
            flag = true;
            if(element === cards1[0]) cards1.shift();
            else cards2.shift();
        }else {
            flag = false;
        }
    }

    return flag ? "Yes" : "No";
}