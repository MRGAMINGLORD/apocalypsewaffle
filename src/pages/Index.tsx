import heroBg from "@/assets/hero-bg.png";
import coverTurtleTradeCo from "@/assets/cover-turtle-trade-co.jpg";
import coverWaffleWorks from "@/assets/cover-waffle-works.jpg";
import coverWaffleCraft from "@/assets/cover-waffle-craft.jpg";
import coverDefenseOfBelgium from "@/assets/cover-defense-of-belgium.jpg";
import FeedbackForm from "@/components/FeedbackForm";
import GameCard from "@/components/GameCard";
import WhatsNew from "@/components/WhatsNew";
import SaveDataPanel from "@/components/SaveDataPanel";


const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
        <img
          src={heroBg}
          alt="Apocalyptic Waffle House scene"
          className="absolute inset-0 h-full w-full object-cover opacity-40" />

        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
        <div className="relative z-10 px-6 text-center">
          <h1 className="mb-2 font-display text-6xl tracking-tight text-primary text-glow sm:text-8xl">
            APOCALYPSE WAFFLE
          </h1>
          <p className="mx-auto max-w-xl text-lg sm:text-xl text-primary">Apocalypse Waffle is a gaming hub featuring waffle-themed twists on classic games and intense, original survival challenges. Instead of serving food, you play as a customer fighting to survive catastrophic natural disasters while trapped inside a Waffle House.
            <br />
            <span className="text-primary"></span>
          </p>
        </div>
      </section>

      {/* What's New */}
      <WhatsNew />

      {/* Save / Continue */}
      <SaveDataPanel />

      {/* Games */}
      <section className="mx-auto max-w-5xl px-6 pb-12 pt-10">
        <h2 className="mb-8 text-center font-display text-3xl text-primary sm:text-4xl">
          Games
        </h2>

        {/* Tycoon Games */}
        <h3 className="mb-1 font-display text-2xl text-primary">
          Tycoon Games
        </h3>
        <p className="mb-4 text-sm text-muted-foreground italic">
          tycoons that slowly grow with weird twists
        </p>
        <div className="mb-10 grid gap-6 sm:grid-cols-2">
          <GameCard
            title="Turtle Trade Co"
            description="Turtle Trade Co. is a chill island tycoon where you gather wood, sell turtles (while stopping escapes), fend off thieves, and expand your business—plus a strange hidden 67-themed mode..."
            cover={coverTurtleTradeCo}
            available={true}
            playUrl="/play/turtle-trade-co"
          />
          <GameCard
            title="Waffle Works"
            description="A cookie clicker-style idle game. Keep the batter flowing and the iron hot!"
            cover={coverWaffleWorks}
            available={false}
          />
        </div>

        {/* Waffly Twists */}
        <h3 className="mb-1 font-display text-2xl text-primary">
          Waffly Twists
        </h3>
        <p className="mb-4 text-sm text-muted-foreground italic">
          special twists on popular games
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          <GameCard
            title="Waffle Craft"
            description="A block-building survival adventure — Minecraft, but crispier and better."
            cover={coverWaffleCraft}
            available={false}
          />
        </div>

        {/* Other Games */}
        <h3 className="mb-1 mt-10 font-display text-2xl text-primary">
          Other Games
        </h3>
        <p className="mb-4 text-sm text-muted-foreground italic">
          some were built by us but most aren't
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          <GameCard
            title="Defense of Belgium"
            description="A retro terminal-style strategy game. May 10, 1940 — you are the Prime Minister of Belgium. Hold the line against the panzers."
            cover={coverDefenseOfBelgium}
            available={true}
            playUrl="/play/defense-of-belgium"
          />
        </div>
      </section>

      {/* Feedback */}
      <FeedbackForm />
    </div>);

};

export default Index;