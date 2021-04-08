import { merge } from 'lodash';
import Card from './Card';
import Chip from './Chip';
import Tabs from './Tabs';
import Form from './Form';
import Menu from './Menu';
import Grid from './Grid';
import Lists from './Lists';
import Table from './Table';
import Alert from './Alert';
import Badge from './Badge';
import Paper from './Paper';
import Dialog from './Dialog';
import Avatar from './Avatar';
import Rating from './Rating';
import Slider from './Slider';
import Buttons from './Buttons';
import SvgIcon from './SvgIcon';
import Tooltip from './Tooltip';
import Popover from './Popover';
import Stepper from './Stepper';
import Pickers from './Pickers';
import Skeleton from './Skeleton';
import Backdrop from './Backdrop';
import Snackbar from './Snackbar';
import Progress from './Progress';
import Timeline from './Timeline';
import TreeView from './TreeView';
import Container from './Container';
import Accordion from './Accordion';
import Typography from './Typography';
import Pagination from './Pagination';
import Breadcrumbs from './Breadcrumbs';
import Autocomplete from './Autocomplete';

// ----------------------------------------------------------------------

export default function ComponentsOverrides({ theme }) {
  return merge(
    Tabs({ theme }),
    Chip({ theme }),
    Card({ theme }),
    Form({ theme }),
    Menu({ theme }),
    Grid({ theme }),
    Badge({ theme }),
    Lists({ theme }),
    Table({ theme }),
    Paper({ theme }),
    Alert({ theme }),
    Rating({ theme }),
    Dialog({ theme }),
    Avatar({ theme }),
    Slider({ theme }),
    Pickers({ theme }),
    Stepper({ theme }),
    Tooltip({ theme }),
    Popover({ theme }),
    Buttons({ theme }),
    SvgIcon({ theme }),
    Skeleton({ theme }),
    Timeline({ theme }),
    TreeView({ theme }),
    Backdrop({ theme }),
    Snackbar({ theme }),
    Progress({ theme }),
    Container({ theme }),
    Accordion({ theme }),
    Typography({ theme }),
    Pagination({ theme }),
    Breadcrumbs({ theme }),
    Autocomplete({ theme })
  );
}
