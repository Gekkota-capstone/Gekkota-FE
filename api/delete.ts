import { fetchWithAuth } from './util';

// src/api/health.ts
export async function deleteHealthRecord({
  cageId,
  date,
}: {
  cageId: string;
  date: string;
}): Promise<void> {
  const response = await fetchWithAuth(
    `https://api.saffir.co.kr/pet-healths/${cageId}?date=${date}`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok) {
    throw new Error('건강 기록 삭제 중 오류 발생');
  }
}

// src/api/health.ts
export async function deleteFeedRecord({
  cageId,
  date,
}: {
  cageId: string;
  date: string;
}): Promise<void> {
  const response = await fetchWithAuth(
    `https://api.saffir.co.kr/pet-feeds/${cageId}?date=${date}`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok) {
    throw new Error('급여 기록 삭제 중 오류 발생');
  }
}

// src/api/health.ts
export async function deleteCleanRecord({
  cageId,
  date,
}: {
  cageId: string;
  date: string;
}): Promise<void> {
  const response = await fetchWithAuth(
    `https://api.saffir.co.kr/pet-cleans/${cageId}?clean_date=${date}`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok) {
    throw new Error('청소 기록 삭제 중 오류 발생');
  }
}
