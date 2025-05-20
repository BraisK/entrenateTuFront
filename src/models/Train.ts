import Rate from "./Rate"

export default interface Train{
    id: number
    title: string
    description: string
    active: boolean
    published: string
    expired: string
    idUserCreator: number
    rates?: Rate[]
}