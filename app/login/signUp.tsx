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

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        setError('유효한 이메일 형식이 아닙니다.');
        return;
      }

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

  return (
    <View style={styles.container}>
      {/* ✅ 프로필 선택 */}
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

      {/* ✅ 입력 폼 */}
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
        title='회원가입'
        onPress={() => handleSignUp(email, password, nickname)}
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
        onConfirm={() => setSuccessModalVisible(false)}
      />
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
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
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
  profileContainer: {
    alignItems: 'center',
    marginBottom: 24,
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
  input: {
    width: '100%',
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
