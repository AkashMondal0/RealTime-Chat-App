import { toast } from 'react-toastify';

const ChatSendSound = () => {
    const sentSound = new Audio("https://firebasestorage.googleapis.com/v0/b/next-chat-b2e58.appspot.com/o/sounds%2Fsent.mp3?alt=media&token=efe8a122-df02-43d8-938e-f4fd7c35bab6")
    sentSound.play()
}

const ErrorAlert = (message) => {
    toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}
 
const SuccessAlert = (message) => {
    toast.success(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}



const Alert = {
    ChatSendSound,
    ErrorAlert
}

export default Alert;
