import Rate from "./Rate"
import User from "./User"

export default interface Train{
    id: number
    title: string
    description: string
    active: boolean
    published: string
    expired: string
    idUserCreator: number
    userCreator?: User
    rates?: Rate[]
    publico: boolean
}