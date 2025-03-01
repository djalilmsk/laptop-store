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
} from "@/components/ui/alert-dialog";  
import PropTypes from 'prop-types'; 

AlertDialogComponent.propTypes = {
  setAlertReturn: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  alertTitle: PropTypes.string,
  alertDescription: PropTypes.string,
};

export function AlertDialogComponent({
  children,
  alertTitle = "Are you absolutely sure?",
  alertDescription = "This action cannot be undone.",
  setAlertReturn,
}) {
  const handleContinue = () => setAlertReturn(true);
  const handleCancel = () => setAlertReturn(false);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className='w-5/6 rounded-lg'>
        <AlertDialogHeader>
          <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
          <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleContinue}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
