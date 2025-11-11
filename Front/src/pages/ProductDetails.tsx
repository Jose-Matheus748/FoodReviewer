import { Header } from "@/components/Header";
import { DecorativeBlobs } from "@/components/DecorativeBlobs";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, Plus, Star } from "lucide-react";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

// Interfaces de tipos definindo os dados que vao ser usados
interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
}

interface BackendReview {
  id: number;
  comentario?: string;
  nota: number;
  usuario?: {
    id: number;
    nome: string;
  };
}

interface NutritionalInfo {
  item: string;
  quantidade: string;
  valorDiario: string;
}

interface ProductData {
  id: number;
  nome: string;
  descricao: string;
  marca: string;
  preco: number;
  tipo: string;
  pesoGramas: number;
  densidade: number;
  averageRating?: number;
  ingredientes?: { id: number; nome: string }[];
  tabelaNutricional?: {
    id?: number;
    acucares?: number;
    calorias?: number;
    carboidratos?: number;
    fibras?: number;
    gordurasSaturadas?: number;
    gordurasTotais?: number;
    outros?: number;
    proteinas?: number;
    sodio?: number;
    produto_id?: number;
  };
}

// Componente principal
const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();

  const [productData, setProductData] = useState<ProductData | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função auxiliar para renderizar estrelas
  const renderStars = (rating: number) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-6 h-6 ${
            star <= Math.round(rating)
              ? "fill-accent text-accent"
              : "fill-gray-300 text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  // esse useEffect serve pra buscar produto e avaliações
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => { //fetch pega as informações do back
      try {
        const res = await fetch(`${API_BASE_URL}/produtos/${id}`);
        if (!res.ok) throw new Error("Erro ao buscar produto");
        const data = await res.json();
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
          ingredientes: data.ingredientes || [],
        });
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar o produto.");
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/reviews/produto/${id}`);
        if (res.ok) {
          const reviewsData: BackendReview[] = await res.json();
          setReviews(
            reviewsData.map((r) => ({
              id: r.id,
              userName: "Usuário Anônimo", //Aqui a gente pode colocara futuramente a função de nome aleatorios
              rating: r.nota / 2, //adaptando do backend
              comment: r.comentario || "",
            }))
          );
        }
      } catch (err) {
        console.error("Erro ao buscar avaliações:", err);
      }
    };

    fetchProduct();
    fetchReviews();
  }, [id]);

  // Condições de carregamento e erro
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

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Seção do produto */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Imagem */}
            <div className="flex items-center justify-center bg-[#d4d4d4] rounded-lg p-4">
              <img
                src={`${API_BASE_URL}/produtos/${id}/imagem`}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
                }}
                alt={productData.nome}
                className="max-w-full h-auto object-contain max-h-64 rounded-lg shadow-md"
              />
            </div>

            {/* Informações */}
            <div className="md:col-span-2 space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {productData.nome}
              </h2>

              {productData.descricao && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Descrição:</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {productData.descricao}
                  </p>
                </div>
              )}

              {productData.marca && (
                <p className="text-sm text-gray-700">
                  <strong>Marca:</strong> {productData.marca}
                </p>
              )}

              {productData.tipo && (
                <p className="text-sm text-gray-700">
                  <strong>Tipo:</strong> {productData.tipo}
                </p>
              )}

              {productData.preco && (
                <p className="text-sm text-gray-700">
                  <strong>Preço:</strong> R$ {productData.preco}
                </p>
              )}

              {(productData.pesoGramas || productData.densidade) && (
                <div className="flex flex-col md:flex-row gap-4">
                  {productData.pesoGramas && (
                    <p className="text-sm text-gray-700">
                      <strong>Peso:</strong> {productData.pesoGramas} g
                    </p>
                  )}
                  {productData.densidade && (
                    <p className="text-sm text-gray-700">
                      <strong>Densidade:</strong> {productData.densidade}
                    </p>
                  )}
                </div>
              )}

              {/* Avaliação média */}
              <div className="pt-2 flex flex-col items-start gap-2">
                {productData.averageRating && productData.averageRating > 0 ? (
                  <>
                    {renderStars(productData.averageRating)}
                    <p className="text-sm text-gray-700 font-medium">
                      Média:{" "}
                      <span className="text-accent font-semibold">
                        {productData.averageRating.toFixed(1)}
                      </span>{" "}
                      / 5 
                    </p>
                  </>
                ) : (
                  <>
                    {renderStars(0)}
                    <p className="text-sm text-gray-500 italic">
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
            <h3 className="text-xl font-bold text-gray-900 mb-4">Tabela Nutricional</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>Calorias: {productData.tabelaNutricional.calorias}</li>
              <li>Proteínas: {productData.tabelaNutricional.proteinas} g</li>
              <li>Carboidratos: {productData.tabelaNutricional.carboidratos} g</li>
              <li>Gorduras saturadas: {productData.tabelaNutricional.gordurasSaturadas} g</li>
              <li>Gorduras totais: {productData.tabelaNutricional.gordurasTotais} g</li>
              <li>Fibras: {productData.tabelaNutricional.fibras} g</li>
              <li>Açúcares: {productData.tabelaNutricional.acucares} g</li>
              <li>Sódio: {productData.tabelaNutricional.sodio} g</li>
            </ul>
          </div>//voces acham que seria melhor diminuir o tamanho desse card?
        )}

        {/* Ingredientes */}
        {productData.ingredientes && productData.ingredientes.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Ingredientes</h3>
            <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
              {productData.ingredientes.map((ing) => (
                <li key={ing.id}>{ing.nome}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Avaliações */}
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
                      <h4 className="font-semibold text-primary text-lg mb-1">
                        {review.userName}: {/*Sempre vai retornar "usuario anônimo" mas futuramente poedmos criar nomes aleatorios */}
                      </h4>
                      <p className="text-gray-700 mb-3 leading-relaxed whitespace-pre-line">
                        {review.comment}
                      </p>
                      {renderStars(review.rating)}
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
