import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const SearchBar = () => {
  return (
    <div className="relative w-full max-w-2xl mx-auto group">
      <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent to-primary rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
      <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 rounded-full blur-2xl opacity-50" />
      <div className="relative flex items-center bg-card/80 backdrop-blur-sm border-2 border-border rounded-full shadow-lg hover:shadow-xl hover:border-accent/50 transition-all duration-300">
        <Search className="ml-6 h-5 w-5 text-muted-foreground flex-shrink-0" />
        <Input
          type="text"
          placeholder="Digite o nome do produto que você deseja buscar..."
          className="border-0 bg-transparent px-4 py-6 text-base focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground"
        />
      </div>
    </div>
  );
};
