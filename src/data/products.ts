export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  colors: string[];
  sizes: string[];
  image: string;
  description: string;
  isAvailable: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Пальто оверсайз",
    price: 28900,
    category: "Верхняя одежда",
    colors: ["black", "white"],
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "https://cdn.poehali.dev/projects/bd2eaed0-5d6d-4805-b3d5-b15d5dd37361/files/487ea13a-f0dd-4abd-8970-23a22c48d757.jpg",
    description: "Структурированное пальто из шерстяного сукна. Свободный крой, скрытая застёжка.",
    isAvailable: true,
  },
  {
    id: 2,
    name: "Водолазка облегающая",
    price: 6900,
    category: "Верхняя одежда",
    colors: ["black", "white"],
    sizes: ["XS", "S", "M", "L"],
    image: "https://cdn.poehali.dev/projects/bd2eaed0-5d6d-4805-b3d5-b15d5dd37361/files/fe79087e-f401-44dd-880f-7bbddfece06d.jpg",
    description: "Тонкая водолазка из хлопково-кашемировой смеси. Идеальная посадка.",
    isAvailable: true,
  },
  {
    id: 3,
    name: "Платье миди",
    price: 14500,
    category: "Платья",
    colors: ["black"],
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "https://cdn.poehali.dev/projects/bd2eaed0-5d6d-4805-b3d5-b15d5dd37361/files/abc4d96e-7c91-4454-8f5c-bbb5f8c825c1.jpg",
    description: "Элегантное платье с асимметричным подолом. Зернистый шёлк.",
    isAvailable: true,
  },
  {
    id: 4,
    name: "Брюки прямые",
    price: 9800,
    category: "Брюки",
    colors: ["black", "white"],
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "https://cdn.poehali.dev/projects/bd2eaed0-5d6d-4805-b3d5-b15d5dd37361/files/880c2e72-db72-4bdb-ab68-75bc2317f977.jpg",
    description: "Прямые брюки с высокой посадкой. Шерстяной габардин.",
    isAvailable: true,
  },
  {
    id: 5,
    name: "Блейзер приталенный",
    price: 18500,
    category: "Верхняя одежда",
    colors: ["black", "white"],
    sizes: ["XS", "S", "M", "L"],
    image: "https://cdn.poehali.dev/projects/bd2eaed0-5d6d-4805-b3d5-b15d5dd37361/files/fe79087e-f401-44dd-880f-7bbddfece06d.jpg",
    description: "Классический однобортный блейзер с приталенным силуэтом.",
    isAvailable: true,
  },
  {
    id: 6,
    name: "Рубашка оверсайз",
    price: 7400,
    category: "Рубашки",
    colors: ["white", "black"],
    sizes: ["S", "M", "L", "XL"],
    image: "https://cdn.poehali.dev/projects/bd2eaed0-5d6d-4805-b3d5-b15d5dd37361/files/487ea13a-f0dd-4abd-8970-23a22c48d757.jpg",
    description: "Хлопковая рубашка свободного кроя. Удлинённый подол, скрытые пуговицы.",
    isAvailable: true,
  },
  {
    id: 7,
    name: "Джемпер с V-вырезом",
    price: 8200,
    category: "Верхняя одежда",
    colors: ["black", "white"],
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "https://cdn.poehali.dev/projects/bd2eaed0-5d6d-4805-b3d5-b15d5dd37361/files/880c2e72-db72-4bdb-ab68-75bc2317f977.jpg",
    description: "Тонкий джемпер из шерсти мериноса. Мягкий V-образный вырез.",
    isAvailable: true,
  },
  {
    id: 8,
    name: "Юбка-карандаш",
    price: 8900,
    category: "Юбки",
    colors: ["black"],
    sizes: ["XS", "S", "M", "L"],
    image: "https://cdn.poehali.dev/projects/bd2eaed0-5d6d-4805-b3d5-b15d5dd37361/files/abc4d96e-7c91-4454-8f5c-bbb5f8c825c1.jpg",
    description: "Классическая юбка-карандаш с разрезом сзади. Плотная ткань.",
    isAvailable: true,
  },
];

export const CATEGORIES = ["Все", "Верхняя одежда", "Платья", "Брюки", "Рубашки", "Юбки"];
export const SIZES = ["XS", "S", "M", "L", "XL"];
export const COLORS = [
  { value: "black", label: "Чёрный" },
  { value: "white", label: "Белый" },
];
