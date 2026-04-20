import { Lock } from "lucide-react";

interface GameCardProps {
  title: string;
  description: string;
  icon: string;
  available?: boolean;
  playUrl?: string;
  onClick?: () => void;
}

const GameCard = ({ title, description, icon, available = false, playUrl, onClick }: GameCardProps) => {
  const handleClick = () => {
    if (!available) return;
    if (playUrl) {
      window.open(playUrl, "_blank", "noopener,noreferrer");
      return;
    }
    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      className={`group relative w-full rounded-lg border p-6 text-left transition-all duration-300 ${
        available
          ? "border-primary/40 bg-card hover:border-primary hover:border-glow cursor-pointer"
          : "border-border bg-card/50 cursor-not-allowed opacity-60"
      }`}
    >
      <div className="mb-4 text-5xl">{icon}</div>
      <h3 className="mb-2 text-xl text-primary">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
      {available && (
        <span className="mt-4 inline-block font-display text-sm uppercase tracking-wider text-primary">
          ▶ Play
        </span>
      )}
      {!available && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-background/60">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Lock className="h-5 w-5" />
            <span className="font-display text-sm uppercase tracking-wider">Coming Soon</span>
          </div>
        </div>
      )}
    </button>
  );
};

export default GameCard;
