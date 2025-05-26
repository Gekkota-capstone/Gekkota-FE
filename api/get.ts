import {
  BehaviorAnalyticsResponse,
  CageList,
  CageState,
  HealthRecordResponse,
  FeedRecordResponse,
  CleanRecordResponse,
  LiveCameras,
  LLMMessageResponse,
  WeightHistoryResponse,
  DevicesInfo,
} from './resposeType';
import { fetchWithAuth } from './util';

export async function getPets(): Promise<CageList> {
  const response = await fetchWithAuth('https://api.saffir.co.kr/pets/');

  if (!response.ok) {
    throw new Error('API 호출 중 에러 발생');
  }

  const data = await response.json();
  return data;
}

export async function getPetInfo(petId: string) {
  const response = await getPets(); // 기존 리스트 전부 가져오기
  const petData = response.find((item) => item.pet_id === petId);

  if (!petData) {
    throw new Error('해당 ID의 도마뱀 정보를 찾을 수 없습니다.');
  }

  return petData; // petData 반환
}

// src/api/getBehaviorAnalytics.ts
export async function getBehaviorAnalytics({
  cageId: petid,
  date,
}: {
  cageId: string;
  date: string;
}): Promise<BehaviorAnalyticsResponse> {
  const response = await fetchWithAuth(
    `https://api.saffir.co.kr/pet-actives/${petid}?query_date=${date}`
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
  cageId: string;
  date: string;
}): Promise<HealthRecordResponse> {
  const response = await fetchWithAuth(
    `https://api.saffir.co.kr/pet-healths/${cageId}?date=${date}`
  );

  if (!response.ok) {
    throw new Error('건강 기록 데이터를 가져오는 중 오류 발생');
  }

  return await response.json();
}

// export async function getWeightHistory({
//   cageId,
//   date,
// }: {
//   cageId: number;
//   date: string; // YYYY-MM-DD
// }): Promise<WeightHistoryResponse> {
//   const response = await fetchWithAuth(
//     `http://localhost:8081/api/cages/${cageId}/weights?date=${date}`
//   );

//   if (!response.ok) {
//     throw new Error('몸무게 데이터를 불러오는 중 오류 발생');
//   }

//   return response.json();
// }

export async function getFeedRecord({
  cageId: petId,
  date,
}: {
  cageId: string;
  date: string;
}): Promise<FeedRecordResponse[]> {
  const response = await fetchWithAuth(
    `https://api.saffir.co.kr/pet-feeds/${petId}?date=${date}`
  );

  if (!response.ok) {
    throw new Error('급여 데이터를 가져오는 중 오류 발생');
  }

  return await response.json();
}

export async function getAllFeedRecords({
  cageId: petId,
  startDate,
  endDate,
}: {
  cageId: string;
  startDate: string;
  endDate: string;
}): Promise<FeedRecordResponse[]> {
  const url = `https://api.saffir.co.kr/pet-feeds/${petId}/date-range?start_date=${startDate}&end_date=${endDate}`;
  const response = await fetchWithAuth(url);
  if (!response.ok) {
    throw new Error('전체 급여 데이터를 가져오는 중 오류 발생');
  }

  const json = await response.json();
  //console.log('✅ 실제 API에서 받은 응답:', json);
  return json;
}

export async function getCleanRecord({
  cageId,
  date,
}: {
  cageId: string;
  date: string;
}): Promise<CleanRecordResponse> {
  const response = await fetchWithAuth(
    `https://api.saffir.co.kr/pet-cleans/${cageId}?clean_date=${date}`
  );

  // if (!response.ok) {
  //   throw new Error('청소 데이터를 가져오는 중 오류 발생');
  // }

  return await response.json();
}

export async function getAllCleanRecords({
  cageId,
  startDate,
  endDate,
}: {
  cageId: string;
  startDate: string;
  endDate: string;
}): Promise<CleanRecordResponse[]> {
  const url = `https://api.saffir.co.kr/pet-cleans/${cageId}/date-range?start_date=${startDate}&end_date=${endDate}`;
  console.log('요청 URL:', url);

  const response = await fetch(url, {
    headers: {
      Authorization: 'Bearer YOUR_TOKEN_HERE', // fetchWithAuth 대신 직접 넣어보기
    },
  });

  console.log('응답 상태:', response.status);

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('에러 응답 본문:', errorBody);
    throw new Error('전체 청소 데이터를 가져오는 중 오류 발생');
  }

  const data = await response.json();
  console.log('응답 데이터:', data);
  return data;
}

export async function getLLMMessage({
  cageId: petId,
}: {
  cageId: string;
}): Promise<LLMMessageResponse> {
  const response = await fetchWithAuth(
    `https://api.saffir.co.kr/chats/${petId}`
  );

  if (!response.ok) {
    throw new Error('대화 데이터를 불러오는 중 오류 발생');
  }

  return response.json();
}

export async function getCageState({
  cageId: petId,
}: {
  cageId: string;
}): Promise<CageState> {
  const response = await fetchWithAuth(
    `https://api.saffir.co.kr/pets/${petId}/state`
  );

  if (!response.ok) {
    throw new Error('몸무게 데이터를 불러오는 중 오류 발생');
  }

  return response.json();
}
