// /* eslint-disable react/no-unescaped-entities */
// /* eslint-disable react/prop-types */
// import { useState, useEffect } from 'react';
// import Logo from '../assets/logo.svg';
// // import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap Modal and Button
// import axios from 'axios';
// import { accountInfoApis } from '../common';
// import { Swal } from 'sweetalert2/dist/sweetalert2';

// // showModal, setShowModal,

// const EditPersonalinfo = ({ userData }) => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     gender: '',
//     phoneNumber: ''
//   });

//   useEffect(() => {
//     if (userData) {
//       setFormData({
//         firstName: userData.firstName || '',
//         lastName: userData.lastName || '',
//         email: userData.email || '',
//         gender: userData.gender || '',
//         phoneNumber: userData.phoneNumber || ''
//       });
//     }
//   }, [userData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };
  
 
//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const swalWithBootstrapButtons = Swal.mixin({
//       customClass: {
//         confirmButton: "btn btn-success",
//         cancelButton: "btn btn-danger"
//       },
//       buttonsStyling: false
//     });
  
//     swalWithBootstrapButtons.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonText: "No, cancel!",
//       reverseButtons: true
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         swalWithBootstrapButtons.fire({
//           title: "Deleted!",
//           text: "Your file has been deleted.",
//           icon: "success"
//         });
//         console.log('Form submitted:', formData);
//         const token = localStorage.getItem("token"); // Replace with your actual token key
  
//         const config = {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         };
//         try {
//           const response = await axios.patch(accountInfoApis.updateAccountInfo(localStorage.getItem("id")), formData, config);
//           console.log(response.data);
//         } catch (error) {
//           console.error("Error updating account info:", error);
//         }
//       } else if (
//         /* Read more about handling dismissals below */
//         result.dismiss === Swal.DismissReason.cancel
//       ) {
//         swalWithBootstrapButtons.fire({
//           title: "Cancelled",
//           text: "Your imaginary file is safe :)",
//           icon: "error"
//         });
//       }
//     });
  
//     // After saving, close the modal
//     // setShowModal(false);
//   };
  
//   // show={showModal} onHide={() => setShowModal(false)}
//   return (
//     <div className='modal fade' tabIndex="-1" aria-hidden="true" id='infoModal'>
//       <div className='modal-dialog'>
//         <div className='modal-content'>
//           <div className='modal-header'>
//             <h5>Edit Profile</h5>
//             <button type='button' className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//           </div>
//           <div className='modal-body'>
//             <div className="container-fluid">
//               <div style={{ display: 'flex', justifyContent: 'center' }}>
//                 <img src={Logo} alt="Logo" style={{ width: '200px', marginBottom: '20px' }} />
//               </div>
//               <form>
//                 <div className="mb-3">
//                   <label htmlFor="firstName" className="form-label">First Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="firstName"
//                     name="firstName"
//                     value={formData.firstName}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="lastName" className="form-label">Last Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="lastName"
//                     name="lastName"
//                     value={formData.lastName}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label d-block">Gender</label>
//                   <div className="form-check form-check-inline">
//                     <input
//                       className="form-check-input"
//                       type="radio"
//                       name="gender"
//                       id="male"
//                       value="male"
//                       checked={formData.gender === 'MALE'}
//                       onChange={handleChange}
//                     />
//                     <label className="form-check-label" htmlFor="male">Male</label>
//                   </div>
//                   <div className="form-check form-check-inline">
//                     <input
//                       className="form-check-input"
//                       type="radio"
//                       name="gender"
//                       id="female"
//                       value="female"
//                       checked={formData.gender === 'FEMALE'}
//                       onChange={handleChange}
//                     />
//                     <label className="form-check-label" htmlFor="female">Female</label>
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="email" className="form-label">Email</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="phoneNumber" className="form-label">Mobile Number</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="phoneNumber"
//                     name="phoneNumber"
//                     value={formData.phoneNumber}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </form>

//               <hr className="mt-4 mb-4" />

//               <div>
//                 <h4>FAQs</h4>
//                 <p><strong>What happens when I update my email address (or mobile number)?</strong></p>
//                 <p>Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).</p>

//                 <p><strong>When will my Dresscode account be updated with the new email address (or mobile number)?</strong></p>
//                 <p>It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.</p>

//                 <p><strong>What happens to my existing Dresscode account when I update my email address (or mobile number)?</strong></p>
//                 <p>Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.</p>

//                 <p><strong>Does my Seller account get affected when I update my email address?</strong></p>
//                 <p>Dresscode has a 'single sign-on' policy. Any changes will reflect in your Seller account also.</p>
//               </div>
//               <div className="d-grid" style={{ width: '150px' }}>
//                 <button type='submit' data-bs-dismiss="modal"  className='btn btn-primary' onClick={handleSubmit}>Save</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default EditPersonalinfo;


/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import Logo from '../assets/logo.svg';
import axios from 'axios';
import { accountInfoApis } from '../common';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const EditPersonalinfo = ({ userData }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    phoneNumber: ''
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
        gender: userData.gender || '',
        phoneNumber: userData.phoneNumber || ''
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success me-3",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });

    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, save it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000,
        });
        const token = localStorage.getItem("token"); 
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        try {
          const response = await axios.patch(accountInfoApis.updateAccountInfo(localStorage.getItem("id")), formData, config);
          console.log(response.data);
        } catch (error) {
          console.error("Error updating account info:", error);
        }
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "",
          icon: "error",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });

    // After saving, close the modal
    // setShowModal(false);
  };

  return (
    <div className='modal fade' tabIndex="-1" aria-hidden="true" id='infoModal'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5>Edit Profile</h5>
            <button type='button' className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className='modal-body'>
            <div className="container-fluid">
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img src={Logo} alt="Logo" style={{ width: '200px', marginBottom: '20px' }} />
              </div>
              <form>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label d-block">Gender</label>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      checked={formData.gender === 'MALE'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="male">Male</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      checked={formData.gender === 'FEMALE'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="female">Female</label>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">Mobile Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
              </form>

              <hr className="mt-4 mb-4" />

              <div>
                <h4>FAQs</h4>
                <p><strong>What happens when I update my email address (or mobile number)?</strong></p>
                <p>Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).</p>

                <p><strong>When will my Dresscode account be updated with the new email address (or mobile number)?</strong></p>
                <p>It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.</p>

                <p><strong>What happens to my existing Dresscode account when I update my email address (or mobile number)?</strong></p>
                <p>Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.</p>

                <p><strong>Does my Seller account get affected when I update my email address?</strong></p>
                <p>Dresscode has a 'single sign-on' policy. Any changes will reflect in your Seller account also.</p>
              </div>
              <div className="d-grid" style={{ width: '150px' }}>
                <button type='submit' data-bs-dismiss="modal" className='btn btn-primary' onClick={handleSubmit}>Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPersonalinfo;

