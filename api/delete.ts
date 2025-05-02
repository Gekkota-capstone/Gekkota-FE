import { fetchWithAuth } from './util';

// src/api/health.ts
export async function deleteHealthRecord({
  cageId,
  cardId,
}: {
  cageId: number;
  cardId: number;
}): Promise<void> {
  const response = await fetchWithAuth(
    `http://localhost:8081/api/cages/${cageId}/health?cardId=${cardId}`,
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
  cardId,
}: {
  cageId: number;
  cardId: number;
}): Promise<void> {
  const response = await fetchWithAuth(
    `http://localhost:8081/api/cages/${cageId}/feed?cardId=${cardId}`,
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
  cardId,
}: {
  cageId: number;
  cardId: number;
}): Promise<void> {
  const response = await fetchWithAuth(
    `http://localhost:8081/api/cages/${cageId}/clean?cardId=${cardId}`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok) {
    throw new Error('청소 기록 삭제 중 오류 발생');
  }
}
