import React, { useState } from 'react';
import { BkashIcon } from './ui/Icons';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onPaymentSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing delay
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm flex flex-col transform transition-transform duration-300 scale-95 animate-slideUp">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Complete Your Payment</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-2xl" disabled={isProcessing}>&times;</button>
        </div>
        <div className="p-8 flex flex-col items-center gap-4">
            <p className="text-gray-600">To download your CV, please complete the payment.</p>
            <div className="text-center bg-gray-100 p-4 rounded-lg w-full">
                <p className="text-sm text-gray-500">Amount to Pay</p>
                <p className="text-4xl font-bold text-gray-800">10 BDT</p>
            </div>
          
            <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-[#e2136e] hover:bg-[#c0105c] text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-3 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-wait"
            >
                {isProcessing ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                    </>
                ) : (
                    <>
                        <BkashIcon className="w-7 h-7" />
                        <span>Pay with bKash</span>
                    </>
                )}
            </button>
            <p className="text-xs text-gray-400 mt-2">This is a simulated payment for demonstration.</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
