import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';
import { useGetLLMMessage } from '@/hooks/useGetLLMMessage';
import { usePostLLMMessage } from '@/hooks/usePostLLMMessage';

const cageId = 1; // 예시: 실제 ID를 받아올 수 있도록 처리
type Message = {
  say: string;
  text: string;
};
export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const { data, isLoading } = useGetLLMMessage(cageId);
  const { mutateAsync: sendMessage } = usePostLLMMessage(cageId);

  useEffect(() => {
    if (data) {
      setMessages(data.messages);
    }
  }, [data]);

  useEffect(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    const myMessage: Message = { say: 'ME', text };
    setMessages((prev) => [...prev, myMessage]);
    setInput('');

    try {
      const response = await sendMessage({ message: text });
      const aiMessage: Message = { say: 'AI', text: response.message };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error('LLM 메시지 전송 실패:', err);
      // 에러 처리 메시지도 넣을 수 있음
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        keyboardVerticalOffset={Platform.select({ ios: 80, android: 0 })}
      >
        <FlatList
          ref={flatListRef}
          data={[...messages].reverse()}
          keyExtractor={(_, idx) => String(idx)}
          inverted
          contentContainerStyle={styles.messageList}
          renderItem={({ item }) => (
            <View
              style={[
                styles.bubble,
                item.say === 'ME' ? styles.bubbleMe : styles.bubbleAi,
              ]}
            >
              <Text
                style={[
                  styles.bubbleText,
                  item.say === 'ME' ? styles.textMe : styles.textAi,
                ]}
              >
                {item.text}
              </Text>
            </View>
          )}
        />

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder='메시지를 입력하세요...'
            value={input}
            onChangeText={setInput}
            returnKeyType='send'
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity
            onPress={handleSend}
            style={styles.sendButton}
          >
            <Ionicons
              name='send'
              size={20}
              color='white'
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  messageList: { padding: 12 },
  bubble: {
    marginVertical: 4,
    padding: 10,
    borderRadius: 12,
    maxWidth: '80%',
  },
  bubbleAi: {
    alignSelf: 'flex-start',
    backgroundColor: '#F1F0F0',
  },
  bubbleMe: {
    alignSelf: 'flex-end',
    backgroundColor: '#3182F6',
  },
  bubbleText: { fontSize: 16, lineHeight: 22 },
  textAi: { color: '#333' },
  textMe: { color: 'white' },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderColor: '#EEE',
    backgroundColor: '#FFF',
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: '#3182F6',
    borderRadius: 20,
    padding: 10,
  },
});
