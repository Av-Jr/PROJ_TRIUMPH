function GET_DATA() {
    return fetch("http://localhost:4000/Data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch data.json");
            }
            return response.json();
        })
        .then(data => data);
}

export default GET_DATA;
