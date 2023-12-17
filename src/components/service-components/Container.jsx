const Container = ({children, ...options}) => {
    return (
        <div {...options}>{children}</div>
    )
}

export default Container