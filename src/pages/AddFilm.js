// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// // const AddFilm = () => {
// //   const [title, setTitle] = useState("");
// //   const [posterFile, setPosterFile] = useState(null);
// //   const [filmFolder, setFilmFolder] = useState(null);

// //   const navigate = useNavigate();

// //   const handleTitleChange = (e) => {
// //     setTitle(e.target.value);
// //   };

// //   function createSlug(title) {
// //     return title.replace(/\s+/g, "-").toLowerCase();
// //   }  

// //   const handlePosterFileChange = (e) => {
// //     const file = e.target.files[0];
// //     setPosterFile(file);
// //   };

// //   const handleFilmFolderChange = (e) => {
// //     const file = e.target.files[0];
// //     setFilmFolder(file);
// //   };
  

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const slug = createSlug(title);
// //     const imgurl = `/img/${slug}.png`; // Gunakan path yang dimulai dengan '/img/'
// //     // ...
  
// //     const renamedPosterFile = new File([posterFile], `${slug}.png`, {
// //       type: posterFile.type,
// //       lastModified: posterFile.lastModified,
// //     });
  
// //     const formData = new FormData();
// //     formData.append("file", renamedPosterFile);
  
// //     try {
// //       const response = await fetch(imgurl, {
// //         method: "POST",
// //         body: formData,
// //       });
  
// //       if (response.ok) {
// //         console.log("Image saved successfully.");
// //         // Melanjutkan langkah-langkah berikutnya setelah berhasil menyimpan gambar
// //       } else {
// //         console.log("Failed to save image.");
// //         // Penanganan jika gagal menyimpan gambar
// //       }
// //     } catch (error) {
// //       console.error("Error saving image:", error);
// //       // Penanganan kesalahan saat menyimpan gambar
// //     }
  
// //     // Langkah-langkah berikutnya setelah berhasil menyimpan gambar
// //   };  

// //   return (
// //     <div className="container d-flex justify-content-center">
// //       <div className="form-container bg-dark p-4 rounded">
// //         <h2 className="text-white">Tambah Film Baru</h2>
// //         <form onSubmit={handleSubmit}>
// //           <div className="form-group">
// //             <label className="text-white">Title:</label>
// //             <input
// //               type="text"
// //               className="form-control"
// //               value={title}
// //               onChange={handleTitleChange}
// //               required
// //             />
// //           </div>
// //           <div className="form-group">
// //             <label className="text-white">Poster:</label>
// //             <input
// //               type="file"
// //               className="form-control-file mt-2"
// //               onChange={handlePosterFileChange}
// //               required
// //             />
// //           </div>
// //           <div className="form-group">
// //             <label className="text-white">Film Folder (ZIP):</label>
// //             <input
// //               type="file"
// //               className="form-control-file mt-2"
// //               onChange={handleFilmFolderChange}
// //               required
// //             />
// //           </div>
// //           <button type="submit" className="btn btn-primary me-4">
// //             Submit
// //           </button>
// //           <Link to="/admin" className="btn btn-secondary ml-2">
// //             Cancel
// //           </Link>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// export default AddFilm;
