
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./category.css"
import { BiSlideshow } from "react-icons/bi";
import { IoPricetagsOutline } from "react-icons/io5";

const category = ({ onHoverChange }) => {
    const [anime, setAnime] = useState([]);
    const [tags, setTags] = useState([]);

    

    useEffect(()=>{
        axios.get("http://localhost:3000/api/product/getAnime")
        .then(res => setAnime(res.data))
        .catch(err => console.log(err))
    },[])

    useEffect(()=>{
        axios.get("http://localhost:3000/api/product/getTags")
        .then(res => setTags(res.data))
        .catch(err => console.log(err))
    },[])








    return(

        <div className="category">
            <div className="anime"                
                onMouseEnter={() => onHoverChange(true, anime)}

                >
                <div 
                style={{width:'50px',display:"flex", flexDirection:'column',justifyContent:'center',alignItems:'center',fontSize:'20px'}}>
                <span>Anime</span>
                <BiSlideshow />
                </div>
                <div style={{gap:'20px',display:"flex",cursor:'pointer',flexWrap:'wrap'}}>
                {anime.slice(0,6).map(anime => (
                        <span
                        key={anime}
                        style={{

                            fontSize: '14px',
                            textAlign: 'center',
                        }}
                        >
                        {anime}
                        </span>
                    ))}

                </div>

            </div>
            <div className="tags"
                            onMouseEnter={() => onHoverChange(true, tags)}>
                <div style={{width:'70px',display:"flex", flexDirection:'column',justifyContent:'center',alignItems:'center',fontSize:'20px'}}>
                <span>Tag</span>
                <IoPricetagsOutline />
                </div>



                <div style={{gap:'20px',display:"flex",cursor:'pointer',flexWrap:'wrap'}}>                        
                    {tags.slice(0,6).map(tags => (
                        <span
                        key={tags}
                        style={{
                            fontSize: '14px',
                            textAlign: 'center',
                        }}
                        >
                        {tags}
                        </span>
                    ))} </div>
                

           
            </div>
        </div>

    )


}

export default category


