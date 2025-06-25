
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Database } from 'lucide-react';

export default function DatabasePing() {
  const [isLoading, setIsLoading] = useState(false);
  const [lastPing, setLastPing] = useState<string | null>(null);
  const { toast } = useToast();

  const handleManualPing = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/functions/v1/database-ping', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (result.success) {
        setLastPing(result.timestamp);
        toast({
          title: "Database Ping Successful",
          description: "Database is active and responding",
        });
      } else {
        throw new Error(result.error || 'Ping failed');
      }
    } catch (error) {
      console.error('Manual ping error:', error);
      toast({
        title: "Ping Failed",
        description: "Could not reach the database",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Database Ping
        </CardTitle>
        <CardDescription>
          The database is automatically pinged every 12 hours to keep it active
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={handleManualPing} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Pinging...
            </>
          ) : (
            'Manual Ping'
          )}
        </Button>
        
        {lastPing && (
          <div className="text-sm text-muted-foreground">
            Last ping: {new Date(lastPing).toLocaleString()}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
