import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { dummyMessages } from '../../data/messages';
import { colors } from '../../styles/colors';

export default function ChatScreen({ route, navigation }) {
  const { match } = route.params;
  const [messages, setMessages] = useState(dummyMessages[match.userId] || []);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef();

  useEffect(() => {
    navigation.setOptions({ title: match.name });
  }, []);

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: inputText,
        senderId: 'current',
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInputText('');
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const renderMessage = ({ item }) => {
    const isCurrentUser = item.senderId === 'current';
    return (
      <View
        style={[
          styles.messageContainer,
          isCurrentUser ? styles.messageRight : styles.messageLeft,
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            isCurrentUser ? styles.messageBubbleRight : styles.messageBubbleLeft,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              isCurrentUser ? styles.messageTextRight : styles.messageTextLeft,
            ]}
          >
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={90}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor={colors.textSecondary}
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={!inputText.trim()}
          activeOpacity={0.7}
        >
          <Text style={styles.sendButtonText}>➤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
  },
  messagesList: {
    padding: 16,
    paddingTop: 80,
  },
  messageContainer: {
    marginBottom: 12,
  },
  messageLeft: {
    alignItems: 'flex-start',
  },
  messageRight: {
    alignItems: 'flex-end',
  },
  messageBubble: {
    maxWidth: '75%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  messageBubbleLeft: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 4,
  },
  messageBubbleRight: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 16,
  },
  messageTextLeft: {
    color: colors.text,
  },
  messageTextRight: {
    color: colors.white,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
    maxHeight: 100,
    marginRight: 12,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonText: {
    fontSize: 20,
    color: colors.white,
  },
});

