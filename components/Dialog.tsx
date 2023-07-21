import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Show My Stats</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Your Stats</DialogTitle>
          <DialogDescription>
            Focus on your typing skills and improve your WPM.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username :
            </Label>
            <Label id="username" className="col-span-3">
              Pedro Duarte
            </Label>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="accuracy" className="text-right">
              Accuracy :
            </Label>
            <Label id="accuracy" className="col-span-3">
              99%
            </Label>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="wpm" className="text-right">
              WPM :
            </Label>
            <Label id="wpm" className="col-span-3">
              99
            </Label>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time" className="text-right">
              Time :
            </Label>
            <Label id="time" className="col-span-3">
              99
            </Label>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
