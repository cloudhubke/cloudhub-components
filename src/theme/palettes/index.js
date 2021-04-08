import Green, { dark as darkGreen } from './green';
import Blue, { dark as darkBlue } from './blue';
import Indigo, { dark as darkIndigo } from './indigo';
import Pink, { dark as darkPink } from './pink';
import Orange, { dark as darkOrange } from './orange';

export default function ({ themeMode = 'light', paletteType = 'green' }) {
  if (paletteType === 'blue') {
    return themeMode === 'dark' ? darkBlue : Blue;
  } else if (paletteType === 'indigo') {
    return themeMode === 'dark' ? darkIndigo : Indigo;
  } else if (paletteType === 'pink') {
    return themeMode === 'dark' ? darkPink : Pink;
  } else if (paletteType === 'orange') {
    return themeMode === 'dark' ? darkOrange : Orange;
  }

  return themeMode === 'dark' ? darkGreen : Green;
}
