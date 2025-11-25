import { memo } from "react";
import CustomCursor from "./CustomCursor";

function Layout({ children }) {
  return (
    <div className="layout">
      <CustomCursor />
      <main className="content">{children}</main>
    </div>
  );
}

export default memo(Layout);
