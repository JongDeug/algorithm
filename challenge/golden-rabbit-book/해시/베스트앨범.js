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
function solution(genres, plays) {
  // I. 배열 객체로 만들어야 함.
  let obj = [];
  // I. 총 재생수 구하기 위함
  let sum = {};
  for (let i = 0; i < genres.length; i++) {
    sum[genres[i]] = (sum[genres[i]] || 0) + plays[i]; // I. 여기서 틀렸구나 !!!
    obj[i] = {
      genres: genres[i],
      plays: plays[i],
      nums: i,
    };
  }

  obj.sort((a, b) => {
    // I. 장르별 총 재생수로 정렬하기 (오름차순)
    if (sum[a.genres] !== sum[b.genres]) {
      return sum[a.genres] - sum[b.genres];
    }

    // I. 장르안에서 재생수로 정렬(오름)
    if (a.plays !== b.plays) {
      return b.plays - a.plays;
    }

    // I. 같으면 고유 번호 순서대로 정렬(내림)
    return a.nums - b.nums;
  });

  let answer = [];
  let genresCount = {};

  // I. 이것조차 객체를 활용한다 !
  for (let item of obj) {
    genresCount[item.genres] = genresCount[item.genres] || 0;

    if (genresCount[item.genres] < 2) {
      answer.push(item.nums);
      genresCount[item.genres]++;
    }
  }

  return answer;
}
