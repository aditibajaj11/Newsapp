import React ,{ useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



 const News = (props)=>{
  const[articles,setArticles]= useState([])
  const[loading,setLoading]= useState(true)
  const[page,setPage]= useState(1)
  const[totalResults,setTotalResults]= useState(0)
  

  const capitalizeFirstletter= (string)=>{
    return string.charAt(0).toUpperCase()+ string.slice(1);
  }
  const updatenews=async()=>{
    props.setProgress(10);
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=93549ac770d1467c9cc96f267549c58c&page=${page}&pageSize=${props.pageSize}`
    setLoading(true)
    let data=await fetch(url)
    props.setProgress(30);
    let parsedata=await data.json()
    props.setProgress(70);
    setArticles(parsedata.articles)
    setLoading(false)
    setTotalResults(parsedata.totalResults)

    props.setProgress(100);
  }

  //async componentDidMount(){
    //let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apikey}&page=1&pageSize=${props.pageSize}`
    //this.setState({loading:true});
   //props.setProgress(10)
    //let data=await fetch(url);
    //let parsedata=await data.json();
    //props.setProgress(100);
    //this.setState({articles: parsedata.articles , totalResults:parsedata.totalResults, loading:false});
  //}

  useEffect(()=>{
    //document.title=`${this.capitalizeFirstletter(props.category)} - NewsMonkey`;
    updatenews();
  },[])

  //const Handleprevious=async()=>{
    
    //setPage(page-1)
    //updatenews();
  
    //let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&country=${props.category}&apikey=93549ac770d1467c9cc96f267549c58c&page=${this.state.page -1}&pageSize=${props.pageSize}`;
    //let data=await fetch(url);
    //let parsedata=await data.json();
    //this.setState({loading:true});
   
    //this.setState({
      //page: this.state.page - 1,
      //articles: parsedata.articles ,
      //loading:false
     
    //});
  //}

  //const Handlenext=async()=>{

    //setPage(page+1)
    //updatenews();
    
    //if(!(this.state.page + 1> Math.ceil(this.state.totalResults/props.pageSize))){
    //let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&country=${props.category}&apikey=93549ac770d1467c9cc96f267549c58c&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
    //this.setState({loading:true})
    //let data=await fetch(url);
    //let parsedata=await data.json();
    //console.log(parsedata);
   
    //this.setState({
      //page: this.state.page + 1,
      //articles: parsedata.articles ,
      //loading:false
    //});
  //}



  
  const fetchMoreData = async() => {

    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`
    setPage(page+1)
    let data=await fetch(url);
    let parsedata=await data.json();
    setArticles(articles.concat(parsedata.articles))
    setTotalResults(parsedata.totalResults)
    };

 
    return (
      <>
      <h1 className='text-center' style={{margin:'37px 0px', marginTop:'90px'}}>NewsBuzz - Top {capitalizeFirstletter(props.category)} Headlines</h1>
      {loading&&<Spinner/>}

      <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults &&  articles.length < totalResults }
          loader={<Spinner/>}
        > 
        <div className='container'>
      <div className="row">
      {articles.map((element)=>{
        return  <div className="col-md-4"  key={element.url}>
         <NewsItem title={element.title?.slice(0,45)||""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage}
          newsUrl={element.url} date={element.publishedAt} source={element.source.name}/>
        </div>
      })}
      </div>
      </div>
      </InfiniteScroll>
      </>
    )
    }


News.defaultProps={
  country:'in',
  pageSize:6,
  category:'sports',
}
News.propTypes={
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category:PropTypes.string,
}

export default News

