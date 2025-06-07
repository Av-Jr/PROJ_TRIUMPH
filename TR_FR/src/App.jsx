import './App.css';
import { useState, useEffect, useRef } from 'react';
import GET_DATA from './GET_DATA.jsx';
import GET_DATA_Q from './GET_DATA_Q.jsx';

function App() {
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

    useEffect(() => {
        GET_DATA().then(data_got => {
            up_data(data_got);
            up_fil(data_got);
            up_it(data_got.map(item => item.Name));
        });
    }, []);

    GET_DATA_Q().then(data_got => {
        up_q(data_got); // ✅ correct for string array
    }, []);


    useEffect(() => {
        if (names_bikes.length === 0) return;

        const interval = setInterval(() => {
            up_index(prev => (prev + 1) % names_bikes.length);
        }, 2000);

        return () => clearInterval(interval); // cleanup
    }, [names_bikes.length]);

    useEffect(() => {
        if (quotes.length === 0) return;

        const interval = setInterval(() => {
            up_qi(q_index => (q_index + 1) % quotes.length);
        }, 5000);

        return () => clearInterval(interval); // cleanup
    }, [quotes.length]);

    function OnC(e) {
        const res = filt.filter(item => item.Name.toLowerCase().includes(e.target.value.toLowerCase()));
        const tr = filt.filter(item => !item.Name.toLowerCase().includes(e.target.value.toLowerCase()));
        up_toRem(tr.map(item => item.Name));

        setTimeout(() => {
            up_data(res);
            up_toRem([]);
        }, 1000); // ⬅ fixed: replaced setInterval with setTimeout
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

            <div className={`Main_Con ${sh_all ? '' : 'MC_shrink'}`}>
                <div className="Logo_Tr"></div>
                <div className="qBox">{quotes.length > 0 ? quotes[q_index] : "Loading quote..."}</div>

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
                        placeholder="SEARCH HERE....."
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
                                <div className="Data_Obj_Name">{item.Name.toUpperCase()}</div>
                                <div
                                    className="Data_Obj_Img"
                                    style={{backgroundImage: `url(${item.Image_urls})`}}
                                ></div>
                                <button className="BTN_moreInfo" onClick={() => {
                                    MI_exp(item);
                                }}>
                                    MORE
                                </button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default App;
