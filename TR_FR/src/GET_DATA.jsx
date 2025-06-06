function GET_DATA(){
    return(
        fetch("http://localhost:4000/data")
            .then(response => response.json())
            .then(data => data)
    )
}

export default GET_DATA