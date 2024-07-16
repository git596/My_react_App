import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import AdminDHome from './AdminDHome';
import AdminDCharts from './AdminDCharts';
import AdminDUsers from './AdminDUsers';
import AdminDItems from './AdminDItems';

const AdminDashboard = () => {
  const location = useLocation();
  const [currentContent, setCurrentContent] = useState("home");

  useEffect(() => {
    // Check if there's an initialComponent in the state passed by navigate
    if (location.state && location.state.initialComponent) {
      setCurrentContent(location.state.initialComponent);
    }
  }, [location.state]);

  return (
    <div className="flex flex-row h-screen w-screen ">

      
                {/* Sidebar items */}
      <div className='w-1/5 h-screen'>
      <div className="flex flex-1 flex-col gap-10 items-start h-full bg-gray-800 text-white py-4 px-2 pt-32">
          <button onClick={() => setCurrentContent("home")} className={`font-bold bg-gray-600 w-4/5 h-10 rounded-md hover:bg-gray-900 hover:text-white ${currentContent === "home" ? "bg-gray-900 text-white" : ""}`}>Home</button>
          <button onClick={() => setCurrentContent("charts")} className={`font-bold bg-gray-600 w-4/5 h-10 rounded-md hover:bg-gray-900 hover:text-white ${currentContent === "charts" ? "bg-gray-900 text-white" : ""}`}>Charts</button>
          <button onClick={() => setCurrentContent("users")} className={`font-bold bg-gray-600 w-4/5 h-10 rounded-md hover:bg-gray-900 hover:text-white ${currentContent === "users" ? "bg-gray-900 text-white" : ""}`}>Manage Users</button>
          <button onClick={() => setCurrentContent("items")} className={`font-bold bg-gray-600 w-4/5 h-10 rounded-md hover:bg-gray-900 hover:text-white ${currentContent === "items" ? "bg-gray-900 text-white" : ""}`}>Manage Items</button>
        </div>
      </div>

      

      <div className='flex flex-col flex-1 bg-blue-400 '>

          {/* Navbar */}
          <div  className='w-full'>
          <nav className="bg-indigo-900 text-white flex items-center justify-between h-20 m-1 rounded-md">

            <div className='pl-6 '>
                <h1 className="text-1xl md:text-2xl text-slate-800 dark:text-slate-100 font-bold mb-0">Hey, Admin. 👋</h1>
                <p className="dark:text-indigo-200">Here is what’s happening with your projects today:</p>
            </div>

            {/* <div className='pl-6'>
              <input
                type="text"
                placeholder="Type to search"
                className="text-black px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div> */}
            {/* <div className="h-8 w-8 bg-gray-500 rounded-full mr-5"></div> */}
          </nav>
          </div>

                <div className='overflow-x-auto'>
                  <div className=''>
                    {/* content */}
                    {currentContent === "home" && <AdminDHome />}
                    {currentContent === "charts" && <AdminDCharts />}
                    {currentContent === "users" && <AdminDUsers />}
                    {currentContent === "items" && <AdminDItems />}
                  </div>
                </div>

      </div>

    </div>
  );
};

export default AdminDashboard;
