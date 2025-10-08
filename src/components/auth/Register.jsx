import { useState } from 'react';
import { Dumbbell, Mail, Lock, User, AlertCircle, Eye, EyeOff, Check, X } from 'lucide-react';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const passwordRequirements = [
    { label: 'Al menos 6 caracteres', met: formData.password.length >= 6 },
    { label: 'Una letra mayúscula', met: /[A-Z]/.test(formData.password) },
    { label: 'Un número', met: /[0-9]/.test(formData.password) },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      console.log('Register:', formData);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:block text-white space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold leading-tight">
              Comienza tu
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> transformación hoy</span>
            </h1>
            
            <p className="text-xl text-purple-200">
              Únete a miles de personas que ya están alcanzando sus objetivos con QuickFit.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-lg mb-1">Gratis para siempre</div>
                  <div className="text-purple-200">Sin tarjetas de crédito ni compromisos. Empieza hoy mismo.</div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-lg mb-1">Resultados comprobados</div>
                  <div className="text-purple-200">Miles de usuarios han transformado su cuerpo en menos de 3 meses.</div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-lg mb-1">Solo 10-15 minutos al día</div>
                  <div className="text-purple-200">Entrenamientos efectivos que se adaptan a tu agenda.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/30">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-slate-900"></div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-slate-900"></div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 border-2 border-slate-900"></div>
              </div>
              <div>
                <div className="font-semibold">+10,000 usuarios activos</div>
                <div className="text-sm text-purple-200">Se unieron este mes</div>
              </div>
            </div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-xl">★</span>
              ))}
              <span className="ml-2 text-purple-200">4.9/5 en valoraciones</span>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-50"></div>
                <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-2xl">
                  <Dumbbell className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>

            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">
                Crea tu cuenta
              </h2>
              <p className="text-purple-200">
                Comienza tu viaje fitness en 2 minutos
              </p>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 backdrop-blur-sm text-white px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Nombre completo
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:bg-white/20 focus:border-purple-400 outline-none transition backdrop-blur-sm"
                    placeholder="Juan Pérez"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:bg-white/20 focus:border-purple-400 outline-none transition backdrop-blur-sm"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:bg-white/20 focus:border-purple-400 outline-none transition backdrop-blur-sm"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-purple-400"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {formData.password && (
                  <div className="mt-2 space-y-1">
                    {passwordRequirements.map((req, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs">
                        {req.met ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <X className="w-4 h-4 text-red-400" />
                        )}
                        <span className={req.met ? 'text-green-400' : 'text-purple-300'}>
                          {req.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Confirmar contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:bg-white/20 focus:border-purple-400 outline-none transition backdrop-blur-sm"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-purple-400"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/50"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creando cuenta...</span>
                  </div>
                ) : (
                  'Crear Cuenta Gratis'
                )}
              </button>
            </div>

            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-white/20"></div>
              <span className="px-4 text-sm text-purple-300">o regístrate con</span>
              <div className="flex-1 border-t border-white/20"></div>
            </div>

            <button className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white py-3 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continuar con Google</span>
            </button>

            <p className="text-center text-purple-200 mt-6 text-sm">
              Al registrarte aceptas nuestros{' '}
              <button className="text-white hover:underline">Términos</button>
              {' '}y{' '}
              <button className="text-white hover:underline">Privacidad</button>
            </p>

            <p className="text-center text-purple-200 mt-4">
              ¿Ya tienes cuenta?{' '}
              <button className="text-white font-semibold hover:text-purple-300 transition">
                Inicia sesión
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;