import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <Card className="group relative overflow-hidden bg-card/60 backdrop-blur-sm hover:bg-card/80 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-border hover:border-accent/30">
      <div className="flex items-center gap-6 p-6">
        <div className="flex-shrink-0 w-24 h-24 rounded-2xl bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <img src={icon} alt={title} className="w-16 h-16 object-contain" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </Card>
  );
};
