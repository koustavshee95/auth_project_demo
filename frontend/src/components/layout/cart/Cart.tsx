import './Cart.css'

type CartProps = {
  children: React.ReactNode;
};

export const Cart = ({ children }: CartProps) => {
  return (
    <div className="cart">
      <div className="cart-header">
        <div className="cart-logo">ABCD</div>
      </div>
      {children}
    </div>
  );
};

