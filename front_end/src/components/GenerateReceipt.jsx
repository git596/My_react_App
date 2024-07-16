import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';

const GenerateReceipt = () => {
  const { documentId } = useParams();
  const [documentDetails, setDocumentDetails] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [totalCost, setTotalCost] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [serviceId, setServiceId] = useState(null);

  useEffect(() => {
    const fetchDocumentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/document-details/${documentId}`);
        const data = {
          ...response.data,
          options: JSON.parse(response.data.options)
        };
        setDocumentDetails(data);
        console.log(data);
        setCustomerId(data.Customer_ID);
        console.log(data.Customer_ID);
        setServiceId(data.Service_ID);
      } catch (error) {
        console.error('Error fetching document details:', error);
      }
    };

    fetchDocumentDetails();
  }, [documentId]);

  const handleNumPagesChange = (partId, value) => {
    setNumPages(prev => ({
      ...prev,
      [partId]: parseInt(value, 10)
    }));
  };

  const calculateTotalCost = () => {
    if (documentDetails) {
      const { Service_Type, options} = documentDetails;
    //   console.log(Service_Type, options, numCopies);
    console.log(Service_Type, options);

      // let costPerPage = 0;
      // let quantity = 1;  // Default quantity if not provided
      let total = 0;

      if (Service_Type === 'Printing') {
        options.forEach(part => {
          const { partId, color, pageSize, bindingOption, quantity } = part;
          const costPerPage = color + pageSize + bindingOption;
          const numPagesForPart = numPages[partId] || 0;
          total += costPerPage * numPagesForPart * quantity;
        });
      } else if (Service_Type === 'Laminating') {
        const { documentSize, laminatingType, thickness, quantity } = options;
        const costPerPage = documentSize + laminatingType + thickness;
        total = costPerPage * numPages[documentDetails.Document_ID] * quantity;
      } else if (Service_Type === 'TypeSetting') {
        const { costPerPage, quantity } = options;
        total = costPerPage * numPages[documentDetails.Document_ID] * quantity;
      }

      setTotalCost(total);
    }
  };


  const createReceipt = async () => {
    try {
      await axios.post('http://localhost:3001/create-receipt', {
        Customer_ID: customerId,
        Service_ID: serviceId,
        TotalCost: totalCost
      });
    } catch (error) {
      console.error('Error creating receipt:', error);
    }
  };


  const downloadReceipt = () => {

    createReceipt();
    const doc = new jsPDF();


    // Shop name at the top, centered
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold'); // Set font style to bold
    doc.text('Rasanjana Communications', doc.internal.pageSize.getWidth() / 2, 10, { align: 'center' });

    // Date and time
    const currentDate = new Date();
    const dateStr = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
    doc.setFontSize(12);
    doc.text(`Date: ${dateStr}`, doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });


    doc.text(`Receipt for Document: ${documentDetails.Document_Name}`, 10, 30);
    doc.text(`Service Type: ${documentDetails.Service_Type}`, 10, 40);
    
        if(documentDetails.Service_Type === 'Printing') {
            Object.keys(numPages).forEach((partId, index) => {
              doc.text(`Part ${index + 1} - Number of Pages: ${numPages[partId]}`, 10, 50 + (index * 10));
            });
            doc.text(`Total Cost: $${totalCost.toFixed(2)}`, 10, 50 + (Object.keys(numPages).length * 10) + 10);
            
            // Thank you message at the bottom
            doc.setFontSize(12);
            doc.text('Thank you! Shop more.', doc.internal.pageSize.getWidth() / 2, 65 + (Object.keys(numPages).length * 10) + 10, { align: 'center' });
        } 
        
        else if(documentDetails.Service_Type === 'Laminating' || documentDetails.Service_Type === 'TypeSetting') {
          const numPagesValue = numPages[documentDetails.Document_ID] || 0;
            doc.text(`Number of Pages: ${numPagesValue}`, 10, 50);
            doc.text(`Total Cost: $${totalCost.toFixed(2)}`, 10, 60);  

            // Thank you message at the bottom
            doc.setFontSize(12);
            doc.text('Thank you! Shop more.', doc.internal.pageSize.getWidth() / 2, 75, { align: 'center' });
        }

      doc.save(`receipt_${documentDetails.Document_ID}.pdf`);
  };

  
  

  return (
    <div className='h-full'>
    <div className="bg-slate-200 flex flex-col items-center h-screen mx-auto pt-10">
      <h1 className="text-3xl font-bold mb-5 text-blue-800">Generate the receipt here</h1>
      {documentDetails ? (
        <div className='p-5 border border-slate-300 text-xl w-1/2 h-2/3 rounded-md bg-gray-400 flex flex-col items-center'>
            <div className='h-[20%] flex flex-col items-center'>
              <p>
                Document Name: 
                <span className='ml-2 font-bold text-indigo-600'>
                          {documentDetails.Document_Name}
                </span>
              </p>
              <p>
                Service Type: 
                <span className='ml-2 font-bold text-indigo-600'>
                  {documentDetails.Service_Type}
                </span>
              </p>
            </div>
          {documentDetails.Service_Type === 'Printing' && documentDetails.options.map((part, index) => (
            <div key={part.partId}>
              <h3 className="mt-5 font-bold">Printing Part {index + 1}</h3>
              <div>
                <label className='mx-4'>Number of Pages:</label>
                <input
                  type="number"
                  value={numPages[part.partId] || 0}
                  onChange={(e) => handleNumPagesChange(part.partId, e.target.value)}
                  className="rounded-md p-2"
                />
              </div>
            </div>
          ))}
          {documentDetails.Service_Type !== 'Printing' && (
            <div>
              <label className='mx-4'>Number of Pages:</label>
              <input
                type="number"
                value={numPages[documentDetails.Document_ID] || 0}
                onChange={(e) => handleNumPagesChange(documentDetails.Document_ID, e.target.value)}
                className="rounded-md p-2"
              />
            </div>
          )}
          <div className='w-3/4 flex justify-center items-center pt-10'>
            <button onClick={calculateTotalCost} className="mt-5 px-4 py-2 w-full bg-blue-500 text-white rounded">
              Generate
            </button>
          </div>
          {totalCost !== null && (
            <div className="mt-5">
              <p>Total Cost: ${totalCost.toFixed(2)}</p>
                <button onClick={downloadReceipt} className="mt-2 px-4 py-2 bg-green-500 text-white rounded">
                    Download Receipt
                </button>
            </div>
          )}
          {/* {totalCost === null && <p>Total cost is a null value</p>} */}
        </div>
      ) : (
        <p>Loading document details...</p>
      )}
    </div>
    </div>
  );
};

export default GenerateReceipt;