import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "@/components/ui/table";
import { Member } from "./member";

interface Member {
    id: string;
    name: string;
    email: string;
    status: string;
}

interface MembersTableProps {
  members: Member[];
}

export function MembersTable({ members }: MembersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <Member key={member.id} member={member} />
        ))}
      </TableBody>
    </Table>
  );
}
