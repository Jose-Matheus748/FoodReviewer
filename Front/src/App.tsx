import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import ProductDetails from "./pages/ProductDetails";
import CreateReview from "./pages/CreateReview";
import NotFound from "./pages/NotFound";
import UpdateReview from "./pages/UpdateReview";
import CreateAdmin from "./pages/CreateAdmin";
import CadastroProduto from "./pages/CadastroProduto";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/produto/:id" element={<ProductDetails />} />
          <Route path="/produto/:id/avaliar" element={<CreateReview />} />
        <Route path="/cadastro-produto" element={<CadastroProduto />} />

          {/* Rota para edição da avaliação */}
          <Route path="/produto/:id/avaliar/:reviewId" element={<UpdateReview />} />
          <Route path="/admin/cadastrar" element={<CreateAdmin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
