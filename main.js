(() => {
    let canvas = document.getElementById('canvas'),
        c = canvas.getContext('2d'),
        w = canvas.width = window.innerWidth,
        h = canvas.height = window.innerHeight,
        pi = Math.PI,
        pi2 = pi * 2,
        opts = {
            backgroungColor: '#fefefe',
            particleAmount: '60',
            radius: 4,
            velocity: .04,
            colors: ['#EFD9CE', '#B79CED', '#ADD9F4', '#957FEF', '#7161EF']
        },
        mouse = {
            x: w/2,
            y: h/2
        },
        particles = [],
        Particle = function(options) {
            this.x = options.x;
            this.y = options.y;
            this.radius = opts.radius || options.radius;
            this.radians = randomTo(pi2);
            this.velocity = opts.velocity;
            this.distanceFromCenter = randomRange(80, 220),
            this.lastMouse = {
                x: options.x,
                y: options.y,
            },
            this.color = opts.colors[Math.floor(randomTo(opts.colors.length))];

            this.draw = (lastPoint) => {
                c.beginPath();
                c.lineWidth = this.radius;
                c.strokeStyle = this.color;
                c.moveTo(lastPoint.x, lastPoint.y);
                c.lineTo(this.x, this.y);
                c.stroke();
                c.closePath();
                return this;
            };

            this.update = () => {
                const lastPoint = {
                    x: this.x,
                    y: this.y
                };
                this.radians += this.velocity;

                // Drag effect
                this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
                this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

                // Circular motion
                this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
                this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;

                this.draw(lastPoint);

                return this;
            };
        }
        ;

    function loop() {
        c.fillStyle = 'rgba(255, 255, 255, .05)' || opts.backgroungColor;
        c.fillRect(0, 0, w, h);

        particles.forEach( (particle) => {
            particle.update();
        });

        window.requestAnimationFrame(loop);
    }

    function setup() {
        for (let i = 0; i < opts.particleAmount; i++){
            let x = randomTo(w);
            let y = randomTo(h);

            particles.push(new Particle( {x, y} ));
        }

        window.requestAnimationFrame(loop);
    }

    setup();

    function randomRange(min, max){
        return (Math.random() * (max - min)) + min;
    }
    function randomTo(number){
        return Math.random() * number;
    }

    window.addEventListener('resize', () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    });

    window.addEventListener('mousemove', (event) => {
        mouse = {
            x: event.x,
            y: event.y
        };
    });
})();
