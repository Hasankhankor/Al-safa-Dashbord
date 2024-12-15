import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase project credentials
const supabaseUrl = 'https://suhnugrgknvbpoqanlgh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1aG51Z3Jna252YnBvcWFubGdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIzNzUyMTMsImV4cCI6MjA0Nzk1MTIxM30.oKPH92aETDbzAqHfvtYdFFmLvQVI4Sk6QCzQqrWwsZM';

export const supabase = createClient(supabaseUrl, supabaseKey);
s