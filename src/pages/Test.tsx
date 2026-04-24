import { useState } from "react";
import { Code2, Send, Trash2, Lock, Loader2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useTestGames, type TestGameRow } from "@/hooks/useTestGames";
import {
  isTestUnlocked,
  unlockTest,
  isEditUnlocked,
  unlockEdit,
} from "@/lib/testAuth";
import CoverImagePicker from "@/components/CoverImagePicker";
import heroBg from "@/assets/hero-bg.png";

const CATEGORIES = ["tycoon", "twist", "other"] as const;

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);

// ---------- Password gate ----------
const TestGate = ({ onUnlock }: { onUnlock: () => void }) => {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  const tryUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (unlockTest(pw)) {
      setError(false);
      onUnlock();
    } else {
      setError(true);
      setPw("");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <form
        onSubmit={tryUnlock}
        className="w-full max-w-sm space-y-4 rounded-lg border border-primary/40 bg-card/60 p-6 border-glow"
      >
        <div className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-primary" />
          <h1 className="font-display text-xl uppercase tracking-wider text-primary">
            Test Mode Locked
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Enter the test password to access the staging environment.
        </p>
        <Input
          type="password"
          autoFocus
          placeholder="Password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          className={error ? "border-destructive" : ""}
        />
        {error && <p className="text-xs text-destructive">Wrong password.</p>}
        <div className="flex gap-2">
          <Button type="submit" className="flex-1">
            Unlock
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link to="/">Back</Link>
          </Button>
        </div>
      </form>
    </div>
  );
};

// ---------- Edit-code password gate (modal) ----------
const EditPasswordDialog = ({
  open,
  onOpenChange,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSuccess: () => void;
}) => {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (unlockEdit(pw)) {
      setPw("");
      setErr(false);
      onOpenChange(false);
      onSuccess();
    } else {
      setErr(true);
      setPw("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit code — password required</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-3">
          <Input
            type="password"
            autoFocus
            placeholder="Password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className={err ? "border-destructive" : ""}
          />
          {err && <p className="text-xs text-destructive">Wrong password.</p>}
          <DialogFooter>
            <Button type="submit">Unlock</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// ---------- Edit game modal ----------
const EditGameDialog = ({
  game,
  open,
  onOpenChange,
  onSaved,
}: {
  game: TestGameRow | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSaved: () => void;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("other");
  const [html, setHtml] = useState("");
  const [saving, setSaving] = useState(false);

  // Sync when opened with a different game
  if (game && open && title === "" && description === "" && html === "" && coverUrl === "") {
    setTitle(game.title);
    setDescription(game.description);
    setCoverUrl(game.cover_url ?? "");
    setCategory(
      (CATEGORIES as readonly string[]).includes(game.category)
        ? (game.category as (typeof CATEGORIES)[number])
        : "other",
    );
    setHtml(game.html);
  }

  const handleClose = (v: boolean) => {
    if (!v) {
      setTitle(""); setDescription(""); setCoverUrl(""); setHtml(""); setCategory("other");
    }
    onOpenChange(v);
  };

  const save = async () => {
    if (!game) return;
    setSaving(true);
    const { error } = await supabase
      .from("test_custom_games")
      .update({
        title: title.trim(),
        description: description.trim(),
        cover_url: coverUrl.trim() || null,
        category,
        html,
      })
      .eq("id", game.id);
    setSaving(false);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Saved to TEST" });
    handleClose(false);
    onSaved();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit: {game?.title ?? ""}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={80} />
          </div>
          <CoverImagePicker value={coverUrl} onChange={setCoverUrl} hint={title} />
          <div>
            <Label>Description</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} maxLength={500} />
          </div>
          <div>
            <Label>Category</Label>
            <div className="mt-1 flex gap-2">
              {CATEGORIES.map((c) => (
                <Button
                  key={c}
                  type="button"
                  size="sm"
                  variant={category === c ? "default" : "outline"}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <Label>Game code (HTML)</Label>
            <Textarea
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              rows={16}
              className="font-mono text-xs"
              placeholder="<html>...</html>"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => handleClose(false)}>
            Cancel
          </Button>
          <Button onClick={save} disabled={saving}>
            {saving && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// ---------- New game dialog ----------
const NewGameDialog = ({ onCreated }: { onCreated: () => void }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [busy, setBusy] = useState(false);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setBusy(true);
    const slug = slugify(title);
    const { error } = await supabase.from("test_custom_games").insert({
      slug,
      title: title.trim(),
      description: "",
      html: "",
      category: "other",
    });
    setBusy(false);
    if (error) {
      toast({
        title: "Could not create",
        description: error.message.includes("duplicate")
          ? `A test game with slug "${slug}" already exists.`
          : error.message,
        variant: "destructive",
      });
      return;
    }
    setTitle("");
    setOpen(false);
    onCreated();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-1 h-4 w-4" />
        New test game
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New test game</DialogTitle>
        </DialogHeader>
        <form onSubmit={create} className="space-y-3">
          <Input
            placeholder="Title"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={80}
            required
          />
          <DialogFooter>
            <Button type="submit" disabled={busy}>Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// ---------- Test game card ----------
const TestGameCard = ({
  game,
  onEditRequest,
  onPost,
  onDelete,
}: {
  game: TestGameRow;
  onEditRequest: (g: TestGameRow) => void;
  onPost: (g: TestGameRow) => void;
  onDelete: (g: TestGameRow) => void;
}) => {
  const playable = game.html.trim().length > 0;
  return (
    <div className="group relative overflow-hidden rounded-lg border border-primary/40 bg-card transition-transform duration-300 hover:scale-[1.02] hover:border-primary">
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-muted">
        {game.cover_url ? (
          <img
            src={game.cover_url}
            alt={`${game.title} cover`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-display text-sm uppercase text-muted-foreground">
            No cover
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

        {/* Hover overlay with actions */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/80 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <Button size="sm" onClick={() => onEditRequest(game)}>
            <Code2 className="mr-1 h-4 w-4" />
            Edit code
          </Button>
          {playable && (
            <Button size="sm" variant="secondary" asChild>
              <Link to={`/play-test/${game.slug}`}>
                ▶ Play (test)
              </Link>
            </Button>
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg uppercase tracking-wide text-primary">
            {game.title}
          </h3>
          <span className="font-display text-[10px] uppercase tracking-wider text-muted-foreground">
            {game.category}
          </span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          {game.description || <em>No description</em>}
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {playable ? "✓ has code" : "⚠ no code"}
        </p>
        <div className="mt-3 flex gap-2">
          <Button
            size="sm"
            variant="default"
            onClick={() => onPost(game)}
            disabled={!playable}
            title={playable ? "Promote to live hub" : "Add code first"}
          >
            <Send className="mr-1 h-4 w-4" />
            Post to live
          </Button>
          <Button size="sm" variant="ghost" onClick={() => onDelete(game)}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// ---------- Main page ----------
const Test = () => {
  const [unlocked, setUnlocked] = useState(isTestUnlocked());
  const { rows, loading, reload } = useTestGames();
  const [editPwOpen, setEditPwOpen] = useState(false);
  const [editingGame, setEditingGame] = useState<TestGameRow | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);

  if (!unlocked) return <TestGate onUnlock={() => setUnlocked(true)} />;

  const requestEdit = (g: TestGameRow) => {
    setEditingGame(g);
    if (isEditUnlocked()) {
      setEditorOpen(true);
    } else {
      setEditPwOpen(true);
    }
  };

  const handlePost = async (g: TestGameRow) => {
    if (!confirm(`Post "${g.title}" to the LIVE hub? This will overwrite any existing live game with the same slug.`)) return;
    const { error } = await supabase.from("custom_games").upsert(
      {
        slug: g.slug,
        title: g.title,
        description: g.description,
        cover_url: g.cover_url,
        html: g.html,
        category: g.category,
      },
      { onConflict: "slug" },
    );
    if (error) {
      toast({ title: "Post failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Posted to live", description: `Now playable at /play/${g.slug}` });
  };

  const handleDelete = async (g: TestGameRow) => {
    if (!confirm(`Delete "${g.title}" from TEST? (This does not affect live.)`)) return;
    const { error } = await supabase.from("test_custom_games").delete().eq("id", g.id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
      return;
    }
    reload();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative flex min-h-[40vh] items-center justify-center overflow-hidden">
        <img
          src={heroBg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
        <div className="relative z-10 px-6 text-center">
          <h1 className="mb-2 font-display text-5xl tracking-tight text-primary text-glow sm:text-7xl">
            APOCALYPSE WAFFLE — TEST MODE
          </h1>
          <p className="mx-auto max-w-xl text-base text-primary">
            Staging area. Edit, preview, then "Post to live" to push a game to the public hub.
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <Button asChild variant="outline">
              <Link to="/">← Back to live hub</Link>
            </Button>
            <NewGameDialog onCreated={reload} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-12 pt-6">
        <h2 className="mb-4 font-display text-2xl uppercase tracking-wider text-primary">
          Test Games ({rows.length})
        </h2>
        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : rows.length === 0 ? (
          <div className="rounded-lg border border-dashed border-primary/40 p-10 text-center text-muted-foreground">
            No test games yet. Click <strong>New test game</strong> to start.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rows.map((g) => (
              <TestGameCard
                key={g.id}
                game={g}
                onEditRequest={requestEdit}
                onPost={handlePost}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </section>

      <EditPasswordDialog
        open={editPwOpen}
        onOpenChange={setEditPwOpen}
        onSuccess={() => setEditorOpen(true)}
      />
      <EditGameDialog
        game={editingGame}
        open={editorOpen}
        onOpenChange={(v) => {
          setEditorOpen(v);
          if (!v) setEditingGame(null);
        }}
        onSaved={reload}
      />
    </div>
  );
};

export default Test;
