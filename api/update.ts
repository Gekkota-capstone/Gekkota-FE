// api/update.ts
import { fetchWithAuth } from './util';

export async function updatePetInfo(
  petId: string,
  updatedData: { name?: string; birthdate?: string; species?: string; gender?: string }
) {
  const response = await fetchWithAuth(`http://localhost:8081/api/list/${petId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error('API 업데이트 중 에러 발생');
  }

  const data = await response.json();
  return data;
}
