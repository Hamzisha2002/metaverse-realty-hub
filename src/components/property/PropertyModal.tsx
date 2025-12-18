import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Users, TrendingUp, ExternalLink, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMetaverseStore } from '@/store/metaverseStore';
import { Badge } from '@/components/ui/badge';

export const PropertyModal = () => {
  const { selectedProperty, showPropertyModal, setShowPropertyModal, isWalletConnected, purchaseProperty } = useMetaverseStore();

  if (!selectedProperty) return null;

  const handlePurchase = () => {
    if (isWalletConnected) {
      purchaseProperty(selectedProperty.id);
      setShowPropertyModal(false);
    }
  };

  const buildingTypeColors: Record<string, string> = {
    residential: 'bg-secondary/20 text-secondary border-secondary/30',
    commercial: 'bg-primary/20 text-primary border-primary/30',
    mixed: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    landmark: 'bg-accent/20 text-accent border-accent/30',
  };

  return (
    <AnimatePresence>
      {showPropertyModal && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={() => setShowPropertyModal(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', bounce: 0.3 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg"
          >
            <div className="glass-card-glow p-6 mx-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-display text-2xl text-foreground">{selectedProperty.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground text-sm">{selectedProperty.location}</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setShowPropertyModal(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex gap-2 mb-4">
                <Badge className={buildingTypeColors[selectedProperty.buildingType]}>
                  {selectedProperty.buildingType}
                </Badge>
                {selectedProperty.isForSale && (
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    For Sale
                  </Badge>
                )}
              </div>

              <p className="text-muted-foreground mb-6">{selectedProperty.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="glass-card p-4 text-center">
                  <span className="text-3xl font-display gradient-text-gold">
                    {selectedProperty.priceInSol}
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">SOL</span>
                  <p className="text-xs text-muted-foreground mt-1">
                    ${selectedProperty.price.toLocaleString()}
                  </p>
                </div>
                <div className="glass-card p-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Users className="w-5 h-5 text-secondary" />
                    <span className="text-2xl font-display text-foreground">
                      {selectedProperty.fractionalShares}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    of {selectedProperty.totalShares} shares sold
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-display text-sm text-muted-foreground mb-2">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProperty.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 bg-muted rounded-full text-xs text-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {selectedProperty.owner && (
                <div className="glass-card p-3 mb-6 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Current Owner</span>
                  <span className="font-mono text-sm text-primary">{selectedProperty.owner}</span>
                </div>
              )}

              <div className="flex gap-3">
                {selectedProperty.isForSale && (
                  <Button
                    variant="glow"
                    className="flex-1"
                    onClick={handlePurchase}
                    disabled={!isWalletConnected}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {isWalletConnected ? 'Purchase Property' : 'Connect Wallet to Buy'}
                  </Button>
                )}
                <Button variant="outline" className="flex-1">
                  <TrendingUp className="w-4 h-4" />
                  Buy Shares
                </Button>
              </div>

              <Button variant="ghost" className="w-full mt-3 gap-2">
                <ExternalLink className="w-4 h-4" />
                View on Solana Explorer
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
