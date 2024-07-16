import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);


  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('http://localhost:3001/documents');
        setDocuments(response.data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocuments();
  }, []);
  

  const toggleCollected = async (documentId, currentStatus) => {
    try {
      const response = await axios.put(`http://localhost:3001/toggle-collected/${documentId}`, { currentStatus });
      const updatedDocuments = documents.map(doc => {
        if (doc.Document_ID === documentId) {
          return { ...doc, Is_Collected: response.data.newStatus };
        }
        return doc;
      });
      setDocuments(updatedDocuments);
    } catch (error) {
      console.error('Error toggling collected status:', error);
    }
  };


  const handleSelect = (documentId) => {
    setSelectedDocuments(prevSelected =>
      prevSelected.includes(documentId)
        ? prevSelected.filter(id => id !== documentId)
        : [...prevSelected, documentId]
    );
  };
  

  const handleDelete = () => {
    setShowConfirmationDialog(true);
  };

  
  const confirmDelete = async () => {
    setShowConfirmationDialog(false);   // Close the confirmation dialog immediately
    // if (window.confirm("Are you sure you want to delete the selected entries?")) {
      try {
        await axios.delete('http://localhost:3001/documents', { data: { documentIds: selectedDocuments } });
        setDocuments(documents.filter(doc => !selectedDocuments.includes(doc.Document_ID)));
        setSelectedDocuments([]);
      } catch (error) {
        console.error('Error deleting documents:', error);
      }
    // }
  };
  

  return (
    <div className='bg-gray-100 h-full'>
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Uploaded Documents</h1>
      
      <button
          onClick={handleDelete}
          disabled={selectedDocuments.length === 0}
          className="mb-5 px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-300"
        >
          Delete Selected
      </button>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 text-center w-[10%]">
                    {selectedDocuments.length === documents.length ? (
                      <span
                        onClick={() => setSelectedDocuments([])}
                        className="cursor-pointer text-red-500 hover:text-red-700"
                      >
                        Deselect All
                      </span>
                    ) : (
                      <span
                        onClick={() => setSelectedDocuments(documents.map(doc => doc.Document_ID))}
                        className="cursor-pointer text-blue-500 hover:text-blue-700"
                      >
                        Select All
                      </span>
                    )}
            </th>

            <th className="py-2">Document ID</th>
            <th className="py-2">Customer Name</th>
            <th className="py-2">Document Name</th>
            <th className="py-2">Download Link</th>
            <th className="py-2">Is Collected</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.Document_ID}>
              <td className="border px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedDocuments.includes(doc.Document_ID)}
                    onChange={() => handleSelect(doc.Document_ID)}
                  />
              </td>
              <td className="border px-4 py-2">{doc.Document_ID}</td>
              <td className="border px-4 py-2">{`${doc.FirstName} ${doc.LastName}`}</td>
              <td className="border px-4 py-2">{doc.Document_Name}</td>
              <td className="border px-4 py-2 text-center">
                <a
                  href={doc.Document_URL}
                  download={doc.Document_Name}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Download
                </a>
              </td>
              <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => toggleCollected(doc.Document_ID, doc.Is_Collected)}
                    className={`px-2 py-1 text-white w-full rounded-md ${
                      doc.Is_Collected === 'collected' ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    {doc.Is_Collected}
                  </button>
              </td>
              <td className="border px-4 py-2 text-center">
                <a
                  href={`/generate-receipt/${doc.Document_ID}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Generate Receipt
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
          
        {/* when user clicks delete button this confirmation dialog will appear */}
        {showConfirmationDialog && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded shadow">
            <p className="mb-2">Are you sure you want to delete the selected entries?</p>
            <div className="flex justify-between">
              <button onClick={() => setShowConfirmationDialog(false)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md mr-2">Cancel</button>
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-500 text-white rounded-md">Delete</button>
            </div>
          </div>
        </div>
        )}

    </div>
  );
};

export default DocumentList;
