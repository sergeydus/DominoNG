const previousValueMap = <T>() => {
    let prev: T | null = null
    return (el: T) => {
        const res = { prev, current: el }
        prev = el
        return res
    }
}
export default previousValueMap