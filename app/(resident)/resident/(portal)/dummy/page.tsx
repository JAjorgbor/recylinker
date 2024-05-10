"use client";
import { Button } from "@nextui-org/react";
import type { FC } from "react";
import { toast } from "sonner";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <Button color="primary" onClick={() => toast("My first toast")}>
        click me
      </Button>
    </>
  );
};
export default page;
