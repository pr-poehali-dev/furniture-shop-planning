import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const { toast } = useToast();

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

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Сообщение отправлено!",
      description: "Мы свяжемся с вами в ближайшее время.",
    });
    setContactForm({ name: '', email: '', message: '' });
  };

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Icon name="Menu" size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <SheetHeader>
                  <SheetTitle className="font-heading text-left">Меню</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-8">
                  <a href="#" className="text-lg hover:text-accent transition-colors" onClick={() => setIsMenuOpen(false)}>
                    Главная
                  </a>
                  <a href="#catalog" className="text-lg hover:text-accent transition-colors" onClick={() => setIsMenuOpen(false)}>
                    Каталог
                  </a>
                  <a href="#about" className="text-lg hover:text-accent transition-colors" onClick={() => setIsMenuOpen(false)}>
                    О нас
                  </a>
                  <a href="#delivery" className="text-lg hover:text-accent transition-colors" onClick={() => setIsMenuOpen(false)}>
                    Доставка
                  </a>
                  <a href="#contacts" className="text-lg hover:text-accent transition-colors" onClick={() => setIsMenuOpen(false)}>
                    Контакты
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
            
            <a href="#" className="text-2xl font-heading font-bold text-foreground hover:text-accent transition-colors">NORDIC</a>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm hover:text-accent transition-colors">Главная</a>
            <a href="#catalog" className="text-sm hover:text-accent transition-colors">Каталог</a>
            <a href="#about" className="text-sm hover:text-accent transition-colors">О нас</a>
            <a href="#delivery" className="text-sm hover:text-accent transition-colors">Доставка</a>
            <a href="#contacts" className="text-sm hover:text-accent transition-colors">Контакты</a>
          </nav>
          
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
                      <Button className="w-full" size="lg" onClick={handleCheckout}>
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

      <section id="about" className="bg-secondary py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="animate-fade-in">
              <img
                src="https://cdn.poehali.dev/projects/46ddac88-416a-43b8-b383-42029bd0bb0e/files/a5ce9da8-9ba8-4cde-a323-91dbbcb3fe46.jpg"
                alt="О нас"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="animate-fade-in space-y-6">
              <h2 className="text-4xl font-heading font-bold">О нас</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                NORDIC — это больше, чем просто мебельный магазин. Мы создаём пространства для жизни, вдохновлённые скандинавской философией уюта и простоты.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Каждый предмет в нашем каталоге выбран с заботой о качестве, функциональности и экологичности. Мы работаем только с проверенными производителями из Скандинавии и Европы.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Award" size={24} className="text-accent" />
                    <h3 className="font-heading font-semibold">Качество</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Гарантия 5 лет на всю продукцию</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Leaf" size={24} className="text-accent" />
                    <h3 className="font-heading font-semibold">Экология</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Натуральные материалы</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="delivery" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-heading font-bold text-center mb-12 animate-fade-in">Доставка</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-6 animate-fade-in">
                <div className="flex justify-center mb-4">
                  <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center">
                    <Icon name="Truck" size={32} className="text-accent" />
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-3">По Москве</h3>
                <p className="text-muted-foreground mb-2">Бесплатная доставка</p>
                <p className="text-sm text-muted-foreground">При заказе от 30 000 ₽</p>
              </Card>
              
              <Card className="text-center p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="flex justify-center mb-4">
                  <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center">
                    <Icon name="Package" size={32} className="text-accent" />
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-3">По России</h3>
                <p className="text-muted-foreground mb-2">Транспортная компания</p>
                <p className="text-sm text-muted-foreground">Расчёт при оформлении</p>
              </Card>
              
              <Card className="text-center p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="flex justify-center mb-4">
                  <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center">
                    <Icon name="Home" size={32} className="text-accent" />
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-3">Подъём и сборка</h3>
                <p className="text-muted-foreground mb-2">Профессиональная команда</p>
                <p className="text-sm text-muted-foreground">Доступно при оформлении</p>
              </Card>
            </div>
            
            <div className="mt-12 p-8 bg-secondary rounded-lg animate-fade-in">
              <div className="flex items-start gap-4">
                <Icon name="Clock" size={24} className="text-accent mt-1" />
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-2">Время доставки</h3>
                  <p className="text-muted-foreground">
                    Доставка по Москве осуществляется в течение 1-3 рабочих дней. 
                    По России — от 3 до 14 дней в зависимости от региона. 
                    Мы свяжемся с вами для уточнения удобного времени.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Каталог
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

      <footer id="contacts" className="bg-primary text-primary-foreground mt-20 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-heading font-bold text-xl mb-4">NORDIC</h3>
                <p className="text-primary-foreground/80 mb-4">
                  Скандинавская мебель для вашего дома
                </p>
              </div>
              
              <div>
                <h3 className="font-heading font-semibold mb-4">Режим работы</h3>
                <div className="space-y-2 text-primary-foreground/80">
                  <p>Пн-Пт: 10:00 - 20:00</p>
                  <p>Сб-Вс: 11:00 - 19:00</p>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <h3 className="font-heading font-semibold mb-4">Контакты</h3>
                <div className="space-y-3 text-primary-foreground/80">
                  <div className="flex items-center gap-2">
                    <Icon name="Phone" size={18} />
                    <span>+7 (495) 123-45-67</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Mail" size={18} />
                    <span>hello@nordic.ru</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="MapPin" size={18} />
                    <span>Москва, ул. Примерная, 1</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-heading font-semibold mb-4">Свяжитесь с нами</h3>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder="Ваше имя"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                    className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                    className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Ваше сообщение"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    required
                    className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 min-h-[100px]"
                  />
                </div>
                <Button type="submit" variant="secondary" className="w-full">
                  Отправить
                </Button>
              </form>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-primary-foreground/60">
            <p>© 2024 NORDIC. Все права защищены</p>
          </div>
        </div>
      </footer>
      
      <Sheet open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="font-heading text-2xl">Оформление заказа</SheetTitle>
          </SheetHeader>
          
          <div className="mt-8 space-y-8">
            <div>
              <h3 className="font-heading font-semibold text-lg mb-4">Ваш заказ</h3>
              <div className="space-y-3">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} × {item.quantity}</span>
                    <span className="font-semibold">{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</span>
                  </div>
                ))}
                <div className="border-t pt-3 flex justify-between font-heading font-bold">
                  <span>Итого:</span>
                  <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>
            </div>
            
            <form className="space-y-6" onSubmit={(e) => {
              e.preventDefault();
              toast({
                title: "Заказ оформлен!",
                description: "Мы свяжемся с вами для подтверждения.",
              });
              setCart([]);
              setIsCheckoutOpen(false);
            }}>
              <div>
                <h3 className="font-heading font-semibold text-lg mb-4">Контактные данные</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="checkout-name">Имя *</Label>
                    <Input id="checkout-name" required placeholder="Иван Иванов" />
                  </div>
                  <div>
                    <Label htmlFor="checkout-phone">Телефон *</Label>
                    <Input id="checkout-phone" type="tel" required placeholder="+7 (999) 123-45-67" />
                  </div>
                  <div>
                    <Label htmlFor="checkout-email">Email *</Label>
                    <Input id="checkout-email" type="email" required placeholder="example@mail.com" />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-heading font-semibold text-lg mb-4">Доставка</h3>
                <RadioGroup defaultValue="moscow" className="space-y-4">
                  <div className="flex items-start space-x-3 p-4 border rounded-lg">
                    <RadioGroupItem value="moscow" id="moscow" className="mt-1" />
                    <Label htmlFor="moscow" className="flex-1 cursor-pointer">
                      <div className="font-semibold mb-1">Доставка по Москве</div>
                      <div className="text-sm text-muted-foreground">Бесплатно при заказе от 30 000 ₽</div>
                      <div className="text-sm text-muted-foreground">Срок: 1-3 рабочих дня</div>
                    </Label>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-4 border rounded-lg">
                    <RadioGroupItem value="russia" id="russia" className="mt-1" />
                    <Label htmlFor="russia" className="flex-1 cursor-pointer">
                      <div className="font-semibold mb-1">Доставка по России</div>
                      <div className="text-sm text-muted-foreground">Транспортная компания</div>
                      <div className="text-sm text-muted-foreground">Срок: 3-14 рабочих дней</div>
                    </Label>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-4 border rounded-lg">
                    <RadioGroupItem value="pickup" id="pickup" className="mt-1" />
                    <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                      <div className="font-semibold mb-1">Самовывоз</div>
                      <div className="text-sm text-muted-foreground">Москва, ул. Примерная, 1</div>
                      <div className="text-sm text-muted-foreground">Бесплатно</div>
                    </Label>
                  </div>
                </RadioGroup>
                
                <div className="mt-4">
                  <Label htmlFor="address">Адрес доставки *</Label>
                  <Textarea 
                    id="address" 
                    required 
                    placeholder="Улица, дом, квартира"
                    className="mt-2"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="comment">Комментарий к заказу</Label>
                <Textarea 
                  id="comment" 
                  placeholder="Пожелания по доставке, время звонка и т.д."
                  className="mt-2"
                />
              </div>
              
              <Button type="submit" className="w-full" size="lg">
                Подтвердить заказ
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Index;