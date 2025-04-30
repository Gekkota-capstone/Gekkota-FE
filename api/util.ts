import { getApp } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';
export async function fetchWithAuth(
  input: RequestInfo,
  init: RequestInit = {}
) {
  const auth = getAuth(getApp());
  const user = auth.currentUser;
  if (!user) {
    throw new Error('사용자가 로그인되어 있지 않습니다.');
  }
  const token = await user.getIdToken();
  const headers = {
    ...(init.headers as Record<string, string>),
    Authorization: `Bearer ${token}`,
  };
  return fetch(input, { ...init, headers });
}
