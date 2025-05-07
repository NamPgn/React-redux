import { io, Socket } from 'socket.io-client';

class WebSocketService {
  private socket: Socket | null = null;
  private static instance: WebSocketService;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 10;
  private reconnectTimeout: NodeJS.Timeout | null = null;

  private constructor() {
    this.initializeSocket();
  }

  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  private getSocketUrl(): string {
    const isProduction = process.env.NODE_ENV === 'production';
    const apiUrl = process.env.REACT_APP_API_URL;
    
    if (isProduction) {
      // In production, use secure WebSocket (wss://)
      return apiUrl ? apiUrl.replace('http://', 'wss://').replace('https://', 'wss://') : 'wss://your-production-domain.com';
    }
    
    return apiUrl || 'http://localhost:5000';
  }

  private initializeSocket() {
    const socketUrl = this.getSocketUrl();
    
    this.socket = io(socketUrl, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
      autoConnect: true,
      forceNew: true,
      path: '/socket.io',
      withCredentials: true,
      secure: process.env.NODE_ENV === 'production',
    });

    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
      if (this.reconnectTimeout) {
        clearTimeout(this.reconnectTimeout);
        this.reconnectTimeout = null;
      }
    });

    this.socket.on('disconnect', (reason) => {
      console.log('WebSocket disconnected:', reason);
      this.handleReconnect();
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      this.handleReconnect();
    });

    this.socket.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
      
      console.log(`Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      
      this.reconnectTimeout = setTimeout(() => {
        if (this.socket) {
          this.socket.connect();
        }
      }, delay);
    } else {
      console.error('Max reconnection attempts reached');
      // You might want to show a notification to the user here
    }
  }

  public subscribeToProductUpdates(callback: (data: any) => void) {
    this.socket?.on('product:update', callback);
  }

  public subscribeToProductCreate(callback: (data: any) => void) {
    this.socket?.on('product:create', callback);
  }

  public subscribeToProductDelete(callback: (data: any) => void) {
    this.socket?.on('product:delete', callback);
  }

  public unsubscribeFromProductUpdates() {
    this.socket?.off('product:update');
  }

  public unsubscribeFromProductCreate() {
    this.socket?.off('product:create');
  }

  public unsubscribeFromProductDelete() {
    this.socket?.off('product:delete');
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
  }

  public isConnected(): boolean {
    return this.socket?.connected || false;
  }
}

export default WebSocketService; 