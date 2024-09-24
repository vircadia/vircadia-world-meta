import { transpile } from 'typescript';
import { log } from '../../../../general/modules/log.ts';

export class Script {
    static readonly scriptLogPrefix = '[SCRIPT]';

    private static transpile(script: string): string {
        log({
            message: `${Script.scriptLogPrefix} Transpiling script: ${script}`,
            type: 'info',
        });

        const transpiledScript: string = (transpile as (input: string) => string)(script);

        log({
            message: `${Script.scriptLogPrefix} Transpiled script: ${transpiledScript}`,
            type: 'info',
        });

        return transpiledScript;
    }

    private static wrapAndTranspile(script: string, contextKeys: string[]): string {
        const contextParamsString = contextKeys.join(', ');
        const wrappedScript = `
            (function(${contextParamsString}) {
                ${script}
            });
        `;

        return this.transpile(wrappedScript);
    }

    static execute(script: string, context: Record<string, any>): any {
        const contextKeys = Object.keys(context);
        const wrappedAndTranspiledScript = this.wrapAndTranspile(script, contextKeys);

        log({
            message: `${Script.scriptLogPrefix} Executing script with context: ${wrappedAndTranspiledScript}`,
            type: 'info',
        });

        // eslint-disable-next-line no-eval
        const scriptFunction = eval(wrappedAndTranspiledScript) as (...args: unknown[]) => unknown;
        return scriptFunction(...Object.values(context) as unknown[]);
    }
}

export default Script;
