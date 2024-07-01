

export class Reel {

    constructor(reelContainer, symbolStrip) {
        this.reelContainer = reelContainer;
        this.symbolStrip = symbolStrip;

        const container = document.getElementById(reelContainer);
        container.style.backgroundImage = `url(${symbolStrip.image})`;
    }


}