import clsx from "clsx";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  HTMLAttributes,
} from "react";

type DialogContextType = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const DialogContext = createContext<DialogContextType | null>(null);

function useDialog() {
  const ctx = useContext(DialogContext);
  if (!ctx) {
    throw new Error("Dialog components must be used inside <Dialog.Root>");
  }
  return ctx;
}

/* ---------------- Root ---------------- */

function Root({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

/* ---------------- Trigger ---------------- */

function Trigger({
  children,
  ...props
}: HTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = useDialog();

  return (
    <button
      {...props}
      onClick={() => setOpen(true)}
    >
      {children}
    </button>
  );
}

/* ---------------- Overlay ---------------- */

function Overlay() {
  const { open, setOpen } = useDialog();
  if (!open) return null;

  return (
    <div
      onClick={() => setOpen(false)}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
    />
  );
}

/* ---------------- Content ---------------- */

function Content({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { open } = useDialog();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className={clsx(
          "bg-zinc-600 text-white rounded-xl shadow-xl w-full max-w-md p-6 animate-in fade-in zoom-in",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

/* ---------------- Header ---------------- */

function Header({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4">
      {children}
    </div>
  );
}

/* ---------------- Title ---------------- */

function Title({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-lg font-semibold">
      {children}
    </h2>
  );
}

/* ---------------- Description ---------------- */

function Description({ children }: { children: ReactNode }) {
  return (
    <p className="text-sm text-zinc-100 mt-1">
      {children}
    </p>
  );
}

/* ---------------- Footer ---------------- */

function Footer({ children }: { children: ReactNode }) {
  return (
    <div className="mt-6 flex justify-end gap-2">
      {children}
    </div>
  );
}

/* ---------------- Close ---------------- */

function Close({
  children,
  ...props
}: HTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = useDialog();

  return (
    <button
      {...props}
      onClick={() => setOpen(false)}
    >
      {children}
    </button>
  );
}

/* ---------------- Export ---------------- */

export const Dialog = {
  Root,
  Trigger,
  Overlay,
  Content,
  Header,
  Title,
  Description,
  Footer,
  Close,
};
