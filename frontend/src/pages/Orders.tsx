import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Clock, CheckCircle, ChevronRight } from 'lucide-react';
import { Order } from '../types';

const Orders = () => {
    // Mock data for orders
    const orders: Order[] = [
        { id: 'CMD-001', pharmacy: 'Pharmacie du Centre', date: '20 Mai 2026', total: '15,000 FCFA', status: 'Livré' },
        { id: 'CMD-002', pharmacy: 'Pharmacie Saint-Jean', date: '22 Mai 2026', total: '8,500 FCFA', status: 'En préparation' },
    ];

    return (
        <div className="orders-page container">
            <div className="section-header">
                <h1>Mes Commandes</h1>
                <p>Suivez l'état de vos réservations et achats.</p>
            </div>

            <div className="orders-list">
                {orders.map((order, index) => (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        key={order.id}
                        className="order-card glass"
                    >
                        <div className="order-main">
                            <div className="order-icon">
                                <ShoppingBag size={24} />
                            </div>
                            <div className="order-info">
                                <h3>Commande {order.id}</h3>
                                <p>{order.pharmacy} • {order.date}</p>
                            </div>
                        </div>

                        <div className="order-meta">
                            <div className="order-total">{order.total}</div>
                            <div className={`order-status ${order.status === 'Livré' ? 'status-green' : 'status-orange'}`}>
                                {order.status === 'Livré' ? <CheckCircle size={14} /> : <Clock size={14} />}
                                {order.status}
                            </div>
                            <ChevronRight size={20} className="arrow" />
                        </div>
                    </motion.div>
                ))}
            </div>

            <style>{`
        .orders-page { padding: 60px 20px; }
        .orders-list { display: flex; flex-direction: column; gap: 20px; max-width: 800px; margin: 0 auto; }
        
        .order-card {
          padding: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .order-card:hover { transform: scale(1.01); }

        .order-main { display: flex; align-items: center; gap: 20px; }
        .order-icon {
          width: 48px;
          height: 48px;
          background: rgba(0, 206, 138, 0.1);
          color: var(--primary);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .order-info h3 { font-size: 1.1rem; margin-bottom: 4px; }
        .order-info p { font-size: 0.9rem; color: var(--text-muted); }

        .order-meta { display: flex; align-items: center; gap: 30px; }
        .order-total { font-weight: 700; color: var(--secondary); }
        
        .order-status {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .status-green { background: rgba(0, 206, 138, 0.1); color: var(--primary); }
        .status-orange { background: rgba(255, 171, 0, 0.1); color: #ffab00; }
        
        .arrow { color: var(--text-muted); }

        @media (max-width: 600px) {
          .order-card { flex-direction: column; align-items: flex-start; gap: 20px; }
          .order-meta { width: 100%; justify-content: space-between; }
        }
      `}</style>
        </div>
    );
};

export default Orders;
