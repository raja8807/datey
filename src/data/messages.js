export const dummyMessages = {
  '1': [
    {
      id: '1',
      text: 'Hey! How are you?',
      senderId: '1',
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: '2',
      text: 'I\'m doing great, thanks! How about you?',
      senderId: 'current',
      timestamp: new Date(Date.now() - 3300000),
    },
    {
      id: '3',
      text: 'Pretty good! Want to grab coffee this weekend?',
      senderId: '1',
      timestamp: new Date(Date.now() - 3000000),
    },
    {
      id: '4',
      text: 'That sounds great! Saturday works for me.',
      senderId: 'current',
      timestamp: new Date(Date.now() - 2700000),
    },
  ],
  '2': [
    {
      id: '1',
      text: 'Hi there! 👋',
      senderId: '2',
      timestamp: new Date(Date.now() - 7200000),
    },
    {
      id: '2',
      text: 'Hello! Nice to meet you!',
      senderId: 'current',
      timestamp: new Date(Date.now() - 6900000),
    },
    {
      id: '3',
      text: 'I saw you like fitness too. Do you go to the gym often?',
      senderId: '2',
      timestamp: new Date(Date.now() - 6600000),
    },
  ],
  '3': [
    {
      id: '1',
      text: 'Hey! I noticed we both love hiking. Have you been to the mountains recently?',
      senderId: '3',
      timestamp: new Date(Date.now() - 1800000),
    },
    {
      id: '2',
      text: 'Yes! I went last weekend. It was amazing!',
      senderId: 'current',
      timestamp: new Date(Date.now() - 1500000),
    },
  ],
  '4': [
    {
      id: '1',
      text: 'Hi! Are you going to the concert next week?',
      senderId: '4',
      timestamp: new Date(Date.now() - 5400000),
    },
    {
      id: '2',
      text: 'Yes, I am! Are you?',
      senderId: 'current',
      timestamp: new Date(Date.now() - 5100000),
    },
    {
      id: '3',
      text: 'Absolutely! Maybe we can meet up there?',
      senderId: '4',
      timestamp: new Date(Date.now() - 4800000),
    },
  ],
};

export const matches = [
  {
    id: '1',
    userId: '1',
    name: 'Emma',
    lastMessage: 'That sounds great! Saturday works for me.',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    timestamp: new Date(Date.now() - 2700000),
  },
  {
    id: '2',
    userId: '2',
    name: 'Sophia',
    lastMessage: 'I saw you like fitness too. Do you go to the gym often?',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    timestamp: new Date(Date.now() - 6600000),
  },
  {
    id: '3',
    userId: '3',
    name: 'Olivia',
    lastMessage: 'Yes! I went last weekend. It was amazing!',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400',
    timestamp: new Date(Date.now() - 1500000),
  },
  {
    id: '4',
    userId: '4',
    name: 'Isabella',
    lastMessage: 'Absolutely! Maybe we can meet up there?',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400',
    timestamp: new Date(Date.now() - 4800000),
  },
];

