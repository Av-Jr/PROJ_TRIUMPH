function GET_DATA(){
    return(
        fetch("/Data.json")
            .then(response => response.json())
            .then(data => data)
    )
}

export default GET_DATA