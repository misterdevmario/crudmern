import { HomePage, NotFound, PostForm } from "./pages";
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="bg-neutral-900 min-h-screen flex items-center text-white"> 
      <div className="px-10 m-auto container ">
      
       <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new" element={<PostForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
       
      </div>
    </div>
  );
}

export default App;
