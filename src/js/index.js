import '../style.css'
import utils from './utils'


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
            y: 2
        }
        this.physics = {
            gravity: 0.65,
            friction: 0.950,
            bounce: Math.random() * 0.9
        }
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
            this.velocity.y = -this.velocity.y * this.physics.friction * this.physics.bounce
        }
        else this.velocity.y += this.physics.gravity 
        this.y += this.velocity.y
    }
}



/*
Implementation
*/
let stars
function init() {
    stars = []

    for (let i = 0; i < 300; i++) {
        stars.push(new Star(utils.randomIntFromRange(0,canvas.width), 10, utils.randomIntFromRange(3, 10), utils.randomColor(colors)))
    }

}




function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    stars.forEach(star => star.update())
    console.log(stars[0].velocity);

}

init()
// animate()
