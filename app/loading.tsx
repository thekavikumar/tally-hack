import { Loader2 } from "lucide-react";
import React from "react";

function loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader2 size="26px" className="animate-spin text-primary-500" />
    </div>
  );
}

export default loading;
