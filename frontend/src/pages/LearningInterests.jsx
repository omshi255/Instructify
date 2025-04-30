// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom"; // Import useNavigate

// const LearningInterests = () => {
//   const [interests, setInterests] = useState([]);
//   const [newInterest, setNewInterest] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [openForm, setOpenForm] = useState(false);


//   const userId = localStorage.getItem("_id");
//   const token = localStorage.getItem("token"); // Get the token from local storage
//   // Base URL
//   const navigate = useNavigate(); // Initialize the navigate function

//   useEffect(() => {
//     const fetchInterests = async () => {
//       try {
//         const data = await axios.get(
//           `http://localhost:5000/api/auth/get-learning-interest`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`, // Add Bearer token
//             },
//           }
//         );
//         console.log("Fetched interests:", data.data.learningInterests); // Log the data to check the response
//         const validInterests = data.data.learningInterests.filter(
//           (interest) => interest !== null
//         ); // Filter out null values
//         setInterests(validInterests);
//       } catch (error) {
//         console.error(error);
//         toast.error("Failed to load learning interests");
//       }
//     };

//     fetchInterests();
//   }, [loading]);

//   const handleCreateInterest = async (e) => {
//     e.preventDefault();
//     if (!newInterest.trim()) {
//       toast.error("Interest cannot be empty");
//       return;
//     }
//     try {
//       setLoading(true);
//       console.log("Creating interest:", newInterest); // Log the new interest
//       await axios.post(
//         `http://localhost:5000/api/auth/add-learning-interest`,
//         { interest: newInterest },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Add Bearer token
//           },
//         }
//       );
//       toast.success("Interest added successfully!");
//       setNewInterest("");
//       setOpenForm(false); // Close the form after adding the interest
      
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || "Failed to add interest");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteInterest = async (interest) => {
//     try {
//       setLoading(true);
//       console.log("Deleting interest:", interest); // Log the interest to be deleted
//       await axios.delete(
//         `http://localhost:5000/api/auth/delete-learning-interest`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           data: {
//             interest: interest, // <-- Notice: body goes inside `data`
//           },
//         }
//       )
//       toast.success("Interest deleted successfully!");
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || "Failed to delete interest");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
//       <h2 style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold" }}>
//         Learning Interests
//       </h2>

//       <button
//         style={{
//           padding: "8px 12px",
//           backgroundColor: "#4CAF50",
//           color: "white",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer",
//         }}
//         onClick={() => setOpenForm(!openForm)}
//         disabled={loading}
//       >
//         Add Int
//       </button>
//       {openForm &&<div>
//         <form
//           onSubmit={handleCreateInterest}
//           style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
//         >
//           <input
//             type="text"
//             placeholder="Add new interest..."
//             value={newInterest}
//             onChange={(e) => setNewInterest(e.target.value)}
//             disabled={loading}
//           />
//           <button type="submit">{loading ? "Loading..." : "Add"}</button>
//         </form>
//       </div>}

//       <div>
//         {interests.length === 0 ? (
//           <p style={{ textAlign: "center", color: "#888" }}>
//             No interests found. Add some!
//           </p>
//         ) : (
//           interests.map((interest) => (
//             <div
//               key={interest}
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 border: "1px solid #ddd",
//                 borderRadius: "5px",
//                 padding: "10px",
//                 marginBottom: "10px",
//               }}
//             >
//               <span style={{ fontWeight: "500" }}>{interest}</span>
//               <button
//                 onClick={() => handleDeleteInterest(interest)}
//                 style={{
//                   backgroundColor: "#FF5733",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "5px",
//                   padding: "5px 10px",
//                   cursor: "pointer",
//                 }}
//                 disabled={loading}
//               >
//                 Delete
//               </button>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default LearningInterests;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./LearningIntrests.css";

import Footer from "../components/Footer";
const LearningInterests = () => {
  const [interests, setInterests] = useState([]);
  const [newInterest, setNewInterest] = useState("");
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/auth/get-learning-interest`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const validInterests = data.learningInterests.filter(
          (interest) => interest !== null
        );
        setInterests(validInterests);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load learning interests");
      }
    };

    fetchInterests();
  }, [loading]);

  const handleCreateInterest = async (e) => {
    e.preventDefault();
    if (!newInterest.trim()) {
      toast.error("Interest cannot be empty");
      return;
    }
    try {
      setLoading(true);
      await axios.post(
        `http://localhost:5000/api/auth/add-learning-interest`,
        { interest: newInterest },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Interest added successfully!");
      setNewInterest("");
      setOpenForm(false);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add interest");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteInterest = async (interest) => {
    try {
      setLoading(true);
      await axios.delete(
        `http://localhost:5000/api/auth/delete-learning-interest`,
        {
          headers: { Authorization: `Bearer ${token}` },
          data: { interest },
        }
      );
      toast.success("Interest deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete interest");
    } finally {
      setLoading(false);
    }
  };

  return (
   <>
  
    <div className="learning-container">
      <h2 className="learning-title">Learning Interests</h2>

      <button
        className="add-interest-btn"
        onClick={() => setOpenForm(!openForm)}
        disabled={loading}
      >
        {openForm ? "Close" : "Add Interest"}
      </button>

      {openForm && (
        <form onSubmit={handleCreateInterest} className="interest-form">
          <input
            type="text"
            placeholder="Add new interest..."
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            disabled={loading}
            className="interest-input"
          />
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Adding..." : "Add"}
          </button>
        </form>
      )}

      <div className="interest-list">
        {interests.length === 0 ? (
          <p className="no-interests">No interests found. Add some!</p>
        ) : (
          interests.map((interest) => (
            <div className="interest-item" key={interest}>
              <span className="interest-name">{interest}</span>
              <button
                className="delete-btn-dis"
                onClick={() => handleDeleteInterest(interest)}
                disabled={loading}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
   <Footer/>
   </>
  );
};

export default LearningInterests;
