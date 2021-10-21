import list from "../../videos/f.mp4";
import "./VideoContainer.css";
import Video from "../Video/Video";
const VideoContainer = (props) => {
  return (
    <>
      <div className="video_container_slider">
        <div className="video_container_contents">
          <h1 className="video_container_contents_heading">{props.name}</h1>
          <div className="video_container_videolist">
            <div>
              <Video styles="video_container_main" />
              <h3 style={{ margin: 0 }}>Welcome to Normal</h3>
              <p>
                A group of our earliest preorder holders joined us for R1T
                drives, a plant tour and tacos on the Camp Kitchen.
              </p>
            </div>

            <div className="video_container_list_list">
              <hr />

              <div className="video_container_small_conts">
                <Video styles="video_container_small" />
              </div>
              <hr />
              <Video styles="video_container_small" />
              <hr />

              <Video styles="video_container_small" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoContainer;
