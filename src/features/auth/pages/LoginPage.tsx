import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../../store/UseauthStore";
import { Button } from "../../../shared/ui/Button";
import { Input } from "../../../shared/ui/Input";
import { Alert } from "../../../shared/ui/Alert";
import { getApiErrorMessage } from "../../../shared/services/apiError";

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Completá todos los campos");
      return;
    }

    setLoading(true);
    try {
      await login(email.trim(), password);
      navigate("/checkout", { replace: true });
    } catch (err: unknown) {
      setError(getApiErrorMessage(err, "Error al iniciar sesión"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-sm items-center justify-center px-4 py-12">
      <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 shadow-xl">
        <h1 className="mb-1 text-center text-2xl font-bold text-white">
          Iniciar sesión
        </h1>
        <p className="mb-6 text-center text-sm text-zinc-500">
          Ingresá para finalizar tu compra
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <Alert className="text-center">{error}</Alert>}

          <Button type="submit" size="lg" disabled={loading} className="w-full">
            {loading ? "Ingresando..." : "Ingresar"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-600">
          ¿No tenés cuenta?{" "}
          <Link
            to="/register"
            className="font-medium text-emerald-400 hover:text-emerald-300"
          >
            Registrarse
          </Link>
        </p>
      </div>
    </div>
  );
}
