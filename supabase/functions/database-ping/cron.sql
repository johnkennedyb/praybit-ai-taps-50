
-- Create a cron job that runs every 12 hours
-- This will automatically ping the database to keep it active

-- First, enable the pg_cron extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule the database ping function to run every 12 hours
-- This will make an HTTP request to our Edge Function
SELECT cron.schedule(
  'database-ping-job',
  '0 */12 * * *', -- Run every 12 hours at minute 0
  $$
  SELECT net.http_post(
    url := 'https://jbanrjrlhbwozysmknzd.supabase.co/functions/v1/database-ping',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer ' || current_setting('app.settings.service_role_key') || '"}'::jsonb,
    body := '{}'::jsonb
  );
  $$
);

-- You can also check the status of your cron jobs with:
-- SELECT * FROM cron.job;

-- To remove the cron job if needed:
-- SELECT cron.unschedule('database-ping-job');
