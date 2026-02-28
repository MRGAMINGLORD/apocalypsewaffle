import heroBg from "@/assets/hero-bg.png";
import GameCard from "@/components/GameCard";

const ogGames = [
{
  title: "Storm Surge Diner",
  description: "A Category 5 hurricane is hitting. Keep the Waffle House open, serve customers, and survive the storm.",
  icon: "🌀",
  available: false
}];


const waffleGames = [
{
  title: "WaffleCraft",
  description: "Minecraft but better. Build, mine, and survive in a world made entirely of waffles.",
  icon: "🧇",
  available: false
},
{
  title: "Waffle Works",
  description: "Click. Bake. Automate. A waffle-powered idle game inspired by Cookie Clicker.",
  icon: "🏭",
  available: false
}];


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

      {/* OG Disaster Survival Games */}
      <section className="mx-auto max-w-5xl px-6 pb-12 pt-10">
        <h2 className="mb-8 text-center font-display text-3xl text-primary sm:text-4xl">
          The OG Disaster Survival Games
        </h2>
        <div className="mx-auto grid max-w-md gap-6">
          {ogGames.map((game) =>
          <GameCard key={game.title} {...game} />
          )}
        </div>
      </section>

      {/* Waffle Inspired Games */}
      <section className="mx-auto max-w-5xl px-6 pb-20 pt-4">
        <h2 className="mb-8 text-center font-display text-3xl text-primary sm:text-4xl">
          The Waffle Inspired Games
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {waffleGames.map((game) =>
          <GameCard key={game.title} {...game} />
          )}
        </div>
      </section>
    </div>);

};

export default Index;