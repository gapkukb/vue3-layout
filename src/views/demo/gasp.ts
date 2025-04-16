const pies = [
  {
    value: 1,
    name: 'a',
    color: 'red',
  },
  {
    value: 1,
    name: 'a',
    color: 'blue',
  },
  {
    value: 1,
    name: 'a',
    color: 'yellow',
  },
  {
    value: 1,
    name: 'a',
    color: 'orange',
  },
  {
    value: 1,
    name: 'a',
    color: 'pink',
  },
  {
    value: 1,
    name: 'a',
    color: 'cyan',
  },
  {
    value: 1,
    name: 'a',
    color: 'black',
  },
];

const src = 'https://www.searchenginejournal.com/wp-content/uploads/2018/10/How-to-Boost-Your-Images%E2%80%99-Visibility-on-Google-Images.png';
const image = new Image();
image.src = src;
export default function draw(canvas: HTMLCanvasElement) {
  console.log(canvas);
  const dpr = 2;
  canvas.width = canvas.offsetWidth * dpr;
  canvas.height = canvas.offsetHeight * dpr;

  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.translate(canvas.width / 2, canvas.height / 2);
  const angle = (Math.PI * 2) / pies.length;
  let startAngle = 0;

  for (let i = 0; i < pies.length; i++) {
    ctx.save();
    const pie = pies[i];
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, canvas.width / 2, startAngle, startAngle + angle, false);
    ctx.fillStyle = pie.color || 'red';
    ctx.fill();
    // ctx.globalAlpha = 0.5;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(startAngle + angle / 2);
    // ctx.fillStyle = 'white';
    // ctx.font = '100px a';
    // ctx.textBaseline = 'middle';
    // ctx.textAlign = 'center';
    // ctx.fillText(pie.color, 200, 0);

    ctx.drawImage(image, 0, 0, 200, 400);
    ctx.restore();
    startAngle += angle;
  }

  image.onload = () => {
    console.log('1');

    draw(canvas);
  };
}
