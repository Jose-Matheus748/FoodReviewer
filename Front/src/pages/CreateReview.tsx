import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import logo from "@/assets/logo-foodreviewer.png";

const CreateReview = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");

  const handleStarClick = (starIndex: number) => {
    // interação para se clicar na mesma estrela já selecionada, zera a avaliação
    if (rating === starIndex) {
      setRating(0);
    } else {
      setRating(starIndex);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Futuramente alterar para salvar no banco de dados
    // Retornado para a pagina do produto
    navigate(`/produto/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-gradient-to-br from-primary via-primary to-primary/90 rounded-3xl shadow-2xl p-8 md:p-12 border border-primary/20">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="hover:opacity-80 transition-opacity"
          >
            <img src={logo} alt="FoodReviewer Logo" className="w-24 h-24 object-contain cursor-pointer" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Estrelas */}
          <div className="flex justify-center gap-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleStarClick(star)}
                className="transition-transform hover:scale-110 focus:outline-none"
              >
                <Star
                  className={`w-14 h-14 md:w-16 md:h-16 transition-colors ${
                    star <= rating
                      ? "fill-accent text-accent"
                      : "fill-transparent text-accent/40"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Campo de Descrição */}
          <div className="space-y-3">
            <label className="text-xl md:text-2xl font-semibold text-accent block">
              Adicione uma descrição:(opcional)
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Digite uma descrição"
              className="min-h-[200px] bg-primary/50 border-2 border-accent/20 text-white placeholder:text-white/40 focus:border-accent resize-none text-base"
            />
          </div>

          {/* Botão de concluir */}
          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              className="px-12 py-6 text-xl md:text-2xl font-bold bg-transparent border-4 border-accent text-accent hover:bg-accent hover:text-primary rounded-full transition-all"
            >
              Postar avaliação
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateReview;
