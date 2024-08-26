import { createClient } from '@supabase/supabase-js';
const URL = 'https://yxsfewyjvtpnlmdkiemg.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4c2Zld3lqdnRwbmxtZGtpZW1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQzODQxOTksImV4cCI6MjAzOTk2MDE5OX0.rH27Nwjw1O7wG7-Z9n3Iy3EcvYdcQspfVRTgqK5yM3Y';

export const supabase = createClient(URL, API_KEY);