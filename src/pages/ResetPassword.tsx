import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Check for recovery token in URL
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      setReady(true);
    } else {
      // Also check if user has active session from recovery link
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) setReady(true);
        else {
          toast.error("Link de recuperação inválido");
          navigate("/auth", { replace: true });
        }
      });
    }
  }, [navigate]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Senha atualizada com sucesso!");
      navigate("/", { replace: true });
    }
  };

  if (!ready) return null;

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center p-4">
      <div className="hud-grid-bg absolute inset-0" />
      <form
        onSubmit={handleReset}
        className="relative z-10 w-full max-w-sm bg-black/50 backdrop-blur-md border border-[#00d4ff]/20 rounded-2xl p-6 space-y-4"
        style={{ boxShadow: "0 0 40px rgba(0, 212, 255, 0.08)" }}
      >
        <div className="text-center mb-2">
          <h1 className="text-xl font-bold tracking-wider" style={{ color: "#00d4ff" }}>
            ROTA<span style={{ color: "#7b61ff" }}>SMART</span>
          </h1>
          <p className="text-[10px] font-mono text-[#00d4ff]/40 mt-1 tracking-widest uppercase">
            Password Reset
          </p>
        </div>

        <input
          type="password"
          placeholder="Nova senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="hud-input"
          required
          minLength={6}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-lg font-semibold text-sm tracking-wide transition-all duration-300 disabled:opacity-40"
          style={{
            background: "linear-gradient(135deg, #00d4ff, #7b61ff)",
            color: "#0a0e1a",
            boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)",
          }}
        >
          {loading ? "Processando..." : "DEFINIR NOVA SENHA"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
