import AcidSequencer from "@/components/AcidSequencer";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-acid-dark p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-acid-green text-4xl font-mono mb-8 text-center animate-glow">
          Acid Pattern Generator
        </h1>
        <AcidSequencer />
      </div>
      <Footer />
    </div>
  );
};

export default Index;