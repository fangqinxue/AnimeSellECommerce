
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./category.css"

const category = () => {
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
            <div className="anime"><span>Anime</span>
                    {anime.slice(0,4).map(anime => (
                        <span
                        key={anime}
                        style={{
                            padding: '6px 12px',
                            backgroundColor: '#e0e0e0',
                            borderRadius: '16px',
                            fontSize: '14px',
                            textAlign: 'center'
                        }}
                        >
                        {anime}
                        </span>
                    ))}
        </div>
            <div className="tags"><span>Tag</span>
                        {tags.slice(0,4).map(tags => (
                        <span
                        key={tags}
                        style={{
                            padding: '6px 12px',
                            backgroundColor: '#e0e0e0',
                            borderRadius: '16px',
                            fontSize: '14px',
                            textAlign: 'center',
                        }}
                        >
                        {tags}
                        </span>
                    ))}            
            </div>
        </div>

    )


}

export default category


