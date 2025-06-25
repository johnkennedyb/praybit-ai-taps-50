
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Ping the database by checking user_stats table
    const { data: stats, error: statsError } = await supabase
      .from('user_stats')
      .select('count')
      .limit(1)

    if (statsError) {
      console.error('Error pinging user_stats:', statsError)
    } else {
      console.log('Successfully pinged user_stats table')
    }

    // Ping referrals table
    const { data: referrals, error: referralsError } = await supabase
      .from('referrals')
      .select('count')
      .limit(1)

    if (referralsError) {
      console.error('Error pinging referrals:', referralsError)
    } else {
      console.log('Successfully pinged referrals table')
    }

    // Ping social_connections table
    const { data: social, error: socialError } = await supabase
      .from('social_connections')
      .select('count')
      .limit(1)

    if (socialError) {
      console.error('Error pinging social_connections:', socialError)
    } else {
      console.log('Successfully pinged social_connections table')
    }

    // Log the ping with timestamp
    const timestamp = new Date().toISOString()
    console.log(`Database ping completed at: ${timestamp}`)

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Database ping completed successfully',
        timestamp: timestamp,
        tables_pinged: ['user_stats', 'referrals', 'social_connections']
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Database ping error:', error)
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
