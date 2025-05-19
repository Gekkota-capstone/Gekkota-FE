import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { getApp } from '@react-native-firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
import { router } from 'expo-router';
import { colors } from '@/constants';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const auth = getAuth(getApp());

  const handleSignIn = async () => {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const token = await cred.user.getIdToken();
      console.log('Firebase ID Token:', token);
      router.replace('/cage');
    } catch (e: any) {
      if (e.code === 'auth/user-not-found') {
        setError('가입되지 않은 이메일입니다.');
      } else if (e.code === 'auth/wrong-password') {
        setError('비밀번호가 잘못되었습니다.');
      } else if (e.code === 'auth/invalid-credential') {
        setError('이메일 혹은 비밀번호를 다시 확인해주세요.');
      } else {
        setError(e.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* ✅ 로고 및 앱명 */}
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/leopard.png')} // 앱 로고 이미지 경로
          style={styles.logo}
          resizeMode='contain'
        />
        <Text style={styles.title}>Gekkota</Text>
        <Text style={styles.subtitle}>지능형 파충류 케어 서비스</Text>
      </View>

      {/* ✅ 로그인 폼 */}
      <View style={styles.formContainer}>
        <TextInput
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType='email-address'
          autoCapitalize='none'
        />
        <TextInput
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        {error && <Text style={styles.error}>{error}</Text>}
        <Button
          title='로그인'
          onPress={handleSignIn}
        />
      </View>

      {/* ✅ 회원가입 링크 */}
      <TouchableOpacity onPress={() => router.push('/login/signUp')}>
        <Text style={styles.switch}>아직 계정이 없으신가요? 회원가입</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.BLACK,
  },
  subtitle: {
    fontSize: 14,
    color: colors.GRAY_600,
    marginTop: 4,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.GRAY_300,
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
  switch: {
    marginTop: 24,
    color: colors.BLUE_500,
    textAlign: 'center',
  },
});
