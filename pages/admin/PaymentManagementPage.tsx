import React, { useState, useEffect } from 'react';
import { Payment } from '../../types';
import * as api from '../../services/api';

const PaymentManagementPage: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.adminGetPayments()
      .then(setPayments)
      .catch(err => console.error("Failed to fetch payments", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading payments...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-dark mb-6">Payment Management</h1>
      <div className="bg-white shadow-md rounded-lg border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.map((p) => (
                <tr key={p.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">{p.transactionId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.userEmail}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.amount} {p.currency}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${p.status === 'succeeded' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(p.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </div>
  );
};

export default PaymentManagementPage;
