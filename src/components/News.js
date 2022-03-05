import React, { useEffect,useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {
  const [articles, setArticles] = useState([]) ;
  const [page, setPage] = useState(1) ;
  const [totalResults, setTotalResults] = useState(0) ;
  const [loading, setLoading] = useState(true) ;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
   

  const updateArticles = async () => {
    props.setProgress(10);
    const  url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true) ;
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles) ;
    setTotalResults(parsedData.totalResults);
    setLoading(false) ;
    
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsEra`;
    updateArticles();
  }, [])
  

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1 ) ;
    setLoading(true) ;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles)) ;
    setTotalResults(parsedData.totalResults);
    setLoading(false) ;
  };
    return (
      <>
        <h1 className={`text-center text-${props.mode}`} style={{ margin: " 35px 0px" ,marginTop:"90px" }}>
          NewsEra - Top {capitalizeFirstLetter(props.category)}{" "}
          Headlines{" "}
        </h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length != totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row ">
              {articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem mode={props.mode} title={element.title ? element.title.slice(0, 45) : ""} newsUrl={element.url}  desc={ element.description ? element.description.slice(0, 88): ""} imgUrl={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name}/>
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  
}

News.defaultProps = {
  category: "general",
  pageSize: 5,
  country: "in",
};
News.propTypes = {
  category: PropTypes.string,
  pageSize: PropTypes.number,
  country: PropTypes.string,
};
export default News;
