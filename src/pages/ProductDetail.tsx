import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, ArrowLeft, Package, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { products } from '@/data/products';
import Product3DViewer from '@/components/Product3DViewer';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Product Not Found</h1>
          <Link to="/products">
            <Button className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link to="/products">
          <Button variant="ghost" className="gap-2 mb-8 hover:text-primary">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image & 3D Viewer */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur">
              <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-square object-cover"
              />
            </Card>
            
            {/* 3D Viewer */}
            <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur p-4">
              <h3 className="text-lg font-semibold mb-4">Interactive 3D View</h3>
              <Product3DViewer color="#00f0ff" />
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Drag to rotate • Scroll to zoom
              </p>
            </Card>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <Badge variant="secondary">{product.category}</Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold">{product.name}</h1>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-primary text-primary'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <p className="text-lg text-muted-foreground">{product.description}</p>

              <div className="text-5xl font-bold gradient-text">${product.price}</div>

              {/* Actions */}
              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="flex-1 gap-2 glow-primary"
                  onClick={() => {
                    addToCart(product);
                    toast.success('Added to cart', {
                      description: `${product.name} has been added to your cart`,
                    });
                  }}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
                <Button
                  size="lg"
                  variant={inWishlist ? 'default' : 'outline'}
                  className={`gap-2 ${inWishlist ? 'glow-accent' : 'border-border/50 hover:border-accent'}`}
                  onClick={() => toggleWishlist(product)}
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
                  {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                </Button>
              </div>

              {/* Stock Status */}
              {product.inStock && (
                <div className="flex items-center gap-2 text-sm text-primary">
                  <Package className="w-4 h-4" />
                  <span>In Stock - Ready to Ship</span>
                </div>
              )}
            </div>

            <Separator />

            {/* Specifications */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Specifications</h2>
              <div className="grid grid-cols-1 gap-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between items-center p-3 rounded-lg glass"
                  >
                    <span className="font-medium">{key}</span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Features */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg glass text-center space-y-2">
                  <Zap className="w-8 h-8 text-primary mx-auto" />
                  <p className="text-sm font-medium">Fast Performance</p>
                </div>
                <div className="p-4 rounded-lg glass text-center space-y-2">
                  <Shield className="w-8 h-8 text-secondary mx-auto" />
                  <p className="text-sm font-medium">Secure & Private</p>
                </div>
                <div className="p-4 rounded-lg glass text-center space-y-2">
                  <Package className="w-8 h-8 text-accent mx-auto" />
                  <p className="text-sm font-medium">Premium Quality</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
