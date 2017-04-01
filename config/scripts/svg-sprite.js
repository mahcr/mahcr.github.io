/**
 * Create svg sprite
 */
'use strict';
import fs      from 'fs';
import { root, removeExtension } from '../scripts/helpers';
import svgstore from 'svgstore';

const url = root('../', 'src/app/assets/svgs/');
const saveIn = root('../', 'src/app/partials/svgs/svgs.ejs');
const sprites = svgstore({ inline: true });
const listFiles = fs.readdirSync(url);

listFiles.forEach((name) => {
  sprites.add(removeExtension(name), fs.readFileSync(`${url + name}`, 'utf8'));
});

fs.writeFileSync(saveIn, sprites);
