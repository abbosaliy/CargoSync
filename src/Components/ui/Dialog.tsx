import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './alert-dialog';
import { Button } from './button';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
} from './alert-dialog';

type AlertDialogProps = {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  buttonName: string;
  onConfirm: () => void;
  className?: string;
};

function CustomAlertDialog({
  title,
  description,
  icon,
  buttonName,
  onConfirm,
  className,
}: AlertDialogProps) {
  const [open, setOpen] = useState(false);
  return (
    <AlertDialog
      open={open}
      onOpenChange={setOpen}
    >
      <AlertDialogTrigger asChild>
        <Button
          variant={'default'}
          className={className}
        >
          {buttonName}
          {icon}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => setOpen(false)}
            className="cursor-pointer"
          >
            Nein
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
            className="cursor-pointer"
          >
            Ja
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CustomAlertDialog;
