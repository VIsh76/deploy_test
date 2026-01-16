/**
 * Footer Component
 * 
 * Minimal footer with required disclaimer.
 */
export const Footer = () => {
  return (
    <footer className="mt-28 pt-6 border-t border-border text-center">
      <p className="text-sm text-muted-foreground/70">
        © {new Date().getFullYear()} Recourse. Not a law firm. No legal advice provided.
      </p>
    </footer>
  );
};
