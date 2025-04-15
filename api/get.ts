export async function getList(): Promise<{
  list: {
    id: number;
    name: string;
    species: string;
    gender: string;
    date: string;
    traits: string[];
    imageUri: string;
  }[];
}> {
  const response = await fetch('http://localhost:8081/api/list');

  if (!response.ok) {
    throw new Error('API 호출 중 에러 발생');
  }

  const data = await response.json();
  return data;
}

// src/api/getBehaviorAnalytics.ts

export interface BehaviorAnalyticsResponse {
  abnormalBehavior: string;
  highlightVideoUrl: string | null;
  bioPattern: {
    wakeUp: { start: number; end: number };
    sleep: { start: number; end: number };
    mostActive: { start: number; end: number };
  };
  heatmapImageUrl: string | null;
  activityGraph: {
    type: 'hourly' | 'daily';
    data: [20, 45, 28, 80, 99, 43, 54, 33, 22];
  };
}

export async function getBehaviorAnalytics({
  cageId,
  date,
}: {
  cageId: number;
  date: string;
}): Promise<BehaviorAnalyticsResponse> {
  const response = await fetch(
    `http://localhost:8081/api/cages/${cageId}/behaviors?date=${date}`
  );

  if (!response.ok) {
    throw new Error('행동 분석 데이터를 가져오는 중 오류 발생');
  }

  return await response.json();
}
