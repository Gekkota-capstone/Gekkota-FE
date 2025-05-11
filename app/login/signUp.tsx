import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { getApp } from '@react-native-firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
import { router } from 'expo-router';
import { colors } from '@/constants';
import ProfileModal from '@/components/ProfileModal';
import SuccessModal from '@/components/AlertModal';
import { Ionicons } from '@expo/vector-icons';
import { usePostUserInfo } from '@/hooks/usePostUserInfo';

export default function SignUpScreen() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] =
    useState<keyof typeof profileImages>('profile1');
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const { mutate } = usePostUserInfo(() => router.replace('/cage'));

  const auth = getAuth(getApp());
  const profileImages = {
    profile1: require('@/assets/images/profile1.png'),
    profile2: require('@/assets/images/profile2.png'),
    profile3: require('@/assets/images/profile3.png'),
    profile4: require('@/assets/images/profile4.png'),
    profile5: require('@/assets/images/profile5.png'),
  };
  const handleSignUp = async (
    email: string,
    password: string,
    nickname: string
  ) => {
    try {
      if (!email || !password || !nickname) {
        setError('모든 필드를 입력해주세요.');
        return;
      }

      // 이메일 형식 검증
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(email)) {
        setError('유효한 이메일 형식이 아닙니다.');
        return;
      }

      // 비밀번호 길이 검증 (최소 6자 이상)
      if (password.length < 6) {
        setError('비밀번호는 6자 이상이어야 합니다.');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: nickname });

      const cred = await signInWithEmailAndPassword(auth, email, password);
      await cred.user.getIdToken();
      mutate({ nickname, profile });
      setSuccessModalVisible(true);
      router.push('/login/signIn');
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handlePress = () => {
    handleSignUp(email, password, nickname);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.imageWrapper}>
          <Image
            source={profileImages[profile]}
            style={styles.image}
            resizeMode='contain'
          />
          <TouchableOpacity
            onPress={() => setProfileModalVisible(true)}
            style={styles.plusIcon}
          >
            <Ionicons
              name='add-circle'
              size={35}
              color='#888'
            />
          </TouchableOpacity>

          <ProfileModal
            visible={profileModalVisible}
            onClose={() => setProfileModalVisible(false)}
            onSelect={(key) => setProfile(key)}
            selected={profile}
          />
        </View>
      </View>
      <TextInput
        placeholder='Nickname'
        value={nickname}
        onChangeText={setNickname}
        style={styles.input}
        autoCapitalize='none'
      />
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
        title='Sign Up'
        onPress={handlePress}
      />
      <Text
        style={styles.switch}
        onPress={() => router.replace('/login/signIn')}
      >
        이미 계정이 있으신가요? 로그인
      </Text>
      <SuccessModal
        title='회원가입 완료'
        message='로그인 화면으로 돌아갑니다.'
        visible={successModalVisible}
        onConfirm={() => setSuccessModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 65,
    borderColor: colors.mainBlue,
    borderWidth: 5,
  },
  plusIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 65,
  },
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: { marginVertical: 8, borderBottomWidth: 1, padding: 8 },
  error: { color: 'red', marginBottom: 8 },
  switch: { marginTop: 16, color: colors.BLUE_500, textAlign: 'center' },
});
