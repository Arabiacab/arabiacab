'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, MapPin, Calendar, Users, Car, CreditCard, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Link } from '@/i18n/routing';

const steps = [
  { id: 1, name: 'Trip Details', icon: MapPin },
  { id: 2, name: 'Car Selection', icon: Car },
  { id: 3, name: 'Passenger Info', icon: Users },
  { id: 4, name: 'Confirmation', icon: CreditCard },
  { id: 5, name: 'Success', icon: Check }
];

export function BookingFlow() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#111111] rounded-2xl border border-[#333333] shadow-2xl overflow-hidden mt-12 mb-24">
      {/* Progress Bar */}
      <div className="bg-[#0A0A0A] px-6 py-8 border-b border-[#333333]">
        <div className="relative flex justify-between items-center max-w-2xl mx-auto">
          {/* Background Line */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-[#333333] z-0"></div>
          
          {/* Active Line */}
          <motion.div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#C9A84C] z-0"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentStep - 1) / 4) * 100}%` }}
            transition={{ duration: 0.5 }}
          ></motion.div>

          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;

            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-500 ${
                    isActive ? 'bg-[#111111] border-[#C9A84C] text-[#C9A84C] shadow-[0_0_15px_rgba(201,168,76,0.3)]' : 
                    isCompleted ? 'bg-[#C9A84C] border-[#C9A84C] text-[#0A0A0A]' : 
                    'bg-[#111111] border-[#333333] text-gray-500'
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <span className={`text-xs font-bold uppercase tracking-wider hidden md:block ${isActive ? 'text-[#C9A84C]' : isCompleted ? 'text-white' : 'text-gray-500'}`}>
                  {step.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="p-6 md:p-10 min-h-[400px] flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-grow"
          >
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-display font-bold text-white mb-6">Enter Trip Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Pickup Location</label>
                    <input type="text" className="w-full bg-[#1A1A1A] border border-[#333333] rounded-lg p-4 text-white focus:border-[#C9A84C] outline-none" placeholder="King Khalid Intl Airport" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Drop-off Location</label>
                    <input type="text" className="w-full bg-[#1A1A1A] border border-[#333333] rounded-lg p-4 text-white focus:border-[#C9A84C] outline-none" placeholder="Riyadh Boulevard" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Date & Time</label>
                    <input type="datetime-local" className="w-full bg-[#1A1A1A] border border-[#333333] rounded-lg p-4 text-white focus:border-[#C9A84C] outline-none [color-scheme:dark]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Passengers</label>
                    <select className="w-full bg-[#1A1A1A] border border-[#333333] rounded-lg p-4 text-white focus:border-[#C9A84C] outline-none">
                      <option>1 Passenger</option>
                      <option>2 Passengers</option>
                      <option>3-4 Passengers</option>
                      <option>5+ Passengers</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-display font-bold text-white mb-6">Select a Vehicle</h3>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { name: 'Mercedes S-Class', type: 'VIP', price: '800' },
                    { name: 'GMC Yukon', type: 'Business', price: '350' },
                    { name: 'Toyota Camry', type: 'Economy', price: '150' },
                  ].map((car) => (
                    <div key={car.name} className="flex flex-col md:flex-row justify-between items-center p-6 border border-[#333333] rounded-xl hover:border-[#C9A84C] cursor-pointer transition-colors group">
                      <div className="flex flex-col items-start gap-2 mb-4 md:mb-0 w-full md:w-auto">
                        <span className="bg-[#C9A84C]/20 text-[#C9A84C] text-xs font-bold px-2 py-1 rounded">{car.type}</span>
                        <h4 className="text-xl font-bold text-white font-display group-hover:text-[#C9A84C]">{car.name}</h4>
                      </div>
                      <div className="flex items-center justify-between w-full md:w-auto md:gap-8">
                        <div className="text-right">
                          <p className="text-gray-400 text-sm">Estimated Fare</p>
                          <p className="text-2xl font-bold font-numbers text-white group-hover:text-[#C9A84C]">SAR {car.price}</p>
                        </div>
                        <div className="w-6 h-6 rounded-full border-2 border-[#333333] group-hover:border-[#C9A84C] flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-display font-bold text-white mb-6">Passenger Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Full Name</label>
                    <input type="text" className="w-full bg-[#1A1A1A] border border-[#333333] rounded-lg p-4 text-white focus:border-[#C9A84C] outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Phone Number (WhatsApp)</label>
                    <div className="flex">
                      <span className="bg-[#0A0A0A] border border-[#333333] border-r-0 rounded-l-lg p-4 text-gray-400">+966</span>
                      <input type="tel" className="w-full bg-[#1A1A1A] border border-[#333333] rounded-r-lg p-4 text-white focus:border-[#C9A84C] outline-none" />
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm text-gray-400">Special Requests</label>
                    <textarea className="w-full bg-[#1A1A1A] border border-[#333333] rounded-lg p-4 text-white focus:border-[#C9A84C] outline-none h-32"></textarea>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-display font-bold text-white mb-6">Confirm & Pay</h3>
                <div className="bg-[#1A1A1A] border border-[#333333] rounded-xl p-6">
                  <div className="flex justify-between items-center mb-6 pb-6 border-b border-[#333333]">
                    <h4 className="text-lg font-bold text-white">Total Amount</h4>
                    <span className="text-3xl font-bold font-numbers text-[#C9A84C]">SAR 350</span>
                  </div>
                  <h5 className="font-bold text-gray-300 mb-4">Payment Method</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-[#C9A84C] bg-[#C9A84C]/10 rounded-lg p-4 cursor-pointer text-center font-bold text-white">
                      Pay with Mada / Credit Card
                    </div>
                    <div className="border border-[#333333] bg-[#0A0A0A] rounded-lg p-4 cursor-pointer text-center font-bold text-gray-400 hover:text-white hover:border-gray-500">
                      Pay Cash to Driver
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="flex flex-col items-center justify-center text-center py-12">
                <div className="w-24 h-24 rounded-full bg-[#25D366]/20 flex items-center justify-center mb-6 border-2 border-[#25D366]">
                  <Check className="w-12 h-12 text-[#25D366]" />
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-4">Booking Confirmed!</h3>
                <p className="text-gray-400 mb-8 max-w-md">
                  Your ride has been successfully booked. A confirmation has been sent to your WhatsApp.
                </p>
                <div className="bg-[#1A1A1A] px-8 py-4 rounded-lg border border-[#333333] mb-8">
                  <span className="text-sm text-gray-500 uppercase">Booking Reference</span>
                  <p className="text-2xl font-bold font-numbers text-[#C9A84C] tracking-widest mt-1">GTK-88492</p>
                </div>
                <div className="flex gap-4">
                  <Link 
                    href="/"
                    className={buttonVariants({ className: "bg-[#1A1A1A] hover:bg-[#333333] text-white border border-[#333333]" })}
                  >
                    Back to Home
                  </Link>
                  <Button className="bg-[#C9A84C] hover:bg-[#F0D080] text-black">
                    Track My Ride
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        {currentStep < 5 && (
          <div className="flex justify-between mt-auto pt-8 border-t border-[#333333]">
            <Button
              variant="ghost"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`text-gray-400 hover:text-white ${currentStep === 1 ? 'invisible' : ''}`}
            >
              <ChevronLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            <Button
              onClick={nextStep}
              className="bg-[#C9A84C] hover:bg-[#F0D080] text-black px-8"
            >
              {currentStep === 4 ? 'Confirm Booking' : 'Continue'} <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
