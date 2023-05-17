import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import moment from "moment";

const Players = () => {
  const [data,setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    async function getData() {
        const values = await fetch('https://api.npoint.io/20c1afef1661881ddc9c');
        const response = await values.json();
        const searchData = response.playerList.filter(value => value.PFName.toLowerCase().includes(searchValue.toLowerCase())) || response.playerList.filter(value => value.TName.toLowerCase().includes(searchValue.toLowerCase()))
        setData(searchData);
        console.log(searchData)
    }

    getData();
    
  },[searchValue]);

  return (
    <div>
        <input type="text" placeholder='Search' className='searchInput' onChange={(e) => setSearchValue(e.target.value)} value={searchValue}></input>
        <div className='grid'>
        {
                data.sort((a, b) => a.PFName > b.PFName ? 1 : -1).map((element,index) => {
                    return(
                        <div className='item'>
                            {/* <img src={require('./player-images/'+element.Id+'.jpg')} alt="img" /> */}
                            <img src={require('./player-images/'+element.Id+'.jpg')} alt="img" />
                            <p>{element.PFName}</p>
                            <p>{element.SkillDesc}</p>
                            <p>${element.Value}</p>
                            <p>
                                { element.UpComingMatchesList[0].CCode != "" && element.UpComingMatchesList[0].VsCCode != "" ? element.UpComingMatchesList[0].CCode + element.UpComingMatchesList[0].VsCCode : "" }
                            </p>
                            <p>
                                { element.UpComingMatchesList[0].MDate != "" ?
                                    new Date(element.UpComingMatchesList[0].MDate).getDate()+"-"+new Date(element.UpComingMatchesList[0].MDate).getMonth() + 1+"-"+
                                    new Date(element.UpComingMatchesList[0].MDate).getFullYear()+new Date(element.UpComingMatchesList[0].MDate).getUTCHours()+":"+
                                    new Date(element.UpComingMatchesList[0].MDate).getUTCMinutes()+":"+new Date(element.UpComingMatchesList[0].MDate).getUTCSeconds() :
                                    ""
                                }
                            </p>
                        </div>
                    )
                })
            }
        </div> 
    </div>
  )
}

export default Players