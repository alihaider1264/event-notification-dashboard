import { getMembersFromWebhook } from "../actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MembersTable } from "../members-table";

interface Member {
  id: string;
  name: string;
  email: string;
  status: string;
}

export default async function DashboardPage() {
  const membersData: any[][] = await getMembersFromWebhook();
  const members: Member[] = membersData.map((memberData) => ({
    id: memberData[0],
    name: memberData[1],
    email: memberData[2],
    status: memberData[3] === "1" ? "active" : memberData[3] === "0" ? "draft" : "archived",
  }));

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="draft">Draft</TabsTrigger>
        <TabsTrigger value="archived">Archived</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <div className="flex justify-between items-center">
          <h1>All Members</h1>
          <Button>Add Member</Button>
        </div>
        <MembersTable members={members} />
      </TabsContent>
      <TabsContent value="active">
        <div className="flex justify-between items-center">
          <h1>Active Members</h1>
        </div>
      </TabsContent>
      <TabsContent value="draft">
        <div className="flex justify-between items-center">
          <h1>Draft Members</h1>
        </div>
      </TabsContent>
      <TabsContent value="archived">
        <div className="flex justify-between items-center">
          <h1>Archived Members</h1>
        </div>
      </TabsContent>
    </Tabs>
  );
}
