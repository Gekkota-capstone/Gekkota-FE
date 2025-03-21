import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('http://localhost:8081/api/list', () => {
    return HttpResponse.json({
      list: {
        id: 1,
        name: '테이블 1',
        type: 'PARLIAMENTARY',
        duration: '1800',
      },
    });
  }),
];
