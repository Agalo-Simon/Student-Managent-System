import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "./context/ThemeContext"
import RegistrationFrom from "./pages/RegistrationFrom"
import Confirmation from "./pages/Confirmation"
import StudentList from "./pages/StudentList"
import CourseDetails from "./pages/CourseDetails"
import Course from "./pages/Course"
import NotFound from "./pages/404"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"


const App = () =>  (
    <ThemeProvider>
    <BrowserRouter>
      <div className="min-h-screen bg-white text-black dark:bg-slate-900 dark:text-white">
      <Navbar/>
      <main className="max-auto">
        <Routes>
          <Route path="/" element={<RegistrationFrom/>}/>
          <Route path="/confirmation" element={<Confirmation/>}/>
          <Route path="/students" element={<StudentList/>}/>
          <Route path="/course" element={<Course/>}/>
          <Route path="/course/:courseName" element={<CourseDetails/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
      </div>
    </BrowserRouter>
    </ThemeProvider>
  )

export default App