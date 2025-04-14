import * as THREE from 'three';

interface StarfieldOptions {
  numStars?: number;
}

interface StarPoint {
  pos: THREE.Vector3;
  hue: number;
  minDist: number;
}

export default function getStarfield({ numStars = 500 }: StarfieldOptions = {}): THREE.Points {
  function randomSpherePoint(): StarPoint {
    const radius = Math.random() * 25 + 25;
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    return {
      pos: new THREE.Vector3(x, y, z),
      hue: 0.6,
      minDist: radius,
    };
  }

  const verts: number[] = [];
  const colors: number[] = [];
  const positions: StarPoint[] = [];

  for (let i = 0; i < numStars; i++) {
    const p = randomSpherePoint();
    const { pos, hue } = p;

    positions.push(p);
    const col = new THREE.Color().setHSL(hue, 0.2, Math.random());

    verts.push(pos.x, pos.y, pos.z);
    colors.push(col.r, col.g, col.b);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.2,
    vertexColors: true,
    map: new THREE.TextureLoader().load('./textures/stars/circle.png'),
  });

  const points = new THREE.Points(geo, mat);
  return points;
}
