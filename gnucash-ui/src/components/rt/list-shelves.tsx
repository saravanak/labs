import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { ShelfModel } from "@/lib/prisma/zod";
import { useRouter } from "next/navigation";
  
  export default function ListShelves({ shelves }: any) {
    const { data } = shelves;
    const router = useRouter();
  
  
    const listedShelves: (typeof ShelfModel)[] = data?.shelves;
  
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Your Shelves</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listedShelves
            ? listedShelves.map((shelf :any, index: any) => {
                return (
                  <TableRow
                    key={index}
                    onClick={() => router.push(`./shelf/${shelf.id}/bags`)}
                  >
                    <TableCell>{shelf.shortName}</TableCell>
                    <TableCell>{shelf.type}</TableCell>
                    <TableCell>{shelf.comment}</TableCell>                    
                  </TableRow>
                );
              })
            : null}
        </TableBody>
      </Table>
    );
  }
  
  