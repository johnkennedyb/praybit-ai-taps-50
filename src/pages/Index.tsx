
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, TrendingUp, Zap, Shield, Users, CircleDollarSign, Trophy } from "lucide-react";
import { useWeb3 } from "@/contexts/Web3Context";
import CoinTapper from "@/components/CoinTapper";
import ConnectWalletButton from "@/components/ConnectWalletButton";
import { useSupabase } from "@/contexts/SupabaseContext";
import { usePrayData } from "@/hooks/use-pray-data";
import { toast } from "@/hooks/use-toast";
import BottomNavigation from "@/components/BottomNavigation";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Stats from "@/components/Stats";

const Index = () => {
  const navigate = useNavigate();
  const { account, chainId } = useWeb3();
  const { user } = useSupabase();
  const { data, incrementTaps, claimDailyReward } = usePrayData();
  
  const handleTap = () => {
    incrementTaps();
    toast({
      title: "PRAY Mined!",
      description: `You earned ${data.miningPower} PRAY tokens`,
    });
  };

  const handleDailyReward = () => {
    const claimed = claimDailyReward();
    if (claimed) {
      toast({
        title: "Daily Reward Claimed!",
        description: "You earned 5 PRAY tokens.",
      });
    } else {
      toast({
        title: "Already Claimed",
        description: "You've already claimed your daily reward today.",
        variant: "destructive",
      });
    }
  };

  return (
    <AppLayout showHeader={false}>
      <header className="px-8 pt-8 lg:px-10 bg-blue-900/20 backdrop-blur-md">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-4 items-center">
            <div className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Praybit
            </div>
            <div className="mt-4 sm:mt-0">
              {user ? (
                <ConnectWalletButton showNetwork={false} />
              ) : (
                <Button onClick={() => navigate("/profile")}>
                  Get Started <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <main className="relative mt-8 px-8 lg:px-10 py-6 flex-grow bg-blue-900/30">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Tap to earn PRAY tokens
            </h1>
            <p className="mt-6 text-lg leading-8 text-blue-100">
              Join the Praybit ecosystem and start earning PRAY tokens by
              tapping the coin. The more you tap, the more you earn!
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
            <Card className="bg-blue-800/50 border-blue-700 backdrop-blur-md shadow-xl p-2">
              <CardHeader className="px-6">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  Praybit Mining
                </CardTitle>
                <CardDescription>Tap to earn PRAY tokens</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center px-6 pb-6">
                <CoinTapper 
                  onTap={handleTap}
                  coins={data.coins || 0}
                  coinsPerTap={data.miningPower || 1}
                />
                {!user && (
                  <div className="mt-4 text-center">
                    <p className="text-sm text-blue-200 mb-2">
                      Register to save your progress and earn more rewards!
                    </p>
                    <Button onClick={() => navigate("/profile")} variant="outline">
                      Register Now
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-blue-800/50 border-blue-700 backdrop-blur-md shadow-xl p-2">
              <CardHeader className="px-6">
                <CardTitle className="text-xl flex items-center gap-2">
                  <CircleDollarSign className="h-5 w-5 text-yellow-400" />
                  Daily Rewards
                </CardTitle>
                <CardDescription>Claim your daily bonus</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 flex flex-col items-center px-6 pb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-300 to-amber-600 rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-blue-900">+5</span>
                </div>
                <p className="text-center text-sm text-blue-200">
                  Come back every day to claim free PRAY tokens!
                </p>
                <Button 
                  onClick={handleDailyReward}
                  className="mt-2 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-blue-900 font-medium"
                >
                  Claim Daily Reward
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {user && (
            <div className="mt-8">
              <Stats 
                coins={data.coins || 0} 
                tapsCount={data.tapsCount || 0} 
                referrals={data.referrals || 0} 
              />
            </div>
          )}
          
          <div className="mt-16 border-t border-blue-900/50 pt-8 text-center">
            <h2 className="text-2xl font-semibold text-white">
              Ways to Earn PRAY
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="p-6 bg-blue-800/30 rounded-lg border border-blue-700/50">
                <TrendingUp className="mx-auto h-10 w-10 text-yellow-400" />
                <h3 className="mt-4 text-lg font-medium text-white">
                  Mining
                </h3>
                <p className="mt-2 text-sm text-blue-100">
                  Earn PRAY tokens by tapping the mining button
                </p>
              </div>
              <div className="p-6 bg-blue-800/30 rounded-lg border border-blue-700/50">
                <Users className="mx-auto h-10 w-10 text-yellow-400" />
                <h3 className="mt-4 text-lg font-medium text-white">
                  Referrals
                </h3>
                <p className="mt-2 text-sm text-blue-100">
                  Invite friends and earn 10 PRAY per referral
                </p>
              </div>
              <div className="p-6 bg-blue-800/30 rounded-lg border border-blue-700/50">
                <Shield className="mx-auto h-10 w-10 text-yellow-400" />
                <h3 className="mt-4 text-lg font-medium text-white">
                  Staking
                </h3>
                <p className="mt-2 text-sm text-blue-100">
                  Earn passive income by staking your PRAY tokens
                </p>
              </div>
              <div className="p-6 bg-blue-800/30 rounded-lg border border-blue-700/50">
                <Trophy className="mx-auto h-10 w-10 text-yellow-400" />
                <h3 className="mt-4 text-lg font-medium text-white">
                  Achievements
                </h3>
                <p className="mt-2 text-sm text-blue-100">
                  Complete tasks to earn rewards and bonuses
                </p>
              </div>
            </div>
            
            <div className="mt-8 pb-4">
              <Button onClick={() => navigate("/earn")} variant="outline" className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/20">
                View All Earning Options
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="relative mt-12 border-t border-blue-900/50 py-8 px-8 lg:px-10 pb-24 bg-blue-900/20">
        {/* Footer content without rights reserved text */}
      </footer>
      
      <BottomNavigation />
    </AppLayout>
  );
};

export default Index;
