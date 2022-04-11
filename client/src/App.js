import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';

const LazyCategory = lazy(()=> import('./components/Category'))
const LazyProduct = lazy(()=> import('./components/Products'))
const LazyHome = lazy(() => import('./components/Home'))
const LazyRegister = lazy(() => import ('./components/Register'))
function App() {
  return (
    <div className="App">
      <Suspense fallback={<h1>...loading</h1>}>
        <Router>
          <Routes>
            <Route path='/' exact element={<LazyHome/>} />
            <Route path='/category' exact element={<LazyCategory/>} />
            <Route path='/products' exact element={<LazyProduct/>} />
            <Router path ='/register' exact element={<LazyRegister/>} />
          </Routes>
        </Router>
      </Suspense>
      
    </div>
  );
}

export default App;
