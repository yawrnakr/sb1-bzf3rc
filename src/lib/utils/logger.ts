type LogLevel = 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
}

class Logger {
  private logs: LogEntry[] = [];

  private createEntry(level: LogLevel, message: string, data?: any): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
    };
  }

  info(message: string, data?: any) {
    const entry = this.createEntry('info', message, data);
    this.logs.push(entry);
    console.log(`[INFO] ${message}`, data);
  }

  warn(message: string, data?: any) {
    const entry = this.createEntry('warn', message, data);
    this.logs.push(entry);
    console.warn(`[WARN] ${message}`, data);
  }

  error(message: string, error?: any) {
    const entry = this.createEntry('error', message, error);
    this.logs.push(entry);
    console.error(`[ERROR] ${message}`, error);
  }

  getLogs(): LogEntry[] {
    return this.logs;
  }

  clearLogs() {
    this.logs = [];
  }
}

export const logger = new Logger();