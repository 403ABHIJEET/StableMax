import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
  
interface props {
    buttonText: string,
    classes?: string,
    id: string,
    callBackFunct: (id: string)  => void
    confirmBtnClass?: string
}

  export function AlertDialogDemo({ id, buttonText, classes, callBackFunct, confirmBtnClass } : props) {
    const handleAction = () => {
      callBackFunct(id)
    }

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className={classes} >{buttonText}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleAction} className={confirmBtnClass} >Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  