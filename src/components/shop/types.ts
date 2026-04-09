export const HERO_IMG = "https://cdn.poehali.dev/projects/b68ae23f-8439-460b-8047-53d42bb625ee/files/1056a531-b3c7-41fe-8c97-31bede9d4625.jpg";
export const MAN_IMG = "https://cdn.poehali.dev/projects/b68ae23f-8439-460b-8047-53d42bb625ee/files/2d234d6f-69a0-43c6-b8ad-6c986bc49232.jpg";
export const FLATLAY_IMG = "https://cdn.poehali.dev/projects/b68ae23f-8439-460b-8047-53d42bb625ee/files/9259160d-bfb3-4beb-a596-245eb8673b4f.jpg";
export const HOODIE_IMG = "https://cdn.poehali.dev/projects/b68ae23f-8439-460b-8047-53d42bb625ee/files/662e5a84-e9c0-476a-839d-f58031ca401d.jpg";

export const ALL_PRODUCTS = [
  { id: 1, name: "Бомбер Street Lime", price: 8900, oldPrice: 12000, size: ["S", "M", "L", "XL"], color: "Зелёный", material: "Нейлон", style: "Streetwear", isNew: true, img: HERO_IMG, tag: "Хит" },
  { id: 2, name: "Водолазка Mono", price: 4500, oldPrice: null, size: ["XS", "S", "M", "L"], color: "Чёрный", material: "Хлопок", style: "Минимализм", isNew: false, img: MAN_IMG, tag: null },
  { id: 3, name: "Худи Coral Drop", price: 6200, oldPrice: 7800, size: ["S", "M", "L"], color: "Коралловый", material: "Флис", style: "Casual", isNew: true, img: HOODIE_IMG, tag: "Новинка" },
  { id: 4, name: "Сет Editorial", price: 15900, oldPrice: null, size: ["M", "L", "XL"], color: "Мульти", material: "Хлопок", style: "Streetwear", isNew: true, img: FLATLAY_IMG, tag: "Лимитед" },
  { id: 5, name: "Брюки Wide Camel", price: 7400, oldPrice: 9500, size: ["XS", "S", "M"], color: "Бежевый", material: "Шерсть", style: "Минимализм", isNew: false, img: MAN_IMG, tag: null },
  { id: 6, name: "Куртка Neon Drop", price: 11200, oldPrice: null, size: ["S", "M", "L", "XL", "XXL"], color: "Зелёный", material: "Нейлон", style: "Streetwear", isNew: true, img: HERO_IMG, tag: "Новинка" },
  { id: 7, name: "Свитшот Basic+", price: 3900, oldPrice: 4900, size: ["XS", "S", "M", "L"], color: "Чёрный", material: "Хлопок", style: "Casual", isNew: false, img: HOODIE_IMG, tag: null },
  { id: 8, name: "Сет Flat Mood", price: 13500, oldPrice: 16000, size: ["M", "L"], color: "Мульти", material: "Хлопок", style: "Casual", isNew: true, img: FLATLAY_IMG, tag: "Хит" },
];

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
export const COLORS = ["Все", "Чёрный", "Зелёный", "Бежевый", "Коралловый", "Мульти"];
export const MATERIALS = ["Все", "Хлопок", "Нейлон", "Флис", "Шерсть"];
export const STYLES = ["Все", "Streetwear", "Минимализм", "Casual"];

export const MARQUEE_ITEMS = ["НОВАЯ КОЛЛЕКЦИЯ", "ВЕСНА 2026", "STREETWEAR", "МИНИМАЛИЗМ", "FREE SHIPPING", "ВОЗВРАТ 30 ДНЕЙ", "НОВАЯ КОЛЛЕКЦИЯ", "ВЕСНА 2026", "STREETWEAR", "МИНИМАЛИЗМ", "FREE SHIPPING", "ВОЗВРАТ 30 ДНЕЙ"];

export type Page = 'home' | 'catalog' | 'cart' | 'contacts' | 'new';
export type Product = typeof ALL_PRODUCTS[0];

export interface CartItem {
  product: Product;
  size: string;
  qty: number;
}
