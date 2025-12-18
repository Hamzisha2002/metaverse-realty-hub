import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Coins, Shield, Users, Zap, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { MetaverseScene } from '@/components/metaverse/MetaverseScene';

const features = [
  {
    icon: Building2,
    title: 'Karachi Properties',
    description: 'Own prime digital land representing real Karachi real estate',
  },
  {
    icon: Coins,
    title: 'NFT Tokenization',
    description: 'Every property is a unique NFT on the blockchain',
  },
  {
    icon: Users,
    title: 'Fractional Ownership',
    description: 'Invest in premium properties with fractional shares',
  },
  {
    icon: Shield,
    title: 'Secure Transactions',
    description: 'Smart contract powered purchases with full transparency',
  },
  {
    icon: Zap,
    title: 'Instant Settlement',
    description: 'Lightning-fast transactions on blockchain network',
  },
  {
    icon: Globe,
    title: '3D Exploration',
    description: 'Walk through properties in our immersive 3D world',
  },
];

const stats = [
  { value: 'PKR 50Cr+', label: 'Total Volume' },
  { value: '2,847', label: 'Properties Listed' },
  { value: '15,200+', label: 'Active Users' },
  { value: '99.9%', label: 'Uptime' },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <Navbar transparent />
      
      {/* Hero Section with 3D Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Metaverse Background */}
        <div className="absolute inset-0 z-0">
          <MetaverseScene isBackground />
          {/* Gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/90" />
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 glass-card mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-muted-foreground">Pakistan's Decentralized Metaverse Real Estate Platform</span>
            </motion.div>

            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text-primary">RealtyOneX</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Own, explore, and invest in Karachi's tokenized real estate — inside the metaverse
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/metaverse">
                <Button variant="glow" size="xl" className="gap-2 w-full sm:w-auto">
                  Enter Metaverse
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/properties">
                <Button variant="outline" size="xl" className="gap-2 w-full sm:w-auto bg-background/50 backdrop-blur-sm">
                  Explore Karachi Properties
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="font-display text-3xl font-bold gradient-text-gold">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-muted-foreground">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-primary rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative grid-pattern">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl font-bold mb-4">
              <span className="gradient-text-primary">Why Choose</span>{' '}
              <span className="text-foreground">RealtyOneX?</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the next generation of real estate investment with blockchain security
              and immersive virtual experiences.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 group hover:border-primary/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card-glow p-12 text-center max-w-4xl mx-auto"
          >
            <h2 className="font-display text-4xl font-bold mb-4 text-foreground">
              Ready to Invest in Karachi's Digital Future?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Connect your wallet and start exploring premium virtual real estate opportunities in Pakistan today.
            </p>
            <Link to="/metaverse">
              <Button variant="glow" size="xl" className="gap-2">
                Start Exploring
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 RealtyOneX. Final Year Project - Pakistan's Decentralized Metaverse Real Estate Platform
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;