import './Cart.css'

type CartProps = {
  children: React.ReactNode;
};

export const Cart = ({ children }: CartProps) => {
  return <div className="cart">{children}</div>;
};

