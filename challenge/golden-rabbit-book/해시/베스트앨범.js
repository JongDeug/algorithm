// [문제 이해하기]
// 데이터에서 조건에 맞춰 베스트 앨범의 고유 번호 배열을 반환해라
//
// [시간 복잡도]
// 장르별 정렬 => plays 별 정렬 => 고유번호 순서대로 정렬
// O(NlogN)
//
// [문제 세분화] => 아래 더 깔끔한 버전
// function solution(genres, plays) {
//   // I. 배열 객체로 만들어야 함.
//   let obj = [];
//   // I. 총 재생수 구하기 위함
//   let sum = {};
//   for (let i = 0; i < genres.length; i++) {
//     sum[genres[i]] = (sum[genres[i]] || 0) + plays[i]; // I. 여기서 틀렸구나 !!!
//     obj[i] = {
//       genres: genres[i],
//       plays: plays[i],
//       nums: i,
//     };
//   }
//
//   // 이렇게 하면 N^2 을 피할 수 있네
//
//   obj.sort((a, b) => {
//     // I. 장르별 총 재생수로 정렬하기 (오름차순)
//     if (sum[a.genres] < sum[b.genres]) return 1;
//     else if (sum[a.genres] > sum[b.genres]) return -1;
//     else {
//       // I. 장르안에서 재생수로 정렬(오름)
//       if (a.plays < b.plays) return 1;
//       else if (a.plays > b.plays) return -1;
//       else {
//         // I. 같으면 고유 번호 순서대로 정렬(내림)
//         return a.nums - b.nums;
//       }
//     }
//   });
//
//   let answer = [obj[0].nums];
//   let prevGenres = obj[0].genres;
//   let count = 1;
//
//     //console.log(obj)
//
//     for(let i=1; i<obj.length; i++) {
//         // I. 같은 장르면
//        if(prevGenres === obj[i].genres) {
//            if(count < 2) {
//            	   answer.push(obj[i].nums);
//                count++;
//            }
//        }
//         // I. 다른 장르면
//         else {
//             answer.push(obj[i].nums);
//             count = 1;
//         }
//        prevGenres = obj[i].genres;
//     }
//   return answer;
// }
//

// [피드백]
// function solution(genres, plays) {
//   // I. 배열 객체로 만들어야 함.
//   let obj = [];
//   // I. 총 재생수 구하기 위함
//   let sum = {};
//   for (let i = 0; i < genres.length; i++) {
//     sum[genres[i]] = (sum[genres[i]] || 0) + plays[i]; // I. 여기서 틀렸구나 !!!
//     obj[i] = {
//       genres: genres[i],
//       plays: plays[i],
//       nums: i,
//     };
//   }

//   obj.sort((a, b) => {
//     // I. 장르별 총 재생수로 정렬하기 (오름차순)
//     if (sum[a.genres] !== sum[b.genres]) {
//       return sum[a.genres] - sum[b.genres];
//     }

//     // I. 장르안에서 재생수로 정렬(오름)
//     if (a.plays !== b.plays) {
//       return b.plays - a.plays;
//     }

//     // I. 같으면 고유 번호 순서대로 정렬(내림)
//     return a.nums - b.nums;
//   });

//   let answer = [];
//   let genresCount = {};

//   // I. 이것조차 객체를 활용한다 !
//   for (let item of obj) {
//     genresCount[item.genres] = genresCount[item.genres] || 0;

//     if (genresCount[item.genres] < 2) {
//       answer.push(item.nums);
//       genresCount[item.genres]++;
//     }
//   }

//   return answer;
// }

// [문제 이해하기] => 직접 품, 복습 큐
// 주어진 조건 대로 (1,2,3) 정렬해 결과값을 return

// [문제 풀이하기]
// genres + plays 합치기
// M. 옵젝 생성
// const obj = {
//   classic: {
//     e: [],
//     sum: 0
//   }
// }
// 1. 장르별 합 구하기
// 2. 요소별 정렬
// 3. obj 에서 두개 빼서 반환
function solution(genres, plays) {
  let obj = {};
  let answer = [];
  // obj 초기화
  for (let i = 0; i < genres.length; i++) {
    obj[genres[i]] = { elements: [], sum: 0 };
  }

  // 장르별 합, 요소 추가
  for (let i = 0; i < genres.length; i++) {
    obj[genres[i]].sum += plays[i];
    obj[genres[i]].elements.push([plays[i], i]);
  }

  // 장르 정렬
  const sortedObj1 = Object.entries(obj).sort((a, b) => b[1].sum - a[1].sum);
  obj = Object.fromEntries(sortedObj1);

  // 요소 정렬 후 정답 생성
  for (const genre of Object.values(obj)) {
    genre.elements.sort((a, b) => {
      if (b[0] !== a[0]) return b[0] - a[0];
      return a[1] - b[1];
    });
    answer.push(...genre.elements.slice(0, 2).map((x) => x[1]));
  }
  return answer;
}
