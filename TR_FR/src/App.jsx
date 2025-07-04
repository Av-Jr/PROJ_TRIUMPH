import './App.css';
import { useState, useEffect, useRef } from 'react';
import GET_DATA from './GET_DATA.jsx';
import GET_DATA_Q from './GET_DATA_Q.jsx';
import {useNavigate} from 'react-router-dom';
const verification_url = import.meta.env.VITE_API_verification_url;


function App() {
    const navigate = useNavigate();
    const getTriumphLink = (platform) => {
        let url = "";
        switch (platform) {
            case 'w':
                url = "https://www.triumphmotorcycles.in";
                break;
            case 'i':
                url = "https://www.instagram.com/officialtriumph/";
                break;
            case 'tw':
                url = "https://x.com/officialtriumph?lang=en";
                break;
            case 'yt':
                url = "https://www.youtube.com/@OfficialTriumph";
                break;
            default:
                url = "";
        }
        return url;
    };

    const open_l = (site) => {
        let val = "";
        switch(site){
            case 'i' :
                val = "www.instagram.com/aryanshvashishtha/";
                break;

            case 'l':
                val = "www.linkedin.com/in/aryansh-vashishtha-772337213/";
                break;
            case 'g':
                val="github.com/Av-Jr";
                break;
        }
        let url = `https://${val}`;
        return url;
    }

    const [showABTme, upABTme] = useState(false);
    const [bike_an, upBikean] = useState(false);
    const myRefs = useRef([]);
    const ref_empD = useRef(null);
    const [cloud_index, up_index] = useState(0);
    const [q_index, up_qi] = useState(0);
    const [names_bikes, up_it] = useState([]);
    const [quotes, up_q] = useState([]);
    const [data, up_data] = useState([]);
    const [filt, up_fil] = useState([]);
    const [toRemove, up_toRem] = useState([]);
    const [showCloud, up_cl] = useState(false);
    const [sh_all, up_sh] = useState(true);
    const [sh_emD, up_emD] = useState(false);
    const [itemObj_info, up_itemObjinfo] = useState({
        name: null, eng: null, CS: null, BS: null, FT: null,
        IU: null, Bio: null, ORP: null, ESP: null, wt: null
    });
    const [btn_name, up_btnname] = useState('LOGIN');
    const [show_logInfo, up_logInfo] = useState(false);

    useEffect(() => {
        const counter = setInterval(() =>{
            const saved_tok = localStorage.getItem("Saved_Token");
            if(saved_tok){
                fetch(verification_url, {
                    method : "POST",
                    headers : {"Authorization" : `Bearer ${saved_tok}`}
                })
                    .then(res => {
                        if(res.status === 200){
                            res.json().then(data => {
                                up_btnname(data.token_info.name);
                            })
                        }
                        else{
                            up_btnname("LOGIN");
                        }
                    })
            }
        }, 2000)
        return () => clearInterval(counter);
    }, [])


    useEffect(() => {
        GET_DATA().then(data_got => {
            up_data(data_got);
            up_fil(data_got);
            up_it(data_got.map(item => item.Name));
        });
    }, []);

    GET_DATA_Q().then(data_got => {
        up_q(data_got);
    }, []);


    useEffect(() => {
        if (names_bikes.length === 0) return;

        const interval = setInterval(() => {
            up_index(prev => (prev + 1) % names_bikes.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [names_bikes.length]);

    useEffect(() => {
        if (quotes.length === 0) return;

        const interval = setInterval(() => {
            up_qi(q_index => (q_index + 1) % quotes.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [quotes.length]);

    function OnC(e) {
        const res = filt.filter(item => item.Name.toLowerCase().includes(e.target.value.toLowerCase()));
        const tr = filt.filter(item => !item.Name.toLowerCase().includes(e.target.value.toLowerCase()));
        up_toRem(tr.map(item => item.Name));

        setTimeout(() => {
            up_data(res);
            up_toRem([]);
        }, 1000);
    }

    const MI_exp = (item_obj) => {
        up_emD(true);
        up_sh(false);
        up_itemObjinfo({
            name: item_obj.Name,
            eng: item_obj.Engine,
            CS: item_obj.Cooling_System,
            BS: item_obj.Braking_System,
            wt: item_obj.Weight,
            FT: item_obj.Fuel_Type,
            IU: item_obj.Image_urls,
            Bio: item_obj.Bio,
            ORP: item_obj.OnRoad_P,
            ESP: item_obj.ExShowroom_P
        });
    };

    var MI_shrink = () => {
        up_emD(false);
        up_sh(true);
        up_itemObjinfo({
            name: null,
            eng: null,
            CS: null,
            BS: null,
            wt: null,
            FT: null,
            IU: null,
            Bio: null,
            ORP: null,
            ESP: null
        });
    }

    const login_func = (e) => {
        e.preventDefault();
        console.log("btn clicked");
        const saved_token = localStorage.getItem("Saved_Token");
        if(!saved_token){
            setTimeout(() => {navigate("/login")}, 100);
        }
        else if(saved_token){
            fetch(verification_url, {
                method : "POST",
                headers : {"Authorization" : `Bearer ${saved_token}`}
            })
                .then(res => {
                    if(res.status === 401){
                        alert("User Login Expired..Please Login Again.");
                        localStorage.removeItem("Saved_Token");
                        navigate("/login");
                    }
                    else if(res.status !== 200){
                        res.text().then(msg => alert(msg));
                    }
                    else{
                        res.json().then(data => {up_btnname(data.token_info.name)})
                    }
                })
        }
    }

    return (
        <>
            <div
                className={`emptyCon ${sh_all ? "hide" : "DI_exp"}`}
                ref={ref_empD}
            >
                <button onClick={MI_shrink}>BACK</button>
                <div className="detailsGrid">
                    <div className="label">Name</div>
                    <div style={{textAlign: 'center'}}>:</div>
                    <div>{itemObj_info.name}</div>
                    <div className="label">Engine</div>
                    <div style={{textAlign: 'center'}}>:</div>
                    <div>{itemObj_info.eng}</div>
                    <div className="label">Cooling System</div>
                    <div style={{textAlign: 'center'}}>:</div>
                    <div>{itemObj_info.CS}</div>
                    <div className="label">Braking System</div>
                    <div style={{textAlign: 'center'}}>:</div>
                    <div>{itemObj_info.BS}</div>
                    <div className="label">Fuel Type</div>
                    <div style={{textAlign: 'center'}}>:</div>
                    <div>{itemObj_info.FT}</div>
                    <div className="label">Weight</div>
                    <div style={{textAlign: 'center'}}>:</div>
                    <div>{itemObj_info.wt} KG</div>
                    <div className="label">Bio</div>
                    <div style={{textAlign: 'center'}}>:</div>
                    <div>{itemObj_info.Bio}</div>
                    <div className="label">On Road Price</div>
                    <div style={{textAlign: 'center'}}>:</div>
                    <div>RS {itemObj_info.ORP}</div>
                    <div className="label">Ex Showroom Price</div>
                    <div style={{textAlign: 'center'}}>:</div>
                    <div>RS {itemObj_info.ESP}</div>
                </div>
                <div
                    className="Data_Obj_Img_more"
                    style={{backgroundImage: `url(${itemObj_info.IU})`}}
                ></div>
            </div>

            <div className={`cloudABTme ${showABTme ? "" : "hide"}`}>
                <div className={"abtME_tb"}>About<br/>the<br/>Dev:</div>
            </div>

            <div className={showABTme ? "bike_bg" : "hide"}>
                <div className={`tr_aboutme_transition ${bike_an ? "showABTmeAn" : "hideABTmeAn"}`}></div>
            </div>
            <div className="Socials" onMouseLeave={() => {
                upBikean(false);
                setTimeout(() => upABTme(false), 1000)
            }} onMouseEnter={() => {
                upBikean(true);
                upABTme(true)
            }
            }>
                <div className="So_AV" >AV</div>
                <div className="Ex_So">
                    <div className="So_Li" onClick={() => {window.open(open_l("l"), "_blank")}}></div>
                    <div className="So_Gi" onClick={() => {window.open(open_l("g"), "_blank")}}></div>
                    <div className="So_In" onClick={() => {window.open(open_l("i"), "_blank")}}></div>
                </div>
            </div>

            <button className="LI_btn" onClick={login_func} onMouseEnter={btn_name === "LOGIN" ? null : () => {up_logInfo(true)}} onMouseLeave={() => {up_logInfo(false)}}>{btn_name}</button>
            <div className={`LOGIN_INFO ${show_logInfo ? "show" : ""}`}>USER : {btn_name}</div>

            <div className="Logo_CON">
                <div className="Logo_Tr"></div>
                <div className="TR_Socials">
                    <div className="tr_w" style={{backgroundImage : `url("/tr_logo_so.png")`}} onClick={() => window.open(getTriumphLink("w"), "_blank")}></div>
                    <div className="tr_i" style={{backgroundImage : `url("/in_logo.png")`}} onClick={() => window.open(getTriumphLink("i"), "_blank")}></div>
                    <div className="tr_tw" style={{backgroundImage : `url("/tw_logo_s.png")`}} onClick={() => window.open(getTriumphLink("tw"), "_blank")}></div>
                    <div className="tr_yt" style={{backgroundImage : `url("/yt_logo_s.png")`}} onClick={() => window.open(getTriumphLink("yt"), "_blank")}></div>
                </div>
            </div>

            <div className={`Main_Con ${sh_all ? '' : 'MC_shrink'}`}>
                <div className="qBox">'{quotes.length > 0 ? quotes[q_index] : "Loading quote..."}'</div>
                <div className={`Cloud_Con ${showCloud ? 'FadeinDIV' : 'FadeoutDIV'}`}>
                    <div className="textBox">{names_bikes[cloud_index]}</div>
                    <div className="Data_Obj_Name">{itemObj_info.name ? itemObj_info.name.toUpperCase() : ''}</div>
                    <div
                        className="Data_Obj_Img"
                        style={{backgroundImage: `url(${itemObj_info.IU})`}}
                    ></div>
                </div>
                <div id="Search_Con" className={sh_all ? "show" : "hide"}>
                    <input
                        placeholder="   Search For Bikes Here...."
                        id="Search_Con_i"
                        onChange={OnC}
                        onMouseEnter={() => {
                            up_cl(true);
                        }}
                        onMouseLeave={() => {
                            up_cl(false);
                        }}
                    />
                </div>
                <div id="Scroll_Con" className={sh_all ? "show" : "hide"}>
                    {
                        data.map((item) => (
                            <div
                                className={`Data_Obj ${toRemove.includes(item.Name) ? 'FadeoutDIV' : 'FadeinDIV'}`}
                                key={item.Name}
                                ref={data => (myRefs.current[item.Name] = data)}
                            >
                                <div className="Data_Obj_Name">{item.Name}</div>
                                <div
                                    className="Data_Obj_Img"
                                    style={{backgroundImage: `url(${item.Image_urls})`}}
                                ></div>
                                <div className="BTN_moreInfo" onClick={() => {
                                    MI_exp(item);
                                }}>
                                    <div className="top_line"></div>
                                    <div className="bottom_line"></div>
                                    <div className="boxInfo">More Info</div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default App;