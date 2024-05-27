// [문제 이해하기]
// 호텔을 운영 중인 코니가 예약 손님을 받는데 최소 객실의 수를 return 하는 함수를 구현하라.

// 입력 : 2차원 배열 HH:MM 형태
// 출력 : 최소 객실 수 int

// 핵심 : 뒷 시간 기준으로 sort, 차이가 가장 적은 방에 배치

// 리펙토링한 코드
function solution(book_time) {
    let rooms = {};
    let answer = 1;

    // I1. ['10:30', '12:30'] '12:30' => 뒷 시간으로 sort
    book_time = book_time.sort((a, b) => {
        if (a[1] < b[1]) {
            return -1;
        } else return 1;
    });

    // I2. book_time 순회하면서 rooms에 방 배정
    book_time.forEach(time => {
        let minTime = Infinity;
        let minKey = null;
        let [start, end] = time;

        // 첫 번째 요소 처리
        if (!Object.keys(rooms).length) rooms[`${answer}`] = [time];

        // I3. 이미 배정된 방의 시간과 비교해서 차이가 가장 적은 방을 찾음
        for (const roomNum in rooms) {
            let already = parseMinutes(rooms[roomNum][rooms[roomNum].length - 1][1], true);
            let will = parseMinutes(time[0], false);

            if (already <= will && minTime > will - already) {
                minTime = will - already;
                minKey = roomNum;
            }
        }

        // I4. 차이가 가장 적은 방에 배정
        if (minKey) rooms[minKey].push(time);
        else rooms[`${++answer}`] = [time];
    });
    return answer;
}

// I5. already에 방 치우는 시간 10분 더해줘야함.
function parseMinutes(time, isAlready) {
    const [h, m] = time.split(':').map(x => Number(x));
    return isAlready ? (h * 60 + m + 10) : (h * 60 + m);
}


// 좀 지리는 코드 ..
// function makeMinStamp(time) {
//     const [hour, min] = time.split(":").map(v => Number(v));
//     return hour * 60 + min;
// }
//
// function solution(book_time) {
//     const timeArr = Array.from({ length: makeMinStamp('23:59') + 10 }, () => 0);
//
//     book_time.forEach((time, i) => {
//         const [s, e] = time;
//         let start = makeMinStamp(s);
//         const end = makeMinStamp(e) + 9;
//
//         for (start; start <= end; start++) {
//             timeArr[start]++;
//             console.log(timeArr[start])
//         }
//     });
//
//     return Math.max(...timeArr);
// }
//
// console.log(solution([["5:00", "15:00"], ["10:00", "20:00"], ["20:30", "23:00"], ["15:30", "23:30"]]));

// 코드가 너무 지저분해 ㅠㅠ
// function solution(book_time) {
//     let obj = {};
//     let count = 1;
//
//     // I1. 뒷 시간으로 sort
//     book_time = book_time.sort((a, b) => {
//         if(a[1] < b[1]) {
//             return -1;
//         } else return 1;
//     });
//
//     // console.log(book_time)
//
//     obj[`${count}`] = [book_time.shift()];
//
//     // console.log(obj)
//     // I2. 이차원 배열 순환하면서 새로운 객체에 해당하는 값을 넣어서 만들어서 넣어야 함.
//     book_time.forEach(time => {
//         let isPush = false;
//         let min = Infinity;
//         let minKey;
//         // I3. 배정된 방의 시간을 보면서 차례로 넣기
//         for (const key in obj) {
//             let already = parseMinutes(obj[key][obj[key].length - 1][1], true);
//             let will = parseMinutes(time[0], false);
//
//             // console.log(obj[key][obj[key].length - 1][1], time[0], already, will);
//             if(already <= will && min > will - already) {
//                 min = will - already
//                 minKey = key;
//             }
//         }
//
//         if(minKey) {
//             obj[minKey].push(time);
//         }else {
//             obj[`${++count}`] = [time];
//         }
//         // console.log(obj, count)
//     });
//     return count;
// }
//
// function parseMinutes(time, isAlready) {
//     time = time.split(':');
//     let t = parseInt(time[0])
//     let m = parseInt(time[1])
//     return isAlready ? (t * 60 + m + 10) : (t * 60 + m);
// }