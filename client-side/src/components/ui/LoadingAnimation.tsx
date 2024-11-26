import { Box } from "@geist-ui/icons";
import { createPortal } from "react-dom";

export default function LoadingAnimation() {
  return createPortal(
    <div className="fixed top-0 w-screen h-screen flex justify-center items-center z-[100]">

      {/* Background*/}
      <div className="absolute inset-0 bg-l-white-300 opacity-50"></div>

      {/* Spinning Box */}
        <Box size="70px" className="animate-spin" />
    </div>,
    document.body
  );
}
