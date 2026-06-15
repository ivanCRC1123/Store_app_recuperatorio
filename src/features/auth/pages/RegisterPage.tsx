import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";
import { Button } from "../../../shared/ui/Button";
import { Input } from "../../../shared/ui/Input";
import { Alert } from "../../../shared/ui/Alert";
import { getApiErrorMessage } from "../../../shared/services/apiError";

export default function RegisterPage() {
  const navigate = useNavigate();
  const register = useAuthStore((s) => s.register);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !nombre.trim() ||
      !apellido.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      setError("Completá todos los campos");
      return;
    }

    setLoading(true);
    try {
      await register(email.trim(), nombre.trim(), apellido.trim(), password);
      navigate("/checkout", { replace: true });
    } catch (err: unknown) {
      setError(getApiErrorMessage(err, "Error al registrarse"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-sm items-center justify-center px-4 py-12">
      <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 shadow-xl">
        <h1 className="mb-1 text-center text-2xl font-bold text-white">
          Crear cuenta
        </h1>
        <p className="mb-6 text-center text-sm text-zinc-500">
          Registrate para empezar a comprar
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </div>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <Alert className="text-center">{error}</Alert>}

          <Button type="submit" size="lg" disabled={loading} className="w-full">
            {loading ? "Registrando..." : "Crear cuenta"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-600">
          ¿Ya tenés cuenta?{" "}
          <Link
            to="/login"
            className="font-medium text-emerald-400 hover:text-emerald-300"
          >
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
