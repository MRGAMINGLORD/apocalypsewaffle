import heroBg from "@/assets/hero-bg.png";
import GameCard from "@/components/GameCard";

const games = [
  {
    title: "Tornado Terror",
    description: "A massive F5 tornado is bearing down on your Waffle House. Barricade, serve, survive.",
    icon: "🌪️",
    available: false,
  },
  {
    title: "Hurricane Hash Browns",
    description: "Category 5 winds are ripping the roof off. Keep the grill running no matter what.",
    icon: "🌊",
    available: false,
  },
  {
    title: "Earthquake Eggs",
    description: "The ground is shaking but the orders keep coming. Don't drop the plates.",
    icon: "🫨",
    available: false,
  },
  {
    title: "Blizzard Breakfast",
    description: "Snowed in with a full house of hungry customers and dwindling supplies.",
    icon: "❄️",
    available: false,
  },
  {
    title: "Volcano Waffles",
    description: "Lava is flowing down Main Street. The Waffle House stays open.",
    icon: "🌋",
    available: false,
  },
  {
    title: "Meteor Melt",
    description: "An asteroid impact is imminent. One last shift before the end of the world.",
    icon: "☄️",
    available: false,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
        <img
          src={heroBg}
          alt="Apocalyptic Waffle House scene"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
        <div className="relative z-10 px-6 text-center">
          <h1 className="mb-2 font-display text-6xl tracking-tight text-primary text-glow sm:text-8xl">
            APOCALYPSE WAFFLE
          </h1>
          <p className="mx-auto max-w-xl text-lg text-card-foreground sm:text-xl">
            The world is ending. The Waffle House is open. <br />
            <span className="text-primary">Survive the disaster. Serve the waffles.</span>
          </p>
        </div>
      </section>

      {/* Games Grid */}
      <section className="mx-auto max-w-5xl px-6 pb-20 pt-10">
        <h2 className="mb-8 text-center font-display text-3xl text-primary sm:text-4xl">
          Choose Your Disaster
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <GameCard key={game.title} {...game} />
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Games will be unlocked as they are added. Stay tuned. 🧇
        </p>
      </section>
    </div>
  );
};

export default Index;
