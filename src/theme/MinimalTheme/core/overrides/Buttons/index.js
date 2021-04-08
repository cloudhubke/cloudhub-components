import { merge } from 'lodash';
import Fab from './Fab';
import Button from './Button';
import IconButton from './IconButton';
import ButtonGroup from './ButtonGroup';
import ToggleButton from './ToggleButton';
import LoadingButton from './LoadingButton';

// ----------------------------------------------------------------------

export default function Buttons({ theme }) {
  return merge(
    Fab({ theme }),
    Button({ theme }),
    IconButton({ theme }),
    ButtonGroup({ theme }),
    ToggleButton({ theme }),
    LoadingButton({ theme })
  );
}
