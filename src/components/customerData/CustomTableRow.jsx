import { TableCell, TableRow } from "../ui/table";

function CustomTableRow({ ...props }) {
  return (
    <div>
      <TableRow key={id}>
        <TableCell>Cell 1</TableCell>
      </TableRow>
    </div>
  );
}

export default CustomTableRow;
