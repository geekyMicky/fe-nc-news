import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import './assets/App.css';
import ArticleList from './components/ArticleList.jsx';
import ArticleDetail from './components/ArticleDetail.jsx';
import Home from './components/Home.jsx';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:articleId" element={<ArticleDetail />} />
      </Routes> 
      <Footer />
    </>
  );
}

export default App
