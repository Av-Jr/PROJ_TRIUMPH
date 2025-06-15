import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const login_url = import.meta.env.VITE_API_login_url;

const LogInPage = () => {
    const navigate = useNavigate();
    const handleClick = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get("username");
        const password = formData.get("password");

        fetch(login_url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "un" : username, "pw" : password }),
        })
            .then(res => {
                if(res.status !== 200) {
                    toast("Fuck OFF, It's for AV only!");
                    return
                }
                res.json().then(data => {
                    if(data.sent_token){
                        localStorage.setItem("Saved_Token", data.sent_token);
                        toast("Token Saved Locally");
                        setTimeout(() => navigate("/"), 2000);
                    }
                    else{
                        toast('did not get the token');
                    }
                })
            })
    }
    return(
        <>

            <div className="Login_BOX">
                <form onSubmit={handleClick}>
                    <input type="text" name="username" placeholder="USER : " />
                    <input type="password" name="password" placeholder="PASS : " />
                    <button type="submit">LOGIN</button>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}

export default LogInPage;