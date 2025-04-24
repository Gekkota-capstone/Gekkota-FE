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
          birthdate: '2024-07-03',
        },
        {
          id: 2,
          name: '도미',
          species: '크레스티드 게코',
          gender: '남아',
          birthdate: '2024-05-21',
          traits: ['릴리화이트'],
        },
        {
          id: 3,
          name: '잉크',
          species: '레오파드 게코',
          gender: '여아',
          birthdate: '2023-11-07',
        },
        {
          id: 4,
          name: '도마뱀',
          species: '레오파드 게코',
          gender: '미구분',
          birthdate: '2025-03-03',
        },
      ],
    });
  }),
  http.post('https://example.com/api/cage', async ({ request }) => {
    const body = await request.json();

    console.log('🐾 POST 요청 데이터:', body);

    return HttpResponse.json({
      message: '도마뱀이 성공적으로 추가되었습니다.',
    });
  }),
  http.get('http://localhost:8081/api/cages/:cageId/behaviors', () => {
    return HttpResponse.json({
      abnormalBehavior: '크레스티드 게코의 파이어업 상태 30분간 지속',
      highlightVideoUrl: 'https://direp.s3.amazonaws.com/test/sample.mp4',
      bioPattern: {
        wakeUp: { start: 8, end: 14 },
        sleep: { start: 14, end: 8 },
        mostActive: { start: 10, end: 11 },
      },
      heatmapImageUrl: 'https://via.placeholder.com/400x200',
      activityGraph: {
        type: 'hourly',
        data: [20, 45, 28, 80, 99, 43, 54, 33, 22],
      },
    });
  }),
];
