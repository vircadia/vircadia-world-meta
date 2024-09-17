import { SupabaseClient } from 'jsr:@supabase/supabase-js@2';
import { log } from '../../../general/modules/log.ts';

export namespace Supabase {
    export function createClient(
        url: string,
        key: string,
    ): SupabaseClient {
        log({
            message: `Initializing Supabase client at [${url}], with key [${key}], key length: [${key.length}]`,
            type: 'info',
        });
        const supabaseClient = new SupabaseClient(url, key);
        supabaseClient.realtime.connect();
        log({
            message: `Supabase client initialized`,
            type: 'info',
        });
        return supabaseClient;
    }

    export function destroyClient(supabaseClient: SupabaseClient): null {
        log({
            message: `Deinitializing Supabase client`,
            type: 'info',
        });
        supabaseClient?.realtime.disconnect();
        supabaseClient?.removeAllChannels();
        log({
            message: `Supabase client deinitialized`,
            type: 'info',
        });

        return null;
    }
}
