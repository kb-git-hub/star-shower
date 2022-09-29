import '../style.css'
import { randomIntFromRange, randomColor, distance } from './utils'


const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

canvas.width = innerWidth
canvas.height = innerHeight

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

const mouse = {
    x: undefined,
    y: undefined
}


/*
Objects
*/

class Star {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = {
            x: 0,
            y: 3
        }
        this.physics = {
            gravity: 0.6,
            friction: 0.70,
        }
        this.hit = 0
    }
    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
    }

    update() {
        this.draw()
        if (this.y + this.radius + this.velocity.y > canvas.height) {
            this.velocity.y = -this.velocity.y * this.physics.friction
            if (this.hit < 3) {
                this.starExplode()
                this.hit++
            }
        }
        else this.velocity.y += this.physics.gravity
        this.y += this.velocity.y
    }

    starExplode() {
        for (let i = 0; i < 10; i++) {
            sparks.push(new Spark(this.x, this.y, randomIntFromRange(1, 3), randomColor(colors)))
        }
    }
}



class Spark extends Star {
    constructor(x, y, radius, color) {
        super(x, y, radius, color)
        this.velocity = {
            x: randomIntFromRange(-7, 7),
            y: randomIntFromRange(-15, -8)
        }
        this.physics = {
            gravity: 0.65,
            friction: 0.70,
            bounce: Math.random()
        }
    }

    update() {
        this.draw()
        if (this.y + this.radius + this.velocity.y > canvas.height) {
            this.velocity.y = -this.velocity.y * this.physics.friction * this.physics.bounce
        }

        else this.velocity.y += this.physics.gravity
    

        this.y += this.velocity.y
        this.x += this.velocity.x
    }
}

/*
Implementation
*/
let stars = []
let sparks = []

function init() {
    for (let i = 0; i < 1; i++) {
        stars.push(new Star(canvas.width / 2, 10, randomIntFromRange(8, 10), randomColor(colors)))
    }
}


function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    stars.forEach(star => star.update())
    sparks.forEach(spark => spark.update())
}

init()
animate()
