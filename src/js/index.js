import '../style.css'
import { randomIntFromRange, randomColor, distance, randomColorAlpha } from './utils'


const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const mtnColors = ['#1ae8ff', '#6eeb83', '#e4ff1a', '#ffae00']
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
    constructor(x, y, radius, color = { r: 255, g: 255, b: 255 }) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = {
            r: color.r,
            g: color.g,
            b: color.b
        }
        this.velocity = {
            x: randomIntFromRange(-20,20),
            y: 3
        }
        this.physics = {
            gravity: 0.6,
            friction: 0.70,
        }
        this.hit = 0
        this.groundHeight = groundHeight
    }
    draw = () => {
        c.save()
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = `rgba(${this.color.r},${this.color.g}, ${this.color.b})`
        c.shadowColor = 'white'
        c.shadowBlur = 20
        c.fill()
        c.closePath()
        c.restore()
    }

    update = () => {
        this.draw()
        if (this.y + this.radius + this.velocity.y > canvas.height - this.groundHeight) {
            this.velocity.y = -this.velocity.y * this.physics.friction
            this.radius -= 1
            if (this.radius > 2) this.starExplode()
        }
        else this.velocity.y += this.physics.gravity
        this.y += this.velocity.y
        this.x += this.velocity.x

        if (this.x + this.radius + this.velocity.x < 0 || this.x  + this.radius + this.velocity.x > canvas.width){
            if (this.radius > 2) this.starExplode()
            this.velocity.x = -this.velocity.x * (this.physics.friction / 3)
        }
    }

    starExplode = () => {
        for (let i = 0; i < 8; i++) {
            sparks.push(new Spark(this.x, this.y, this.radius * Math.random(), this.color))
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

    draw = () => {
        c.save()
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = `rgba(${this.color.r},${this.color.g}, ${this.color.b}, ${this.opacity})`
        c.shadowColor = 'white'
        c.shadowBlur = 20
        c.fill()
        c.closePath()
        c.restore()
    }


    update = () => {
        this.draw()
        if (this.y + this.radius + this.velocity.y > canvas.height - this.groundHeight) {
            this.velocity.y = -this.velocity.y * this.physics.friction * this.physics.bounce
        } else this.velocity.y += this.physics.gravity

        this.y += this.velocity.y
        this.x += this.velocity.x
        this.timeLeft -= 1.3
        this.opacity -= 1 / this.timeLeft
    }
}

/*
Implementation
*/



function createMountainRange(mtnAmount, height, color) {
    for (let i = 0; i < mtnAmount; i++) {
        const mtnWidth = canvas.width / mtnAmount
        c.beginPath()
        c.moveTo(i * mtnWidth, canvas.height)
        c.lineTo(i * mtnWidth + mtnWidth + 325, canvas.height)
        c.lineTo(i * mtnWidth + mtnWidth / 2, canvas.height - height)
        c.lineTo(i * mtnWidth - 325, canvas.height)
        c.fillStyle = color
        c.fill()
        c.closePath()
    }
}



//background
const backgroundGradient = c.createLinearGradient(0, 0, 0, canvas.height)
// console.log('🌌 | file: index.js | line 126 | backgroundGradient', backgroundGradient)
backgroundGradient.addColorStop(0, '#263238')
backgroundGradient.addColorStop(1, '#455a64')

// mountains


let groundHeight = 175
let stars
let sparks
let starryNight
let timer = 0

function init() {
    stars = []
    sparks = []
    starryNight = []
  
    for (let i = 0; i < 40; i++) {
        const x = canvas.width * Math.random()
        const y = canvas.height * Math.random()
        starryNight.push(new Star(x, y, randomIntFromRange(1, 6), randomColorAlpha()))
    }
}


function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = backgroundGradient
    c.fillRect(0, 0, canvas.width, canvas.height)
    starryNight.forEach(star => star.draw())
    createMountainRange(1, canvas.height - 250, '#384551')
    createMountainRange(2, canvas.height - 350, '#2B3843')
    createMountainRange(3, canvas.height - 500, '#26333B')
    
    //floor
    c.fillStyle = '#12181c'
    c.fillRect(0,canvas.height-groundHeight, canvas.width, canvas.height)

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

    if (timer % randomIntFromRange(20,30)===0){
        const spawnRadius = 20
        const x = Math.max(spawnRadius, canvas.width * Math.random() - spawnRadius)
        stars.push(new Star(x, -400, randomIntFromRange(5, 8), randomColorAlpha()))
    }
    timer++
}



init()
animate()
