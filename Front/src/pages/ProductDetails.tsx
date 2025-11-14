import { Header } from "@/components/Header";
import { DecorativeBlobs } from "@/components/DecorativeBlobs";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, Plus, Star, Edit, Trash } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

// Interfaces de tipos definindo os dados que vao ser usados
interface Review {
  id: number;
  userName: string;
  userId: number | null;
  rating: number;
  comment: string;
}

interface BackendReview {
  id: number;
  nota: number;
  comentario?: string;
  usuarioId: number | null;
  usuarioNome: string;
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

  const { usuario } = useAuth();

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
              userId: r.usuarioId,
              userName: r.usuarioNome,
              rating: r.nota / 2,
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

  console.log("Usuário logado:", usuario);
  console.log("Reviews carregadas:", reviews);
  const userAlreadyReviewed = usuario
  ? reviews.some((r) => r.userId === usuario.id)
  : false;

  const handleDeleteReview = async (reviewId: number) => {
    try {
      const res = await fetch(`${API_BASE_URL}/reviews/${reviewId}?usuarioId=${usuario?.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao deletar avaliação");

      // Atualiza lista localmente: filtra a review deletada
      setReviews((prev) => prev.filter(r => r.id !== reviewId));

      // Recarrega os dados do produto (para atualizar averageRating)
      const prodRes = await fetch(`${API_BASE_URL}/produtos/${id}`);
      if (prodRes.ok) {
        const prodData = await prodRes.json();
        setProductData(prev => prev ? { ...prev, averageRating: prodData.averageRating } : prev);
      }
    } catch (err) {
      console.error("Erro ao deletar review:", err);
    }
  };

  // Renderização principal
  return (
  <div className="min-h-screen relative flex flex-col bg-gradient-to-br from-[#f4f4f4] via-[#eaeaea] to-[#d8d8d8] overflow-hidden">
    {/* Efeitos decorativos de fundo */}
    <div
      className="absolute inset-0 opacity-30 pointer-events-none"
      style={{
        backgroundImage:
          "radial-gradient(circle at 2px 2px, rgba(124, 58, 237, 0.08) 1px, transparent 0)",
        backgroundSize: "40px 40px",
      }}
    />
    <div className="absolute top-0 left-0 w-[600px] h-[600px] -translate-x-1/3 -translate-y-1/3 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/25 via-accent/15 to-transparent rounded-full blur-3xl animate-pulse" />
    </div>
    <div className="absolute bottom-0 right-0 w-[650px] h-[650px] translate-x-1/3 translate-y-1/3 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-tl from-primary/25 via-primary/15 to-transparent rounded-full blur-3xl animate-pulse" />
    </div>

    {/* Cabeçalho */}
    <Header />

    {/* Conteúdo principal */}
    <main className="relative z-10 container mx-auto px-4 py-10 max-w-6xl">
      {/* Card principal do produto */}
      <div className="bg-gradient-to-br from-white/90 via-white/80 to-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 mb-8 border border-primary/10 hover:shadow-primary/30 transition-all">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Imagem do produto */}
          <div className="flex items-center justify-center bg-white/60 rounded-xl p-4 shadow-inner border border-gray-200">
            <img
              src={`${API_BASE_URL}/produtos/${id}/imagem`}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
              }}
              alt={productData.nome}
              className="max-w-full h-auto object-contain max-h-64 rounded-lg"
            />
          </div>

          {/* Informações do produto */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-3xl font-bold text-primary drop-shadow">
              {productData.nome}
            </h2>

            {productData.descricao && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Descrição</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {productData.descricao}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700">
              {productData.marca && (
                <p>
                  <strong>Marca:</strong> {productData.marca}
                </p>
              )}
              {productData.tipo && (
                <p>
                  <strong>Tipo:</strong> {productData.tipo}
                </p>
              )}
              {productData.preco && (
                <p>
                  <strong>Preço Médio:</strong>{" "}
                  <span className="text-accent font-semibold">
                    R$ {productData.preco.toFixed(2)}
                  </span>
                </p>
              )}
              {productData.pesoGramas && (
                <p>
                  <strong>Peso:</strong> {productData.pesoGramas} g
                </p>
              )}
              {productData.densidade && (
                <p>
                  <strong>Densidade:</strong> {productData.densidade}
                </p>
              )}
            </div>

            {/* Avaliação média */}
            <div className="pt-3 flex flex-col items-start gap-2">
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
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          <h3 className="text-xl font-bold text-primary mb-4">Tabela Nutricional</h3>
          <ul className="text-sm text-gray-700 grid grid-cols-2 sm:grid-cols-3 gap-y-2">
            <li>Calorias: {productData.tabelaNutricional.calorias}</li>
            <li>Proteínas: {productData.tabelaNutricional.proteinas} g</li>
            <li>Carboidratos: {productData.tabelaNutricional.carboidratos} g</li>
            <li>Gorduras Saturadas: {productData.tabelaNutricional.gordurasSaturadas} g</li>
            <li>Gorduras Totais: {productData.tabelaNutricional.gordurasTotais} g</li>
            <li>Fibras: {productData.tabelaNutricional.fibras} g</li>
            <li>Açúcares: {productData.tabelaNutricional.acucares} g</li>
            <li>Sódio: {productData.tabelaNutricional.sodio} g</li>
          </ul>
        </div>
      )}

      {/* Ingredientes */}
      {productData.ingredientes && productData.ingredientes.length > 0 && (
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          <h3 className="text-xl font-bold text-primary mb-4">Ingredientes</h3>
          <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
            {productData.ingredientes.map((ing) => (
              <li key={ing.id}>{ing.nome}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Avaliações */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2
            className="text-3xl font-bold text-accent"
            style={{
              textShadow:
                "2px 2px 0 #8b009a, -1px -1px 0 #8b009a, 1px -1px 0 #8b009a, -1px 1px 0 #8b009a",
            }}
          >
            Avaliações
          </h2>
          {usuario ? (
            userAlreadyReviewed ? (
              <Button
                size="icon"
                disabled
                title="Você já avaliou este produto"
                className="rounded-full bg-gray-300 text-gray-500 cursor-not-allowed"
              >
                <Plus className="w-6 h-6" />
              </Button>
            ) : (
              <Link to={`/produto/${id}/avaliar`}>
                <Button
                  size="icon"
                  className="rounded-full bg-accent hover:bg-accent/90 text-white shadow-lg transition-all hover:scale-110"
                >
                  <Plus className="w-6 h-6" />
                </Button>
              </Link>
            )
          ) : (
            <Button
              size="icon"
              disabled
              title="Faça login para avaliar"
              className="rounded-full bg-gray-300 text-gray-500 cursor-not-allowed"
            >
              <Plus className="w-6 h-6" />
            </Button>
          )}
        </div>

        {reviews.length === 0 ? (
          <Card className="p-6 bg-white/80 backdrop-blur-md shadow-md border border-gray-200">
            <p className="text-gray-600 text-center">
              Esse produto ainda não possui avaliações.
            </p>
          </Card>
        ) : (
          <div className="grid gap-5">
            {reviews.map((review) => (
              <Card
                key={review.id}
                className="p-5 bg-white/80 backdrop-blur-md border border-gray-200 shadow-md hover:shadow-accent/30 transition-shadow rounded-xl relative"
              >
                {usuario && review.userId === usuario.id && (
                  <div className="absolute top-4 right-4 flex gap-2">
                  
                    {/* botao pra editar review */}
                    <Link to={`/produto/${id}/avaliar/${review.id}`}>
                      <button className="p-2 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent transition-all hover:scale-110">
                        <Edit className="w-5 h-5" />
                      </button>
                    </Link>

                    {/* botao de excluir review */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition-all hover:scale-110">
                          <Trash className="w-5 h-5" />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Excluir avaliação?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta ação é permanente e não poderá ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteReview(review.id)}
                            className="bg-red-600 text-white hover:bg-red-700">
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <User className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-primary text-lg mb-1">
                      {review.userName}
                    </h4>
                    <p className="text-gray-700 mb-3 leading-relaxed whitespace-pre-line">
                      {review.comment}
                    </p>
                    {renderStars(review.rating)}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  </div>
);

};

export default ProductDetails;