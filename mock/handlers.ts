import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('http://localhost:8081/api/list', () => {
    return HttpResponse.json({
      list: [
        {
          id: 1,
          name: '잉크',
          species: '레오파드 게코',
          gender: '여아',
          date: '2024-07-03',
          traits: ['블리자드', '벨 스노우', '이클립스'],
          imageUri: 'https://example.com/images/gecko1.png',
        },
        {
          id: 2,
          name: '도미',
          species: '크레스티드 게코',
          gender: '남아',
          date: '2024-05-21',
          traits: ['릴리화이트'],
          imageUri: 'https://example.com/images/gecko2.png',
        },
        {
          id: 3,
          name: '잉크',
          species: '레오파드 게코',
          gender: '여아',
          date: '2023-11-07',
          traits: ['블랙나이트'],
          imageUri: 'https://example.com/images/gecko1.png',
        },
        {
          id: 4,
          name: '도마뱀',
          species: '레오파드 게코',
          gender: '미구분',
          date: '2025-03-03',
          traits: [
            '블레이징 블리자드',
            '패턴리스 스트라이프',
            '디아블로 블랑코',
            '레인워터 알비노',
            '리버스 스트라이프',
          ],
          imageUri: 'https://example.com/images/gecko1.png',
        },
      ],
    });
  }),
];
