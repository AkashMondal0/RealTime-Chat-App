// Upload file fire base
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../pages/firebaseConfig"

// upload file
const uploadFile = async (file) => {
    let ImgURL;
    const myPromise = new Promise((resolve, reject) => {
        const imageRef = ref(storage, `user_images/${file.name}`);
        const uploadTask = uploadBytesResumable(imageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
                console.log(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    // console.log('File available at', downloadURL);
                    resolve(downloadURL)
                })
            }
        )
    });
    await myPromise.then(res => { ImgURL = res }, reject => { console.log(reject) })
    return ImgURL
}

const uploadFileApi = {
    uploadFile
}

export default uploadFileApi