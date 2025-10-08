import { useState } from 'react';
import { Dumbbell, Mail, Lock, AlertCircle, Eye, EyeOff, Zap } from 'lucide-react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Simulación de login
    setTimeout(() => {
      console.log('Login:', { email, password });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden md:block text-white space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
              <Zap className="w-6 h-6 text-yellow-400" />
              <span className="font-semibold">Entrenamientos de 10-15 minutos</span>
            </div>
            
            <h1 className="text-6xl font-bold leading-tight">
              Tu mejor versión en
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> tiempo récord</span>
            </h1>
            
            <p className="text-xl text-purple-200">
              HIIT personalizado, nutrición balanceada y seguimiento de progreso. Todo en un solo lugar.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold">Entrenamientos HIIT</div>
                <div className="text-sm text-purple-200">Quema calorías en tiempo récord</div>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🥗</span>
              </div>
              <div>
                <div className="font-semibold">Plan Nutricional</div>
                <div className="text-sm text-purple-200">Alimentación adaptada a tus objetivos</div>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <div className="font-semibold">Seguimiento de Progreso</div>
                <div className="text-sm text-purple-200">Visualiza tu evolución semanal</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-50"></div>
                <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-2xl">
                  <Dumbbell className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                Bienvenido a QuickFit
              </h2>
              <p className="text-purple-200">
                Inicia sesión para continuar tu transformación
              </p>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 backdrop-blur-sm text-white px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Email
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5 group-focus-within:text-purple-400 transition" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:bg-white/20 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition backdrop-blur-sm"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Contraseña
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5 group-focus-within:text-purple-400 transition" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:bg-white/20 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition backdrop-blur-sm"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-purple-400 transition"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-purple-200 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-white/20 bg-white/10 text-purple-600 focus:ring-purple-500 focus:ring-offset-0"
                  />
                  <span className="group-hover:text-white transition">Recordarme</span>
                </label>
                <a href="#" className="text-purple-300 hover:text-white transition">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full relative group overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/50"
              >
                <span className="relative z-10">
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Iniciando sesión...</span>
                    </div>
                  ) : (
                    'Iniciar Sesión'
                  )}
                </span>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </button>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center">
              <div className="flex-1 border-t border-white/20"></div>
              <span className="px-4 text-sm text-purple-300">o continúa con</span>
              <div className="flex-1 border-t border-white/20"></div>
            </div>

            {/* Social Login */}
            <button className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-3 group">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continuar con Google</span>
            </button>

            {/* Register Link */}
            <p className="text-center text-purple-200 mt-8">
              ¿No tienes cuenta?{' '}
              <a href="#" className="text-white font-semibold hover:text-purple-300 transition">
                Regístrate gratis
              </a>
            </p>
          </div>

          {/* Mobile Features */}
          <div className="md:hidden mt-6 text-center text-purple-200 text-sm">
            ⚡ HIIT personalizado · 🥗 Nutrición · 📊 Progreso
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

export default Login;