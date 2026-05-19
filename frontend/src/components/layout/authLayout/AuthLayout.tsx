import "./authLayout.css";
import { Cart } from "../cart/Cart";
import { LoginPage } from "../../../pages/login/LoginPage";
import { Footer } from "../../common/footer/Footer";
import { CompanyBranding } from "../../common/companyBranding/CompanyBranding";

export const AuthLayout = () => {
  return (
    <div className="authLayout">
      <div className="leftSection">
        <CompanyBranding />
        <Footer />
      </div>
      <div className="rightSection"></div>
      <div className="cardWrapper">
        <Cart>
          <LoginPage />
        </Cart>
      </div>
    </div>
  );
};
