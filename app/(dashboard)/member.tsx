import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface MemberProps {
  member: {
    id: string;
    name: string;
    email: string;
    status: string;
  };
}
export function Member({ member }: MemberProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">{member.id}</TableCell>
      <TableCell>{member.name}</TableCell>
      <TableCell>{member.email}</TableCell>
      <TableCell><Badge>{member.status}</Badge></TableCell>
    </TableRow>
  );
}
