import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "@/assets/logo-foodreviewer.png";

export const Header = () => {
  return (
    <header className="w-full border-b border-border/40 bg-background/60 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="FoodReviewer Logo" className="w-12 h-12 object-contain" />
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
            FoodReviewer
          </h1>
        </div>
        <Link to="/login">
          <Button 
            variant="default" 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 shadow-md hover:shadow-lg transition-all"
          >
            Login
          </Button>
        </Link>
      </div>
    </header>
  );
};
