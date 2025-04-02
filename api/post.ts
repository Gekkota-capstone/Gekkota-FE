// api/lizard.ts
export interface CageData {
  name: string;
  gender: string;
  birthdate: string;
  species: string;
}

export const postCage = async (data: CageData) => {
  const response = await fetch('https://example.com/api/cage', {
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
