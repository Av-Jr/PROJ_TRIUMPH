function GET_DATA(){
    return(
        fetch("https://proj-triumph.onrender.com/data")
            .then(response => response.json())
            .then(data => data)
    )
}

export default GET_DATA
