import { Button } from "@mantine/core";

function NewButton({ children, ...props }) {
  return (
    <>
      <Button { ...props }>{children}</Button>
    </>
  );
}

export default NewButton;
