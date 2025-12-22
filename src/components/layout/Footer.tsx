import { Building2, Twitter, Linkedin, Github, Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
    alert('Thank you for subscribing! (Mock)');
  };

  const footerLinks = {
    Products: [
      { label: 'Metaverse', href: '/metaverse' },
      { label: 'Properties', href: '/properties' },
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Tokenization', href: '#' },
    ],
    Resources: [
      { label: 'Documentation', href: '#' },
      { label: 'Whitepaper', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Support', href: '#' },
    ],
  };

  return (
    <footer className="bg-card/50 border-t border-border/50 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Left: Logo + Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg font-bold gradient-text-primary">
                  RealityOneX
                </span>
                <span className="text-xs text-muted-foreground -mt-1">
                  Metaverse Real Estate
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Revolutionizing real estate investment through blockchain tokenization 
              and immersive metaverse experiences.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-muted/50 hover:bg-primary/10 flex items-center justify-center transition-colors group"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-muted/50 hover:bg-primary/10 flex items-center justify-center transition-colors group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-muted/50 hover:bg-primary/10 flex items-center justify-center transition-colors group"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h3 className="font-display text-sm font-semibold text-foreground mb-4">
              Products
            </h3>
            <ul className="space-y-3">
              {footerLinks.Products.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="font-display text-sm font-semibold text-foreground mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.Resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Newsletter */}
          <div>
            <h3 className="font-display text-sm font-semibold text-foreground mb-4">
              Newsletter
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Stay updated with the latest property listings and investment opportunities.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-background/50 border-border/50"
                  required
                />
                <Button
                  type="submit"
                  variant="default"
                  size="icon"
                  className="shrink-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} RealityOneX. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

