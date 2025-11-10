const videosLinks = [
  "Corporate-Video-IBC-2025_edited/default.mpd",
  "Gravity_90-sec_video-8RB/default.mpd",
  "Iris-30_second-animation-3V/default.mpd",
  "Synamedia-Senza-Explainer-Video/default.mpd",
  "Synamedia-Senza-Teaser-Video/default.mpd",
  "VN-Quortex_Switch_video-for_IBC-2025/default.mpd",
  "VN-Services_video_for_social_media-2024/default.mpd",
  "VN-Sports_Streaming_-_Kite_-2024_3/default.mpd",
  "VN-Video_sports_streaming-2023/default.mpd",
  "VN-Video_Synamedia_Quortex_Customisation_-2024_2/default.mpd"
].map((file) => "https://vod.infiniteplatform.tv/weybridge/videos_reception/" + file);

const random = true;
const delay = 4.0;
const app = "Office!"

window.addEventListener("load", async () => {
  try {
    await senza.init();

    senza.lifecycle.configure({autoBackground: {enabled: false}});

    senza.remotePlayer.addEventListener("ended", async () => await playVideo());
    senza.remotePlayer.addEventListener("error", async () => await playVideo());
    senza.uiReady();

    if (senza.lifecycle.connectReason != senza.lifecycle.ConnectReason.UI_RELEASE) {
      await playVideo();
    }
  } catch (error) {
    console.error(error);
  }
});

document.addEventListener("keydown", async function(event) {
	switch (event.key) {
    case "Enter": await playVideo(); break;
		default: return;
	}
	event.preventDefault();
});

async function playVideo() {
  try {
    if (!["foreground", "inTransitionToForeground"].includes(senza.lifecycle.state)) {
      await senza.lifecycle.moveToForeground();
    }
  } catch (error) {
    console.error(app, "error moving to foreground", error);
  }

  image.classList.remove("fadeOut");
  image.classList.add("fadeIn");
  await sleep(delay);

  const index = getIndex();
  const url = videosLinks[index];
  
  await senza.remotePlayer.unload();

  image.classList.remove("fadeIn");
  image.classList.add("fadeOut");
  await sleep(1);
  
  try {
    await senza.remotePlayer.load(url);
    console.log(app, `Playing video ${index}: ${url}`);
    await senza.remotePlayer.play();
    await senza.lifecycle.moveToBackground();
  } catch (error) {
    console.error(app, `error in ${senza.lifecycle.state} state`, error);
    await sleep(1);
    await playVideo();
  }
}

function getIndex() {
  const prev = parseInt(sessionStorage.getItem("office/index") ?? "-1");
  let index;

  if (random) {
    if (videosLinks.length === 1) {
      index = 0;
    } else {
      do {
        index = randomNumber(0, videosLinks.length - 1);
      } while (index === prev);
    }
  } else {
    index = (prev + 1) % videosLinks.length;
  }

  sessionStorage.setItem("office/index", index);
  return index;
}

async function sleep(seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

