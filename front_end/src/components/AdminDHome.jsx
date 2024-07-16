import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WelcomeBanner from './WelcomeBanner';
import { Link, useNavigate } from 'react-router-dom';

const AdminDHome = () => {
  const [totalSignUps, setTotalSignUps] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalSales, setTotalSales] = useState(0); 
  const [documentProcessing, setDocumentProcessing] = useState({ printing: 0, laminating: 0, typesetting: 0 });
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchTotalSignUps = async () => {
      try {
        const response = await axios.get('http://localhost:3001/total_signups');
        setTotalSignUps(response.data.total_signups);
      } catch (error) {
        console.error('Error fetching total sign-ups:', error);
      }
    };

    const fetchTotalRevenueAndSales = async () => {
      try {
        const response = await axios.get('http://localhost:3001/total_revenue_and_sales');
        setTotalRevenue(response.data.total_revenue);
        setTotalSales(response.data.total_sales);
      } catch (error) {
        console.error('Error fetching total revenue and sales:', error);
      }
    };

    const fetchDocumentProcessing = async () => {
      try {
        const response = await axios.get('http://localhost:3001/document_processing');
        setDocumentProcessing(response.data);
      } catch (error) {
        console.error('Error fetching document processing data:', error);
      }
    };

    fetchTotalSignUps();
    fetchTotalRevenueAndSales();
    fetchDocumentProcessing();
  }, []);

  return (
    <div className='bg-blue-200 h-5/6'>
      <div className="flex-1 p-4">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-blue-500 h-60 text-white p-4 rounded-md">
            <div className="text-3xl font-bold">Sign ups</div>
            <div className='pt-20 text-5xl text-center'>{totalSignUps}<span className="text-3xl"> Users</span></div>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-md">
            <div className="text-3xl font-bold">Revenue</div>
            <div className='pt-20 text-5xl text-center'>${totalRevenue}<span className="text-3xl"> LKR</span></div>
          </div>
          <div className="bg-red-500 text-white p-4 rounded-md">
            <div className="text-3xl font-bold">Sales</div>
            <div className='pt-20 text-5xl text-center'>{totalSales}<span className="text-3xl"> LKR</span></div>
          </div>
        </div>

        <div className='flex flex-row gap-4 w-full'>
          <div className="bg-gray-100 rounded-md w-1/2 h-70">
            <div className="font-bold mb-2 bg-gray-400 rounded-md h-10 pt-2 pl-2">Pending(ToDo List)</div>
            <div>
              <div className="flex items-center mt-5 ml-5 ">
                <div className='flex flex-col gap-6'>
                  <h2 className='text-blue-500 font-bold'>Printing - {documentProcessing.printing}</h2>
                  <h2 className='text-blue-500 font-bold'>Typesetting - {documentProcessing.typesetting}</h2>
                  <h2 className='text-blue-500 font-bold'>Laminating - {documentProcessing.laminating}</h2>
                </div>
              </div>
            </div>
            <div className="text-blue-500 cursor-pointer mt-12 ml-2">
              <Link to="/DocumentList">
                  <button className='bg-blue-500 m-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    See All
                  </button>
              </Link>
            </div>
          </div>

          <div className="bg-gray-100 rounded-md w-1/2 h-70">
            <div className="font-bold mb-2 bg-gray-400 rounded-md h-10 pt-2 pl-2">Stocks</div>
            <div>
              <div className="text-blue-500 cursor-pointer mt-12 ml-2">
                <Link to="/UpdateItemQuantity">
                  <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    Add Stock
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDHome;
