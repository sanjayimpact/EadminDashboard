import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../store/slice/authslice";

export default function OtpVerifyForm({ onVerify }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const dispatch  = useDispatch();

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const code = otp.join("");
    await onVerify(code);

    setLoading(false);
  };
const handleback = ()=>{
  try{
   dispatch(logout());
   navigate('/');
  }catch(err)
  {
    console.log(err)
  }
}
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

        {/* 🔙 Back to login */}
        <button
          onClick={handleback}
          className="absolute left-4 top-4 flex items-center gap-1 text-sm font-medium text-slate-500 transition hover:text-slate-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <h2 className="text-center text-2xl font-bold text-slate-900">
          Verify OTP
        </h2>

        <p className="mt-2 text-center text-sm text-slate-500">
          Enter the 6-digit code sent to your email
        </p>

        <form onSubmit={handleSubmit} className="mt-8">
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="h-14 w-12 rounded-lg border border-slate-300 text-center text-xl font-semibold text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/30"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading || otp.includes("")}
            className="mt-8 w-full rounded-lg bg-indigo-600 py-3 text-base font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify Code"}
          </button>
        </form>
      </div>
    </div>
  );
}
