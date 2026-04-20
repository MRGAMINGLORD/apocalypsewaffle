import { Lock } from "lucide-react";

interface GameCardProps {
  title: string;
  description: string;
  cover?: string;
  icon?: string;
  available?: boolean;
  playUrl?: string;
  onClick?: () => void;
}

const GameCard = ({ title, description, cover, icon, available = false, playUrl, onClick }: GameCardProps) => {
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
      className={`group relative w-full overflow-hidden rounded-lg border text-left transition-all duration-300 ${
        available
          ? "border-primary/40 bg-card hover:border-primary hover:border-glow cursor-pointer"
          : "border-border bg-card/50 cursor-not-allowed opacity-60"
      }`}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {cover ? (
          <img
            src={cover}
            alt={`${title} cover art`}
            loading="lazy"
            width={768}
            height={512}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-6xl">{icon}</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
      </div>
      <div className="p-6">
        <h3 className="mb-2 text-xl text-primary">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        {available && (
          <span className="mt-4 inline-block font-display text-sm uppercase tracking-wider text-primary">
            ▶ Play
          </span>
        )}
      </div>
      {!available && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-background/70">
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
