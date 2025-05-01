import {
  BehaviorAnalyticsResponse,
  CageList,
  CageState,
  HealthRecordResponse,
  LiveCameras,
  LLMMessageResponse,
  WeightHistoryResponse,
} from './resposeType';
import { fetchWithAuth } from './util';

export async function getList(): Promise<CageList> {
  const response = await fetchWithAuth('http://localhost:8081/api/list');

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
  const response = await fetchWithAuth(
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
  const response = await fetchWithAuth(
    `http://localhost:8081/api/cages/${cageId}/live`
  );

  if (!response.ok) {
    throw new Error('행동 분석 데이터를 가져오는 중 오류 발생');
  }

  return await response.json();
}

export async function getHealthRecord({
  cageId,
  date,
}: {
  cageId: number;
  date: string;
}): Promise<HealthRecordResponse> {
  const response = await fetchWithAuth(
    `http://localhost:8081/api/cages/${cageId}/health?date=${date}`
  );

  if (!response.ok) {
    throw new Error('건강 기록 데이터를 가져오는 중 오류 발생');
  }

  return await response.json();
}

export async function getWeightHistory({
  cageId,
  date,
}: {
  cageId: number;
  date: string; // YYYY-MM-DD
}): Promise<WeightHistoryResponse> {
  const response = await fetchWithAuth(
    `http://localhost:8081/api/cages/${cageId}/weights?date=${date}`
  );

  if (!response.ok) {
    throw new Error('몸무게 데이터를 불러오는 중 오류 발생');
  }

  return response.json();
}

export async function getLLMMessage({
  cageId,
}: {
  cageId: number;
}): Promise<LLMMessageResponse> {
  const response = await fetchWithAuth(
    `http://localhost:8081/api/cages/${cageId}/llm`
  );

  if (!response.ok) {
    throw new Error('대화 데이터를 불러오는 중 오류 발생');
  }

  return response.json();
}

export async function getCageState({
  cageId,
}: {
  cageId: number;
}): Promise<CageState> {
  const response = await fetchWithAuth(
    `http://localhost:8081/api/cages/${cageId}/state`
  );

  if (!response.ok) {
    throw new Error('몸무게 데이터를 불러오는 중 오류 발생');
  }

  return response.json();
}
