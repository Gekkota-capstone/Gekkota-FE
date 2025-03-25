export async function getList(): Promise<{
  list: {
    id: number;
    name: string;
    type: string;
    duration: string;
  };
}> {
  const response = await fetch('http://localhost:8081/api/list');

  if (!response.ok) {
    throw new Error('API 호출 중 에러 발생');
  }

  const data = await response.json();
  return data;
}
