import { Header } from "@/components/Header";
import { DecorativeBlobs } from "@/components/DecorativeBlobs";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, Plus, Star } from "lucide-react";
import logo from "@/assets/logo-foodreviewer.png";

// ✅ Adicionamos a constante da URL base do backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

// Tipos auxiliares
interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
}

interface NutritionalInfo {
  item: string;
  quantidade: string;
  valorDiario: string;
}

interface ProductData {
  id: number;
  nome: string; // ✅ alterado de 'name' para 'nome' (igual ao backend)
  descricao: string;
  marca: string;
  preco: number;
  tipo: string;
  pesoGramas: number;
  densidade: number;
  averageRating?: number;
  tabelaNutricional?: {
    id?: number;
    acucares?: number;
    calorias?: number;
    carboidratos?: number;
    fibras?: number;
    gorduras_saturadas?: number;
    gorduras_totais?: number;
    outros?: number;
    proteinas?: number;
    sodio?: number;
    produto_id?: number;
  };
}

// Componente principal
const ProductDetails = () => {
  const { id } = useParams();

  // Estados principais
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [nutritionalInfo, setNutritionalInfo] = useState<NutritionalInfo[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ useEffect para buscar dados do produto pelo ID
  useEffect(() => {
    if (!id) return;

    const fetchProductData = async () => {
      setLoading(true);
      setError(null);

      try {
        // ✅ Corrigido: usamos a URL base do backend (porta 8080)
        const response = await fetch(`/api/produtos/${id}`);

        if (!response.ok) {
          throw new Error(`Erro ao buscar produto: ${response.status}`);
        }

        const data = await response.json();

        // ✅ Atualizado: agora mapeia os nomes reais da entidade Produto
        setProductData({
          id: data.id,
          nome: data.nome,
          descricao: data.descricao,
          marca: data.marca,
          preco: data.preco,
          tipo: data.tipo,
          pesoGramas: data.pesoGramas,
          densidade: data.densidade,
          averageRating: data.averageRating || 0,
          tabelaNutricional: data.tabelaNutricional || {},
        });

        if (data.nutritionalInfo) setNutritionalInfo(data.nutritionalInfo);
        if (data.reviews) setReviews(data.reviews);
      } catch (err) {
        console.error("Erro ao buscar produto:", err);
        setError("Não foi possível carregar os dados do produto.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  // Função auxiliar: renderizar estrelas de avaliação
  const renderStars = (rating: number) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-6 h-6 ${
            star <= rating ? "fill-accent text-accent" : "fill-gray-400 text-gray-400"
          }`}
        />
      ))}
    </div>
  );

  // Renderização condicional
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#d4d4d4]">
        <p className="text-lg text-gray-700 font-semibold">Carregando produto...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#d4d4d4]">
        <p className="text-lg text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#d4d4d4]">
        <p className="text-lg text-gray-600">Produto não encontrado.</p>
      </div>
    );
  }

  // Renderização principal
  return (
    <div className="min-h-screen bg-[#d4d4d4]">
      <DecorativeBlobs />
      <Header />

      {/* Conteúdo principal */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Seção do produto */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Imagem do Produto */}
            <div className="flex items-center justify-center bg-[#d4d4d4] rounded-lg p-4">
              <img
                src={"/placeholder.svg"}
                alt={productData.nome}
                className="max-w-full h-auto object-contain max-h-64"
              />
            </div>

            {/* Informações do Produto */}
            <div className="md:col-span-2 space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {productData.nome}
              </h2>

              {/* Descrição */}
              {productData.descricao && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Descrição:</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {productData.descricao}
                  </p>
                </div>
              )}

              {/* Marca */}
              {productData.marca && (
                <p className="text-sm text-gray-700 leading-relaxed">
                  <strong>Marca:</strong> {productData.marca}
                </p>
              )}

              {/* Tipo */}
              {productData.tipo && (
                <p className="text-sm text-gray-700 leading-relaxed">
                  <strong>Tipo:</strong> {productData.tipo}
                </p>
              )}

              {/* Preço */}
              {productData.preco && (
                <p className="text-sm text-gray-700 leading-relaxed">
                  <strong>Preço:</strong> R$ {productData.preco}
                </p>
              )}

              {/* Peso e Densidade */}
              {(productData.pesoGramas || productData.densidade) && (
                <div className="flex flex-col md:flex-row gap-4">
                  {productData.pesoGramas && (
                    <p className="text-sm text-gray-700 leading-relaxed">
                      <strong>Peso:</strong> {productData.pesoGramas} g
                    </p>
                  )}
                  {productData.densidade && (
                    <p className="text-sm text-gray-700 leading-relaxed">
                      <strong>Densidade:</strong> {productData.densidade}
                    </p>
                  )}
                </div>
              )}

              
              {/* Avaliação média */}
              <div className="pt-2 flex flex-col items-start gap-2">
                {/* Se tiver avaliações */}
                {productData.averageRating && productData.averageRating > 0 ? (
                  <>
                    {/* Estrelas preenchidas conforme média */}
                    <div className="flex justify-start gap-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-10 h-10 md:w-12 md:h-12 transition-colors ${
                            star <= Math.round(productData.averageRating)
                              ? "fill-accent text-accent"
                              : "fill-transparent text-accent/40"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 font-medium">
                      Média de avaliações:{" "}
                      <span className="text-accent font-semibold">
                        {productData.averageRating.toFixed(1)}
                      </span>{" "}
                      / 5
                    </p>
                  </>
                ) : (
                  <>
                    {/* Estrelas vazias (produto ainda sem avaliações) */}
                    <div className="flex justify-start gap-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="w-10 h-10 md:w-12 md:h-12 fill-transparent text-accent/40"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 italic mt-1">
                      Este produto ainda não possui avaliações.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabela Nutricional */}
        {productData.tabelaNutricional && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Tabela Nutricional
            </h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>Calorias: {productData.tabelaNutricional.calorias}</li>
              <li>Proteínas: {productData.tabelaNutricional.proteinas} g</li>
              <li>Carboidratos: {productData.tabelaNutricional.carboidratos} g</li>
              <li>Gorduras saturadas: {productData.tabelaNutricional.gorduras_saturadas} g</li>
              <li>Gorduras totais: {productData.tabelaNutricional.gorduras_totais} g</li>
              <li>Fibras: {productData.tabelaNutricional.fibras} g</li>
              <li>Açucares: {productData.tabelaNutricional.acucares} g</li>
              <li>Sódio: {productData.tabelaNutricional.sodio} g</li>
            </ul>
          </div>
        )}

        {/* Seção de Avaliações */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <h2
              className="text-3xl font-bold text-accent"
              style={{
                textShadow:
                  "2px 2px 0 #8b009a, -1px -1px 0 #8b009a, 1px -1px 0 #8b009a, -1px 1px 0 #8b009a, 1px 1px 0 #8b009a",
              }}
            >
              Avaliações:
            </h2>
            <Link to={`/produto/${id}/avaliar`}>
              <Button
                size="icon"
                className="rounded-full bg-accent hover:bg-accent/90 text-white shadow-lg"
              >
                <Plus className="w-6 h-6" />
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {reviews.length === 0 ? (
              <Card className="p-6 bg-white shadow-md">
                <p className="text-gray-600 text-center">
                  Esse produto não possui avaliações.
                </p>
              </Card>
            ) : (
              reviews.map((review) => (
                <Card
                  key={review.id}
                  className="p-5 bg-white shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <User className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-primary text-lg">
                          {review.userName}:
                        </h4>
                      </div>
                      <p className="text-gray-700 mb-3 leading-relaxed whitespace-pre-line">
                        {review.comment}
                      </p>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-5 h-5 ${
                              star <= review.rating
                                ? "fill-accent text-accent"
                                : "fill-gray-300 text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;
