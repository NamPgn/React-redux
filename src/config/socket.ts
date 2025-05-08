// import { io } from 'socket.io-client';

// const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// export const socket = io(SOCKET_URL, {
//   transports: ['websocket'],
//   withCredentials: true,
//   path: '/socket.io',
//   reconnection: true,
//   reconnectionAttempts: 5,
//   reconnectionDelay: 1000,
//   autoConnect: true,
// });

// // Debug events
// socket.on('connect', () => {
//   console.log('Socket connected successfully');
// });

// socket.on('connect_error', (error) => {
//   console.error('Socket connection error:', error);
// });

// socket.on('disconnect', (reason) => {
//   console.log('Socket disconnected:', reason);
// });

// export default socket; 