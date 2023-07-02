import React from "react";
import { useParams, Link } from "react-router-dom";
import moviesData from "../data/movies.json";

const VideoPlayerPage = () => {
  const { slug, video } = useParams();

  // Temukan film dengan slug yang sesuai
  const movie = moviesData.find((item) => item.slug === slug);

  if (!movie) {
    // Film tidak ditemukan
    return <div>Film tidak ditemukan</div>;
  }

  const currentVideoIndex = movie.files.findIndex((file) => file === video);

  const prevVideo = currentVideoIndex > 0 ? movie.files[currentVideoIndex - 1] : null;
  const nextVideo = currentVideoIndex < movie.files.length - 1 ? movie.files[currentVideoIndex + 1] : null;

  const handlePrevClick = () => {
    // Redirect ke halaman sebelumnya
    if (prevVideo) {
      window.location.href = `/Video/${slug}/${encodeURIComponent(prevVideo)}`;
    } else {
      // Refresh halaman saat sudah mencapai awal video
      window.location.reload();
    }
  };

  const handleNextClick = () => {
    // Redirect ke halaman berikutnya
    if (nextVideo) {
      window.location.href = `/Video/${slug}/${encodeURIComponent(nextVideo)}`;
    } else {
      // Refresh halaman saat sudah mencapai akhir video
      window.location.reload();
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Video Player</h1>
      <div className="d-flex justify-content-center position-relative flex-column">
        <div className="position-absolute top-0 end-0 d-flex">
          {prevVideo && (
            <button className="btn btn-primary me-2" onClick={handlePrevClick}>
              Prev
            </button>
          )}
          {nextVideo && (
            <button className="btn btn-primary" onClick={handleNextClick}>
              Next
            </button>
          )}
        </div>
        <video autoPlay controls className="mb-4" style={{ width: 800, height: "auto", flex: 1 }}>
          <source src={`/movies/${movie.title}/${video}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoPlayerPage;
