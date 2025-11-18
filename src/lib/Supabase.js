import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gxhnuzpfinqrbzsieend.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4aG51enBmaW5xcmJ6c2llZW5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzNzMzNTgsImV4cCI6MjA3ODk0OTM1OH0.fdrIEjjJ6w9XJ06518vyx8fXBg3xKj8GfLhynbDuoI0";

export const supabase = createClient(supabaseUrl, supabaseKey);
