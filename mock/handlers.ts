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
  http.post('https://localhost:8081/api/cage', async ({ request }) => {
    const body = await request.json();

    console.log('POST 요청 데이터:', body);

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

  http.get('http://localhost:8081/api/cages/:cageId/live', () => {
    return HttpResponse.json({
      camera1: {
        cameraId: 1,
        streamUrl: 'rtsp://210.99.70.120:1935/live/cctv001.stream',
      },
      camera2: {
        cameraId: 2,
        streamUrl: 'rtsp://210.99.70.120:1935/live/cctv001.stream',
      },
    });
  }),
  http.get(
    'http://localhost:8081/api/cages/:cageId/health',
    ({ request, params }) => {
      const { cageId } = params;

      const requestUrl = new URL(request.url);
      const date = requestUrl.searchParams.get('date');

      if (date === '2025-04-24') {
        return HttpResponse.json({
          date: '2025-04-02',
          weight: 38.5,
          memo: '잘 먹음',
          shedding_status: '탈피 완료',
          photo_urls: null,
        });
      }

      return HttpResponse.json(null); // 데이터 없을 경우
    }
  ),

  http.get('http://localhost:8081/api/cages/:cageId/weights', ({ request }) => {
    const url = new URL(request.url);
    const date = url.searchParams.get('date');

    if (!date) {
      return HttpResponse.json({ error: '날짜 쿼리 누락' }, { status: 400 });
    }

    const [year, month] = date.split('-');

    return HttpResponse.json({
      monthOfWeight: [
        { day: `${month}.01`, value: 4.2 },
        { day: `${month}.10`, value: 4.5 },
        { day: `${month}.20`, value: 4.0 },
        { day: `${month}.30`, value: 3.8 },
      ],
      yearOfWeight: [
        { month: '1월', value: 3.2 },
        { month: '3월', value: 4.1 },
        { month: '5월', value: 3.9 },
        { month: '7월', value: 4.5 },
        { month: '9월', value: 4.3 },
      ],
    });
  }),
  http.post('http://localhost:8081/api/cages/:cageId/health', ({ request }) => {
    return HttpResponse.json({
      message: '도마뱀이 성공적으로 추가되었습니다.',
    });
  }),

  http.delete(
    'http://localhost:8081/api/cages/:cageId/health',
    ({ request }) => {
      return HttpResponse.json({
        message: '도마뱀이 성공적으로 삭제되었습니다.',
      });
    }
  ),
  http.get(
    'http://localhost:8081/api/cages/:cageId/feed',
    ({ request, params }) => {
      const { cageId } = params;

      const requestUrl = new URL(request.url);
      const date = requestUrl.searchParams.get('date');

      if (date === '2025-05-01') {
        return HttpResponse.json({
          date: '2025-05-01',
          food_type: '누에',
          food_size: '중',
          food_amount: 2,
          amount_unit: '마리',
          message: ''
        });
      }
      return HttpResponse.json(null);
    }),
  http.get('http://localhost:8081/api/cages/:cageId/llm', () => {
    return HttpResponse.json({
      messages: [
        { say: 'AI', text: '안녕하세요! 무엇을 도와드릴까요?' },
        { say: 'ME', text: '앱 사용법을 알려주세요.' },
        { say: 'AI', text: '안녕하세요! 무엇을 도와드릴까요?' },
        { say: 'ME', text: '앱 사용법을 알려주세요.' },
        { say: 'AI', text: '안녕하세요! 무엇을 도와드릴까요?' },
        { say: 'ME', text: '앱 사용법을 알려주세요.' },
        { say: 'AI', text: '안녕하세요! 무엇을 도와드릴까요?' },
        { say: 'ME', text: '앱 사용법을 알려주세요.' },
        { say: 'AI', text: '안녕하세요! 무엇을 도와드릴까요?' },
        { say: 'ME', text: '앱 사용법을 알려주세요.' },
        { say: 'AI', text: '안녕하세요! 무엇을 도와드릴까요?' },
        { say: 'ME', text: '앱 사용법을 알려주세요.' },
        { say: 'AI', text: '안녕하세요! 무엇을 도와드릴까요?' },
        { say: 'ME', text: '앱 사용법을 알려주세요.' },
        { say: 'AI', text: '안녕하세요! 무엇을 도와드릴까요?' },
        { say: 'ME', text: '앱 사용법을 알려주세요.' },
      ],
    });
  }),
  http.post('http://localhost:8081/api/cages/:cageId/llm', ({ request }) => {
    return HttpResponse.json({
      message: '앱 사용법은 이렇게 사용하는 거야~',
    });
  }),
  http.get(
    'http://localhost:8081/api/cages/:cageId/state',
    ({ request, params }) => {
      const states = ['sleeping', 'standing'];
      const randomState = states[Math.floor(Math.random() * states.length)];

      return HttpResponse.json({
        state: randomState,
      });
    }
  ),
];
