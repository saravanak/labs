import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RackModel } from "@/lib/prisma/zod";
import { usePathname, useRouter } from "next/navigation";

export default function ListRacks({ racks }: any) {
  const { data } = racks;
  console.log(data);
  const router = useRouter();
  const pathname = usePathname()


  const listedRacks: (typeof RackModel)[] = data?.racks;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Your Racks</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {listedRacks
          ? listedRacks.map((rack: any, index: any) => {
              return (
                <TableRow
                  key={index}
                  onClick={() => router.push(`./${pathname}/${rack.id}/shelf`)}
                >
                  <TableCell>{rack.name}</TableCell>
                  <TableCell>{rack.type}</TableCell>
                  <TableCell>{rack.comment}</TableCell>
                  <TableCell>{rack.shortName}</TableCell>
                </TableRow>
              );
            })
          : null}
      </TableBody>
    </Table>
  );
}

