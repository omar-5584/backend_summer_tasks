export interface SupplyPayload {
  [key: string]: number;
}

export const PRODUCTS_CONFIG = [
  { id: "mickey_watch", name: "ساعة ميكي", qtyCol: 2 },  // B
  { id: "bagha",        name: "باغة",      qtyCol: 4 },  // D
  { id: "wanana",       name: "ونانه",     qtyCol: 6 },  // F
  { id: "dabbour",      name: "دبور",      qtyCol: 8 },  // H
  { id: "yoyo",         name: "يويو",      qtyCol: 10 }, // J
  { id: "apple_watch",  name: "ساعة ابل",  qtyCol: 12 }, // L
  { id: "ice_cream",    name: "ايس كريم",  qtyCol: 14 }, // N
  { id: "fakk",         name: "فك",        qtyCol: 16 }, // P
  { id: "tayara",       name: "طيارة",     qtyCol: 18 }, // R
  { id: "maqass",       name: "مقص",       qtyCol: 20 }, // T
  { id: "khatem",       name: "خاتم",      qtyCol: 22 }, // V
]as const;