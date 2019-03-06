/* copyright 2019, stefano bovio @allyoucanmap. */

import * as geoProjection from 'd3-geo-projection';
import * as geoPolygon from 'd3-geo-polygon';

const parent = document.body;
const toolbar = document.createElement('div');
toolbar.setAttribute('class', 'toolbar');
parent.appendChild(toolbar);
const content = document.createElement('div');
content.setAttribute('class', 'content');
parent.appendChild(content);

let projectionName = 'geoAirocean';

let options = {
    imgSrc: 'gioconda4326.png',
    resX: 0.351579,
    resY: 0.351595,
    left: -180.00833333333333,
    top: 90.00833333333334
};

const projections = { ...geoProjection, ...geoPolygon };

const projectionNames = [
    "geoAiry",
    "geoAitoff",
    "geoArmadillo",
    "geoAugust",
    "geoBaker",
    "geoBerghaus",
    "geoBertin1953",
    "geoBoggs",
    "geoBonne",
    "geoBottomley",
    "geoBromley",
    "geoChamberlin",
    "geoChamberlinAfrica",
    "geoCollignon",
    "geoCraig",
    "geoCraster",
    "geoCylindricalEqualArea",
    "geoCylindricalStereographic",
    "geoEckert1",
    "geoEckert2",
    "geoEckert3",
    "geoEckert4",
    "geoEckert5",
    "geoEckert6",
    "geoEisenlohr",
    "geoFahey",
    "geoFoucaut",
    "geoFoucautSinusoidal",
    "geoGilbert",
    "geoGingery",
    "geoGinzburg4",
    "geoGinzburg5",
    "geoGinzburg6",
    "geoGinzburg8",
    "geoGinzburg9",
    "geoGringorten",
    "geoGuyou",
    "geoHammer",
    "geoHammerRetroazimuthal",
    "geoHealpix",
    "geoHill",
    "geoHomolosine",
    "geoHufnagel",
    "geoHyperelliptical",
    "geoInterrupt",
    "geoInterruptedBoggs",
    "geoInterruptedHomolosine",
    "geoInterruptedMollweide",
    "geoInterruptedMollweideHemispheres",
    "geoInterruptedSinuMollweide",
    "geoInterruptedSinusoidal",
    "geoKavrayskiy7",
    "geoLagrange",
    "geoLarrivee",
    "geoLaskowski",
    "geoLittrow",
    "geoLoximuthal",
    "geoMiller",
    "geoModifiedStereographic",
    "geoModifiedStereographicAlaska",
    "geoModifiedStereographicGs48",
    "geoModifiedStereographicGs50",
    "geoModifiedStereographicMiller",
    "geoModifiedStereographicLee",
    "geoMollweide",
    "geoMtFlatPolarParabolic",
    "geoMtFlatPolarQuartic",
    "geoMtFlatPolarSinusoidal",
    "geoNaturalEarth",
    "geoNaturalEarth2",
    "geoNellHammer",
    "geoPatterson",
    "geoPolyconic",
    "geoPolyhedral",
    "geoPolyhedralButterfly",
    "geoPolyhedralCollignon",
    "geoPolyhedralWaterman",
    "geoGringortenQuincuncial",
    "geoPeirceQuincuncial",
    "geoPierceQuincuncial",
    "geoQuantize",
    "geoQuincuncial",
    "geoRectangularPolyconic",
    "geoRobinson",
    "geoSatellite",
    "geoSinuMollweide",
    "geoSinusoidal",
    "geoStitch",
    "geoTimes",
    "geoTwoPointAzimuthal",
    "geoTwoPointAzimuthalUsa",
    "geoTwoPointEquidistant",
    "geoTwoPointEquidistantUsa",
    "geoVanDerGrinten",
    "geoVanDerGrinten2",
    "geoVanDerGrinten3",
    "geoVanDerGrinten4",
    "geoWagner",
    "geoWagner4",
    "geoWagner6",
    "geoWagner7",
    "geoWiechel",
    "geoWinkel3",
    "geoPolyhedral",
    "geoPolyhedralButterfly",
    "geoPolyhedralCollignon",
    "geoPolyhedralWaterman",
    "geoPolyhedralVoronoi",
    "geoDodecahedral",
    "geoCox",
    "geoTetrahedralLee",
    "geoAirocean",
    "geoIcosahedral",
    "geoCubic",
    "geoCahillKeyes"
]
.sort((a, b) => a > b ? 1 : -1)
.map((value) => {
    return {
        value,
        label: (value.match(/[A-Z][a-z0-9]+/g) || []).join(' ')
    }
});

const select = document.createElement('select');

const inputs = [
    {
        key: 'imgSrc',
        value: options.imgSrc,
        label: 'Image Source'
    },
    {
        key: 'resX',
        value: options.resX,
        label: 'Resolution X'
    },
    {
        key: 'resY',
        value: options.resY,
        label: 'Resolution Y'
    },
    {
        key: 'left',
        value: options.left,
        label: 'Left Coordinate'
    },
    {
        key: 'top',
        value: options.top,
        label: 'Top Coordinate'
    }
];

inputs.forEach(({ value, label }) => {
    const container = document.createElement('div');
    const text = document.createElement('div');
    text.innerHTML = label;
    const input = document.createElement('input');
    input.setAttribute('value', value);
    container.appendChild(text);
    container.appendChild(input);
    toolbar.appendChild(container);

    input.onchange = (event) => {
        projectionName = event.target.value;
    };
});

projectionNames.forEach(({ label, value }) => {
    const option = document.createElement('option');
    option.innerHTML = label;
    option.setAttribute('value', value);
    select.appendChild(option);
});

select.onchange = (event) => {
    projectionName = event.target.value;
};

toolbar.appendChild(select);

const button = document.createElement('button');
button.innerHTML = 'PROJECT';
button.onclick = () => init();

toolbar.appendChild(button);

const init = () => {
    const { left, top, resX, resY, imgSrc } = options;
    const projection = projections[projectionName] && projections[projectionName]();
    if (!projection || left === undefined || top === undefined || !resX || !resY || !imgSrc) return null;
    const loader = document.createElement('div');
    loader.setAttribute('class', 'loader');
    loader.innerHTML = '';
    parent.appendChild(loader);
    const image = new Image();

    const oldOutput = document.getElementById('output');
    if (oldOutput) content.removeChild(oldOutput);

    const getCanvas = (width, height, id) => {
        const canvas = document.createElement('canvas');
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        canvas.setAttribute('id', id);
        return canvas;
    };

    image.onload = () => {

        const width = image.naturalWidth;
        const height = image.naturalHeight;
        const input = getCanvas(width, height);
        const inputCtx = input.getContext('2d');
        inputCtx.drawImage(image, 0, 0);

        const output = getCanvas(width, height, 'output');
        const outputCtx = output.getContext('2d');

        const range = [...Array(width * height).keys()];
        const LEFT = parseFloat(left);
        const TOP = parseFloat(top);
        const RESX = parseFloat(resX);
        const RESY = parseFloat(resY);
        let count = range.length;

        range.forEach((idx) => {
            new Promise(() => {
                const x = idx % width;
                const y = Math.floor(idx / width);
                const { data } = inputCtx.getImageData(x, y, 1, 1);
                const [ r, g, b, a ] = data;
                const lng = LEFT + x * RESX;
                const lat = TOP - y * RESY;
                const leftTop = projection([lng, lat]);
                outputCtx.fillRect(leftTop[0], leftTop[1], 1, 1);
                outputCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
                outputCtx.fill('evenodd');
                count--;
                if (count === 0) {
                    content.appendChild(output);
                    parent.removeChild(loader);
                }
            });
        });

    };
    image.onerror = () => parent.removeChild(loader);
    image.crossOrigin = 'anonymous';
    image.src = imgSrc;
}
