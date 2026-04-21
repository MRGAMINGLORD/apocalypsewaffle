import { useNavigate, useParams, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const GAMES: Record<string, { src: string; title: string }> = {
  "turtle-trade-co": { src: "/games/turtle-trade-co/", title: "Turtle Trade Co" },
  "defense-of-belgium": { src: "/games/defense-of-belgium/", title: "Defense of Belgium" },
};

const PlayGame = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();

  const game = gameId ? GAMES[gameId] : undefined;
  if (!game) return <Navigate to="/404" replace />;

  return (
    <div className="fixed inset-0 bg-background">
      <button
        onClick={() => navigate("/")}
        className="absolute left-4 top-4 z-50 flex items-center gap-2 rounded-md border border-primary/60 bg-background/80 px-3 py-2 font-display text-xs uppercase tracking-wider text-primary backdrop-blur transition-colors hover:bg-primary hover:text-primary-foreground"
        aria-label="Back to hub"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to hub
      </button>
      <iframe
        src={game.src}
        title={game.title}
        className="h-full w-full border-0"
        allow="fullscreen; autoplay; gamepad"
      />
    </div>
  );
};

export default PlayGame;
