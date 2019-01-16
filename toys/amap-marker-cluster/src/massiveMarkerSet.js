import { range, random } from "lodash";
import ngeohash from "ngeohash";

export const base = [
  [120.12787, 30.390609],
  [120.341431, 30.390609],
  [120.341431, 30.278898],
  [120.12787, 30.278898]
];

const rr = i => i;

const hashs = ngeohash
  .bboxes(base[2][1], base[0][0], base[0][1], base[1][0], 6)
  .filter((el, i) => i % 3)
  .filter((el, i) => i % 3)
  .filter((el, i) => i % 2)
  .filter((el, i) => i % 2);

console.log("hashs--", hashs.length);

export const list = hashs.map(h => {
  const [minlat, minlon, maxlat, maxlon] = ngeohash.decode_bbox(h);
  return {
    lnglat: [
      [minlon, maxlat],
      [maxlon, maxlat],
      [maxlon, minlat],
      [minlon, minlat]
    ]
  };
});
