import { SafeAreaView, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import LogoutModal from '@/components/LogoutModal';
import ProfileModal from '@/components/ProfileModal';
import CustomButton from '@/components/PrimaryButton';
import AlertModal from '@/components/AlertModal';
import { getApp } from '@react-native-firebase/app';
import {
  getAuth,
  sendPasswordResetEmail,
  updateProfile,
  signOut,
  firebase,
} from '@react-native-firebase/auth';

import { router } from 'expo-router';
import { TextInput } from 'react-native-gesture-handler';

const profileImages = {
  profile1: require('@/assets/images/profile1.png'),
  profile2: require('@/assets/images/profile2.png'),
  profile3: require('@/assets/images/profile3.png'),
  profile4: require('@/assets/images/profile4.png'),
  profile5: require('@/assets/images/profile5.png'),
};

export default function MypageScreen() {
  const auth = getAuth(getApp());
  const user = firebase.auth().currentUser;

  const [name, setName] = useState<string>(user?.displayName || '');

  const [profile, setProfile] = useState<keyof typeof profileImages>('profile1');
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);

  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);

  const handleLogout = () => {
    setLogoutModalVisible(false);
    signOut(auth)
      .then(() => {
        router.replace('/login/signIn')
      })
      .catch((err) => {
        console.log('에러', '로그아웃 실패: ' + err.message);
      });
  }

  const handleUpdate = async (name: string) => {
    if (user) {
      try {
        await updateProfile(user, { displayName: name });
        setUpdateModalVisible(true);
      } catch (error) {
        console.error(error instanceof Error ? error.message : '알 수 없는 에러');
      }
    } else {
      console.error('사용자가 로그인되어 있지 않습니다.');
    }
  }

  const handlePasswordReset = async () => {
    if (user && user.email) {
      try {
        await sendPasswordResetEmail(auth, user.email);
        setPasswordModalVisible(true);
      } catch (error) {
        console.error(error instanceof Error ? error.message : '알 수 없는 에러');
      }
    } else {
      console.error('사용자가 로그인되어 있지 않습니다.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 프로필 이미지 */}
      <View style={styles.profileContainer}>
        <View style={styles.imageWrapper}>
          <Image
            source={profileImages[profile]}
            style={styles.image}
            resizeMode="contain"
          />
          <TouchableOpacity
            onPress={() => setProfileModalVisible(true)}
            style={styles.plusIcon}>
            <Ionicons name="add-circle" size={35} color="#888" />
          </TouchableOpacity>

          <ProfileModal
            visible={profileModalVisible}
            onClose={() => setProfileModalVisible(false)}
            onSelect={(key) => setProfile(key)}
            selected={profile}
          />
        </View>
      </View>

      {/* 내 정보 */}
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>이메일 주소</Text>
          <Text style={styles.value}>{auth.currentUser?.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>닉네임</Text>
          <TextInput
            style={styles.value}
            onChangeText={setName}
          >{name}</TextInput>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>비밀번호</Text>
          <TouchableOpacity
            onPress={() => handlePasswordReset()}>
            <Text style={[styles.label, { textDecorationLine: 'underline' }]}>변경하기</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => setLogoutModalVisible(true)}
        style={styles.logoutContainer}>
        <Ionicons name="exit-outline" size={16} color="#999" />
        <Text style={styles.logoutText}>로그아웃</Text>
      </TouchableOpacity>
      <View style={styles.button}>
        <CustomButton
          title='수정하기'
          onPress={() => handleUpdate(name)} />
      </View>

      <AlertModal
        title='비밀번호 변경'
        message={`비밀번호 재설정 메일이\n${user?.email ?? '이메일 정보 없음'}로 전송되었습니다.`}
        visible={passwordModalVisible}
        onConfirm={() => setPasswordModalVisible(false)}
      />
      <AlertModal
        title='정보 수정'
        message='정보가 정상적으로 수정되었습니다.'
        visible={updateModalVisible}
        onConfirm={() => setUpdateModalVisible(false)}
      />
       <LogoutModal
          visible={logoutModalVisible}
          onCancel={() => setLogoutModalVisible(false)}
          onConfirm={handleLogout}
        />
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 60,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
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
    borderWidth: 4
  },
  plusIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 65,
  },
  infoContainer: {
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingTop: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 35,
    marginHorizontal: 15
  },
  label: {
    color: '#555',
  },
  value: {
    fontWeight: '500',
  },
  logoutContainer: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  logoutText: {
    color: '#888',
    fontSize: 12,
  },
  button: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 20,
    left: 0,
    right: 0
  }
});
