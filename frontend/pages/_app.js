import '../styles/globals.css'
import { ThemeProvider } from "@material-tailwind/react";
import AuthState from '../context/AuthState';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


let MyApp = ({ Component, pageProps }) => {
  
  return (
    <>
      <ThemeProvider>
        <input type="checkbox" id="friend" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <label htmlFor="friend" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <h3 className="text-lg font-bold">Congratulations Now Your Are </h3>
            <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light" />
        {/* Same as */}
        <AuthState>
          <Component {...pageProps} />
        </AuthState>
        <ToastContainer />
      </ThemeProvider>

    </>

  )
}

export default MyApp
