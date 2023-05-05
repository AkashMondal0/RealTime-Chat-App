import { db, storage } from '../pages/firebaseConfig'
import { addDoc, serverTimestamp, collection } from 'firebase/firestore'
import axios from 'axios';

const CreateMessage = async (data, room_Id) => {
    const messagesRef = collection(db, room_Id || "room id");
    await addDoc(messagesRef, data)
    return true
}

const UpdateUserChatList = async (UpdateUserList) => {
    await axios.put(process.env.apikey + `/conversation`, UpdateUserList)
    return true
}

const ChatApi = { CreateMessage ,UpdateUserChatList}
export default ChatApi;