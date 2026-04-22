import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Play, Download, Upload } from "lucide-react";
import { toast } from "sonner";
import {
  downloadGameData,
  getLastGame,
  importGameData,
} from "@/lib/gameStorage";

const GAME_TITLES: Record<string, string> = {
  "turtle-trade-co": "Turtle Trade Co",
  "defense-of-belgium": "Defense of Belgium",
  "waffle-craft": "Waffle Craft",
};

const SaveDataPanel = () => {
  const [lastGame, setLastGameState] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLastGameState(getLastGame());
  }, []);

  const handleExport = () => {
    try {
      const count = downloadGameData();
      toast.success(
        count > 0
          ? `Exported ${count} save entr${count === 1 ? "y" : "ies"}.`
          : "Export complete (no save data found yet).",
      );
    } catch {
      toast.error("Could not export save data.");
    }
  };

  const handleImportClick = () => fileInputRef.current?.click();

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-importing the same file
    if (!file) return;
    try {
      const text = await file.text();
      const result = importGameData(text);
      toast.success(
        `Imported ${result.imported} entr${result.imported === 1 ? "y" : "ies"}. Reload a game to see your progress.`,
      );
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Import failed.");
    }
  };

  const lastTitle = lastGame ? GAME_TITLES[lastGame] : null;

  return (
    <section className="mx-auto max-w-5xl px-6 pb-2 pt-6">
      <div className="rounded-lg border border-primary/40 bg-card/60 p-5 border-glow">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-display text-lg uppercase tracking-wider text-primary">
              Bunker Save Terminal
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {lastTitle
                ? `Last deployment: ${lastTitle}.`
                : "No previous deployments logged."}{" "}
              Backup your progress or restore it on another device.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {lastGame && lastTitle && (
              <Link
                to={`/play/${lastGame}`}
                className="inline-flex items-center gap-2 rounded-md border border-primary bg-primary px-4 py-2 font-display text-xs uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/80"
              >
                <Play className="h-4 w-4" />
                Play {lastTitle} again
              </Link>
            )}
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-2 rounded-md border border-primary/60 bg-background/40 px-3 py-2 font-display text-xs uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
            <button
              onClick={handleImportClick}
              className="inline-flex items-center gap-2 rounded-md border border-primary/60 bg-background/40 px-3 py-2 font-display text-xs uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <Upload className="h-4 w-4" />
              Import
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={handleImportFile}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaveDataPanel;
