export default interface User{
    id: number
    name: string
    surname?: string
    email: string
    password: string
    role:string
    accepNotifications: boolean
}