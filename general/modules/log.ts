import { log as colorLog } from 'npm:console-log-colors';

export function log(
    message: string,
    type: 'info' | 'success' | 'error' | 'warning' | 'warn' = 'info',
): void {
    switch (type) {
        case 'info':
            colorLog.blue('ℹ', message);
            break;
        case 'success':
            colorLog.green('✔', message);
            break;
        case 'error':
            colorLog.red('✖', message);
            break;
        case 'warn':
        case 'warning':
            colorLog.yellow('⚠', message);
            break;
    }
}