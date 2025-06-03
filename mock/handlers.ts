import { http, HttpResponse } from 'msw';
const feedData = [
  {
    date: '2025-05-01',
    food_type: '누에',
    food_size: '중',
    food_amount: 2,
    amount_unit: '마리',
    message: '',
  },
  {
    date: '2025-05-06',
    food_type: '사료',
    food_size: '소',
    food_amount: 3,
    amount_unit: 'g',
    message: '정기 급여',
  },
  {
    date: '2025-05-08',
    food_type: '밀웜',
    food_size: '대',
    food_amount: 5,
    amount_unit: '마리',
    message: '',
  },
  // 필요에 따라 더 많은 데이터 추가
];

export const handlers = [
  http.get('http://localhost:8081/api/pets', () => {
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
  http.post('https://localhost:8081/api/pets', async ({ request }) => {
    const body = await request.json();

    console.log('POST 요청 데이터:', body);

    return HttpResponse.json({
      message: '도마뱀이 성공적으로 추가되었습니다.',
    });
  }),
  http.get('http://localhost:8081/api/pet-actives/:petId', () => {
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
        recentDatOfActivit: [
          { day: '04.01', value: 120 },
          { day: '04.02', value: 95 },
          { day: '04.03', value: 150 },
          { day: '04.04', value: 80 },
          { day: '04.05', value: 110 },
          { day: '04.06', value: 130 },
          { day: '04.07', value: 90 },
        ],
        timeOfActivity: [
          { hour: '0', value: 20 },
          { hour: '3', value: 45 },
          { hour: '6', value: 28 },
          { hour: '9', value: 80 },
          { hour: '12', value: 99 },
          { hour: '15', value: 43 },
          { hour: '18', value: 54 },
          { hour: '21', value: 33 },
          { hour: '24', value: 22 },
        ],
      },
    });
  }),

  // http.get('http://localhost:8081/api/cages/:cageId/live', () => {
  //   return HttpResponse.json({
  //     camera1: {
  //       cameraId: 1,
  //       streamUrl: 'rtsp://210.99.70.120:1935/live/cctv001.stream',
  //     },
  //     camera2: {
  //       cameraId: 2,
  //       streamUrl: 'rtsp://210.99.70.120:1935/live/cctv001.stream',
  //     },
  //   });
  // }),
  http.get(
    'http://localhost:8081/api/pet-healths/:petId',
    ({ request, params }) => {
      const { cageId } = params;

      const requestUrl = new URL(request.url);
      const date = requestUrl.searchParams.get('date');

      if (!date) {
        return HttpResponse.json({ error: '날짜 쿼리 누락' }, { status: 400 });
      }

      const [year, month] = date.split('-');

      if (date === '2025-04-24') {
        return HttpResponse.json({
          date: '2025-04-02',
          weight: 38.5,
          memo: '잘 먹음',
          shedding_status: '탈피 완료',
          photo_urls: null,
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
      } else {
        return HttpResponse.json({
          date: '2025-04-02',
          weight: 38.5,
          memo: null,
          shedding_status: '탈피 완료',
          photo_urls: null,
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
      }

      return HttpResponse.json(null); // 데이터 없을 경우
    }
  ),

  // http.get('http://localhost:8081/api/cages/:cageId/weights', ({ request }) => {
  //   const url = new URL(request.url);
  //   const date = url.searchParams.get('date');

  //   if (!date) {
  //     return HttpResponse.json({ error: '날짜 쿼리 누락' }, { status: 400 });
  //   }

  //   const [year, month] = date.split('-');

  //   return HttpResponse.json({
  //     monthOfWeight: [
  //       { day: `${month}.01`, value: 4.2 },
  //       { day: `${month}.10`, value: 4.5 },
  //       { day: `${month}.20`, value: 4.0 },
  //       { day: `${month}.30`, value: 3.8 },
  //     ],
  //     yearOfWeight: [
  //       { month: '1월', value: 3.2 },
  //       { month: '3월', value: 4.1 },
  //       { month: '5월', value: 3.9 },
  //       { month: '7월', value: 4.5 },
  //       { month: '9월', value: 4.3 },
  //     ],
  //   });
  // }),
  http.post('http://localhost:8081/api/pet-healths/:petId', ({ request }) => {
    return HttpResponse.json({
      message: '도마뱀이 성공적으로 추가되었습니다.',
    });
  }),

  http.delete('http://localhost:8081/api/pet-healths/:petId', ({ request }) => {
    return HttpResponse.json({
      message: '도마뱀이 성공적으로 삭제되었습니다.',
    });
  }),

  http.get(
  'http://localhost:8081/api/pet-feeds/:petId',
  ({ request, params }) => {
    const { petId } = params;

    // 여러 도마뱀의 데이터를 시뮬레이션하기 위한 샘플 데이터
    const feedDataMap: { [key: string]: any } = {
      "1": [
        {
          date: '2025-05-01',
          food_type: '누에',
          food_size: '중',
          food_amount: 2,
          amount_unit: '마리',
          memo: '',
        },
        {
          date: '2025-05-06',
          food_type: '귀뚜라미',
          food_size: '소',
          food_amount: 3,
          amount_unit: 'g',
        },
      ],
      "2": [
        {
          date: '2025-05-03',
          food_type: '채소',
          food_size: '대',
          food_amount: 1,
          amount_unit: '개',
          memo: '브로콜리 급여',
        },
        {
          date: '2025-05-10',
          food_type: '밀웜',
          food_size: '소',
          food_amount: 5,
          amount_unit: '마리',
        },
      ],
      "3": [
        {
          date: '2025-05-02',
          food_type: '채소',
          food_size: '중',
          food_amount: 2,
          amount_unit: '장',
          memo: '상추 급여',
        }
      ]
    };

    // 요청한 petId에 맞는 데이터를 반환, 없으면 빈 배열
    const feedData = feedDataMap[petId as string] || [];

    const requestUrl = new URL(request.url);
    const date = requestUrl.searchParams.get('date');
    
    if (!date) {
      return HttpResponse.json(feedData);
    }
    
    const filteredData = feedData.filter((data: {
  date: string;
  food_type: string;
  food_size?: string;
  food_amount?: number;
  amount_unit?: string;
  memo?: string;
}) => data.date === date);
    return HttpResponse.json(filteredData);
  }
),
  http.get(
    'http://localhost:8081/api/pet-cleans/:petId',
    ({ request, params }) => {
      const { petId } = params;

      const requestUrl = new URL(request.url);
      const date = requestUrl.searchParams.get('date');

      if (date === '2025-05-02') {
        return HttpResponse.json({
          date: '2025-05-02',
          memo: '먼지를 깨끗하게 털고 밥그릇을 닦아줌.',
        });
      }
      return HttpResponse.json(null);
    }
  ),

  http.get('http://localhost:8081/api/chats/:petId', () => {
    return HttpResponse.json({
      messages: [
        {
          id: 1,
          question: '안녕하세요! 무엇을 도와드릴까요?',
          answer: '앱 사용법을 알려주세요.',
          created_at: '2025-05-11T06:24:39.669Z',
        },
        {
          id: 2,
          question: '안녕하세요! 무엇을 도와드릴까요?',
          answer: '앱 사용법을 알려주세요.',
          created_at: '2025-05-11T06:24:39.669Z',
        },
        {
          id: 3,
          question: '안녕하세요! 무엇을 도와드릴까요?',
          answer: '앱 사용법을 알려주세요.',
          created_at: '2025-05-11T06:24:39.669Z',
        },
        {
          id: 4,
          question: '안녕하세요! 무엇을 도와드릴까요?',
          answer: '앱 사용법을 알려주세요.',
          created_at: '2025-05-11T06:24:39.669Z',
        },
      ],
    });
  }),
  http.post('http://localhost:8081/api/chats/:petId/query', ({ request }) => {
    return HttpResponse.json({
      answer: '앱 사용법은 이렇게 사용하는 거야~',
    });
  }),
  http.get(
    'http://localhost:8081/api/pets/:petId/state',
    ({ request, params }) => {
      const states = ['sleeping', 'standing'];
      const randomState = states[Math.floor(Math.random() * states.length)];

      return HttpResponse.json({
        state: randomState,
      });
    }
  ),
  http.post('http://localhost:8081/api/devices', ({ request }) => {
    return HttpResponse.json({
      SN: 'temp',
      IP: '192.168.0.200',
      rtsp_url: 'rtsp://210.99.70.120:1935/live/cctv006.stream',
      device_id: 'string',
    });
  }),
];
