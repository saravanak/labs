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
  
  export default function ListBags({  bags }: any) {
    const { data } = bags;
    const router = useRouter();
  
  
    const listedBags: (typeof ShelfModel)[] = data?.luggages;
  
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Your Shelves</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listedBags
            ? listedBags.map((bag :any, index: any) => {
                return (
                  <TableRow
                    key={index}
                  >
                    <TableCell>{bag.name}</TableCell>
                    <TableCell>{bag.type}</TableCell>
                    <TableCell>{bag.comment}</TableCell>                    
                  </TableRow>
                );
              })
            : null}
        </TableBody>
      </Table>
    );
  }
  
  