/**
 * --- Author: Drew Delong
 * --- Date: 9/3/2021
 * Custom Perspective component utilizing react-table to provide
 * additional functionality when using tables in Ignition.
 *
 */
import * as React from "react";
import {
  Component,
  ComponentMeta,
  ComponentProps,
  PComponent,
  PropertyTree,
  SizeObject
} from "@inductiveautomation/perspective-client";
import { useTable } from "react-table";
import styled from "styled-components";

// import "./styles.css";
import { makeData } from "./makeData";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

// The 'key' or 'id' for this component type.  Component must be registered with this EXACT key in the Java side as well
// as on the client side.  In the client, this is done in the index file where we import and register through the
// ComponentRegistry provided by the perspective-client API.
export const COMPONENT_TYPE = "rad.display.table";

// This is the shape of the properties we get from the perspective 'props' property tree.
export interface TableProps {
  url: string; // the url of the image this component should display
}

// export class Table extends Component<ComponentProps<T extends object>, any> {
export class Table extends Component<ComponentProps<TableProps>, any> {
  table: Table;
  render() {
    // The props we're interested in.
    const {
      // props: { url }
      // emit
    } = this.props;
    // Read the 'url' property provided by the perspective gateway via the component 'props'.

    const columns = React.useMemo(
      () => [
        {
          Header: "Name",
          columns: [
            {
              Header: "First Name",
              accessor: "firstName"
            },
            {
              Header: "Last Name",
              accessor: "lastName"
            }
          ]
        },
        {
          Header: "Info",
          columns: [
            {
              Header: "Age",
              accessor: "age"
            },
            {
              Header: "Visits",
              accessor: "visits"
            },
            {
              Header: "Status",
              accessor: "status"
            },
            {
              Header: "Profile Progress",
              accessor: "progress"
            }
          ]
        }
      ],
      []
    );

    const data = React.useMemo(() => makeData(20), []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable({
        columns,
        data
      });

    // Note that the topmost piece of dom requires the application of an element reference, events, style and
    // className as shown below otherwise the layout won't work, or any events configured will fail. See render
    // of MessengerComponent in Messenger.tsx for more details.
    // return <img {...emit()} src={url} alt={`image-src-${url}`} />;
    return (
      <Styles>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} key={column.id}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.id}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()} key={cell.value}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Styles>
    );
  }
}

// This is the actual thing that gets registered with the component registry.
export class TableMeta implements ComponentMeta {
  getComponentType(): string {
    return COMPONENT_TYPE;
  }

  // the class or React Type that this component provides
  getViewComponent(): PComponent {
    return Table;
  }


  getDefaultSize(): SizeObject {
    return {
      width: 360,
      height: 360
    };
  }

  // Invoked when an update to the PropertyTree has occurred,
  // effectively mapping the state of the tree to component props.
  getPropsReducer(tree: PropertyTree): Record<string, any> {
    return {
      url: tree.readString("url", "")
    };
  }
}
