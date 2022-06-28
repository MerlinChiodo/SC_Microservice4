import { defineStore } from 'pinia'

export const useCurrentUserStore = defineStore({
    id: 'currentUser',
    state: () => ({
        id: null,
        smartcity_id: null,
        user_session_token: localStorage.getItem("user_session_token"),
        user: null,
        isUserLoggedIn : false
    })
})
