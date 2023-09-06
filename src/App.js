import "./App.css";
import PaymentCard from "./Layout/PaymentCard";
import { NewAboutUs } from "./Pages/About/NewAboutUs";
import RouterComp from "./Routes/Routes";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    // <Home/>
    // <Portfolio/>
    // <Services/>
    // <Category/>
    // <Product/>
    // <Chat/>
    // <About_Flyses/>
    // <How_it_Work/>
    // <Logo_Design/>
    // <Orders/>
    // <Order_Status/>
    // <Requirement/>
    // <User_Profile/>
    <>
      <RouterComp />
      <a href="Chat" class="float-chat-button">
        <i class="fa fa-comments float-chat fa-2x"></i>
      </a>
      {/* <PaymentCard /> */}
    </>
    // <NewAboutUs />
  );
}

export default App;
