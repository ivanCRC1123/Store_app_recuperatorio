import { useState } from "react";
import { useCartStore } from "../../../store/useCartStore";
import { useOrders } from "../hooks/useOrders";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";
import AddressSelector from "../../addresses/components/AddressSelector";
import type { DireccionEntregaReadSimple } from "../../addresses/types";
import type { FormaPagoEnum } from "../types/orders";
import { Button } from "../../../shared/ui/Button";

const FORMAS_PAGO: { value: FormaPagoEnum; label: string }[] = [
  { value: "EFECTIVO", label: "Efectivo" },
  { value: "TARJETA_CREDITO", label: "Tarjeta de Crédito" },
  { value: "TARJETA_DEBITO", label: "Tarjeta de Débito" },
  { value: "TRANSFERENCIA", label: "Transferencia" },
  { value: "MERCADO_PAGO", label: "Mercado Pago" },
];

/** Formatee una dirección seleccionada como una cadena de entrega legible  */
function formatAddress(addr: DireccionEntregaReadSimple): string {
  return `${addr.alias}: ${addr.calle} ${addr.numero}, ${addr.localidad}`;
}

export default function CheckoutPage() {
  const { items } = useCartStore();
  const { create, isCreating } = useOrders();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const [selectedAddress, setSelectedAddress] =
    useState<DireccionEntregaReadSimple | null>(null);
  const [formaPago, setFormaPago] = useState<FormaPagoEnum>("EFECTIVO");
  const [observaciones, setObservaciones] = useState("");

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleOrder = () => {
    if (!selectedAddress) return; // el botón está deshabilitado, pero guarda igual
    create.mutate({
      usuario_id: user!.id,
      forma_pago: formaPago,
      direccion_entrega: formatAddress(selectedAddress),
      observaciones: observaciones || undefined,
      detalles: items.map((i) => ({
        producto_id: i.id,
        cantidad: i.quantity,
      })),
    });
  };

  // SUCCESS
  if (create.isSuccess) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-emerald-500/5 to-transparent p-8 text-center shadow-xl">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10">
            <span className="text-4xl">I</span>
          </div>
          <h1 className="mt-6 text-2xl font-bold text-emerald-400">
            Pedido confirmado
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Recibimos tu pedido y lo estamos procesando
          </p>

          {create.data && (
            <div className="mt-8 space-y-3 rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5 text-left">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">N° Pedido</span>
                <span className="font-mono text-sm font-bold text-zinc-100">
                  {create.data.numero_pedido}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-zinc-800/60 pt-3">
                <span className="text-sm text-zinc-500">Total</span>
                <span className="text-xl font-bold text-emerald-400">
                  ${create.data.monto_total}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-zinc-800/60 pt-3">
                <span className="text-sm text-zinc-500">Estado</span>
                <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400">
                  {create.data.estado}
                </span>
              </div>
            </div>
          )}

          <Button size="xl" onClick={() => navigate("/")} className="w-full">
            Seguir comprando
          </Button>
        </div>
      </div>
    );
  }

  // Carrito vacío
  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center sm:px-6">
        <p className="text-5xl">🛒</p>
        <p className="mt-4 text-lg font-medium text-zinc-400">
          No hay productos en tu carrito
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400"
        >
          Ir al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-zinc-600">
        <Link to="/cart" className="transition hover:text-zinc-300">
          Carrito
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">Checkout</span>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-zinc-100">
        Checkout
      </h1>
      <p className="mt-1 text-sm text-zinc-500">
        Completá los datos para finalizar tu compra
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        {/* ── FORM ── */}
        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/30 p-6 shadow-sm">
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-wider text-zinc-500">
              Datos de entrega
            </h2>

            <div className="space-y-4">
              {/* Dirección — AddressSelector */}
              <div>
                <label className="mb-1.5 block text-xs text-zinc-600">
                  Dirección de entrega *
                </label>
                <AddressSelector
                  selectedId={selectedAddress?.id ?? null}
                  onSelect={setSelectedAddress}
                />
              </div>

              {/* Forma de pago */}
              <div>
                <label className="mb-1.5 block text-xs text-zinc-600">
                  Forma de pago
                </label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {FORMAS_PAGO.map((fp) => (
                    <button
                      key={fp.value}
                      type="button"
                      onClick={() => setFormaPago(fp.value)}
                      className={`flex flex-col items-center gap-1 rounded-xl border px-3 py-3 text-xs transition ${
                        formaPago === fp.value
                          ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                          : "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      <span className="text-[11px] font-medium">
                        {fp.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Observaciones */}
              <div>
                <label className="mb-1.5 block text-xs text-zinc-600">
                  Observaciones
                </label>
                <textarea
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20"
                  placeholder="Ej: sin cebolla, extra queso..."
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  rows={2}
                />
              </div>
            </div>
          </div>
        </div>

        {/*SIDEBAR*/}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/30 p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
              Resumen
            </h2>

            <div className="space-y-3">
              {items.map((i) => (
                <div
                  key={i.id}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="truncate text-zinc-300">
                    {i.name}{" "}
                    <span className="text-zinc-600">x{i.quantity}</span>
                  </span>
                  <span className="font-medium text-zinc-100">
                    ${(i.price * i.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="my-4 border-t border-zinc-800/60" />

            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">Total</span>
              <span className="text-2xl font-bold text-emerald-400">
                ${total.toFixed(2)}
              </span>
            </div>

            <Button
              size="xl"
              onClick={handleOrder}
              disabled={isCreating || !selectedAddress}
              className="mt-6 w-full"
            >
              {isCreating ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Procesando...
                </>
              ) : (
                <>
                  Confirmar pedido
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
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
