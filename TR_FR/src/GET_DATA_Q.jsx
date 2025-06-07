function GET_DATA_Q(){
    return(
        fetch("./Quotes.json")
            .then(res => res.json())
            .then(data => data)
    )
}


export default GET_DATA_Q;