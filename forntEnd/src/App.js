import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedAdmin from "./components/ProtectedAdmin";
import Error from "./components/Error";
import { ProductList } from "./pages/Product/productList";
import ProductDetail from "./pages/Product/ProductDetail";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Protected from "./components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  checkAuthAsync,
  selectLoggedInUser,
  selectUserChecked,
} from "./pages/auth/authSlice";
import { fetchItemsByUserIdAsync } from "./pages/Cart/CartSlice";
import Order from "./pages/Order/order";
import UserOrder from "./pages/User/userOrder";
import UserProfile from "./pages/User/userProfile";
import { fetchLoggedInUserAsync } from "./pages/User/userSlice";
import SignOut from "./pages/auth/signOut";
import ForgetPassword from "./pages/auth/ForgotPassword";
import AdminProductDetail from "./pages/Admin/AdminProductDetail";
import AdminProductList from "./pages/Admin/AdminproductList";
import ProductForm from "./pages/Admin/ProductForm";
import AdminOrder from "./pages/Admin/AdminOrder";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import ResetPassword from "./pages/auth/ResetPassword";

function App() {
  const options = {
    timeout: 5000,
    position: positions.BOTTOM_LEFT,
  };
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userChecked = useSelector(selectUserChecked);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync());
      // we can get req.user by token on backend so no need to give in front-end
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch, user]);
  return (
    <>
      {userChecked && (
        <Provider template={AlertTemplate} {...options}>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route
                path="/admin"
                exact
                element={
                  <ProtectedAdmin>
                    <AdminProductList />
                  </ProtectedAdmin>
                }
              />
              <Route
                path="/admin/orders"
                exact
                element={
                  <ProtectedAdmin>
                    <AdminOrder />
                  </ProtectedAdmin>
                }
              />
              <Route
                path="/admin/product-detail/:id"
                exact
                element={
                  <ProtectedAdmin>
                    <AdminProductDetail />
                  </ProtectedAdmin>
                }
              />
              <Route
                path="/admin/product-form"
                exact
                element={
                  <ProtectedAdmin>
                    <ProductForm />
                  </ProtectedAdmin>
                }
              />
              <Route
                path="/admin/product-form/edit/:id"
                exact
                element={
                  <ProtectedAdmin>
                    <ProductForm />
                  </ProtectedAdmin>
                }
              />
              <Route path="/" exact element={<ProductList />} />
              <Route
                path="product-detail/:id"
                exact
                element={
                  <Protected>
                    <ProductDetail />
                  </Protected>
                }
              />
              <Route path="login" exact element={<Login />} />
              <Route path="signup" exact element={<Signup />} />
              <Route path="signOut" exact element={<SignOut />} />
              <Route
                path="/forgot-password"
                exact
                element={<ForgetPassword />}
              />
              <Route
                path="/reset-password"
                exact
                element={<ResetPassword />}
              />
              <Route
                path="cart"
                exact
                element={
                  <Protected>
                    <Cart />
                  </Protected>
                }
              />
              <Route
                path="/checkout"
                exact
                element={
                  <Protected>
                    <Checkout />
                  </Protected>
                }
              />
              <Route
                path="/orders"
                exact
                element={
                  <Protected>
                    <UserOrder />{" "}
                  </Protected>
                }
              />
              <Route
                path="/profile"
                exact
                element={
                  <Protected>
                    <UserProfile />
                  </Protected>
                }
              />
              <Route path="/order-success/:id" exact element={<Order />} />
              <Route path="*" exact element={<Error />} />
            </Routes>
          </BrowserRouter>
        </Provider>
      )}
    </>
  );
}

export default App;

// npx json-server --watch -p 8080 db.json
// npm install --save react-alert react-alert-template-basic --force
// https://mhnpd.github.io/react-loader-spinner/docs/intro/
// stripe is ban in pakistan. i skip this lecture. in future, if you need then watch coder dost tutorial.
