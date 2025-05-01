import { fetchWithAuth } from './util';

// api/lizard.ts
export interface CageData {
  name: string;
  gender: string;
  birthdate: string;
  species: string;
}

export const postCage = async (data: CageData) => {
  const response = await fetch('https://example.com/api/cage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer YOUR_ACCESS_TOKEN',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('도마뱀 등록에 실패했습니다.');
  }

  return response.json(); // or return true
};

// src/api/health.ts
// src/api/post.ts
export async function postHealthRecord({
  cageId,
  data,
}: {
  cageId: number;
  data: {
    weight: string;
    shedding: string;
    memo: string;
    photo?: string; // 선택 사항
  };
}): Promise<void> {
  const response = await fetchWithAuth(
    `http://localhost:8081/api/cages/${cageId}/health`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error('건강 기록 생성 중 오류 발생');
  }
}

export async function postLLMMessage({
  cageId,
  data,
}: {
  cageId: number;
  data: {
    message: string;
  };
}): Promise<{ message: string }> {
  const response = await fetchWithAuth(
    `http://localhost:8081/api/cages/${cageId}/llm`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error('llm 대화 중 오류 발생');
  }

  const responseData = await response.json();
  return responseData;
}
