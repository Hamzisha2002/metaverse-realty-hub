import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { useMetaverseStore } from '@/store/metaverseStore';
import { MapPin, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Properties = () => {
  const { properties, selectProperty } = useMetaverseStore();

  const buildingTypeColors: Record<string, string> = {
    residential: 'bg-secondary/20 text-secondary border-secondary/30',
    commercial: 'bg-primary/20 text-primary border-primary/30',
    mixed: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    landmark: 'bg-accent/20 text-accent border-accent/30',
    plot: 'bg-green-500/20 text-green-400 border-green-500/30',
  };

  const statusColors: Record<string, string> = {
    Available: 'bg-green-500/20 text-green-400 border-green-500/30',
    Sold: 'bg-red-500/20 text-red-400 border-red-500/30',
    Reserved: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  };

  return (
    <div className="min-h-screen bg-background grid-pattern">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-display text-4xl font-bold mb-4">
            <span className="gradient-text-primary">Karachi</span>{' '}
            <span className="text-foreground">Properties</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Browse and invest in premium  real estate. Each property is tokenized 
            on the blockchain with full ownership rights.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {['All', 'Residential', 'Commercial', 'Plot', 'Available', 'Sold'].map((filter) => (
            <Button
              key={filter}
              variant={filter === 'All' ? 'default' : 'outline'}
              size="sm"
            >
              {filter}
            </Button>
          ))}
        </motion.div>

        {/* Property grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="glass-card overflow-hidden group"
            >
              {/* Property preview */}
              <div 
                className="h-48 relative overflow-hidden"
                style={{ 
                  background: `linear-gradient(135deg, ${property.color}20, ${property.color}40)` 
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-20 h-32 rounded-lg shadow-2xl transform group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundColor: property.color }}
                  />
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge className={buildingTypeColors[property.buildingType]}>
                    {property.buildingType}
                  </Badge>
                </div>
                <div className="absolute top-4 left-4">
                  <Badge className={statusColors[property.status]}>
                    {property.status}
                  </Badge>
                </div>
              </div>

              {/* Property info */}
              <div className="p-6">
                <h3 className="font-display text-xl text-foreground mb-2">{property.name}</h3>
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{property.location}</span>
                </div>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {property.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="font-display text-2xl gradient-text-gold">
                      {property.priceInPKR}
                    </span>
                    <p className="text-xs text-muted-foreground">
                      {property.priceInSol} SOL
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-secondary">
                      <Users className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {property.fractionalShares}/{property.totalShares}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">shares sold</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="glow"
                    className="flex-1"
                    onClick={() => selectProperty(property)}
                  >
                    View Details
                  </Button>
                  <Button variant="outline" size="icon">
                    <TrendingUp className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Properties;