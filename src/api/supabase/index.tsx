import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js';
import { Env } from '@env';

const supabaseUrl = Env.SUPABASE_URL
const supabaseKey = Env.SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey);