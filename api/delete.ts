// src/api/health.ts
export async function deleteHealthRecord({
  cageId,
  cardId,
}: {
  cageId: number;
  cardId: number;
}): Promise<void> {
  const response = await fetch(
    `http://localhost:8081/api/cages/${cageId}/health?cardId=${cardId}`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok) {
    throw new Error('건강 기록 삭제 중 오류 발생');
  }
}
