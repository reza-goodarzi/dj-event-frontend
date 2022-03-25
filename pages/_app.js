import "../styles/globals.css";
import { AuthProvider } from "../context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ToastContainer />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
