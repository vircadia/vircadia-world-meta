import { SupabaseClient } from 'jsr:@supabase/supabase-js@2';
import { log } from '../../../general/modules/log.ts';

export namespace Supabase {
    export function createClient(
        url: string,
        key: string,
    ): SupabaseClient {
        log({
            message: `Initializing Supabase client at [${url}], with key [${
                key.slice(
                    0,
                    10,
                )
            }...], key length: [${key.length}]`,
            type: 'debug',
        });
        const supabaseClient = createClient(url, key);
        supabaseClient.realtime.connect();
        log({
            message: `Supabase client initialized`,
            type: 'debug',
        });
        return supabaseClient;
    }

    export function destroyClient(supabaseClient: SupabaseClient): null {
        log({
            message: `Deinitializing Supabase client`,
            type: 'debug',
        });
        supabaseClient?.realtime.disconnect();
        supabaseClient?.removeAllChannels();
        log({
            message: `Supabase client deinitialized`,
            type: 'debug',
        });

        return null;
    }
}
