// [문제 이해하기]
// LRU 캐시 교체 알고리즘을 사용해서 총 실행 시간을 출력하는 함수를 구현하라.

// 입력: cacheSize(캐시 크기), cities(array of strings)
// 출력: int(실행 시간)

// 조건
// 1. LRU 사용
// 2. hit: 1, miss: 5
// 3. 대소문자 가리지 않음.

// 핵심
// 한 번 틀렸는데 캐시 크기가 0인경우도 생각해줘야함!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// [구체적인 예시]
//

// [문제 세분화]
function solution(cacheSize, cities) {
    // M. queue(cacheSize)
    let queue = [];
    // M. 총 실행 시간
    let answer = 0;

    // I. 반복문 cities
    cities.map(city => {
        // I. 조건 맞추기
        let lowerCity = city.toLowerCase();

        // I. If hit (+1)
        let index = queue.indexOf(lowerCity);
        if(index !== -1) {
            let element = queue[index];
            // I. index까지 다 밀어넣기
            for(let i=index; i<queue.length-1; i++) {
                queue[i] = queue[i+1];
            }
            queue[queue.length-1] = element;
            answer += 1;
        }
        // I. If miss (+5)
        else {
            // I. If 꽉차면 dequeue 하고 enqueue
            if(queue.length < cacheSize) {
                queue.push(lowerCity);
            } else {
                // I. If cacheSize가 0일 경우도 생각해야함. *********************************
                if(cacheSize !== 0) {
                    queue.shift();
                    queue.push(lowerCity);
                }
            }
            answer += 5;
        }
        // console.log(answer, queue);
    });

    return answer;
}