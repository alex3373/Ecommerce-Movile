// src/services/mockChat.service.ts
export interface Message {
  id: string;
  text: string;
  senderId: string;
  createdAt: Date;
}

let mockMessages: Message[] = [
  {
    id: '1',
    text: '¡Hola! ¿En qué puedo ayudarte?',
    senderId: 'vendedor',
    createdAt: new Date(),
  },
];

export const sendMockMessage = (message: Message): void => {
  mockMessages.push(message);
};

export const getMockMessages = (): Message[] => {
  return mockMessages;
};
