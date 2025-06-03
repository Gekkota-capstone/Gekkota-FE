// api/update.ts
import { fetchWithAuth } from './util';

export async function updatePetInfo(
  petId: string,
  updatedData: {
    name?: string;
    gender?: string;
    species?: string;
    birthdate?: string;
  }
) {
  const response = await fetchWithAuth(
    `https://api.saffir.co.kr/pets/${petId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    }
  );

  if (!response.ok) {
    throw new Error('API 업데이트 중 에러 발생');
  }

  const data = await response.json();
  return data;
}
