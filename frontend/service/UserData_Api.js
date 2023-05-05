import axios from 'axios'

// user all friend list
const fetchFriends = async (UserId) => {
    // fetch friends list
    const friend = await axios.get(process.env.apikey + `/conversation/${UserId}`)

    // sort friends list by last message
    let sorting = friend.data.sort(function (a, b) {
        var dateA = new Date(a.updatedAt).getTime();
        var dateB = new Date(b.updatedAt).getTime();
        return dateA > dateB ? 1 : -1;
    }).reverse()

    return sorting
}

// search all friend
let fetchUser = async (AuthorId) => {
    const user = await axios.get(process.env.apikey + `/users/alluser`)
    let hideMyId = user.data.filter((item) => {
        if (item._id !== AuthorId) {
            return item
        }
    })
    let availableUser = hideMyId.filter((item) => {
        if (!item.chatting.includes(AuthorId)) {
            return item
        }
    })
    return availableUser
}

// search user
const searchUser = async (AuthorId, searchInput) => {
    const user = await axios.get(process.env.apikey + `/users/search/${searchInput}`)
    let hideMyId = user.data.filter((item) => {
        if (item._id !== AuthorId) {
            return item
        }
    })
    let availableUser = hideMyId.filter((item) => {
        if (!item.chatting.includes(AuthorId)) {
            return item
        }
    })
    return availableUser
}
// update user data
const updateUserData = async (id, data) => {
    try {
        const res = await axios.put(process.env.apikey + `/users/update/${id}`, data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

const UserDataApi = { fetchFriends, fetchUser, searchUser, updateUserData }
export default UserDataApi