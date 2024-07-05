import { Case } from "change-case-all";
import { Button } from "../button";
import ListItem from "../lists/list-item";
import { Loader, ShieldQuestion } from "lucide-react";

export default function ListActionButtons({ actions, heading }: any) {
  return (
    <div className="bg-card">
      <ListItem key="heading" className="justify-center">
        <ShieldQuestion className="mr-4 bg-green-600 text-gray-200 p-[2px] rounded-md w-[2em] h-[2em]" />
        {heading}
      </ListItem>
      <ListItem key="manage">
        {actions.map(
          ({ variant = "secondary", onClick, label, mutation = {} }: any) => {
            return (
              <Button
                key={Case.kebab(label)}
                variant={variant}
                className="grow mx-4"
                onClick={onClick}
                disabled={mutation?.isLoading}
              >
                {mutation.isLoading ? <Loader /> : null} {label}
              </Button>
            );
          }
        )}
      </ListItem>
    </div>
  );
}

