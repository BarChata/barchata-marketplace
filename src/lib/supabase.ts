import { createClient } from '@supabase/supabase-js'
const SUPABASE_URL = 'https://gsnxtstesvysesgbxnwr.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdzbnh0c3Rlc3Z5c2VzZ2J4bndyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5NTMyMzEsImV4cCI6MjA5MjUyOTIzMX0.7Ub-Dni3w2TYzuwmUnRfm31CgCpZxXnF69VzBHRX29Q'
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
