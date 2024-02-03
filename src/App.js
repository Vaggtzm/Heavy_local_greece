import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Articles from './pages/Articles/articles'
import Gallery from './pages/Gallery/Gallery';
import Lioneye from './pages/articles/lioneye';
import StartTheMonkey from './pages/articles/StM';
import ScentOfThorns from './pages/articles/Scent';
import Infliction from './pages/articles/infliction';
import Yothiria from './pages/articles/yothiria';
import Vapa from './pages/articles/vapa';
import Reka from './pages/articles/reka'
import Klage from './pages/articles/klage'
import Akral from './pages/articles/akral';
import Chronicle01 from './pages/articles/chronicle-01';
import DefaultArticle from './compoments/GenericArticle/GenericArticle';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
        <Routes>
      <Route path='/' element ={<Home/>}/>
      <Route path='/articles-page' element={<Articles />} />
      <Route path='/Art-Gallery-page' element={<Gallery />} />
      <Route path='/lioneye-archive' element={<Lioneye/>}/>
      <Route path='/Start_the_monkey-archive' element={<StartTheMonkey />}/>
      <Route path='/Scent_of_thorns-archive' element={<ScentOfThorns />}/>
      <Route path='/Beasts_of_satan-archive' element={<Infliction/>}/>
      <Route path='/Yothiria_live_203-archive' element={<Yothiria />}/>
      <Route path='/Vapa_flawless_world-archive' element={<Vapa />}/>
      <Route path='/Reka-archive' element={<Reka />}/>
      <Route path='/Klage-archive' element={<Klage />}/>
      <Route path='/Akral-necrosis_archive' element={<Akral />}/>
      <Route path='/Chronicles_of_the_underworld_part01-archive' element={<Chronicle01 />}/>
      <Route path='/article/:name' element={<DefaultArticle/>}/>
      
    </Routes>

    </>
  );
}

export default App;
