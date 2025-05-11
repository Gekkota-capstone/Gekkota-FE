import { DevicesInfo } from './resposeType';
import { fetchWithAuth } from './util';

// api/lizard.ts
export interface CageData {
  name: string;
  gender: string;
  birthdate: string;
  species: string;
}

export const postPet = async (data: CageData) => {
  const response = await fetch('https://example.com/api/pets', {
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
  cageId: petId,
  data,
}: {
  cageId: number;
  data: {
    weight: string;
    shedding_status: string;
    memo: string;
    date: string;
  };
}): Promise<void> {
  const response = await fetchWithAuth(
    `http://localhost:8081/api/pet-healths/${petId}`,
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

// src/api/feed.ts
// src/api/post.ts
export async function postFeedRecord({
  cageId: petId,
  data,
}: {
  cageId: number;
  data: {
    date: string;
    food_type: string;
    food_size?: string;
    food_amount?: number;
    amount_unit?: string;
    memo?: string;
  };
}): Promise<void> {
  const response = await fetchWithAuth(
    `http://localhost:8081/api/pet-feeds/${petId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error('급여 생성 중 오류 발생');
  }
}

// src/api/feed.ts
// src/api/post.ts
export async function postCleanRecord({
  cageId: petId,
  data,
}: {
  cageId: number;
  data: {
    date: string;
    memo?: string;
  };
}): Promise<void> {
  const response = await fetchWithAuth(
    `http://localhost:8081/api/pet-cleans/${petId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error('청소 생성 중 오류 발생');
  }
}

export async function postLLMMessage({
  cageId: petId,
  data,
}: {
  cageId: number;
  data: {
    question: string;
  };
}): Promise<{ answer: string }> {
  const response = await fetchWithAuth(
    `http://localhost:8081/api/chats/${petId}/query`,
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

export async function postUserInfo({
  data,
}: {
  data: {
    nickname: string;
    profile: string;
  };
}): Promise<{
  nickname: string;
  profile: string;
}> {
  const response = await fetchWithAuth(
    `http://localhost:8081/api/user/me/profile`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error('유저 정보중 오류 발생');
  }

  const responseData = await response.json();
  return responseData;
}

export async function postDevicesInfo(): Promise<DevicesInfo> {
  const response = await fetchWithAuth(`http://localhost:8081/api/devices`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('기기 데이터를 불러오는 중 오류 발생');
  }

  return response.json();
}
