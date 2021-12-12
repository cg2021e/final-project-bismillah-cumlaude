let camera,scene,renderer;
let stack = [];
const boxHeight = 1;
const originalBoxSize = 3;

// Base
// addLayer(0,0,originalBoxSize, originalBoxSize);
function addLayer(x,z,width,depth,direction){
    const y = boxHeight*stack.length; //add new brick
    const layer = generateBox(x.y,z,width,depth);
    layer.direction = direction;
    stack.push(layer);
}

//generateBox
function generateBox(x,y,z,width,depth){
    const geometry = new THREE.BoxGeometry(width,boxHeight,depth);
    const color = new THREE.Color(`hsl(${30+stack.length*4},100%,50%)`);
    const material = new THREE.MeshLambertMaterial({color});
    const mesh = new THREE.Mesh(geometry,material);
    mesh.position.set(x,y,z);

    scene.add(mesh);

    return{
        threejs: mesh,
        width,
        depth
    };
}

function init(){
    //scene
    scene = new THREE.Scene();

    // First Layer
    addLayer(-10,0,originalBoxSize,originalBoxSize,"x");

    // // Add cube
    // const geometry = new THREE.BoxGeometry(3,1,3);
    // const material = new THREE.MeshLambertMaterial({color : 0xfb8e00});
    // const mesh = new THREE.Mesh(geometry, material);
    // mesh.position.set(0,0,0);
    // scene.add(mesh);

    //lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(10, 20, 0);
    scene.add(dirLight);

    //camera 
    //const aspect = window.innerWidth / window.innerHeight;
    const width = 10;
    const height = width*(window.innerHeight/window.innerWidth);
    camera = new THREE.OrthographicCamera(
        width / -2, // left
        width / 2, // right
        height / 2, // top
        height / -2, // bottom
        1, // near plane
        100 // far plane
    );

    camera.position.set(4, 4, 4);
    camera.lookAt(0, 0, 0);

    //renderer 
    const renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene,camera);
    document.body.appendChild(renderer.domElement);
}