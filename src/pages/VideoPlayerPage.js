import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import moviesData from "../data/movies.json";
import BreadcrumbComponent from "../components/Breadcrumb";
import Plyr from "plyr";

const VideoPlayerPage = () => {
  const { slug, video } = useParams();
  const playerRef = useRef(null);

  const [sameSlugMovies, setSameSlugMovies] = useState([]);
  const [movie, setMovie] = useState(null);
  const [posterPath, setPosterPath] = useState("");
  const [currentEpisode, setCurrentEpisode] = useState(null);

  useEffect(() => {
    const movie = moviesData.find((item) => item.slug === slug);

    const sameSlugMovies = moviesData.filter(
      (item) => item.slug === slug && item.title === movie.title
    );

    setPosterPath(process.env.PUBLIC_URL + `/herovideo1.jpg`);

    setMovie(movie);
    setSameSlugMovies(sameSlugMovies);

    function handleEpisodeClick(event) {
      event.preventDefault();
      // Lakukan tindakan yang diinginkan saat episode diklik
      window.location.reload();
    }

    const episodeLinks = document.querySelectorAll('[id^="episode-"]');
    episodeLinks.forEach((link) => {
      link.addEventListener("click", handleEpisodeClick);
    });

    return () => {
      episodeLinks.forEach((link) => {
        link.removeEventListener("click", handleEpisodeClick);
      });

      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [slug, video]);

  useEffect(() => {
    if (sameSlugMovies.length > 0) {
      const currentMovie = sameSlugMovies[0];
      const currentEpisodeIndex = currentMovie.files.findIndex(
        (file) => file === video
      );
      setCurrentEpisode(currentEpisodeIndex);
    }
  }, [sameSlugMovies, video]);

  const handleNextEpisode = () => {
    if (currentEpisode < sameSlugMovies[0].files.length - 1) {
      const nextEpisodeIndex = currentEpisode + 1;
      const nextEpisode = sameSlugMovies[0].files[nextEpisodeIndex];
      window.location.href = `/${sameSlugMovies[0].slug}/${encodeURIComponent(
        nextEpisode
      )}`;
    }
  };
  
  const handlePrevEpisode = () => {
    if (currentEpisode > 0) {
      const prevEpisodeIndex = currentEpisode - 1;
      const prevEpisode = sameSlugMovies[0].files[prevEpisodeIndex];
      window.location.href = `/${sameSlugMovies[0].slug}/${encodeURIComponent(
        prevEpisode
      )}`;
    }
  };

  if (!movie) {
    return null;
  }

  playerRef.current = new Plyr("#plyr", {
    controls: [
      "play-large",
      "play",
      "progress",
      "current-time",
      "mute",
      "captions",
      "settings",
      "fullscreen",
    ],
    seekTime: 5,
    keyboard: {
      focused: true,
      global: true,
      volumeUpKey: () => {
        playerRef.current.increaseVolume(0.1);
      },
      volumeDownKey: () => {
        playerRef.current.decreaseVolume(0.1);
      },
      seekForwardKey: () => {
        playerRef.current.forward(5);
      },
      seekBackwardKey: () => {
        playerRef.current.rewind(5);
      },
      fullscreenKey: "70",
      custom: [
        {
          key: 27, // Esc key
          handle: () => {
            if (playerRef.current.fullscreen.active) {
              playerRef.current.fullscreen.exit();
            }
          },
        },
      ],
    },
  });

  const videoExtension = video.split(".").pop().toLowerCase();
  let videoType = "video/mp4"; // Tipe default untuk file video .mp4

  if (videoExtension === "mkv") {
    videoType = "video/mkv";
  } else if (videoExtension === "avi") {
    videoType = "video/avi";
  }

  return (
    <div>
      <BreadcrumbComponent />
      <section className="anime-details spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="episode-navigation d-flex justify-content-end mb-3">
                {currentEpisode > 0 && (
                  <button
                    className="episode-navigation__btn mx-2 text-center btn btn-outline-info"
                    onClick={handlePrevEpisode}
                  >
                    Prev To Episode {currentEpisode - 0}
                  </button> 
                )}
                {currentEpisode < sameSlugMovies[0].files.length - 1 && (
                  <button
                    className="episode-navigation__btn mx-2 text-center btn btn-outline-info"
                    onClick={handleNextEpisode}
                  >
                    Next To Episode {currentEpisode + 2}
                  </button>
                )}
              </div>
              <div className="anime__video__player">
                <video
                  id="plyr"
                  className="plyr plyr--video"
                  style={{ width: "100%" }}
                  playsInline
                  controls
                  poster={posterPath}
                >
                  <source
                    // src={`${process.env.PUBLIC_URL}/movies/${movie.title}/${video}`}
                    // https://movies-bank-omtegar.sgp1.cdn.digitaloceanspaces.com/movies/Maou-sama-Retry!/TDFILM-MsR-Episode-1.mp4
                    src={`https://movies-bank-omtegar.sgp1.cdn.digitaloceanspaces.com/movies/${movie.movies_bank}/${video}`}
                    type={videoType}
                  />
                  <track
                    kind="captions"
                    label="English captions"
                    src={`/${movie.title}/${video}`}
                    srclang="en"
                    default
                  />
                </video>
              </div>
              <div className="anime__details__episodes">
                <div className="section-title">
                  <h5>List Name</h5>
                </div>
                <ul>
                  {sameSlugMovies.map((item, index) => {
                    const sortedFiles = item.files.sort((a, b) => {
                      const episodeA = parseInt(a.match(/\d+/)[0]);
                      const episodeB = parseInt(b.match(/\d+/)[0]);
                      return episodeA - episodeB;
                    });

                    return sortedFiles.map((file, fileIndex) => (
                      <a
                        key={`${index}-${fileIndex}`}
                        href={`/${item.slug}/${encodeURIComponent(file)}`}
                        onClick={() => window.location.reload()}
                        id={`episode-${fileIndex + 1}`}
                      >
                        Episode {fileIndex + 1}
                      </a>
                    ));
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <div className="anime__details__form">
                <div className="section-title">
                  <h5>Your Comment</h5>
                </div>
                <form action="/">
                  <textarea placeholder="Your Comment"></textarea>
                  <button type="submit">
                    <i className="fa fa-location-arrow"></i> Review
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VideoPlayerPage;
