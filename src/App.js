import axios from 'axios';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="wrapper">
          <DisplayArticleIds />
        </div>
      </header>
    </div>
  );
}

//define api request addresses
export const ArticleIds = "https://hacker-news.firebaseio.com/v0/topstories.json";
export const Articles = "https://hacker-news.firebaseio.com/v0/";


// get ids of all articles to display
export const GetArticleIds = async () => {
  const response = await axios.get(ArticleIds).then(({data}) => data); // makes response an object, not primitive, returns react child error
  console.log(response);
  return response;
}

// get data from ids 
export const GetArticleFromIds = async (alsothing) => {
  const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${alsothing}.json`).then(({data}) => data);
  console.log(response);
  return response;
}

// display ids
export const DisplayArticleIds = () => {
  const [ids, setIds] = useState([]);
  const FirstFive = ids.slice(0,5);

  useEffect(() => {
    GetArticleIds().then(data => setIds(data));
  }, [])


  return (
    <>
      {/* display ids */}
      {FirstFive.map(ids => <div key={ids} className="ids">{`this is id #${ids}`}</div>)}
      {/* use ids to call function to call api function */}
      {FirstFive.map(ids => <DisplayArticleFromIds key={ids} thing={ids} />)}
    </>
  );
}

export const DisplayArticleFromIds = ({thing}) => {
  const [articles, setArticles] = useState([]);
  console.log(thing);

  useEffect(() => {
    GetArticleFromIds(thing).then(data => data && setArticles(data));
  }, [])

  console.log(articles);

  return (
    <>
    <br />
    <a href={articles.url}>{articles.title}</a>
    </>
  );
}

export default App;
