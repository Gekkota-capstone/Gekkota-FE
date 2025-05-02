import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { getApp } from '@react-native-firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  updateProfile
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
      router.replace('/cage'); // 로그인 후 홈으로
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <View style={styles.container}>
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
      {error && <Text style={styles.error}>이메일 혹은 비밀번호가 올바른 형식이 아닙니다.</Text>}
      <Button
        title='Sign In'
        onPress={handleSignIn}
      />
      <Text
        style={styles.switch}
        onPress={() => router.push('/login/signUp')}
      >
        아직 계정이 없으신가요? 회원가입
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: { marginVertical: 8, borderBottomWidth: 1, padding: 8 },
  error: { color: 'red', marginBottom: 8 },
  switch: { marginTop: 16, color: colors.BLUE_500, textAlign: 'center' },
});
