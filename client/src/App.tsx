import React, { useState } from "react";

interface Product {
  id: string;
  name: string;
}

const PRODUCTS: Product[] = [
  { id: "mickey_watch", name: "ساعة ميكي" },
  { id: "bagha",        name: "باغة" },
  { id: "wanana",       name: "ونانه" },
  { id: "dabbour",      name: "دبور" },
  { id: "yoyo",         name: "يويو" },
  { id: "apple_watch",  name: "ساعة ابل" },
  { id: "ice_cream",    name: "ايس كريم" },
  { id: "fakk",         name: "فك" },
  { id: "tayara",       name: "طيارة" },
  { id: "maqass",       name: "مقص" },
  { id: "khatem",       name: "خاتم" },
];

export default function App() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const updateQty = (id: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 0;
      const updated = Math.max(0, current + delta);
      return { ...prev, [id]: updated };
    });
  };

  const handleManualInput = (id: string, value: string) => {
    const num = parseInt(value, 10);
    setQuantities((prev) => ({
      ...prev,
      [id]: isNaN(num) ? 0 : Math.max(0, num),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    // Filter out zero quantities
    const payload: Record<string, number> = {};
    for (const [key, val] of Object.entries(quantities)) {
      if (val > 0) payload[key] = val;
    }

    try {
const BACKEND_URL = "http://192.168.1.11:3000/api/supplies";
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to send data");

      setStatus("تم تسجيل التوريدة بنجاح في الإكسيل!");
      setQuantities({});
    } catch (err: any) {
      setStatus("حدث خطأ أثناء الإرسال");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 max-w-md mx-auto" dir="rtl">
      <h1 className="text-2xl font-bold text-center mb-6 text-sky-400">
        تسجيل توريد الأصناف
      </h1>

      {status && (
        <div className={`p-3 mb-4 rounded text-center text-sm font-semibold ${
          status.includes("نجاح") ? "bg-emerald-600/30 text-emerald-300 border border-emerald-500" : "bg-rose-600/30 text-rose-300 border border-rose-500"
        }`}>
          {status}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3 pb-24">
        {PRODUCTS.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between bg-slate-800 p-3 rounded-xl border border-slate-700 shadow-sm"
          >
            <span className="font-medium text-base">{p.name}</span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => updateQty(p.id, -1)}
                className="w-9 h-9 bg-slate-700 active:bg-slate-600 rounded-lg text-xl flex items-center justify-center font-bold"
              >
                -
              </button>

              <input
                type="number"
                value={quantities[p.id] || ""}
                placeholder="0"
                onChange={(e) => handleManualInput(p.id, e.target.value)}
                className="w-14 text-center bg-slate-900 border border-slate-600 rounded-lg py-1 text-sky-300 font-semibold focus:outline-none focus:border-sky-500"
              />

              <button
                type="button"
                onClick={() => updateQty(p.id, 1)}
                className="w-9 h-9 bg-sky-600 active:bg-sky-500 rounded-lg text-xl flex items-center justify-center font-bold"
              >
                +
              </button>
            </div>
          </div>
        ))}

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-900/90 backdrop-blur-md max-w-md mx-auto border-t border-slate-800">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-slate-950 font-bold py-3 rounded-xl transition duration-150 shadow-lg disabled:opacity-50"
          >
            {loading ? "جاري الإرسال..." : "إرسال التوريدة للشيت"}
          </button>
        </div>
      </form>
    </div>
  );
}