const sunho = Array(35);
const classmate = [
    '빈 칸',
    '고준영',
    '김다영',
    '김민영',
    '김선우',
    '김연준',
    '김예은',
    '김완희',
    '김준이',
    '김희수',
    '마수현',
    '민태윤',
    '박상현',
    '박서린',
    '박유주',
    '배상준',
    '유예니',
    '이도현',
    '이소정',
    '이주원',
    '이지호',
    '임아림',
    '장재웅',
    '전주하',
    '정서윤',
    '정재선',
    '정지현',
    '지현호',
    '진호찬',
    '최민서',
    '최성훈',
    '최준서',
    '함예인',
    '황신혜',
    '이유리'
]

function num(name) {
    return classmate.indexOf(name);
}

for(let i = 2; i<=34; i++) {
    sunho[i] = [];
}

function put(person1, person2, score) {
    sunho[num[person1]].push([person2, score]);
}

