import { transpile } from 'npm:typescript';

export class Script {
    static readonly scriptLogPrefix = '[SCRIPT]';

    static transpile(script: string): string {
        console.log(
            `${Script.scriptLogPrefix} Transpiling and running script: ${script}`,
        );

        let transpiledScript: string;

        if (typeof window !== 'undefined') {
            // Browser environment
            transpiledScript = transpile(script);
        } else {
            // Deno environment
            transpiledScript = transpile(script);
        }

        console.log(
            `${Script.scriptLogPrefix} Transpiled script:`,
            transpiledScript,
        );

        return transpiledScript;
    }
}
