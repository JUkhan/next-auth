"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle2, EyeOff, Eye } from 'lucide-react';

function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasMinLength = password.length >= 8;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h1 className="text-2xl font-bold text-[#00235B] mb-2">Załóż darmowe konto</h1>
      <p className="text-gray-600 mb-4">Zarejestruj się w kilka sekund. Uzupełnij prosty formularz.</p>
      <div className="bg-blue-50 text-blue-700 p-2 rounded-md mb-4 text-sm">
        Nie wymagamy podpięcia karty płatniczej!
      </div>

      <form className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#00235B] mb-1">
            Adres e-mail <span className="text-red-500">*</span>
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Adres e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-[#00235B] mb-1">
            Hasło <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <PasswordRequirement met={hasUpperCase}>Jedna duża litera</PasswordRequirement>
          <PasswordRequirement met={hasNumber}>Jedna cyfra</PasswordRequirement>
          <PasswordRequirement met={hasMinLength}>Minimum 8 znaków</PasswordRequirement>
        </div>

        <Button className="w-full bg-blue-600 hover:bg-blue-700">
          Utwórz konto
        </Button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        Zakładając konto w Lexodi, akceptujesz <a href="#" className="text-blue-600 hover:underline">Regulamin</a>.
      </p>

      <p className="mt-4 text-sm text-center">
        Posiadasz konto? <a href="#" className="text-blue-600 hover:underline">Zaloguj się</a>
      </p>
    </motion.div>
  );
}

function PasswordRequirement({ children, met }: { children: React.ReactNode; met: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center space-x-2"
    >
      <CheckCircle2 className={`w-4 h-4 ${met ? 'text-green-500' : 'text-gray-300'}`} />
      <span className={`text-sm ${met ? 'text-green-700' : 'text-gray-500'}`}>{children}</span>
    </motion.div>
  );
}

export default RegistrationForm;