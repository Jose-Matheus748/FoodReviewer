import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, Plus, Star } from "lucide-react";
import logo from "@/assets/logo-foodreviewer.png";

// Tipo para avaliação
interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
}

// Tipo para informação nutricional
interface NutritionalInfo {
  item: string;
  quantidade: string;
  valorDiario: string;
}

const ProductDetails = () => {
  const { id } = useParams();

  // DADOS VAZIOS - serão preenchidos com dados do banco
  const [productData] = useState({
    name: "", // virá do banco de dados
    imageUrl: "/placeholder.svg", // virá do banco de dados
    ingredients: "", // virá do banco de dados
    averageRating: 0, // calculado com base nas avaliações
    labelImageUrl: "/placeholder.svg", // virá do banco de dados
  });

  const [nutritionalInfo] = useState<NutritionalInfo[]>([]); // virá do banco de dados

  const [reviews] = useState<Review[]>([]); // virá do banco de dados

  const [userName] = useState(""); // virá do banco de dados (usuário autenticado)

  // Função para renderizar estrelas
  const renderStars = (rating: number) => {
    return (
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
  };

  return (
    <div className="min-h-screen bg-[#d4d4d4]">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-secondary py-4 px-6 flex items-center justify-between shadow-lg">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="FoodReviewer Logo" className="w-10 h-10 object-contain" />
          <h1 className="text-2xl md:text-3xl font-bold text-accent">FoodReviewer</h1>
        </Link>
        <div className="flex items-center gap-2 text-white">
          <User className="w-6 h-6" />
          {userName && <span className="font-medium">{userName}</span>}
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Seção do Produto */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Imagem do Produto */}
            <div className="flex items-center justify-center bg-[#d4d4d4] rounded-lg p-4">
              <img
                src={productData.imageUrl}
                alt={productData.name}
                className="max-w-full h-auto object-contain max-h-64"
              />
            </div>

            {/* Informações do Produto */}
            <div className="md:col-span-2 space-y-4">
              {productData.name ? (
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {productData.name}
                </h2>
              ) : (
                <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              )}

              {productData.ingredients && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Ingredientes:</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {productData.ingredients}
                  </p>
                </div>
              )}

              {/* Avaliação Média */}
              <div className="pt-2">
                {renderStars(Math.round(productData.averageRating))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabela Nutricional - Só aparece se houver dados */}
        {nutritionalInfo.length > 0 && (
          <Card className="p-6 mb-6 bg-white shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Tabela nutricional</h3>
            <p className="text-sm text-gray-600 mb-4">Porção de 30G - 6 biscoitos</p>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-2 px-4 text-gray-700 font-semibold">ITEM</th>
                    <th className="text-left py-2 px-4 text-gray-700 font-semibold">QTDE. POR PORÇÃO</th>
                    <th className="text-left py-2 px-4 text-gray-700 font-semibold">VALORES DIÁRIOS</th>
                  </tr>
                </thead>
                <tbody>
                  {nutritionalInfo.map((info, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-700">{info.item}</td>
                      <td className="py-3 px-4 text-gray-700">{info.quantidade}</td>
                      <td className="py-3 px-4 text-gray-700">{info.valorDiario}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Seção de Avaliações */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 
              className="text-3xl font-bold text-accent" 
              style={{ 
                textShadow: '2px 2px 0 #8b009a, -1px -1px 0 #8b009a, 1px -1px 0 #8b009a, -1px 1px 0 #8b009a, 1px 1px 0 #8b009a'
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

          {/* Lista de Avaliações */}
          <div className="space-y-4">
            {reviews.length === 0 ? (
              <Card className="p-6 bg-white shadow-md">
                <p className="text-gray-600 text-center">
                  Esse produto não possui avaliações.
                </p>
              </Card>
            ) : (
              reviews.map((review) => (
                <Card key={review.id} className="p-5 bg-white shadow-md hover:shadow-lg transition-shadow">
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