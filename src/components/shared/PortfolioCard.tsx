import { motion } from 'framer-motion';

interface PortfolioCardProps {
  title: string;
  description: string;
  category: string;
  image?: string;
  index: number;
}

export const PortfolioCard = ({ title, description, category, image, index }: PortfolioCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-secondary overflow-hidden mb-4">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover grayscale transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <span className="text-4xl font-bold opacity-20">{title.charAt(0)}</span>
          </div>
        )}
        
        {/* Category Badge */}
        <span className="absolute top-4 left-4 px-3 py-1 bg-background text-foreground text-xs font-medium">
          {category}
        </span>
      </div>

      {/* Content */}
      <h4 className="heading-sm mb-2 group-hover:opacity-70 transition-opacity">{title}</h4>
      <p className="text-muted-foreground text-sm">{description}</p>
    </motion.div>
  );
};
