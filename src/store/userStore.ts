import { defineStore } from 'pinia'
import { Registered, Logged } from '../types/userType'

interface State {
    users: Registered[] | null
    userConnected: Logged | null
}

export const userStore = defineStore('user', {
    state: (): State => ({
        users: JSON.parse(localStorage.getItem('users') || '[]'),
        userConnected: JSON.parse(
            localStorage.getItem('userConnected') || 'null'
        ),
    }),
    getters: {},
    actions: {
        setNewUser(newUser: Registered) {
            this.users?.push(newUser)
            localStorage.setItem('users', JSON.stringify(this.users))
        },
        setUserConnecting(userConnecting: Logged) {
            this.userConnected = userConnecting
            localStorage.setItem(
                'userConnected',
                JSON.stringify(userConnecting)
            )
        },
        setUserDesconnection() {
            this.userConnected = null
            localStorage.removeItem('userConnected')
        },
    },
})
