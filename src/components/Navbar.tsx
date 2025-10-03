import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, Menu, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Navbar = () => {
  const location = useLocation();
  const { cartCount, wishlist } = useCart();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Mobiles', path: '/products?category=mobiles' },
    { name: 'Laptops', path: '/products?category=laptops' },
    { name: 'Audio', path: '/products?category=headphones' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border/50 animate-fade-in-down">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Zap className="w-8 h-8 text-primary group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 drop-shadow-[0_0_8px_hsl(var(--primary))]" />
            <span className="text-2xl font-bold gradient-text group-hover:scale-105 transition-transform">TechVolt</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium transition-all duration-300 hover:text-primary hover:scale-110 ${
                  isActive(link.path) ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary glow-primary animate-slide-in" />
                )}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="relative hover:text-accent hover:scale-110 transition-all duration-300 group">
                <Heart className="w-5 h-5 group-hover:fill-accent transition-all" />
                {wishlist.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-accent animate-bounce-subtle">
                    {wishlist.length}
                  </Badge>
                )}
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative hover:text-primary hover:scale-110 transition-all duration-300 group">
                <ShoppingCart className="w-5 h-5 group-hover:animate-bounce-subtle" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-primary animate-pulse-glow">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`text-lg font-medium transition-colors hover:text-primary ${
                        isActive(link.path) ? 'text-primary' : 'text-foreground'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
