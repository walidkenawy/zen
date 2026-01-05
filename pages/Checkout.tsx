
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// Fixed: added ShoppingCart to the imports from lucide-react to resolve the "Cannot find name 'ShoppingCart'" error
import { ShieldCheck, CreditCard, ChevronLeft, Trash2, Calendar, MapPin, Users, Lock, CheckCircle2, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { MOCK_USER } from '../constants';

export const Checkout: React.FC = () => {
  const { cart, removeFromCart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: MOCK_USER.name,
    email: MOCK_USER.email,
    phone: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  const serviceFee = cart.length > 0 ? 45 : 0;
  const total = subtotal + serviceFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      const bookingIds = cart.map(item => `ZM-${Math.floor(Math.random() * 90000) + 10000}`);
      clearCart();
      navigate('/booking-success', { state: { bookingIds } });
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-32 text-center">
        <div className="w-20 h-20 bg-[#F9F6F1] rounded-full flex items-center justify-center mx-auto mb-8">
           <ShoppingCart className="w-10 h-10 text-[#7C9070]" />
        </div>
        <h1 className="text-4xl font-bold serif mb-4">Your Journey Cart is Empty</h1>
        <p className="text-gray-500 mb-12">It looks like you haven't added any retreats to your journey yet.</p>
        <Link to="/explore" className="bg-[#7C9070] text-white px-10 py-4 rounded-2xl font-bold hover:shadow-xl transition-all">
          Explore Retreats
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFCF9] min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-[#7C9070] font-bold mb-12 transition-colors">
          <ChevronLeft className="w-5 h-5" /> Back
        </button>

        <h1 className="text-4xl font-bold serif mb-12">Complete Your Journey</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Checkout Form */}
          <div className="lg:col-span-7 space-y-12">
            <section className="bg-white border border-[#F0ECE4] rounded-[2.5rem] p-10 shadow-sm">
              <h2 className="text-2xl font-bold serif mb-8 flex items-center gap-3">
                <Users className="text-[#7C9070]" /> Traveler Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-[#F9F6F1] border-none rounded-xl py-4 px-6 text-sm focus:ring-2 focus:ring-[#7C9070]" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-[#F9F6F1] border-none rounded-xl py-4 px-6 text-sm focus:ring-2 focus:ring-[#7C9070]" 
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone Number (Optional)</label>
                  <input 
                    type="tel" 
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-[#F9F6F1] border-none rounded-xl py-4 px-6 text-sm focus:ring-2 focus:ring-[#7C9070]" 
                  />
                </div>
              </div>
            </section>

            <section className="bg-white border border-[#F0ECE4] rounded-[2.5rem] p-10 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold serif flex items-center gap-3">
                  <CreditCard className="text-[#7C9070]" /> Secure Payment
                </h2>
                <div className="flex items-center gap-2 text-green-600 text-xs font-bold bg-green-50 px-3 py-1 rounded-full">
                  <Lock className="w-3 h-3" /> Encrypted
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Card Number</label>
                  <input 
                    required
                    type="text" 
                    placeholder="0000 0000 0000 0000"
                    className="w-full bg-[#F9F6F1] border-none rounded-xl py-4 px-6 text-sm focus:ring-2 focus:ring-[#7C9070]" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Expiry Date</label>
                    <input 
                      required
                      type="text" 
                      placeholder="MM/YY"
                      className="w-full bg-[#F9F6F1] border-none rounded-xl py-4 px-6 text-sm focus:ring-2 focus:ring-[#7C9070]" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">CVC</label>
                    <input 
                      required
                      type="text" 
                      placeholder="123"
                      className="w-full bg-[#F9F6F1] border-none rounded-xl py-4 px-6 text-sm focus:ring-2 focus:ring-[#7C9070]" 
                    />
                  </div>
                </div>
                <button 
                  disabled={isProcessing}
                  className="w-full bg-[#7C9070] text-white font-bold py-6 rounded-[1.5rem] hover:bg-[#5E6D55] transition-all shadow-xl shadow-[#7C9070]/20 mt-8 flex items-center justify-center gap-3"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Complete Booking • ${total.toFixed(2)}
                    </>
                  )}
                </button>
              </form>
            </section>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-[#F0ECE4] rounded-[2.5rem] p-10 shadow-2xl shadow-gray-200/50 sticky top-24">
              <h3 className="text-xl font-bold serif mb-8">Journey Summary</h3>
              
              <div className="space-y-8 mb-12">
                {cart.map((item) => (
                  <div key={item.id} className="group flex gap-4">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-gray-100">
                      <img src={item.retreat.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-sm line-clamp-1">{item.retreat.title}</h4>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-[10px] text-gray-500 space-y-1">
                        <p className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(item.selectedDate).toLocaleDateString()}</p>
                        <p className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {item.retreat.location.city}</p>
                        <p className="flex items-center gap-1"><Users className="w-3 h-3" /> {item.guests} Guest{item.guests > 1 ? 's' : ''}</p>
                      </div>
                    </div>
                    <div className="text-right flex flex-col justify-end">
                      <span className="font-bold text-sm">${item.retreat.price * item.guests}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-8 border-t border-gray-100">
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Service Fee</span>
                  <span className="font-medium text-gray-900">${serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pt-6 border-t-2 border-[#7C9070]/10 mt-6">
                  <span className="text-xl font-bold serif">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-[#7C9070]">${total.toFixed(2)}</span>
                    <span className="block text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-1">USD Included</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-[#F9F6F1] rounded-2xl p-6 flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 text-[#7C9070] shrink-0" />
                <p className="text-xs text-gray-500 leading-relaxed">
                  Your payment is processed securely. By completing this purchase, you agree to ZenMarket's <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Cancellation Policy</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
