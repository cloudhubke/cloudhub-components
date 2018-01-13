import React from 'react';
import {
    Grid,
    TableView,
    TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';


export class SimpleDataGrid extends React.PureComponent {
    static defaultProps = {
        templates:()=>undefined
    }
    render() {
        const { rows, columns } = this.props;

        return (
            <Grid
                rows={rows}
                columns={columns || []}
            >
                <TableView
                    tableCellTemplate={this.props.templates}
                />
                <TableHeaderRow />
            </Grid>
        );
    }
}

export default SimpleDataGrid;