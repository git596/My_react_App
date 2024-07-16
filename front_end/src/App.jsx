import React from "react";

import Nav from "./components/nav";
import Login from "./components/Login";
import About from "./components/About";
import NewestDeals from "./components/NewestDeals";
import BestDeals from "./components/BestDeals";
import Footer from "./components/Footer";

import {Routes, Route, BrowserRouter} from "react-router-dom";

import Registration from "./components/Registration";
import Hero from "./components/Hero";
import RegSuccess from "./components/RegSuccess";
import LoginSuccess from "./components/LoginSuccess";
import Contact from "./components/Contact";
import FileUpload from "./components/FileUpload";
import Services from "./components/Services";
import Items from "./components/Items";
import HomeNav from "./components/HomeNav";
import OurTeam from "./components/OurTeam";
import HNewestDeals from "./components/HNewestDeals";
import AdminDashboard from "./components/AdminDashboard";
import AdminDHome from "./components/AdminDHome";
import AdminDCharts from "./components/AdminDCharts";
import AdminDUsers from "./components/AdminDUsers";
import CreateUser from "./components/CreateUser";
import CreateItem from "./components/CreateItem";
import ViewUser from "./components/ViewUser";
import ViewItem from "./components/ViewItem";
import EditUser from "./components/EditUser";
import EditItem from "./components/EditItem";
import Addtocart from "./components/Addtocart";

import Newnav from "./components/Newnav";

// import UploadImage from "./components/UploadImage";         //newly added on 20th Monday
// import DisplayImages from "./components/DisplayImages";     //newly added on 20th Monday

import ItemSet from "./components/ItemSet";   //this is the item set displayed in the web page

import UploadDocument from "./components/UploadDocument";
import DocumentList from "./components/DocumentList";
import GenerateReceipt from './components/GenerateReceipt';

import PrintingForm from "./components/PrintingForm";
import LaminatingForm from "./components/LaminatingForm";
import TypesettingForm from "./components/TypeSettingForm";

import UploadSuccess from "./components/UploadSuccess";
import WorkProgressTable from "./components/WorkProgressTable";

import ItemDetails from "./components/ItemDetails";
import Cart from "./components/Cart";
import Messages from "./components/Messages";
import AllMessages from "./components/AllMessages";
import UpdateItemQuantity from "./components/UpdateItemQuantity";

import Checkout from "./components/Checkout";
import Success from "./components/Success";
import Cancel from "./components/Cancel";


function App() {
  return (
    <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<>
          <HomeNav/>
          <Hero/>
          <HNewestDeals/>
          <BestDeals/>
          <Footer/>
          </>}/>

          <Route path="/Home" element={<>
          <HomeNav/>
          <Hero/>
          <HNewestDeals/>
          <BestDeals/>
          <Footer/>
          </>}/>
          
          <Route path="/Landing" element={<>
          <Nav/>
          <Hero/>
          <NewestDeals/>
          <BestDeals/>
          <Footer/>
          </>}/>
          
          <Route path="/Login" element={<>
          <HomeNav/>
          <Login/>
          <Footer/>
          </>}/>
          
          <Route path="/Registration" element={<>
          <HomeNav/>
          <Registration/>
          <Footer/>
          </>}/>
          
          <Route path="/About" element={<>
          <Nav/>
          <About/>
          <Footer/>
          </>}/>

          <Route path="/Services" element={<>
          <Nav/>
          <NewestDeals/>
          {/* <Services/> */}
          <Footer/>
          </>}/>

          <Route path="/TypeSetting" element={<>
          <Nav/>
          <TypesettingForm/>
          <Footer/>
          </>}/>

          <Route path="/Laminating" element={<>
          <Nav/>
          <LaminatingForm/>
          <Footer/>
          </>}/>

          <Route path="/Printing" element={<>
          <Nav/>
          <PrintingForm/>
          <Footer/>
          </>}/>

          <Route path="/WorkProgressTable" element={<>
          <Nav/>
          <WorkProgressTable/>
          <Footer/>
          </>}/>

          <Route path="/Contact" element={<>
          <Nav/>
          <Contact/>
          <Footer/>
          </>}/>

          <Route path="Items" element={<>
          <Nav/>
          {/* <Newnav/> */}
          <ItemSet/>
          {/* <NewestDeals/> */}
          {/* <ChargerCarousel/> */}
          <Footer/>
          </>}/>

          <Route path="/item/:itemId" element={<>
          <Nav/>
          <ItemDetails/>
          <Footer/>
          </>}/>

          <Route path="/cart" element={<>
          <Nav/>
          <Cart/>
          <Footer/>
          </>}/>

          <Route path="/Checkout" element={<Checkout/>}/>
          <Route path="/Success" element={<Success/>}/>
          <Route path="/Cancel" element={<Cancel/>}/>

          
          <Route path="/Admin" element={<>
          <Nav/>
          <AdminDashboard/>
          <Footer/>
          </>}/>

          <Route path="/CreateUser" element={<>
          <Nav/>
          <CreateUser/>
          <Footer/>
          </>}/>

          <Route path="/CreateItem" element={<>
          <Nav/>
          <CreateItem/>
          <Footer/>
          </>}/>

          <Route path="/UpdateItemQuantity" element={<>
          <Nav/>
          <UpdateItemQuantity/>
          <Footer/>
          </>}/>
          {/* <Route path="/UpdateItemQuantity" element={<UpdateItemQuantity/>}/> */}


          <Route path="/DocumentList" element={<>
          <Nav/>
          <DocumentList/>
          <Footer/>
          </>}/>

          {/* <Route path="/generate-receipt/:documentId" component={GenerateReceipt} /> */}
          <Route path="/generate-receipt/:documentId" element={<>
            <Nav/>
            <GenerateReceipt/>
            <Footer/>
          </>}/>

          <Route path="/Messages" element={<>
          <Nav/>
          <Messages/>
          <Footer/>
          </>}/>

          <Route path="/AllMessages" element={<>
          <Nav/>
          <AllMessages/>
          <Footer/>
          </>}/>

          {/* <Route path="/Messages" element={<Messages/>}/> */}

          {/* <Route path="/AllMessages" element={<AllMessages/>}/> */}

          
          <Route path="/RegSuccess" element={<RegSuccess/>}/>
          <Route path="/LoginSuccess" element={<LoginSuccess/>}/>
          <Route path="/FileUpload" element={<FileUpload/>}/>
          <Route path="/OurTeam" element={<OurTeam/>}/>
          <Route path="/HNewestDeals" element={<HNewestDeals/>}/>
          <Route path="/AdminDHome" element={<AdminDHome/>}/>
          <Route path="/AdminDCharts" element={<AdminDCharts/>}/>
          <Route path="/AdminDUsers" element={<AdminDUsers/>}/>
      
          {/* <Route path="/ViewUser" element={<ViewUser/>}/> */}
          <Route path="/ViewUser/:userId" element={<ViewUser />} />  
          <Route path="/ViewItem/:itemId" element={<ViewItem />} />

          <Route path="/EditUser/:userId" element={<EditUser />} />

          <Route path="/EditItem/:itemId" element={<EditItem />} />

          {/* <Route path="/Newnav" element={<Newnav/>}/> */}
          {/* <Route path="Hero" element={<Hero/>}/> */}
          <Route path="/NewestDeals" element={<NewestDeals/>}/>
          {/* <Route path="/BestDeals" element={<BestDeals/>}/> */}

          <Route path="/Addtocart" element={<Addtocart/>}/>

          {/* <Route path="/DisplayImages" element={<DisplayImages/>}/> */}
          {/* <Route path="UploadImage" element={<UploadImage/>}/>             */}


          {/* <Route path="/UploadDocument" element={<UploadDocument/>}/> */}
          <Route path="/UploadSuccess" element={<UploadSuccess/>}/>

          
          
          
          
          

        </Routes>
    </BrowserRouter>     
  );
};

export default App;
