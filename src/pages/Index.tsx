import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cart, setCart] = useState<CartItem[]>([]);

  const products: Product[] = [
    {
      id: 1,
      name: 'Модульный диван Oslo',
      price: 89900,
      category: 'sofas',
      image: 'https://cdn.poehali.dev/projects/46ddac88-416a-43b8-b383-42029bd0bb0e/files/23cf28c8-395a-4b5c-9eae-70560212aa41.jpg'
    },
    {
      id: 2,
      name: 'Обеденный стол Nord',
      price: 45900,
      category: 'tables',
      image: 'https://cdn.poehali.dev/projects/46ddac88-416a-43b8-b383-42029bd0bb0e/files/467dbe65-96d7-45d7-987a-cc6da19f5ad5.jpg'
    },
    {
      id: 3,
      name: 'Стул Loft',
      price: 12900,
      category: 'chairs',
      image: 'https://cdn.poehali.dev/projects/46ddac88-416a-43b8-b383-42029bd0bb0e/files/ed64f49c-7544-4b14-b209-c4db9c224af0.jpg'
    },
    {
      id: 4,
      name: 'Диван Copenhagen',
      price: 95900,
      category: 'sofas',
      image: 'https://cdn.poehali.dev/projects/46ddac88-416a-43b8-b383-42029bd0bb0e/files/23cf28c8-395a-4b5c-9eae-70560212aa41.jpg'
    },
    {
      id: 5,
      name: 'Журнальный столик Minimal',
      price: 18900,
      category: 'tables',
      image: 'https://cdn.poehali.dev/projects/46ddac88-416a-43b8-b383-42029bd0bb0e/files/467dbe65-96d7-45d7-987a-cc6da19f5ad5.jpg'
    },
    {
      id: 6,
      name: 'Кресло Relax',
      price: 34900,
      category: 'chairs',
      image: 'https://cdn.poehali.dev/projects/46ddac88-416a-43b8-b383-42029bd0bb0e/files/ed64f49c-7544-4b14-b209-c4db9c224af0.jpg'
    }
  ];

  const categories = [
    { id: 'all', name: 'Все' },
    { id: 'sofas', name: 'Диваны' },
    { id: 'tables', name: 'Столы' },
    { id: 'chairs', name: 'Стулья' }
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-heading font-bold text-foreground">NORDIC</h1>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-accent">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle className="font-heading">Корзина</SheetTitle>
              </SheetHeader>
              
              <div className="mt-8 flex flex-col h-full">
                {cart.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center text-muted-foreground">
                    Корзина пуста
                  </div>
                ) : (
                  <>
                    <div className="flex-1 overflow-auto space-y-4">
                      {cart.map(item => (
                        <div key={item.id} className="flex gap-4 p-4 bg-secondary rounded-lg">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium text-sm">{item.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {item.price.toLocaleString('ru-RU')} ₽
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Icon name="Minus" size={12} />
                              </Button>
                              <span className="text-sm w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Icon name="Plus" size={12} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 ml-auto"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Icon name="Trash2" size={12} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t pt-4 mt-4 space-y-4">
                      <div className="flex justify-between text-lg font-heading font-semibold">
                        <span>Итого:</span>
                        <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
                      </div>
                      <Button className="w-full" size="lg">
                        Оформить заказ
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Скандинавская мебель для вашего дома
          </h2>
          <p className="text-lg text-muted-foreground">
            Минимализм, функциональность и качество в каждой детали
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-12 animate-fade-in">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.id)}
              className="transition-all"
            >
              {category.name}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <Card
              key={product.id}
              className="group overflow-hidden transition-all hover:shadow-lg animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-square overflow-hidden bg-secondary">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-lg mb-2">
                  {product.name}
                </h3>
                <p className="text-2xl font-heading font-bold text-accent mb-4">
                  {product.price.toLocaleString('ru-RU')} ₽
                </p>
                <Button
                  className="w-full"
                  onClick={() => addToCart(product)}
                >
                  <Icon name="ShoppingCart" size={18} className="mr-2" />
                  В корзину
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <footer className="bg-secondary mt-20 py-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="font-heading">© 2024 NORDIC. Скандинавская мебель</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
