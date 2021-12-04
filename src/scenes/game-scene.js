class GameScene extends Phaser.Scene {
    constructor()
    {
        super("GameScene")
    }

    preload()
    {
        this.load.image("thiago", "assets/thiago.png")
        this.load.image("red", "assets/lapiz_rojo.png")
        this.load.image("yellow", "assets/lapiz_amarillo.png")
    }

    create()
    {
        this.cameras.main.setBackgroundColor(0xffffff)
        this.thiago_menu = this.add.image(gWidth/2, gHeight/2, "thiago")
        .setAlpha(0)
        .setScale(0.5)

        this.tweens.add({
            targets: this.thiago_menu,
            alpha: 1,
            yoyo: true,
            repeat: -1,
            duration: 1500,
            ease: "Sine"
        })

        this.title = this.add.text(gWidth/2, gHeight*0.2, "CHARLY CHARLY", {
            color: "#ffffff",
            fontSize: 30,
            stroke: "#000000",
            strokeThickness: 8
        })
        .setOrigin(0.5)

        this.clickToStart = this.add.text(gWidth/2, gHeight*0.8, "apreta para empezar", {
            color: "#ffffff",
            fontSize: 20,
            stroke: "#000000",
            strokeThickness: 4
        })
        .setOrigin(0.5)

        this.tati = this.add.text(gWidth*0.86, gHeight*0.9, "hecho por Tati", {
            color: "#000000"
        })
        .setOrigin(0.5)
        .setAngle(-10)

        this.startCount = 0

        this.add.rectangle(gWidth/2, gHeight/2, gWidth, gHeight, 0xff00ff, 0)
        .setInteractive()
        .once("pointerdown", ()=> {
            this.startGame()
        })
    }
    startGame() 
    {
        this.title.destroy()
        //this.clickToStart.destroy()
        this.thiago_menu.destroy()
        this.tati.destroy()

        this.clickToStart.setText("click para girar el lapiz")
        this.clickToStart.setDepth(10)
        this.clickToStart.y += 30

        this.gr = this.add.graphics()
        this.gr.lineStyle(4, 0x000000, 1)
        this.gr.lineBetween(gWidth/2, 0, gWidth/2, gHeight)
        this.gr.lineBetween(0, gHeight/2, gWidth, gHeight/2)


        this.red = this.add.image(gWidth/2, gHeight/2, "red")
        this.yellow = this.add.image(gWidth/2, gHeight/2, "yellow")

        let estilo = {
            color: "#ffffff",
            fontSize: 50,
            stroke: "#000000",
            fontStyle: "bold",
            strokeThickness: 8
        }

        this.textos = [
            this.add.text(gWidth*0.25, gHeight*0.25, "SI", estilo),
            this.add.text(gWidth*0.75, gHeight*0.25, "NO", estilo),
            this.add.text(gWidth*0.25, gHeight*0.75, "NO", estilo),
            this.add.text(gWidth*0.75, gHeight*0.75, "SI", estilo)
        ]
        for (let texto of this.textos)
        {
            texto.setOrigin(0.5)
            //texto.angle = 10
        }

        this.add.rectangle(gWidth/2, gHeight/2, gWidth, gHeight, 0xff00ff, 0)
        .setInteractive()
        .on("pointerdown", ()=> {
            this.girar()
        })
    }

    girar()
    {
        if (this.girando) return


        if (this.winTween) {
            this.winTween.stop()
        }
        for (let texto of this.textos)
        {
            texto.setTint(0xffffff)
            texto.scale = 1
        }

        this.yellow.angle = 0

        this.girando = true

        this.tweens.add({
            targets: this.yellow,
            angle: 360,
            repeat: 3,
            duration: 300,
            //ease: "Circ",
            onComplete: ()=>{
                let angulo = Phaser.Math.Between(0, 360)
                this.tweens.add({
                    targets: this.yellow,
                    angle: angulo,
                    ease: "Circ",
                    duration: 1300,
                    onComplete: ()=> {
                        this.girando = false

                        let coloreado = 0
                        if (angulo < 90) coloreado = 1
                        if (angulo >= 90 && angulo < 180) coloreado = 3
                        if (angulo >= 180 && angulo < 270) coloreado = 2

                        this.textos[coloreado].setTint(0xff0000)
                        this.winTween = this.tweens.add({
                            targets: this.textos[coloreado],
                            scale: 1.3,
                            repeat: -1,
                            yoyo: true,
                            duration: 300
                        })
                    }
                })
            }
            
            //Phaser.Math.Between(0, 360),
            
        })
    }

    update(t, d)
    {
        this.startCount += d
        if (this.startCount > 500)
        {
            this.startCount = 0
            this.clickToStart.alpha = this.clickToStart.alpha == 1 ? 0 : 1

            if (this.girando) this.clickToStart.alpha = 0
        }
    }
}