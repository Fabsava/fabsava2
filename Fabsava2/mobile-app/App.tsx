import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import {
  Provider as PaperProvider,
  TextInput,
  Button,
  Card,
  Text,
  Appbar,
  Avatar,
  DefaultTheme,
} from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200EE',
    accent: '#03DAC6',
    background: '#F5F5F5',
    surface: '#FFFFFF',
  },
};

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Merhaba! Ben Fabsava Müzik Asistanınızım. Size hava durumu ve müzik konularında yardımcı olabilirim. 🎵🌤️',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Mastra API'sine istek gönder
      const response = await fetch('http://localhost:8080/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.text,
          agent: 'musicWeatherAgent', // Müzik ve hava durumu agent'ını kullan
        }),
      });

      const data = await response.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || 'Üzgünüm, bir hata oluştu.',
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('API Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Bağlantı hatası. Lütfen daha sonra tekrar deneyin.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        
        {/* Header */}
        <Appbar.Header>
          <Appbar.Content 
            title="Fabsava Müzik" 
            subtitle="AI Asistan" 
          />
        </Appbar.Header>

        {/* Chat Messages */}
        <ScrollView 
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageWrapper,
                message.isUser ? styles.userMessageWrapper : styles.botMessageWrapper,
              ]}
            >
              <Card
                style={[
                  styles.messageCard,
                  message.isUser ? styles.userMessage : styles.botMessage,
                ]}
              >
                <Card.Content style={styles.messageContent}>
                  {!message.isUser && (
                    <View style={styles.botHeader}>
                      <Avatar.Icon size={24} icon="robot" />
                      <Text style={styles.botName}>Fabsava AI</Text>
                    </View>
                  )}
                  <Text style={styles.messageText}>{message.text}</Text>
                  <Text style={styles.timestamp}>
                    {formatTime(message.timestamp)}
                  </Text>
                </Card.Content>
              </Card>
            </View>
          ))}
          
          {isLoading && (
            <View style={styles.botMessageWrapper}>
              <Card style={styles.botMessage}>
                <Card.Content style={styles.messageContent}>
                  <View style={styles.botHeader}>
                    <Avatar.Icon size={24} icon="robot" />
                    <Text style={styles.botName}>Fabsava AI</Text>
                  </View>
                  <Text style={styles.loadingText}>Yazıyor...</Text>
                </Card.Content>
              </Card>
            </View>
          )}
        </ScrollView>

        {/* Input Area */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.inputContainer}
        >
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Mesajınızı yazın..."
              multiline
              maxLength={500}
              disabled={isLoading}
              right={
                <TextInput.Icon
                  icon="send"
                  onPress={sendMessage}
                  disabled={!inputText.trim() || isLoading}
                />
              }
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messagesContent: {
    paddingVertical: 16,
  },
  messageWrapper: {
    marginVertical: 4,
  },
  userMessageWrapper: {
    alignItems: 'flex-end',
  },
  botMessageWrapper: {
    alignItems: 'flex-start',
  },
  messageCard: {
    maxWidth: '80%',
    elevation: 2,
  },
  userMessage: {
    backgroundColor: '#6200EE',
  },
  botMessage: {
    backgroundColor: '#FFFFFF',
  },
  messageContent: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  botHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  botName: {
    marginLeft: 8,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#000',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'right',
  },
  loadingText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    maxHeight: 100,
    backgroundColor: '#F5F5F5',
  },
});
