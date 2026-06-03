import { useCartStore } from "../../../store/useCartStore";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../../store/UseauthStore";
import { Button } from "../../../shared/ui/Button";
import { CartItem } from "../components/CartItem";

export default function CartPage() {
  const { items, clearCart } = useCartStore();
  const isAuth = useAuthStore((s) => s.isAuthenticated)();
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">
            Tu carrito
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            {items.length} {items.length === 1 ? "producto" : "productos"}
          </p>
        </div>
        {items.length > 0 && (
          <Button variant="danger" size="sm" onClick={clearCart}>
            Vaciar
          </Button>
        )}
      </div>

      {/* Empty State */}
      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-800 p-16 text-center">
          <p className="text-5xl">🛒</p>
          <p className="mt-4 text-lg font-medium text-zinc-400">
            Tu carrito está vacío
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            Agregá productos desde el catálogo
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Ver productos
          </Link>
        </div>
      ) : (
        <>
          {/* Items */}
          <div className="space-y-3">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Summary */}
          <div className="mt-8 rounded-2xl border border-zinc-800/60 bg-zinc-900/30 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-lg text-zinc-400">Total</span>
              <span className="text-3xl font-bold text-emerald-400">
                ${total.toFixed(2)}
              </span>
            </div>
            {isAuth ? (
              <Link
                to="/checkout"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 active:scale-[0.98]"
              >
                Ir al checkout
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>
            ) : (
              <Link
                to="/login"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-800 px-6 py-3.5 text-base font-bold text-zinc-400 transition hover:bg-zinc-700 active:scale-[0.98]"
              >
                Iniciá sesión para comprar
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
}
