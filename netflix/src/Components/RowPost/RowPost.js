import React from 'react'
import './RowPost.css'
import { useEffect, useState } from 'react'
import axios from '../../axios'
import {API_KEY, imageUrl} from '../../Constants/Constants'
import Youtube from 'react-youtube'



function RowPost(props) {

  const[movies,setMovies] = useState([])
  const[urlid,setUrlId] = useState([])


  useEffect(()=>{

    axios.get(props.url).then((response)=>{
    setMovies(response.data.results)
    }).catch(err=>{
      alert('Network Error')
    })

  },[])

  const opts ={
    height:'390',
    width:'100%',
    playerVars:{
      autoplay:1,
    },
  };

  const handleMovie = (id)=>{

    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response)=>{
    if (response.data.results.length!=0){
      setUrlId(response.data.results[0])
    }else{
      console.log('No data')
    }
    })

  }
  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map((obj)=>

       
        <img onClick={()=>handleMovie(obj.id)} key={obj.id} className={props.isSmall?'smallPoster':'poster'} src={`${imageUrl+obj.backdrop_path}`} alt="poster" />
      )}
      </div>
    
   { urlid.length!=0 && <Youtube opts={opts} videoId={urlid.key}/>}
      
    </div>
  )
}

export default RowPost
