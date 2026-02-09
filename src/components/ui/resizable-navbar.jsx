import { Slot } from "@radix-ui/react-slot";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import React, { useRef, useState } from "react";
import { cn } from "liquidcn";

export const Navbar = ({ children, className, reverse, menuOpen }) => {
  const ref = useRef(null);
  const { scrollY } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const [visible, setVisible] = useState(false);
  const [sticky, setSticky] = useState(true);
  const prevScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (menuOpen) return;
    const previous = prevScrollY.current;
    const isScrollingUp = latest < previous;
    const threshold = !reverse ? 50 : 8;
    if (latest > 20) setVisible(true);
    else setVisible(false);
    if (latest < threshold) setSticky(true);
    else if (isScrollingUp && latest > 80) setSticky(true);
    else if (!isScrollingUp && latest >= threshold) setSticky(false);
    prevScrollY.current = latest;
  });

  const isSticky = menuOpen ? true : sticky;

  return (
    <motion.div
      ref={ref}
      className={cn("sticky inset-x-0 top-4 z-40 w-full", className)}
      animate={{ opacity: !isSticky ? 0 : 1, y: !isSticky ? -100 : 0 }}
      transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child, { visible }) : child
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }) => {
  return (
    <motion.div
      animate={{ width: visible ? "40%" : "100%", y: visible ? 20 : 0 }}
      transition={{
        default: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        width: { type: "spring", stiffness: 80, damping: 24, mass: 1 },
        y: { type: "spring", stiffness: 80, damping: 24, mass: 1 },
      }}
      style={{ minWidth: "800px" }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start px-4 py-2 lg:flex",
        className
      )}
    >
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 liquid-glass rounded-full border border-foreground/15 dark:border-foreground/20"
          >
            <span className="liquid-glass-content" aria-hidden="true" />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative z-10 flex w-full flex-row items-center justify-between">
        {children}
      </div>
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick, currentPath, LinkComponent }) => {
  const [hovered, setHovered] = useState(null);
  const Link = LinkComponent || (({ href, ...props }) => <a href={href} {...props} />);

  return (
    <motion.div
      role="menubar"
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium transition duration-200 lg:flex lg:space-x-2",
        "text-foreground/80 hover:text-foreground dark:text-foreground/90 dark:hover:text-foreground",
        className
      )}
    >
      {items.map((item, idx) => {
        const isActive = currentPath === item.link;
        return (
          <Link
            key={`link-${idx}`}
            href={item.link}
            onMouseEnter={() => setHovered(idx)}
            onFocus={() => setHovered(idx)}
            onBlur={() => setHovered((prev) => (prev === idx ? null : prev))}
            onClick={onItemClick}
            className="group relative inline-flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-transparent text-foreground/80 hover:text-foreground dark:text-foreground/90 dark:hover:text-foreground dark:focus-visible:ring-foreground/50"
          >
            <span className="relative z-20">{item.name}</span>
            <AnimatePresence>
              {(hovered === idx || isActive) && (
                <motion.span
                  layoutId="nav-underline"
                  className="pointer-events-none absolute inset-x-3 bottom-1 h-[2px] origin-center rounded-full bg-foreground/60 dark:bg-foreground/70"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{
                    opacity: hovered === idx || isActive ? 1 : 0.2,
                    scaleX: hovered === idx || isActive ? 1 : 0.8,
                  }}
                  exit={{ opacity: 0, scaleX: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </AnimatePresence>
          </Link>
        );
      })}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }) => {
  return (
    <motion.div
      animate={{ y: visible ? 20 : 0 }}
      transition={{ type: "spring", stiffness: 80, damping: 24, mass: 1 }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-stretch space-y-3 bg-transparent px-0 py-2 lg:hidden",
        className
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child, { visible }) : child
      )}
    </motion.div>
  );
};

export const MobileNavHeader = ({ children, className, visible }) => {
  return (
    <div className={cn("relative z-[60] w-full", className)}>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 liquid-glass rounded-[28px] border border-foreground/15 dark:border-foreground/20"
          >
            <span className="liquid-glass-content" aria-hidden="true" />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative z-10 flex w-full flex-row items-center justify-between px-4 py-2">
        {children}
      </div>
    </div>
  );
};

export const MobileNavMenu = ({ children, className, isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{
            default: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            y: { type: "spring", stiffness: 80, damping: 24, mass: 1 },
            opacity: { duration: 0.45 },
          }}
          className={cn(
            "relative z-[60] w-full liquid-glass rounded-[28px] border border-foreground/15 dark:border-foreground/20",
            className
          )}
        >
          <div className="liquid-glass-content flex flex-col items-start justify-start gap-4 px-4 py-6">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({ isOpen, onClick }) => {
  const iconClass = "text-foreground drop-shadow dark:text-foreground";
  const toggleBaseClasses = cn(
    "flex h-10 w-10 items-center justify-center rounded-full transition focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 dark:focus-visible:ring-foreground/50"
  );
  return isOpen ? (
    <button aria-label="Close navigation" className={toggleBaseClasses} onClick={onClick}>
      <X className={iconClass} />
    </button>
  ) : (
    <button aria-label="Open navigation" className={toggleBaseClasses} onClick={onClick}>
      <Menu className={iconClass} />
    </button>
  );
};

export const NavbarLogo = ({
  href = "/",
  imageSrc,
  imageAlt = "logo",
  imageWidth = 50,
  imageHeight = 50,
  imageClassName = "rounded-full -m-3",
  label = "Levr",
  className,
  LinkComponent,
  ImageComponent,
}) => {
  const Link = LinkComponent || (({ href, ...props }) => <a href={href} {...props} />);
  const Image = ImageComponent || (({ src, alt, width, height, className: imgClassName }) => (
    <img src={src} alt={alt} width={width} height={height} className={imgClassName} />
  ));

  return (
    <Link
      href={href}
      className={cn(
        "relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-foreground drop-shadow",
        className
      )}
    >
      <Image src={imageSrc} alt={imageAlt} width={imageWidth} height={imageHeight} className={imageClassName} />
      <span className="font-medium text-foreground drop-shadow">{label}</span>
    </Link>
  );
};

export const NavbarButton = ({ href, as: Tag = "a", children, className, asChild = false, ...props }) => {
  const Comp = asChild ? Slot : Tag;
  return (
    <Comp
      href={asChild ? undefined : href || undefined}
      className={cn(
        "px-4 py-2 rounded-md text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};
