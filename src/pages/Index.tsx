
import { CoinTapper } from "@/components/CoinTapper";
import { Stats } from "@/components/Stats";
import { ReferralSystem } from "@/components/ReferralSystem";
import DatabasePing from "@/components/DatabasePing";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-blue-900 p-4">
      <div className="container mx-auto max-w-md space-y-6">
        <Stats />
        <CoinTapper />
        <ReferralSystem />
        <DatabasePing />
      </div>
    </div>
  );
};

export default Index;
