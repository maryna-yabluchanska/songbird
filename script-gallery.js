import birdsData from "./birds.js";

const galleryEl = document.querySelector(".js-gallery");

function renderD() {
  let birdsListTemplate = "";
  for (let i = 0; i < birdsData.length; i++) {
    birdsData[i].forEach((bird) => {
      const templateBirdsItem = `
<li>
            <div class="birds-gallery-title">
              <div class="birds-gallery-image" style="background-image: url('${bird.image}')"></div>
               <div class="bird-name">
                <h2>${bird.name}</h2>
                <p><strong>${bird.species}</strong></p>
              </div>
            </div>
            <audio controls>
              <source src="${bird.audio}" type="audio/mpeg">
              Your browser does not support the audio tag.
            </audio>
            <p>${bird.description}</p>
</li>`;
      birdsListTemplate += templateBirdsItem;
    })
    galleryEl.innerHTML = birdsListTemplate;
  }
}

renderD();
