import { log as colorLog } from 'npm:console-log-colors';

export function log(data: {
    message: string,
    type?: 'info' | 'success' | 'error' | 'warning' | 'warn' | 'debug',
    debug?: boolean,
}): void {
    if (!data.type) {
        data.type = 'info';
    }

    switch (data.type) {
        case 'debug':
            if (data.debug) {
                colorLog.blue('ℹ', data.message);
            }
            break;
        case 'info':
            colorLog.blue('ℹ', data.message);
            break;
        case 'success':
            colorLog.green('✔', data.message);
            break;
        case 'error':
            colorLog.red('✖', data.message);
            break;
        case 'warn':
        case 'warning':
            colorLog.yellow('⚠', data.message);
            break;
    }
}