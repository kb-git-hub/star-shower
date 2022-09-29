import '../style.css'
import { randomIntFromRange, randomColor, distance, randomColorAlpha } from './utils'


const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

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
    constructor(x, y, radius, color = {r:255, g:255, b:255}) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = {
            r: color.r,
            g: color.g,
            b: color.b
        }
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
    draw =()=> {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = `rgba(${this.color.r},${this.color.g}, ${this.color.b})`
        c.fill()
        c.closePath()
    }

    update = () => {
        this.draw()
        if (this.y + this.radius + this.velocity.y > canvas.height) {
            this.velocity.y = -this.velocity.y * this.physics.friction
            this.radius -= 1
            if (this.radius > 3) {
                this.starExplode()
            }
        }
        else this.velocity.y += this.physics.gravity
        this.y += this.velocity.y
    }

    starExplode = () => {
        for (let i = 0; i < 8; i++) {
            sparks.push(new Spark(this.x, this.y, randomIntFromRange(3, 4), this.color))
        }
    }
}

class Spark extends Star {
    constructor(x, y, radius, color) {
        super(x, y, radius)
        this.velocity = {
            x: randomIntFromRange(-3, 3),
            y: randomIntFromRange(-11, -8)
        }
        this.physics = {
            gravity: 0.65,
            friction: 0.70,
            bounce: Math.random()
        }
        this.timeLeft = 100
        this.opacity = 1
        this.color = {
            r: color.r,
            g: color.g,
            b: color.b
        }
    }

    draw = ()=> {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = `rgba(${this.color.r},${this.color.g}, ${this.color.b}, ${this.opacity})`
        c.fill()
        c.closePath()
    }



    update = () => {
        this.draw()
        if (this.y + this.radius + this.velocity.y > canvas.height) {
            this.velocity.y = -this.velocity.y * this.physics.friction * this.physics.bounce
        } else this.velocity.y += this.physics.gravity

        this.y += this.velocity.y
        this.x += this.velocity.x
        this.timeLeft-=1.3
        this.opacity -= 1 / this.timeLeft
    }
}

/*
Implementation
*/

let stars
let sparks

function init() {
    stars = []
    sparks = []
    for (let i = 0; i < 4; i++) {
        stars.push(new Star(canvas.width * Math.random(), 10, randomIntFromRange(8, 10), randomColorAlpha()))
    }
}


function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    stars.forEach((star, index) => {
        star.update()
        if (star.radius < 1) {
            stars.splice(index, 1)
        }
    })
    sparks.forEach((spark, index) => {
        spark.update()
        if (spark.timeLeft < 1) {
            sparks.splice(index, 1)
        }
    })
}

init()
animate()
