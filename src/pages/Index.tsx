import heroBg from "@/assets/hero-bg.png";
import FeedbackForm from "@/components/FeedbackForm";
import WhatsNew from "@/components/WhatsNew";


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


      {/* Feedback */}
      <FeedbackForm />
    </div>);

};

export default Index;