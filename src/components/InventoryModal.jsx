import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const InventoryModal = ({ show, onClose, inventory }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>🎒 Inventario</h2>
        
        {inventory.length === 0 ? (
          <p className="text-center">L'inventario è vuoto.</p>
        ) : (
          <div className="inventory-grid">
            {inventory.map((item, index) => (
              <div key={index} className="inventory-item">
                <img src={`/src/assets/inventory/${item.icon}`} alt={item.name} />
                <p>{item.name}</p>
                {item.quantity > 1 && <span className="quantity">{item.quantity}x</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryModal;
