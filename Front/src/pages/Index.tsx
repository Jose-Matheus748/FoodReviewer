import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { FeatureCard } from "@/components/FeatureCard";
import { DecorativeBlobs } from "@/components/DecorativeBlobs";
import labelIcon from "@/assets/label-icon.png";
import reviewIcon from "@/assets/review-icon.png";
import ingredientsIcon from "@/assets/ingredients-icon.png";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <DecorativeBlobs />
      <Header />
      
      <main className="container mx-auto px-4 relative z-10">
        {/*Campo para pesquisar*/}
        <section className="py-16 md:py-24 text-center relative">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Descubra tudo sobre os{" "}
              <span className="bg-gradient-to-r from-accent via-accent to-primary bg-clip-text text-transparent">
                alimentos
              </span>{" "}
              que você consome
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Pesquise produtos, consulte informações nutricionais e compartilhe suas experiências
            </p>
            <SearchBar />
          </div>
        </section>

        {/*Cards*/}
        <section className="py-12 pb-20">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 justify-center items-stretch">
            {/* Card Rotulos */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-row items-center max-w-md w-full">
              <img src={labelIcon} alt="imagem rotulo" className="w-1/2 h-full object-cover" />
              <div className="p-4 flex-1 flex flex-col justify-center">
                <h5 className="text-lg font-semibold mb-2 text-[#d6007f]">Consulte Rótulos</h5>
                <p className="text-gray-700 text-sm">
                  Consulte o rótulo dos produtos que você consome.
                </p>
              </div>
            </div>

            {/* Card avaliações */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-row items-center max-w-md w-full">
              <img src={reviewIcon} alt="imagem avaliação" className="w-1/2 h-full object-cover" />
              <div className="p-4 flex-1 flex flex-col justify-center">
                <h5 className="text-lg font-semibold mb-2 text-[#8b009a]">Faça e veja avaliações</h5>
                <p className="text-gray-700 text-sm">
                  Faça e veja resenhas sobre os produtos que você tem interesse.
                </p>
              </div>
            </div>

            {/* Card ingredientes */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-row items-center max-w-md w-full">
              <img src={ingredientsIcon} alt="imagem ingredientes" className="w-1/2 h-full object-cover" />
              <div className="p-4 flex-1 flex flex-col justify-center">
                <h5 className="text-lg font-semibold mb-2 text-[#8b009a]">Consulte ingredientes</h5>
                <p className="text-gray-700 text-sm">
                  Consulte os ingredientes dos produtos que você mais consome.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Rodapé do site */}
      <footer className="border-t border-border/50 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 FoodReviewer. Projeto acadêmico.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;