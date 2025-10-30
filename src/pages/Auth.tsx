import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const trimmed = email.trim();
    if (!trimmed) return "El email es requerido";
    if (trimmed.length > 255) return "El email es demasiado largo";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) return "Email inválido";
    return null;
  };

  const validatePassword = (pass: string) => {
    const trimmed = pass.trim();
    if (trimmed.length < 8 || trimmed.length > 12) {
      return "La contraseña debe tener entre 8 y 12 caracteres";
    }
    if (!/[A-Z]/.test(trimmed)) {
      return "Debe incluir al menos una mayúscula";
    }
    if (!/[a-z]/.test(trimmed)) {
      return "Debe incluir al menos una minúscula";
    }
    if (!/[0-9]/.test(trimmed)) {
      return "Debe incluir al menos un número";
    }
    if (!/[^A-Za-z0-9]/.test(trimmed)) {
      return "Debe incluir al menos un carácter especial";
    }
    return null;
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validar email
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();
      
      const emailError = validateEmail(trimmedEmail);
      if (emailError) {
        setError(emailError);
        setLoading(false);
        return;
      }

      // Validar contraseña en registro
      if (!isLogin) {
        const passwordError = validatePassword(trimmedPassword);
        if (passwordError) {
          setError(passwordError);
          setLoading(false);
          return;
        }
      }

      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: trimmedEmail,
          password: trimmedPassword,
        });

        if (error) {
          // Manejo específico de errores de Supabase
          if (error.message.includes("Invalid login credentials")) {
            setError("Credenciales incorrectas. Verifica tu email y contraseña.");
          } else if (error.message.includes("Email not confirmed")) {
            setError("Debes confirmar tu email antes de iniciar sesión.");
          } else {
            setError(error.message);
          }
          toast.error("Error al iniciar sesión");
          setLoading(false);
          return;
        }

        toast.success("¡Bienvenido de vuelta!");
        navigate("/game");
      } else {
        const { error } = await supabase.auth.signUp({
          email: trimmedEmail,
          password: trimmedPassword,
          options: {
            emailRedirectTo: `${window.location.origin}/game`,
          },
        });

        if (error) {
          // Manejo específico de errores de registro
          if (error.message.includes("User already registered")) {
            setError("Este email ya está registrado. Intenta iniciar sesión.");
          } else if (error.message.includes("Password should be")) {
            setError("La contraseña no cumple con los requisitos de seguridad.");
          } else if (error.message.includes("leaked password")) {
            setError("Esta contraseña ha sido comprometida. Usa una contraseña más segura.");
          } else {
            setError(error.message);
          }
          toast.error("Error al registrarse");
          setLoading(false);
          return;
        }

        toast.success("¡Cuenta creada! Redirigiendo al juego...");
        navigate("/game");
      }
    } catch (err) {
      setError("Error inesperado. Intenta de nuevo.");
      toast.error("Error del sistema");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-card/50 backdrop-blur-xl border-2 border-border rounded-2xl p-8 shadow-2xl">
          {/* Logo/Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black mb-2">
              <span className="gradient-cyber">CYBER</span>{" "}
              <span className="neon-text-purple">FELINE</span>
            </h1>
            <p className="text-muted-foreground">
              {isLogin ? "Inicia sesión para continuar" : "Crea tu cuenta"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background/50 border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={isLogin ? "Tu contraseña" : "8-12 caracteres"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-background/50 border-border pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {!isLogin && (
                <p className="text-xs text-muted-foreground">
                  8-12 caracteres, mayúsculas, minúsculas, números y especiales
                </p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/50 animate-in fade-in slide-in-from-top-2">
                <p className="text-sm text-destructive font-medium">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full text-lg py-6 animate-glow-pulse"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Procesando...
                </>
              ) : isLogin ? (
                "Iniciar Sesión"
              ) : (
                "Crear Cuenta"
              )}
            </Button>
          </form>

          {/* Toggle Mode */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {isLogin
                ? "¿No tienes cuenta? Regístrate"
                : "¿Ya tienes cuenta? Inicia sesión"}
            </button>
          </div>

          {/* Back to Home */}
          <div className="mt-4 text-center">
            <button
              onClick={() => navigate("/")}
              className="text-sm text-muted-foreground hover:text-secondary transition-colors"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
