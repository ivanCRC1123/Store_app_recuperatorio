import { useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../../../store/useCartStore";
import { ProductImage } from "../../../shared/ui/ProductImage";
import type { ProductoRead } from "../types";

interface ProductCardProps {
  product: ProductoRead;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: String(product.id),
      name: product.nombre,
      price: product.precio_base,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-900/40 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700/80 hover:shadow-xl hover:shadow-zinc-900/50"
    >
      {/* Imagen */}
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800/30">
        <ProductImage
          url={product.imagenes_url?.[0]}
          alt={product.nombre}
          imgClassName="transition duration-500 group-hover:scale-110"
        />

        {/* Categoria */}
        {product.categorias?.[0] && (
          <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-zinc-300 backdrop-blur-sm">
            {product.categorias[0].nombre}
          </span>
        )}

        {/* boton */}
        <button
          onClick={handleAdd}
          disabled={added}
          className={`absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold shadow-lg transition-all duration-200 active:scale-90 ${
            added
              ? "bg-emerald-500 text-white"
              : "bg-white/90 text-zinc-900 opacity-0 hover:bg-white group-hover:opacity-100"
          }`}
        >
          {added ? "✓" : "+"}
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col justify-between gap-1.5 p-4">
        <h3 className="text-[15px] font-semibold leading-tight text-zinc-100 transition group-hover:text-emerald-400">
          {product.nombre}
        </h3>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-emerald-400">
            ${Number(product.precio_base).toFixed(2)}
          </span>
          {product.ingredientes?.[0] && (
            <span className="text-[11px] text-zinc-600">
              {product.ingredientes.length} ingrediente(s)
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
