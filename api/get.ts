import {
  BehaviorAnalyticsResponse,
  CageList,
  LiveCameras,
} from './resposeType';

export async function getList(): Promise<CageList> {
  const response = await fetch('http://localhost:8081/api/list');

  if (!response.ok) {
    throw new Error('API 호출 중 에러 발생');
  }

  const data = await response.json();
  return data;
}

// src/api/getBehaviorAnalytics.ts
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

export async function getLiveCameras({
  cageId,
}: {
  cageId: number;
}): Promise<LiveCameras> {
  const response = await fetch(
    `http://localhost:8081/api/cages/${cageId}/live`
  );

  if (!response.ok) {
    throw new Error('행동 분석 데이터를 가져오는 중 오류 발생');
  }

  return await response.json();
}
