// [문제 이해하기]
// 각 유저별로 신고 처리 결과 메일을 받은 횟수에 대한 배열을 반환해라.

// [구체적인 예시 찾기]

// 구현 아이디어
// 정지된 ID를 구하는 객체를 만들어야함.
// 신고한 목록을 객체의 객체로 만들어야함. // 객체의 배열은 O(N^2) 시간 복잡도가 걸림

// [문제 세분화] ==> 개선된 버전 아래
// function solution(id_list, report, k) {
//   report = new Set(report);
//   // I. 정지된 ID 목록을 구하는 객체를 만들어야 한다.
//   let freeze = {};
//   let origin = {};
//   let submit = {};
//   for (const id of id_list) {
//     freeze[id] = k;
//     origin[id] = 0;
//   }
//   for (const str of report) {
//     let [from, to] = str.split(" ");
//     // I. 객체의 객체로
//     let element = {};
//     element[`${to}`] = true;
//     submit[from] = { ...submit[from], ...element };
//     freeze[to]--;
//   }
//
//   let freezeList = [];
//   for (const id in freeze) {
//     if (freeze[id] <= 0) freezeList.push(id);
//   }
//
//   // I. 정지된 ID 리스트를 순회하면서 객체의 객체에서 찾으면됨
//   // I. 여기 O(N+M) 임
//   for (const freezeId of freezeList) {
//     for (const submitId in submit) {
//       if (submit[submitId][freezeId]) {
//         origin[submitId]++;
//       }
//     }
//   }
//
//   // return answer;
//   return Object.values(origin);
// }

// [피드백]
function solution(id_list, report, k) {
  // M. 신고 내역 + 중복 제거
  let reportSet = new Set(report);
  // M. 신고 카운트
  let reportCount = new Map();
  // M. 신고 테이블 from, to
  let reportedBy = new Map();

  // I. 신고 내역 조회
  for (const content of reportSet) {
    const [from, to] = content.split(" ");

    // I. 신고 카운트
    reportCount.set(to, (reportCount.get(to) || 0) + 1);
    // I. 신고 테이블 생성
    if (!reportedBy.has(from)) reportedBy.set(from, new Map());
    reportedBy.get(from).set(to, true);
  }

  const result = id_list.map((id) => {
    // I. 신고된 적이 없으면 return 0
    if (!reportedBy.has(id)) return 0;

    // I. 피신고자 구해서 정지 당한 사람이면 return, 그 길이를 반환
    return [...reportedBy.get(id)].filter((e) => {
      if (reportCount.get(e[0]) >= k) return e;
    }).length;
  });

  return result;
}
