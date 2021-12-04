var gWidth = 640
var gHeight = 360

var gameconfig = {
    type: Phaser.WEBGL,
    scale: {
        parent: 'gamediv',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_VERTICALLY,
        width: gWidth,
        height: gHeight
    },
    physics: {
        default: 'arcade'
    },
    pixelArt: true,
    scene: [
        GameScene
    ]
}

var game = new Phaser.Game(gameconfig)