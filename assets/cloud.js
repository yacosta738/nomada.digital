function Clouder(params) {

    const self = this;
    let w, h, lastX, lastY;
    let rho = 0, theta = 0;
    let timer = null;
    let closest = null;
    let containerTop;
    let containerLeft;
    const timing = [1];
    const timingMax = 8;

    let container;
    let callback;
    let fontSize, fontShift;
    let colorMax, colorMin, colorBgr;
    let xScale = 0.9, yScale = 0.9;
    let interval = 50;
    let stepAngle = 0.08722;
    let idleMotion = 0.2;
    let nonSense = 0.025;
    let opaque = 0.4;


    const objs = [];


    function init() {

        if (params.tags) {
            setupElems(params.tags);
        } else {
            setupSpans();
        }

        process(function (o) {
            o.x = 1;
            o.y = 0;
            o.z = 0;
            spin(o, (Math.random() * 2 - 1) * Math.PI);
            step(o, (Math.random() * 2 - 1) * Math.PI);
            spin(o, (Math.random() * 2 - 1) * Math.PI);
        });

        w = container.clientWidth;
        h = container.clientHeight;

        if (colorBgr) {
            container.style.backgroundColor = colorBgr;
        } // if

        draw();

        timer = setInterval(onTimer, interval);
        containerTop = container.offsetTop;
        containerLeft = container.offsetLeft;
        container.onmousemove = onMouseMove;
        container.onmouseleave = onMouseLeave;
        container.onclick = onClick;
        let zX = 1, maxZX = 2, minZX = 0.5;
        window.addEventListener('wheel', function (event) {
            if (event.target.id !== "clouder" && event.target.parentElement.id !== "clouder") return;
            let dir;
            dir = (event.deltaY > 0) ? 0.1 : -0.1;
            zX += dir;
            if (zX > maxZX) zX = maxZX;
            if (zX < minZX) zX = minZX;
            container.style.transform = `scale(${zX})`;
            event.preventDefault();
        }, {passive: false});
    } // init


    function onMouseMove(e) {
        if (!e) {
            e = window.event;
        } // if

        setPos(e.clientX, e.clientY);

        setClosest(findClosest(e.clientX - containerLeft, e.clientY - containerTop));
    } // onMouseMove


    function onMouseLeave(e) {
        if (!e) {
            e = window.event;
        } // if

        rho = idleMotion;
        setClosest(null);
    } // onMouseLeave


    function setupElems(elems) {

        if (elems) {
            for (let e in elems) {
                const c = {};
                c.text = elems[e].text;
                c.id = elems[e].id;
                c.weight = elems[e].weight;
                objs.push(c);
            } // for
        }

    } // setupElems


    function setupSpans() {
        for (let i = 0; i < container.children.length; i++) {
            const span = container.children[i];
            span.style.position = "absolute";
            span.style.cursor = "pointer";
            span.classList.add('tagcloud--item');
            const c = {};
            c.span = span;
            c.width = 0;
            c.height = 0;
            objs.push(c);
        }
    } // setupSpans


    function adjustElems() {

        for (let i in objs) {
            let dx = 0, dy = 0, dz = 0;
            const o = objs[i];
            for (let j in objs) {
                if (i === j) {
                    continue;
                } // if
                const diffX = o.x - objs[j].x;
                const diffY = o.y - objs[j].y;
                const diffZ = o.z - objs[j].z;
                const r = Math.sqrt(diffX * diffX + diffY * diffY + diffZ * diffZ);
                dx += 0.05 / (r * r) * diffX / r;
                dy += 0.05 / (r * r) * diffY / r;
                dz += 0.05 / (r * r) * diffZ / r;
            } // for

            o.x += dx;
            o.y += dy;
            o.z += dz;
            const dist = Math.sqrt(o.x * o.x + o.y * o.y + o.z * o.z);
            o.x /= dist;
            o.y /= dist;
            o.z /= dist;
        } // for

    } // adjustElems


    function sign(a) {
        return a > 0 ? 1 : (a < 0 ? -1 : 0);
    } // sign


    function setPos(x, y) {
        x = (lastX = x - container.offsetLeft) * 2 / w - 1;
        x = (Math.abs(x) < nonSense ? 0 : (x - nonSense * sign(x)) / (1 - nonSense)) / xScale;
        y = (lastY = y - container.offsetTop) * 2 / h - 1;
        y = (Math.abs(y) < nonSense ? 0 : (y - nonSense * sign(y)) / (1 - nonSense)) / yScale;
        theta = Math.atan2(y, x);
        rho = Math.sqrt(x * x + y * y);
    } // setPos

    function draw() {
        const filters = (typeof (document.body.filters) == "object");

        process(function (o) {

            if (!o.span) {
                o.span = document.createElement("span");
                o.width = 0;
                o.height = 0;
                o.span.classList.add('tagcloud--item');
                o.span.innerHTML = o.text;
                o.span.style.fontWeight = "bold";
                o.span.style.position = "absolute";
                o.span.style.cursor = "pointer";
                let c = 1;
                for (let i in colorMax) {
                    c = c * 256 + Math.floor((colorMax[i] - colorMin[i]) * o.weight + colorMin[i]);
                } // for
                o.span.style.color = "#" + c.toString(16).substr(1);
                container.appendChild(o.span);
                o.span.descriptor = o;
            } // if

            const size = fontSize + o.z * fontShift;
            o.factor = size / fontSize;
            if (o.width === 0) {
                o.width = asPixels(o.span.clientWidth / o.factor);
                o.height = asPixels(o.span.clientHeight / o.factor);
            } // if
            o.span.style.fontSize = asPixels(Math.round(size));
            o.screenX = w * (o.x * xScale + 1) / 2;
            o.span.style.left = asPixels(o.screenX - parseInt(o.width) * o.factor / 2);
            o.screenY = h * (o.y * yScale + 1) / 2;
            o.span.style.top = asPixels(o.screenY - parseInt(o.height) * o.factor / 2);
            o.span.style.zIndex = o.z >= 0 ? 10 : 5;
            const opa = (Math.sin(o.z * Math.PI / 2) / 2 + 0.5) * (1 - opaque) + opaque;
            if (!filters) {
                o.span.style.opacity = opa;
            } else {
                const f = o.span.filters["DXImageTransform.Microsoft.Alpha"];
                if (f) {
                    f.opacity = opa * 100;
                } else {
                    o.span.style.filter += "progid:DXImageTransform.Microsoft.Alpha(opacity=" + (opa * 100) + ")";
                } // else
            } // else
        });

    } // draw


    function findClosest(ex, ey) {

        let bestDist = w + h;
        let best = null;
        for (let i in objs) {
            const o = objs[i];
            const dx = ex - o.screenX;
            const dy = ey - o.screenY;
            const dist = Math.sqrt(dx * dx + dy * dy) / o.factor;
            if (dist < bestDist) {
                bestDist = dist;
                best = o;
            } // if
        } // for

        return best;
    } // findClosest


    function setClosest(obj) {

        if (closest === obj) {
            return;
        } // if

        if (closest != null) {
            closest.span.style.border = "";
            closest.span.style.transform = "none";
        } // if
        closest = obj;

        if (closest != null) {
            closest.span.style.padding = "3px";
            closest.span.style.border = "1px solid black";
            closest.span.style['border-radius'] = "5px";
            closest.span.style.transform = "scale(2)";
        } // if

    } // setClosest


    function onTimer() {
        const t0 = new Date().getTime();

        const move = function (o) {
            spin(o, -theta);
            step(o, rho * stepAngle);
            spin(o, theta);
        }; // move

        process(move);
        adjustElems();
        draw();

        setClosest(findClosest(lastX, lastY));

        timing.push(new Date().getTime() - t0);
        if (timing.length > timingMax) {
            timing.splice(0, timing.length - timingMax);
        } // if
    } // onTimer


    function spin(o, angle) {
        const x = o.x;
        const y = o.y;
        o.x = x * Math.cos(angle) - y * Math.sin(angle);
        o.y = x * Math.sin(angle) + y * Math.cos(angle);
    } // spin


    function step(o, angle) {
        const x = o.x;
        const z = o.z;
        o.x = x * Math.cos(angle) - z * Math.sin(angle);
        o.z = x * Math.sin(angle) + z * Math.cos(angle);
    } // step


    function onClick(event) {

        if (closest == null || closest.id == null) {
            return;
        } // if

        callback(closest, event);
    } // spanClicked


    function process(func) {
        for (let i in objs) {
            func(objs[i]);
        } // for
    } // process


    function parseColor(text) {
        const hex = parseInt(text.substr(1), 16);
        return [Math.floor(hex / 65536), Math.floor((hex / 256) % 256), Math.floor(hex % 256)];
    } // parseColor


    function parametrize(p) {

        if (!p.container) {
            alert("Clouder could not be created without container!");
            throw "Clouder without container";
        } // if

        container = p.container;

        if (!p.tags && container.children.length < 0) {
            alert("Clouder could not be crated without tags or spans in container!");
            throw "Clouder without tags";
        } // if

        callback = p.callback ? p.callback : function (id) {
            alert(id);
        };
        fontSize = p.fontSize ? p.fontSize : 14;
        fontShift = typeof (p.fontShift) != "undefined" ? p.fontShift : fontSize / 2;
        colorMax = p.colorMax ? parseColor(p.colorMax) : parseColor("#000000");
        colorMin = p.colorMin ? parseColor(p.colorMin) : parseColor("#C0C0C0");
        colorBgr = p.colorBgr ? p.colorBgr : null;
        interval = typeof (p.interval) != "undefined" ? p.interval : interval;
        stepAngle = typeof (p.stepAngle) != "undefined" ? p.stepAngle : stepAngle;
        idleMotion = typeof (p.idleMotion) != "undefined" ? p.idleMotion : idleMotion;
        opaque = typeof (p.opaque) != "undefined" ? p.opaque : opaque;
        nonSense = typeof (p.nonSense) != "undefined" ? p.nonSense : nonSense;
        if (typeof (p.scale) != "undefined") {
            xScale = yScale = p.scale;
        } // if
        xScale = typeof (p.xScale) != "undefined" ? p.xScale : xScale;
        yScale = typeof (p.yScale) != "undefined" ? p.yScale : yScale;
    } // parametrize


    self.getRenderingTime = function () {
        let sum = 0;
        for (let i in timing) {
            sum += timing[i];
        } // for
        return sum / timing.length;
    }; // getRenderingTime

    self.kill = function () {
        clearInterval(timer);
        process(function (o) {
            o.span.parentNode.removeChild(o.span);
        });
    }; // kill


    parametrize(params);

    init();

} // Clouder

function asPixels(number) {
    return number + 'px';
} // asPixels

// Main options setup
const main = {

    params: {
        interval: 50,
        fontSize: 20,
        fontShift: 4
    },

    init: function () {
        this.setupBlocks();
        this.makeCloud();
    }, // init

    makeCloud: function () {
        const clouder = document.getElementById("clouder");

        let attrs = {
            container: clouder,
            tags: this.createTags(),
            callback: this.openTechnology
        };

        for (let i in this.params) {
            attrs[i] = this.params[i];
        } // for

        if (this.clouder) {
            this.clouder.kill();
        } // if

        this.clouder = new Clouder(attrs);

    }, // makeCloud

    createTags: function () {
        const allSkillsElements = document.getElementsByClassName("skills-array");
        const allSkills = [];

        for (let i = 0; i < allSkillsElements.length; i++) {
            allSkills.push(allSkillsElements[i].innerText);
        }
        return allSkills.flatMap(skill => JSON.parse(skill));
    }, // createTags

    setupBlocks: function () {
        const w = document.documentElement.clientWidth, h = document.documentElement.clientHeight;
        // const w = 1000, h = 700
        const clouder = document.getElementById("clouder");
        //clouder.style.border = "1px solid black";
        clouder.style.position = "relative";
        clouder.style.width = asPixels(percent(w));
        clouder.style.height = asPixels(percent(h, 70));
    }, // setupBlocks
    openTechnology: function (item, event) {
        window.open(`https://www.google.com/search?q=${item.text}`, '_blank');
    }
};

function percent(value, percentToGet = 50) {
    //Calculate the percent.
    return (percentToGet / 100) * value;
}

window.addEventListener("resize", (event) => {
    // Get width and height of the window excluding scrollbars
    main.init();
});